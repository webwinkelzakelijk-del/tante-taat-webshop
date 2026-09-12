import { NextResponse } from "next/server";

/**
 * Contactformulier. Nu: logt naar de serverconsole.
 * Koppel later bijv. Resend: `await resend.emails.send({ to: "info@tantetaat.nl", ... })`.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.email || !body?.bericht) return NextResponse.json({ ok: false }, { status: 400 });
  console.log("[contact] nieuw bericht:", body);
  return NextResponse.json({ ok: true });
}
