"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Box, Check, ChevronDown, ImageIcon, Shield, Sparkles, Truck } from "lucide-react";
import clsx from "clsx";
import type { Product } from "@/lib/types";
import { formatMoney } from "@/lib/format";
import { useCart } from "@/components/cart/CartProvider";
import { Eyebrow, Heading } from "@/components/ui";
import type { Metal } from "@/components/three/Jewel";

const JewelViewer = dynamic(() => import("@/components/three/JewelViewer").then((m) => m.JewelViewer), { ssr: false });

const metalFromValue = (v: string | undefined, fallback: Metal): Metal => {
  const s = (v ?? "").toLowerCase();
  if (s.includes("ros")) return "rosegoud";
  if (s.includes("goud") || s.includes("gold")) return "goud";
  if (s.includes("zilver") || s.includes("silver")) return "zilver";
  return fallback;
};

const isPersonal = (p: Product) => /moedermelk|vingerafdruk|dna|huisdier|vacht|as\b/i.test(`${p.title} ${p.productType} ${p.tags.join(" ")}`);

export function ProductView({ product }: { product: Product }) {
  const { add, pending } = useCart();
  const [selected, setSelected] = useState<Record<string, string>>(
    Object.fromEntries(product.options.map((o) => [o.name, o.values[0]])),
  );
  const [mode, setMode] = useState<"3d" | "foto">(product.model3d && product.model3d !== "none" ? "3d" : "foto");
  const [img, setImg] = useState(0);
  const [note, setNote] = useState("");
  const [engraving, setEngraving] = useState("");
  const [added, setAdded] = useState(false);
  const [openInfo, setOpenInfo] = useState<string | null>("details");

  const variant = useMemo(
    () => product.variants.find((v) => v.selectedOptions.every((o) => selected[o.name] === o.value)) ?? product.variants[0],
    [product.variants, selected],
  );
  const metal = metalFromValue(selected["Materiaal"] ?? selected["Metaal"], product.material ?? "zilver");
  const personal = isPersonal(product);

  async function addLine() {
    const attrs: { key: string; value: string }[] = [];
    if (engraving) attrs.push({ key: "Gravure", value: engraving });
    if (note) attrs.push({ key: "Opmerking", value: note });
    await add(variant.id, 1, attrs);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  const has3d = product.model3d && product.model3d !== "none";

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* ---------- Gallery ---------- */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-gradient-to-b from-cream-deep to-blush/40">
            <AnimatePresence mode="wait">
              {mode === "3d" && has3d ? (
                <motion.div key="3d" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <JewelViewer shape={product.model3d!} metal={metal} stone={product.stoneColor} className="h-full w-full" />
                  <p className="font-hand pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-xl text-ink-soft">sleep om te draaien</p>
                </motion.div>
              ) : (
                <motion.div key={`img-${img}`} className="absolute inset-0" initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  {product.images[img] && (
                    <Image src={product.images[img].url} alt={product.images[img].altText ?? product.title} fill priority sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {has3d && (
              <div className="absolute left-4 top-4 flex rounded-full bg-cream/90 p-1 backdrop-blur">
                {(["3d", "foto"] as const).map((m) => (
                  <button key={m} onClick={() => setMode(m)} className={clsx("flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition", mode === m ? "bg-ink text-cream" : "text-ink-soft")}>
                    {m === "3d" ? <Box size={14} /> : <ImageIcon size={14} />} {m === "3d" ? "3D" : "Foto's"}
                  </button>
                ))}
              </div>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {product.images.map((im, i) => (
                <button key={im.url} onClick={() => { setImg(i); setMode("foto"); }} className={clsx("relative h-20 w-20 overflow-hidden rounded-xl bg-cream-deep ring-2 transition", mode === "foto" && img === i ? "ring-ink" : "ring-transparent hover:ring-stone")}>
                  <Image src={im.url} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ---------- Details ---------- */}
        <div>
          <Eyebrow>{product.productType}</Eyebrow>
          <Heading level={1} className="mt-3 !text-4xl sm:!text-5xl">{product.title}</Heading>
          <p className="mt-4 text-2xl">{formatMoney(variant.price)}</p>

          {product.story && (
            <p className="font-display mt-6 border-l-2 border-gold pl-5 text-xl italic leading-relaxed text-ink-soft">{product.story}</p>
          )}

          {/* options */}
          <div className="mt-8 space-y-6">
            {product.options.filter((o) => o.values.length > 1 || o.name !== "Title").map((o) => (
              <div key={o.name}>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[11px] tracking-[0.2em] text-ink-soft uppercase">{o.name}</p>
                  {/maat/i.test(o.name) && <Link href="/ringmaat" className="text-xs underline underline-offset-4">Welke maat heb ik?</Link>}
                </div>
                <div className="flex flex-wrap gap-2">
                  {o.values.map((v) => {
                    const active = selected[o.name] === v;
                    return (
                      <button key={v} onClick={() => setSelected((s) => ({ ...s, [o.name]: v }))} className={clsx("min-w-11 rounded-full border px-4 py-2 text-sm transition", active ? "border-ink bg-ink text-cream" : "border-stone/50 hover:border-ink")}>
                        {v}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {personal && (
              <div className="rounded-2xl border border-gold/40 bg-gold/5 p-5">
                <div className="flex items-center gap-2 text-sm"><Sparkles size={16} className="text-gold-deep" /> Persoonlijk sieraad</div>
                <p className="mt-1 text-xs text-ink-soft">Na je bestelling sturen we je een setje (buisje/afdrukkit) met een retourenvelop. Levertijd 4–6 weken na ontvangst.</p>
              </div>
            )}

            <div>
              <p className="mb-2 text-[11px] tracking-[0.2em] text-ink-soft uppercase">Gravure <span className="normal-case tracking-normal">(optioneel, max 12 tekens)</span></p>
              <input value={engraving} maxLength={12} onChange={(e) => setEngraving(e.target.value)} placeholder="bijv. Noor · 12-03-24" className="w-full rounded-xl border border-stone/50 bg-white/60 px-4 py-3 text-sm outline-none focus:border-gold" />
            </div>
            <div>
              <p className="mb-2 text-[11px] tracking-[0.2em] text-ink-soft uppercase">Opmerking voor de goudsmid</p>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="Wensen, geboortesteen, glitter…" className="w-full rounded-xl border border-stone/50 bg-white/60 px-4 py-3 text-sm outline-none focus:border-gold" />
            </div>
          </div>

          <button
            onClick={addLine}
            disabled={pending || !variant.availableForSale}
            className="shimmer mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-sm tracking-wide text-cream transition hover:bg-ink-soft disabled:opacity-50"
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2"><Check size={16} /> Toegevoegd</motion.span>
              ) : (
                <motion.span key="add" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  {variant.availableForSale ? (pending ? "Even geduld…" : "In mijn sieradendoosje") : "Tijdelijk niet beschikbaar"}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <ul className="mt-6 grid grid-cols-3 gap-3 text-center text-[11px] text-ink-soft">
            <li className="rounded-2xl bg-cream-deep p-3"><Truck size={18} strokeWidth={1.3} className="mx-auto mb-1" />Verzekerd verstuurd</li>
            <li className="rounded-2xl bg-cream-deep p-3"><Shield size={18} strokeWidth={1.3} className="mx-auto mb-1" />Duurzaam goud & zilver</li>
            <li className="rounded-2xl bg-cream-deep p-3"><Sparkles size={18} strokeWidth={1.3} className="mx-auto mb-1" />Handgesmeed & uniek</li>
          </ul>

          {/* accordions */}
          <div className="mt-10 divide-y divide-stone/30 border-y border-stone/30">
            {[
              { id: "details", t: "Over dit sieraad", c: <div className="prose prose-sm max-w-none text-ink-soft" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} /> },
              { id: "levertijd", t: "Levertijd & verzending", c: <p className="text-sm text-ink-soft">Persoonlijke sieraden: 4–6 weken na ontvangst van je materiaal. Overige sieraden: 1–2 weken. We verzenden verzekerd via PostNL. In schoolvakanties (Noord-Nederland) is het atelier gesloten.</p> },
              { id: "onderhoud", t: "Onderhoud", c: <p className="text-sm text-ink-soft">Doe je sieraad af bij douchen, zwemmen en sporten. Vermijd parfum en crèmes op de steen. Poets zilver met een zacht doekje. <Link href="/onderhoud" className="underline">Lees meer</Link>.</p> },
            ].map((s) => (
              <div key={s.id}>
                <button onClick={() => setOpenInfo(openInfo === s.id ? null : s.id)} className="flex w-full items-center justify-between py-4 text-left font-display text-lg">
                  {s.t}
                  <ChevronDown size={18} className={clsx("transition", openInfo === s.id && "rotate-180")} />
                </button>
                <AnimatePresence initial={false}>
                  {openInfo === s.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="pb-5">{s.c}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
