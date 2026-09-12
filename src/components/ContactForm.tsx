"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const subjects = ["Moedermelk / DNA sieraad", "Vingerafdruk", "Trouw- of verlovingsringen", "Eigen ontwerp", "Vraag over bestelling", "Iets anders"];

/** Contactformulier. POST naar /api/contact — koppel daar je mailprovider (Resend, Postmark, Shopify Inbox…). */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    await fetch("/api/contact", { method: "POST", body: JSON.stringify(data) }).catch(() => {});
    setBusy(false);
    setSent(true);
  }

  if (sent)
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] bg-cream-deep p-12 text-center">
        <p className="font-hand text-4xl text-taat">Dankjewel!</p>
        <p className="mt-3 text-ink-soft">Je bericht is onderweg naar het atelier. We reageren zo snel mogelijk.</p>
      </motion.div>
    );

  const field = "w-full rounded-xl border border-stone/50 bg-white/70 px-4 py-3 text-sm outline-none focus:border-gold";
  return (
    <form onSubmit={submit} className="space-y-5 rounded-[2rem] bg-cream-deep p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-xs text-ink-soft">Naam<input name="naam" required className={`${field} mt-1.5`} /></label>
        <label className="block text-xs text-ink-soft">E-mail<input name="email" type="email" required className={`${field} mt-1.5`} /></label>
      </div>
      <label className="block text-xs text-ink-soft">Waar gaat het over?
        <select name="onderwerp" className={`${field} mt-1.5`}>
          {subjects.map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
      <label className="block text-xs text-ink-soft">Je bericht
        <textarea name="bericht" required rows={6} placeholder="Vertel gerust alles – hoe meer we weten, hoe beter we kunnen meedenken." className={`${field} mt-1.5`} />
      </label>
      <button disabled={busy} className="shimmer w-full rounded-full bg-ink py-4 text-sm tracking-wide text-cream transition hover:bg-ink-soft disabled:opacity-50">
        {busy ? "Versturen…" : "Verstuur"}
      </button>
    </form>
  );
}
