import nodemailer from "npm:nodemailer";

const smtpHost = "smtp-relay.brevo.com";
const smtpPort = 587;
const smtpPass = Deno.env.get("SMTP_PASS") || ""; // Use environment variable - never hardcode keys

// Test 1: System-generated login
try {
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false,
    auth: {
      user: "ad356e00@smtp-brevo.com",
      pass: smtpPass,
    },
  });
  console.log("Testing with ad356e00@smtp-brevo.com...");
  await transporter.verify();
  console.log("-> SUCCESS with ad356e00@smtp-brevo.com!");
} catch (err: any) {
  console.log("-> FAILED with ad356e00@smtp-brevo.com:", err.message);
}

// Test 2: Registered email login
try {
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false,
    auth: {
      user: "minhtri2110799@gmail.com",
      pass: smtpPass,
    },
  });
  console.log("Testing with minhtri2110799@gmail.com...");
  await transporter.verify();
  console.log("-> SUCCESS with minhtri2110799@gmail.com!");
} catch (err: any) {
  console.log("-> FAILED with minhtri2110799@gmail.com:", err.message);
}
