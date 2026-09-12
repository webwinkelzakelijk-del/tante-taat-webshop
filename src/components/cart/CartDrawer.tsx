"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatMoney } from "@/lib/format";

export function CartDrawer() {
  const { cart, open, setOpen, update, pending } = useCart();
  const lines = cart?.lines ?? [];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-ink/30 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            aria-label="Winkelwagen"
          >
            <header className="flex items-center justify-between border-b border-stone/30 px-6 py-5">
              <h2 className="font-display text-2xl">Jouw sieradendoosje</h2>
              <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-cream-deep" aria-label="Sluiten">
                <X size={20} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-ink-soft">
                  <ShoppingBag className="mb-4 text-stone" size={40} strokeWidth={1.2} />
                  <p className="font-display text-xl text-ink">Nog leeg</p>
                  <p className="mt-1 text-sm">Ontdek onze collecties en vind jouw verhaal.</p>
                  <Link href="/collecties" onClick={() => setOpen(false)} className="mt-6 text-sm underline underline-offset-4">
                    Bekijk collecties
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-stone/20">
                  {lines.map((l) => (
                    <li key={l.id} className="flex gap-4 py-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream-deep">
                        {l.merchandise.product.featuredImage && (
                          <Image src={l.merchandise.product.featuredImage.url} alt="" fill sizes="80px" className="object-cover" />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <Link href={`/producten/${l.merchandise.product.handle}`} onClick={() => setOpen(false)} className="font-display text-lg leading-tight">
                          {l.merchandise.product.title}
                        </Link>
                        <p className="text-xs text-ink-soft">
                          {l.merchandise.selectedOptions.map((o) => `${o.name}: ${o.value}`).join(" · ")}
                        </p>
                        {l.attributes.length > 0 && (
                          <p className="mt-0.5 text-xs text-ink-soft">
                            {l.attributes.map((a) => `${a.key}: ${a.value}`).join(" · ")}
                          </p>
                        )}
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center rounded-full border border-stone/40">
                            <button disabled={pending} onClick={() => update(l.id, l.quantity - 1)} className="p-1.5" aria-label="Minder"><Minus size={14} /></button>
                            <span className="w-6 text-center text-sm">{l.quantity}</span>
                            <button disabled={pending} onClick={() => update(l.id, l.quantity + 1)} className="p-1.5" aria-label="Meer"><Plus size={14} /></button>
                          </div>
                          <span className="text-sm">{formatMoney(l.merchandise.price)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && cart && (
              <footer className="border-t border-stone/30 px-6 py-5">
                <div className="mb-1 flex justify-between text-sm text-ink-soft">
                  <span>Subtotaal</span><span>{formatMoney(cart.cost.subtotalAmount)}</span>
                </div>
                <p className="mb-4 text-xs text-ink-soft">Verzendkosten worden berekend bij het afrekenen. Veilig & verzekerd verstuurd.</p>
                <a
                  href={cart.checkoutUrl}
                  className="shimmer block w-full rounded-full bg-ink py-4 text-center text-sm font-medium tracking-wide text-cream transition hover:bg-ink-soft"
                >
                  Afrekenen
                </a>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
