import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, website } = await req.json().catch(() => ({ email: "" }));
  if (website) return NextResponse.json({ ok: true });
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, message: "Vul een geldig e-mailadres in." }, { status: 400 });
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: false, message: "De nieuwsbrief wordt nog gekoppeld." }, { status: 503 });
  }
  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "newsletter", email }),
    signal: AbortSignal.timeout(8_000),
  }).catch(() => null);
  if (!response?.ok) return NextResponse.json({ ok: false, message: "Inschrijven lukte niet. Probeer het later opnieuw." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
