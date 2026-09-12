"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatMoney } from "@/lib/format";
import { Button, Eyebrow, Heading } from "@/components/ui";

export function CartPage() {
  const { cart, update, pending } = useCart();
  const lines = cart?.lines ?? [];
  const demo = cart?.checkoutUrl.includes("demo=1");

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Eyebrow>Winkelwagen</Eyebrow>
      <Heading level={1} className="mt-3">Jouw sieradendoosje</Heading>

      {lines.length === 0 || !cart ? (
        <div className="mt-12 rounded-3xl bg-cream-deep p-12 text-center">
          <p className="font-display text-2xl">Nog leeg</p>
          <Button href="/collecties" className="mt-6">Ontdek de collecties</Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <ul className="divide-y divide-stone/30">
            {lines.map((l) => (
              <li key={l.id} className="flex gap-5 py-6">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-cream-deep">
                  {l.merchandise.product.featuredImage && (
                    <Image src={l.merchandise.product.featuredImage.url} alt="" fill sizes="112px" className="object-cover" />
                  )}
                </div>
                <div className="flex flex-1 flex-col">
                  <Link href={`/producten/${l.merchandise.product.handle}`} className="font-display text-2xl leading-tight">
                    {l.merchandise.product.title}
                  </Link>
                  <p className="text-sm text-ink-soft">{l.merchandise.selectedOptions.map((o) => `${o.name}: ${o.value}`).join(" · ")}</p>
                  {l.attributes.map((a) => (
                    <p key={a.key} className="text-xs text-ink-soft">{a.key}: {a.value}</p>
                  ))}
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-stone/40">
                        <button disabled={pending} onClick={() => update(l.id, l.quantity - 1)} className="p-2" aria-label="Minder"><Minus size={14} /></button>
                        <span className="w-6 text-center text-sm">{l.quantity}</span>
                        <button disabled={pending} onClick={() => update(l.id, l.quantity + 1)} className="p-2" aria-label="Meer"><Plus size={14} /></button>
                      </div>
                      <button disabled={pending} onClick={() => update(l.id, 0)} className="text-ink-soft hover:text-ink" aria-label="Verwijderen"><Trash2 size={16} /></button>
                    </div>
                    <span>{formatMoney({ ...l.merchandise.price, amount: String(Number(l.merchandise.price.amount) * l.quantity) })}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-3xl bg-cream-deep p-7">
            <div className="flex justify-between"><span>Subtotaal</span><span>{formatMoney(cart.cost.subtotalAmount)}</span></div>
            <p className="mt-2 text-xs text-ink-soft">Verzendkosten en eventuele kortingen worden bij het afrekenen berekend.</p>
            {demo ? (
              <div className="mt-6 rounded-2xl border border-taat/30 bg-taat-soft p-4 text-xs text-ink-soft">
                <strong className="text-ink">Demo-modus.</strong> Zodra de Shopify Storefront-token is ingesteld, leidt “Afrekenen” naar de beveiligde Shopify-checkout (iDEAL, creditcard, Klarna…).
              </div>
            ) : (
              <a href={cart.checkoutUrl} className="shimmer mt-6 block rounded-full bg-ink py-4 text-center text-sm text-cream hover:bg-ink-soft">Afrekenen</a>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
