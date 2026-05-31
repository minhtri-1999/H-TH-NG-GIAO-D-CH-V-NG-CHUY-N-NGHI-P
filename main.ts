import { Hono } from "npm:hono@4";
import { logger } from "npm:hono@4/logger";
import { getCookie, deleteCookie } from "npm:hono@4/cookie";
import apiRoutes from "./backend/routes.ts";
import { getSession } from "./backend/db.ts";

const app = new Hono();

// Global request logger
app.use("*", logger());

// Error handler
app.onError((err, c) => {
  console.error("App Error:", err);
  return c.text("Server Error: " + err.message, 500);
});

// Middleware to protect sensitive XAU/USD data APIs (bypassed for public access)
app.use("/api/*", async (c, next) => {
  return await next();
});

// API routes
app.route("/api", apiRoutes);

app.get("/source", (c) => {
  return c.text("XAU/USD Gold Terminal running locally.");
});

// Serve frontend files as ES modules natively using Deno.readFile
app.get("/frontend/:file{.+}", async (c) => {
  const file = c.req.param("file");
  const path = `frontend/${file}`;
  try {
    const content = await Deno.readFile(path);
    let mimeType = "text/plain";
    if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      mimeType = "application/javascript; charset=utf-8"; // Modules served as JS
    } else if (file.endsWith(".js") || file.endsWith(".mjs")) {
      mimeType = "application/javascript; charset=utf-8";
    } else if (file.endsWith(".css")) {
      mimeType = "text/css; charset=utf-8";
    } else if (file.endsWith(".html")) {
      mimeType = "text/html; charset=utf-8";
    } else if (file.endsWith(".png")) {
      mimeType = "image/png";
    } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
      mimeType = "image/jpeg";
    } else if (file.endsWith(".svg")) {
      mimeType = "image/svg+xml";
    }
    return c.body(content, 200, { 
      "Content-Type": mimeType,
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      "Pragma": "no-cache",
      "Expires": "0"
    });
  } catch (e: any) {
    return c.text("File not found: " + path, 404);
  }
});

// Main page
app.get("/", async (c) => {
  try {
    const content = await Deno.readFile("frontend/index.html");
    return c.body(content, 200, { "Content-Type": "text/html; charset=utf-8" });
  } catch (e) {
    return c.text("Index file not found", 404);
  }
});

// Catch-all → SPA routing
app.get("*", async (c) => {
  try {
    const content = await Deno.readFile("frontend/index.html");
    return c.body(content, 200, { "Content-Type": "text/html; charset=utf-8" });
  } catch (e) {
    return c.text("Index file not found", 404);
  }
});

if (import.meta.main) {
  Deno.serve({ port: 8000 }, app.fetch);
}

export default app.fetch;
