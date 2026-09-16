import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

type Submission = { name: string; email: string; message: string };
type Outcome = "ok" | "skipped";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "austinsz@umich.edu";
// Resend lets you send from onboarding@resend.dev without verifying a domain,
// but only to the address you signed up with. Switch to an address on a
// verified domain (e.g. contact@austinshen.com) to send anywhere.
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Austin Shen Site <onboarding@resend.dev>";

// Every channel returns "skipped" when its env var is missing, so the route
// works with any subset of MongoDB, Resend, and a webhook configured.

async function saveToDatabase(s: Submission): Promise<Outcome> {
  if (!process.env.MONGODB_URI) return "skipped";
  await connectDB();
  await Contact.create(s);
  return "ok";
}

async function sendEmail(s: Submission): Promise<Outcome> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return "skipped";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: s.email,
      subject: `New message from ${s.name} via austinshen.com`,
      text: `Name: ${s.name}\nEmail: ${s.email}\n\n${s.message}`,
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  }
  return "ok";
}

async function postWebhook(s: Submission): Promise<Outcome> {
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) return "skipped";
  // Discord caps a message at 2,000 characters; Slack is more generous.
  const text = `New message from ${s.name} (${s.email}) via austinshen.com:\n\n${s.message}`.slice(0, 1900);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Slack reads "text", Discord reads "content"; each ignores the other key.
    body: JSON.stringify({ text, content: text }),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  return "ok";
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message } = (body ?? {}) as Partial<Record<string, unknown>>;

  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !email.trim() ||
    typeof message !== "string" || !message.trim()
  ) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const submission: Submission = {
    name: name.trim().slice(0, 100),
    email: email.trim(),
    message: message.trim().slice(0, 5000),
  };

  const channels = ["database", "email", "webhook"] as const;
  const results = await Promise.allSettled([
    saveToDatabase(submission),
    sendEmail(submission),
    postWebhook(submission),
  ]);

  let delivered = 0;
  let configured = 0;
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      configured += 1;
      console.error(`Contact ${channels[i]} error:`, r.reason);
    } else if (r.value === "ok") {
      configured += 1;
      delivered += 1;
    }
  });

  if (delivered === 0) {
    return NextResponse.json(
      {
        error: configured === 0
          ? "The contact form is not configured yet. Please email austinsz@umich.edu directly."
          : "Internal server error.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
