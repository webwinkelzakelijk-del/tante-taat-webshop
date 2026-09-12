import { NextResponse } from "next/server";

/**
 * Nieuwsbrief endpoint. Nu: logt alleen. Later: koppel aan Shopify Customer API
 * (customerCreate met acceptsMarketing) of Klaviyo/Mailchimp.
 */
export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({ email: "" }));
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  console.log("[newsletter] nieuwe inschrijving:", email);
  return NextResponse.json({ ok: true });
}
