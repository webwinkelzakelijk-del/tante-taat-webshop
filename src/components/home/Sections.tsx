"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Droplets, Fingerprint, FlaskConical, Gem, Hammer, Package, Sparkles } from "lucide-react";
import type { Collection, Product } from "@/lib/types";
import { Button, Eyebrow, Heading, Item, Reveal, Stagger } from "@/components/ui";
import { ProductCard } from "@/components/ProductCard";
import { Newsletter } from "@/components/Newsletter";
import type { Metal } from "@/components/three/Jewel";

const JewelViewer = dynamic(() => import("@/components/three/JewelViewer").then((m) => m.JewelViewer), { ssr: false });

/* ---------------- Marquee ---------------- */

const marqueeItems = ["Handgesmeed in Emmen", "100% duurzaam goud & zilver", "Veilig & verzekerd verstuurd", "Elk stuk uniek", "Moedermelk · DNA · Vingerafdruk", "Sinds 2014 met liefde gemaakt"];

export function Marquee() {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <div className="overflow-hidden border-y border-stone/30 bg-cream-deep py-4">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 text-[11px] tracking-[0.25em] text-ink-soft uppercase">
            {t} <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Collections ---------------- */

export function Collections({ collections }: { collections: Collection[] }) {
  const [big, ...rest] = collections;
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <Reveal className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Eyebrow>Collecties</Eyebrow>
          <Heading className="mt-3">Waar begint jouw verhaal?</Heading>
        </div>
        <Link href="/collecties" className="group inline-flex items-center gap-1 text-sm underline-offset-4 hover:underline">
          Alle collecties <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </Reveal>

      <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-2">
        {big && (
          <Item className="md:col-span-2 md:row-span-2">
            <CollectionTile c={big} tall />
          </Item>
        )}
        {rest.slice(0, 4).map((c) => (
          <Item key={c.handle}><CollectionTile c={c} /></Item>
        ))}
      </Stagger>
    </section>
  );
}

