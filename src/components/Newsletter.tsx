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

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email }) }).catch(() => {});
    setDone(true);
  }

  if (done)
    return (
      <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-hand text-2xl text-taat">
        Dankjewel! Je hoort snel van ons ♡
      </motion.p>
    );

  return (
    <form onSubmit={submit} className={compact ? "flex max-w-sm" : "mx-auto flex max-w-md"}>
      <input
        type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
        placeholder="jouw@email.nl"
        className="w-full rounded-l-full border border-r-0 border-stone/50 bg-white/70 px-5 py-3 text-sm outline-none focus:border-gold"
      />
      <button className="rounded-r-full bg-ink px-5 py-3 text-sm text-cream transition hover:bg-gold-deep">Inschrijven</button>
    </form>
  );
}
