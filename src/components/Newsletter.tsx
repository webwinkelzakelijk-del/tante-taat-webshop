"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/**
 * Nieuwsbrief-inschrijving. Koppel aan Shopify Email (Customer create via Storefront API)
 * of Klaviyo/Mailchimp via /api/newsletter zodra gewenst.
 */
export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const response = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }).catch(() => null);
    const result = await response?.json().catch(() => null);
    setBusy(false);
    if (response?.ok) setDone(true);
    else setError(result?.message ?? "Inschrijven lukte niet.");
  }

  if (done)
    return (
      <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-hand text-2xl text-taat">
        Dankjewel! Je hoort snel van ons ♡
      </motion.p>
    );

  return <div className={compact ? "max-w-sm" : "mx-auto max-w-md"}>
    <form onSubmit={submit} className="flex">
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jouw@email.nl" aria-label="E-mailadres" className="w-full rounded-l-full border border-r-0 border-stone/50 bg-white/70 px-5 py-3 text-sm text-ink outline-none focus:border-gold" />
      <button disabled={busy} className="rounded-r-full bg-ink px-5 py-3 text-sm text-cream transition hover:bg-gold-deep disabled:opacity-60">{busy ? "Even…" : "Inschrijven"}</button>
    </form>
    {error && <p role="alert" className="mt-2 text-xs text-red-700">{error}</p>}
  </div>;
}
