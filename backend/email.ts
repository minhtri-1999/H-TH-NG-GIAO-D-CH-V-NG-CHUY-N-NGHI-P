// backend/email.ts
// Real Email OTP Sender using standard SMTP (Nodemailer) or Resend API & Terminal Fallback Log
import nodemailer from "npm:nodemailer";

export interface SendEmailResult {
  success: boolean;
  isSimulator: boolean;
  error?: string;
}

// Generate a secure 6-digit random numeric OTP code
export function generateOTP(): string {
  const digits = "0123456789";
  let otp = "";
  const randomValues = new Uint32Array(6);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < 6; i++) {
    otp += digits[randomValues[i] % 10];
  }
  return otp;
}

// Send real Email OTP using SMTP or Resend API
// If neither is configured, falls back to printing the OTP beautifully to the terminal
export async function sendEmailOTP(email: string, otp: string): Promise<SendEmailResult> {
  const smtpHost = Deno.env.get("SMTP_HOST");
  const smtpPort = Deno.env.get("SMTP_PORT");
  const smtpUser = Deno.env.get("SMTP_USER");
  const smtpPass = Deno.env.get("SMTP_PASSWORD");
  const smtpFrom = Deno.env.get("SMTP_FROM") || "XAU/USD Gold Terminal <no-reply@goldterminal.pro>";

  const resendApiKey = Deno.env.get("RESEND_API_KEY");

  // 1. If SMTP parameters are configured, use standard SMTP transporter
  if (smtpHost && smtpPort && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort, 10),
        secure: smtpPort === "465", // true for port 465, false for 587 or other ports
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: smtpFrom,
        to: email.trim(),
        subject: `[XAU/USD Gold Terminal] Mã OTP xác nhận tài khoản: ${otp}`,
        html: `
          <div style="font-family: 'Inter', sans-serif, Arial; background-color: #0b0e14; color: #f0f4f8; padding: 40px; border-radius: 12px; max-width: 500px; margin: 20px auto; border: 1px solid rgba(255, 171, 0, 0.15); box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
            <div style="text-align: center; margin-bottom: 30px;">
              <span style="font-size: 40px;">📊</span>
              <h2 style="color: #ffab00; margin-top: 10px; font-weight: 800; letter-spacing: 1px;">XAU/USD GOLD PRO TERMINAL</h2>
              <p style="color: #90a4ae; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-top: -5px;">Live Millisecond Feed & Signals</p>
            </div>
            
            <div style="background-color: #151821; padding: 25px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.05); text-align: center;">
              <p style="margin-top: 0; color: #cfd8dc; font-size: 14px;">Mã xác thực OTP đăng ký tài khoản của bạn là:</p>
              <div style="font-size: 32px; font-weight: 800; color: #00e676; letter-spacing: 6px; margin: 20px 0; font-family: monospace;">${otp}</div>
              <p style="margin-bottom: 0; color: #ff8a80; font-size: 12px; font-weight: bold;">⚠️ Mã OTP này có hiệu lực trong vòng 5 phút.</p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center; font-size: 11px; color: #607d8b;">
              <p style="margin: 0;">Nếu bạn không yêu cầu đăng ký này, xin hãy bỏ qua email này.</p>
              <p style="margin: 5px 0 0 0;">© 2026 XAU/USD Gold Terminal. All rights reserved.</p>
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log(`\x1b[32m✓ Đã gửi email OTP thực tế qua SMTP tới ${email}\x1b[0m`);
      return { success: true, isSimulator: false };
    } catch (err: any) {
      console.error("Lỗi khi gửi email qua SMTP:", err);
      return { success: false, isSimulator: false, error: `SMTP Sending Failed: ${err.message}` };
    }
  }

  // 2. If Resend API key is configured, use Resend API
  if (resendApiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${resendApiKey.trim()}`,
        },
        body: JSON.stringify({
          from: smtpFrom.includes("no-reply") ? "XAU/USD Gold Terminal <onboarding@resend.dev>" : smtpFrom,
          to: email.trim(),
          subject: `[XAU/USD Gold Terminal] Mã OTP xác nhận tài khoản: ${otp}`,
          html: `
            <div style="font-family: 'Inter', sans-serif, Arial; background-color: #0b0e14; color: #f0f4f8; padding: 40px; border-radius: 12px; max-width: 500px; margin: 20px auto; border: 1px solid rgba(255, 171, 0, 0.15); box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
              <div style="text-align: center; margin-bottom: 30px;">
                <span style="font-size: 40px;">📊</span>
                <h2 style="color: #ffab00; margin-top: 10px; font-weight: 800; letter-spacing: 1px;">XAU/USD GOLD PRO TERMINAL</h2>
                <p style="color: #90a4ae; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-top: -5px;">Live Millisecond Feed & Signals</p>
              </div>
              
              <div style="background-color: #151821; padding: 25px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.05); text-align: center;">
                <p style="margin-top: 0; color: #cfd8dc; font-size: 14px;">Mã xác thực OTP đăng ký tài khoản của bạn là:</p>
                <div style="font-size: 32px; font-weight: 800; color: #00e676; letter-spacing: 6px; margin: 20px 0; font-family: monospace;">${otp}</div>
                <p style="margin-bottom: 0; color: #ff8a80; font-size: 12px; font-weight: bold;">⚠️ Mã OTP này có hiệu lực trong vòng 5 phút.</p>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center; font-size: 11px; color: #607d8b;">
                <p style="margin: 0;">Nếu bạn không yêu cầu đăng ký này, xin hãy bỏ qua email này.</p>
                <p style="margin: 5px 0 0 0;">© 2026 XAU/USD Gold Terminal. All rights reserved.</p>
              </div>
            </div>
          `
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error(`Resend API Error (Status ${response.status}):`, errText);
        return { success: false, isSimulator: false, error: `Resend API Error (Status ${response.status}): ${errText}` };
      }

      console.log(`\x1b[32m✓ Đã gửi email OTP thực tế qua Resend API tới ${email}\x1b[0m`);
      return { success: true, isSimulator: false };
    } catch (err: any) {
      console.error("Lỗi khi gửi email qua Resend:", err);
      return { success: false, isSimulator: false, error: `Resend Connection Error: ${err.message}` };
    }
  }

  // 3. Fallback: Beautiful Terminal Logger for offline local testing
  console.log("\n\x1b[33m" + "=".repeat(70) + "\x1b[0m");
  console.log("\x1b[36m⚡ [EMAIL OTP SIMULATOR - NO RESEND API KEY OR SMTP FOUND]\x1b[0m");
  console.log(`\x1b[1mTo:\x1b[0m \x1b[35m${email}\x1b[0m`);
  console.log(`\x1b[1mSubject:\x1b[0m \x1b[32mXác thực tài khoản XAU/USD Gold Terminal\x1b[0m`);
  console.log(`\x1b[1mOTP Code:\x1b[0m \x1b[1;33m${otp}\x1b[0m \x1b[30;43m Hạn 5 phút \x1b[0m`);
  console.log("\x1b[33m" + "=".repeat(70) + "\x1b[0m\n");

  return { success: true, isSimulator: true };
}
