import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (body?.website) return NextResponse.json({ ok: true });
  if (!body?.naam || !body?.email || !body?.bericht || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email)) {
    return NextResponse.json({ ok: false, message: "Controleer de ingevulde gegevens." }, { status: 400 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: false, message: "Het formulier wordt nog gekoppeld. Mail voorlopig naar info@tantetaat.nl." }, { status: 503 });
  }

  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "contact", ...body }),
    signal: AbortSignal.timeout(8_000),
  }).catch(() => null);
  if (!response?.ok) return NextResponse.json({ ok: false, message: "Versturen lukte niet. Probeer het later opnieuw." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