function CollectionTile({ c, tall = false }: { c: Collection; tall?: boolean }) {
  return (
    <Link href={`/collecties/${c.handle}`} className={`group relative block overflow-hidden rounded-3xl bg-cream-deep ${tall ? "aspect-[4/5] md:aspect-auto md:h-full" : "aspect-[4/3]"}`}>
      {c.image && (
        <Image src={c.image.url} alt={c.image.altText ?? c.title} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-cream sm:p-8">
        <h3 className={`font-display ${tall ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"}`}>{c.title}</h3>
        <p className="mt-2 max-w-sm text-sm text-cream/80 opacity-0 transition-all duration-500 group-hover:opacity-100">{c.description}</p>
      </div>
    </Link>
  );
}

/* ---------------- Process ---------------- */

const steps = [
  { icon: Droplets, title: "Jij stuurt", text: "Je ontvangt van ons een setje thuis: een buisje voor 5 ml moedermelk, een afdrukkit of een zakje voor een plukje vacht." },
  { icon: FlaskConical, title: "Wij bewaren", text: "De melk wordt geconserveerd en gedroogd tot een fijn poeder – zodat hij nooit verkleurt of bederft." },
  { icon: Gem, title: "De steen ontstaat", text: "Het poeder wordt gemengd met hars en met de hand gegoten in de vorm die jij koos. Glans, glitter of geboortesteen? Jij bepaalt." },
  { icon: Hammer, title: "Handgesmeed", text: "In ons atelier in Emmen smeden we de zetting van duurzaam goud of zilver en zetten we jouw steen." },
  { icon: Package, title: "Met liefde verstuurd", text: "Verzekerd en in een doosje dat je wil bewaren. Binnen 4–6 weken bij jou." },
];

export function Process() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 text-cream">
      <div className="absolute inset-0 opacity-30 [background:radial-gradient(50%_40%_at_20%_20%,#c9a66b33,transparent),radial-gradient(40%_40%_at_90%_80%,#1a8fd033,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <Eyebrow className="text-gold">Zo maken we het</Eyebrow>
          <Heading className="mt-3">Van een druppel tot een sieraad dat blijft.</Heading>
          <p className="mt-5 text-cream/70">Vijf stappen, allemaal met de hand. Daarom duurt het even – en daarom is het de moeite waard.</p>
        </Reveal>

        <div className="no-scrollbar mt-16 flex snap-x gap-6 overflow-x-auto pb-6 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="w-[78vw] shrink-0 snap-start sm:w-[45vw] lg:w-auto">
              <div className="group relative h-full rounded-3xl border border-cream/10 bg-cream/[0.04] p-7 transition hover:border-gold/50 hover:bg-cream/[0.07]">
                <span className="font-display text-6xl text-cream/15 transition group-hover:text-gold/60">0{i + 1}</span>
                <s.icon className="mt-4 text-gold" size={28} strokeWidth={1.3} />
                <h3 className="font-display mt-4 text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <Button href="/atelier" variant="light">Lees het hele verhaal</Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Featured ---------------- */

export function Featured({ products }: { products: Product[] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <Reveal className="mb-12 text-center">
        <Eyebrow>Favorieten</Eyebrow>
        <Heading className="mt-3">Meest gekoesterd</Heading>
      </Reveal>
      <Stagger className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
        {products.slice(0, 4).map((p, i) => (
          <Item key={p.handle}><ProductCard product={p} priority={i < 2} /></Item>
        ))}
      </Stagger>
      <Reveal className="mt-14 text-center">
        <Button href="/collecties" variant="outline">Bekijk alles</Button>
      </Reveal>
    </section>
  );
}

/* ---------------- Material playground ---------------- */

const metals: { id: Metal; label: string; note: string }[] = [
  { id: "zilver", label: "Zilver", note: "925 sterling, gerecycled" },
  { id: "goud", label: "Geelgoud", note: "14 karaat, fairmined" },
  { id: "rosegoud", label: "Roségoud", note: "14 karaat, warm" },
];
const stones = [
  { id: "#fbf6ee", label: "Moedermelk" },
  { id: "#f2b8c6", label: "Rozenkwarts" },
  { id: "#8e5fc4", label: "Amethist" },
  { id: "#2c5ea8", label: "Saffier" },
  { id: "#3fa66b", label: "Smaragd" },
  { id: "#d9d9dc", label: "Diamant" },
];

export function Playground() {
  const [metal, setMetal] = useState<Metal>("goud");
  const [stone, setStone] = useState(stones[0]);
  return (
    <section className="relative overflow-hidden bg-blush/40 py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <div className="relative order-2 h-[420px] lg:order-1 lg:h-[560px]">
          <JewelViewer shape="ring" metal={metal} stone={stone.id} className="h-full w-full" />
          <AnimatePresence mode="wait">
            <motion.p key={metal + stone.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="font-hand absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-2xl text-ink-soft">
              {metals.find((m) => m.id === metal)?.label} met {stone.label.toLowerCase()}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow>Speel & ontdek</Eyebrow>
            <Heading className="mt-3">Jouw ring, jouw keuzes.</Heading>
            <p className="mt-5 max-w-md text-ink-soft">Kies een metaal en een steen en zie meteen hoe je sieraad tot leven komt. In het atelier maken we het precies zo – maar dan écht.</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <p className="mb-3 text-[11px] tracking-[0.2em] text-ink-soft uppercase">Metaal</p>
            <div className="flex flex-wrap gap-3">
              {metals.map((m) => (
                <button key={m.id} onClick={() => setMetal(m.id)} className={`rounded-full border px-5 py-2.5 text-sm transition ${metal === m.id ? "border-ink bg-ink text-cream" : "border-ink/20 bg-white/50 hover:border-ink"}`}>
                  {m.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-ink-soft">{metals.find((m) => m.id === metal)?.note}</p>
          </Reveal>

          <Reveal delay={0.2} className="mt-8">
            <p className="mb-3 text-[11px] tracking-[0.2em] text-ink-soft uppercase">Steen</p>
            <div className="flex flex-wrap gap-3">
              {stones.map((s) => (
                <button key={s.id} onClick={() => setStone(s)} title={s.label} aria-label={s.label} className={`h-10 w-10 rounded-full border-2 shadow-inner transition hover:scale-110 ${stone.id === s.id ? "border-ink scale-110" : "border-white"}`} style={{ background: `radial-gradient(circle at 35% 30%, #fff8, ${s.id})` }} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3} className="mt-10">
            <Button href="/collecties/moedermelk-dna-sieraden">Ontwerp de jouwe</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Story / Maker ---------------- */

export function Maker() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-cream-deep">
            <Image src="https://tantetaat.nl/image/cache/catalog/1.%20A%20Ageboorteringen/9F3F7956-65D5-4036-A353-9BD55B6D48AD-3490x3490.jpeg" alt="Handgemaakte ringen in het atelier" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <motion.div className="animate-float absolute -bottom-8 -right-4 rounded-2xl bg-cream p-5 shadow-xl sm:-right-8">
            <p className="font-hand text-2xl leading-tight">“Elk sieraad krijgt<br />mijn volle aandacht.”</p>
            <p className="mt-1 text-xs tracking-[0.2em] text-ink-soft uppercase">— Nikita, goudsmid</p>
          </motion.div>
        </Reveal>
        <Reveal delay={0.15}>
          <Eyebrow>Het atelier</Eyebrow>
          <Heading className="mt-3">Klein atelier.<br />Grote verhalen.</Heading>
          <p className="mt-6 text-ink-soft leading-relaxed">
            Tante Taat is een goudsmederij in Emmen waar sieraden ontstaan uit dingen die er écht toe doen: de eerste maanden met je baby, de hand van je opa, de vacht van je hond. Geen fabriek, geen voorraad – alleen een werkbank, een vlam en veel geduld.
          </p>
          <p className="mt-4 text-ink-soft leading-relaxed">
            We werken uitsluitend met gerecycled en fairmined goud en zilver. Omdat mooi ook eerlijk moet zijn.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-6 border-t border-stone/30 pt-6">
            {[["10+", "jaar smeden"], ["3.500+", "verhalen bewaard"], ["100%", "duurzaam metaal"]].map(([n, l]) => (
              <div key={l}><p className="font-display text-3xl">{n}</p><p className="text-xs text-ink-soft">{l}</p></div>
            ))}
          </div>
          <Button href="/atelier" variant="outline" className="mt-8">Ontmoet Tante Taat</Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */

const reviews = [
  { name: "Lisanne", text: "Ik draag mijn moedermelk ring elke dag. Het voelt alsof die eerste maanden nog een beetje bij me zijn.", item: "Moedermelk ring" },
  { name: "Marieke & Bas", text: "Onze trouwringen zijn precies zoals we ze in ons hoofd hadden – en het proces was zo persoonlijk.", item: "Trouwringen" },
  { name: "Joyce", text: "De vingerafdruk van mijn vader, in zilver. Ik heb gehuild toen ik het pakje openmaakte.", item: "Vingerafdruk hanger" },
  { name: "Sanne", text: "Drie geboorteringen voor drie kindjes. Iedereen vraagt ernaar.", item: "Geboorteringen" },
];

export function Testimonials() {
  return (
    <section className="bg-cream-deep py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 text-center">
          <Eyebrow>Wall of fame</Eyebrow>
          <Heading className="mt-3">Gedragen met liefde</Heading>
        </Reveal>
        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <Item key={r.name}>
              <figure className="flex h-full flex-col rounded-3xl bg-cream p-7 shadow-sm">
                <Sparkles className="text-gold" size={20} strokeWidth={1.3} />
                <blockquote className="font-display mt-4 flex-1 text-xl leading-snug">“{r.text}”</blockquote>
                <figcaption className="mt-5 text-xs text-ink-soft">
                  <span className="text-ink">{r.name}</span> · {r.item}
                </figcaption>
              </figure>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------------- Personal CTA ---------------- */

export function PersonalCta() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-ink px-8 py-16 text-center text-cream sm:px-16">
        <div className="absolute inset-0 opacity-40 [background:radial-gradient(40%_60%_at_50%_0%,#c9a66b55,transparent)]" />
        <Fingerprint className="relative mx-auto text-gold" size={40} strokeWidth={1} />
        <Heading className="relative mt-5">Iets anders in gedachten?</Heading>
        <p className="relative mx-auto mt-4 max-w-lg text-cream/70">Een ring van opa’s oude trouwring, een hanger met de as van je moeder, een ontwerp dat nog nergens bestaat. Vertel het ons – we denken graag mee.</p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/contact" variant="light">Vertel je verhaal</Button>
          <Button href="https://wa.me/31600000000" variant="outline" className="border-cream/40 text-cream hover:bg-cream hover:text-ink">WhatsApp ons</Button>
        </div>
      </Reveal>
    </section>
  );
}

export function NewsletterSection() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-10 text-center">
      <Reveal>
        <p className="font-hand text-3xl text-taat">psst…</p>
        <Heading level={3} className="mt-2">Nieuwe stenen, verhalen & atelier-nieuws</Heading>
        <p className="mt-3 text-sm text-ink-soft">Een paar keer per jaar, alleen als we écht iets te vertellen hebben.</p>
        <div className="mt-6"><Newsletter /></div>
      </Reveal>
    </section>
  );
}
