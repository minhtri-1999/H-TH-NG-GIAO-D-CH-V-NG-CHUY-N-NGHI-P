// backend/db.ts
// Database layer using Deno KV and Native Web Crypto API for secure password hashing

export interface User {
  email: string;
  passwordHash: string;
  salt: string;
  verified: boolean;
  createdAt: number;
}

export interface OTPRecord {
  otp: string;
  expiresAt: number;
}

export interface Session {
  email: string;
  expiresAt: number;
}

// Open Deno KV with a robust fallback to an in-memory database if KV is not supported or unstable flag is missing
let tempKv: any;
try {
  if (typeof (Deno as any).openKv === "function") {
    tempKv = await (Deno as any).openKv();
  } else {
    throw new Error("Deno.openKv is not a function in this environment.");
  }
} catch (e) {
  console.warn("⚠️ Deno KV is not supported or enabled in this environment. Falling back to in-memory database.", e);
  
  // High-performance Mock KV storage for sandboxes, playgrounds, or non-KV deployments
  const store = new Map<string, any>();
  tempKv = {
    async get(key: unknown[]) {
      const k = JSON.stringify(key);
      return { value: store.get(k) ?? null };
    },
    async set(key: unknown[], value: any, options?: any) {
      const k = JSON.stringify(key);
      store.set(k, value);
      return { ok: true };
    },
    async delete(key: unknown[]) {
      const k = JSON.stringify(key);
      store.delete(k);
      return { ok: true };
    },
    list(selector: { prefix: unknown[] }) {
      const results: any[] = [];
      for (const [kStr, v] of store.entries()) {
        const k = JSON.parse(kStr);
        if (Array.isArray(k) && k.length >= selector.prefix.length) {
          let match = true;
          for (let i = 0; i < selector.prefix.length; i++) {
            if (k[i] !== selector.prefix[i]) {
              match = false;
              break;
            }
          }
          if (match) {
            results.push({ key: k, value: v });
          }
        }
      }
      return {
        async *[Symbol.asyncIterator]() {
          for (const r of results) {
            yield r;
          }
        }
      };
    }
  };
}

export const kv = tempKv;

// Securely generate cryptographically strong salt
export function generateSalt(): string {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr, b => b.toString(16).padStart(2, "0")).join("");
}

// PBKDF2 Password Hashing (100% real, standard cryptographic hashing using native web crypto)
export async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: encoder.encode(salt),
      iterations: 100000,
      hash: "SHA-256"
    },
    passwordKey,
    256 // 256 bits = 32 bytes hash
  );

  return Array.from(new Uint8Array(derivedBits), b => b.toString(16).padStart(2, "0")).join("");
}

// USER OPERATIONS
export async function getUserByEmail(email: string): Promise<User | null> {
  const res = await kv.get<User>(["users", email.toLowerCase().trim()]);
  return res.value;
}

export async function createUser(email: string, passwordHash: string, salt: string): Promise<User> {
  const normalizedEmail = email.toLowerCase().trim();
  const user: User = {
    email: normalizedEmail,
    passwordHash,
    salt,
    verified: false,
    createdAt: Date.now()
  };
  await kv.set(["users", normalizedEmail], user);
  return user;
}

export async function verifyUser(email: string): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim();
  const user = await getUserByEmail(normalizedEmail);
  if (!user) return false;
  user.verified = true;
  await kv.set(["users", normalizedEmail], user);
  return true;
}

// OTP OPERATIONS
export async function setOTP(email: string, otp: string, expiresAfterMs = 300000): Promise<void> {
  const normalizedEmail = email.toLowerCase().trim();
  const expiresAt = Date.now() + expiresAfterMs;
  // Use Deno KV's built-in expireIn option to auto-cleanup expired OTPs
  await kv.set(["otps", normalizedEmail], { otp, expiresAt }, { expireIn: expiresAfterMs });
}

export async function getOTP(email: string): Promise<OTPRecord | null> {
  const res = await kv.get<OTPRecord>(["otps", email.toLowerCase().trim()]);
  return res.value;
}

export async function deleteOTP(email: string): Promise<void> {
  await kv.delete(["otps", email.toLowerCase().trim()]);
}

// SESSION OPERATIONS
export async function createSession(sessionId: string, email: string, expiresAfterMs = 7 * 24 * 3600 * 1000): Promise<void> {
  const expiresAt = Date.now() + expiresAfterMs;
  await kv.set(["sessions", sessionId], { email: email.toLowerCase().trim(), expiresAt }, { expireIn: expiresAfterMs });
}

export async function getSession(sessionId: string): Promise<Session | null> {
  const res = await kv.get<Session>(["sessions", sessionId]);
  if (!res.value) return null;
  if (res.value.expiresAt < Date.now()) {
    await deleteSession(sessionId);
    return null;
  }
  return res.value;
}

export async function deleteSession(sessionId: string): Promise<void> {
  await kv.delete(["sessions", sessionId]);
}

// ==========================================
// 📊 BACKTEST & TRADING HISTORY LOGGER
// ==========================================

export interface ClosedTrade {
  id: string;
  timeframe: string;
  position: "BUY" | "SELL";
  entry: number;
  stopLoss: number;
  takeProfit1: number;
  takeProfit2: number;
  status: "TP1" | "TP2" | "SL";
  openTime: number;
  closeTime: number;
  pips: number;
  profitUsd: number;
}

export async function saveClosedTrade(trade: ClosedTrade): Promise<void> {
  const timeframe = trade.timeframe.toUpperCase();
  const res = await kv.get<ClosedTrade[]>(["closed_trades_v2", timeframe]);
  const list = res.value || [];
  const filtered = list.filter(t => t.id !== trade.id);
  filtered.push(trade);
  // Sort descending by close time and keep latest 200 trades per timeframe to stay within Deno KV limits
  filtered.sort((a, b) => b.closeTime - a.closeTime);
  const sliced = filtered.slice(0, 200);
  await kv.set(["closed_trades_v2", timeframe], sliced);
}

export async function saveClosedTradesList(timeframe: string, trades: ClosedTrade[]): Promise<void> {
  // Sort descending by close time and keep latest 200 trades
  const sorted = [...trades].sort((a, b) => b.closeTime - a.closeTime);
  const sliced = sorted.slice(0, 200);
  await kv.set(["closed_trades_v2", timeframe.toUpperCase()], sliced);
}

export async function getClosedTrades(timeframe?: string): Promise<ClosedTrade[]> {
  if (timeframe) {
    const res = await kv.get<ClosedTrade[]>(["closed_trades_v2", timeframe.toUpperCase()]);
    return (res.value || []).sort((a, b) => b.closeTime - a.closeTime);
  }
  const list: ClosedTrade[] = [];
  const iter = kv.list<ClosedTrade[]>({ prefix: ["closed_trades_v2"] });
  for await (const res of iter) {
    if (Array.isArray(res.value)) {
      list.push(...res.value);
    }
  }
  // Sort descending by close time (newest closed trades first)
  return list.sort((a, b) => b.closeTime - a.closeTime);
}

export async function clearClosedTrades(): Promise<void> {
  const iter = kv.list({ prefix: ["closed_trades_v2"] });
  for await (const res of iter) {
    await kv.delete(res.key);
  }
  
  // Clean up legacy v1 closed trades asynchronously to prevent blocking/timeouts
  try {
    const legacyIter = kv.list({ prefix: ["closed_trades"] });
    for await (const res of legacyIter) {
      await kv.delete(res.key);
    }
  } catch (err: any) {
    console.warn("Failed to clean up legacy closed trades:", err.message);
  }
}
