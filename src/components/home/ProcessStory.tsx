"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const steps = [
  {
    no: "01",
    label: "Jouw verhaal",
    title: "Een herinnering komt binnen",
    text: "Je ontvangt precies wat nodig is om moedermelk, een afdruk of ander dierbaar materiaal veilig naar het atelier te sturen.",
    scene: "keepsakes",
  },
  {
    no: "02",
    label: "De vorm",
    title: "Materiaal wordt betekenis",
    text: "Laag voor laag ontstaat de steen of afdruk. Kleur, glans en kleine details worden met de hand opgebouwd.",
    scene: "layers",
  },
  {
    no: "03",
    label: "Het erfstuk",
    title: "Gesmeed om te blijven",
    text: "Goud of zilver wordt gevormd, gezet en gepolijst. Pas wanneer ieder detail klopt, gaat het sieraad naar jou.",
    scene: "atelier",
  },
] as const;

const keepsakes = [
  { label: "Moedermelk", kind: "drop" },
  { label: "Haarlok", kind: "hair" },
  { label: "Familiesieraad", kind: "heirloom" },
  { label: "Dierenhaar", kind: "fur" },
  { label: "Geboortesteen", kind: "gem" },
] as const;

function SparkField() {
  return (
    <div className="process-sparks" aria-hidden="true">
      <i>✦</i><i>✦</i><i>·</i><i>✦</i><i>·</i><i>✦</i>
    </div>
  );
}

function KeepsakeIcon({ kind }: { kind: (typeof keepsakes)[number]["kind"] }) {
  if (kind === "hair" || kind === "fur") {
    return (
      <svg viewBox="0 0 64 64" className={`keepsake-svg keepsake-svg-${kind}`}>
        <path d={kind === "hair" ? "M17 50C48 42 12 22 43 13M23 53C53 42 22 29 48 18" : "M15 48C27 34 17 26 27 15M27 51C40 38 29 28 42 14M39 50C52 38 43 31 51 22"} />
      </svg>
    );
  }
  return <span className={`keepsake-shape keepsake-shape-${kind}`} />;
}

function KeepsakesScene() {
  return (
    <div className="process-keepsakes">
      {keepsakes.map((item, index) => (
        <div key={item.label} className={`keepsake-card keepsake-card-${index + 1}`}>
          <span className="keepsake-visual"><KeepsakeIcon kind={item.kind} /></span>
          <span className="keepsake-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function LayersScene() {
  return (
    <div className="ring-blueprint">
      <span className="ring-axis" />
      <div className="ring-layer ring-layer-stone"><span /></div>
      <div className="ring-layer-copy ring-layer-copy-stone"><b>03</b><span>Jouw herinnering</span></div>
      <div className="ring-layer ring-layer-setting"><span /><i /><i /><i /><i /></div>
      <div className="ring-layer-copy ring-layer-copy-setting"><b>02</b><span>De zetting</span></div>
      <div className="ring-layer ring-layer-band" />
      <div className="ring-layer-copy ring-layer-copy-band"><b>01</b><span>Goud of zilver</span></div>
      <p className="ring-blueprint-note">Laag voor laag · met de hand</p>
    </div>
  );
}

function AtelierScene() {
  return (
    <div className="atelier-scene">
      <div className="atelier-photo-card">
        <Image
          src="/media/nikita-at-work.webp"
          alt="Nikita werkt aan een ring in haar goudsmederij"
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
        <span className="atelier-photo-glow" />
      </div>
      <div className="atelier-signature">
        <span className="atelier-avatar">N</span>
        <span><b>Nikita</b><small>Goudsmid · Emmen</small></span>
      </div>
      <div className="atelier-ring-token"><span /></div>
      <span className="atelier-tool-line" />
    </div>
  );
}

function ProcessScene({ scene }: { scene: (typeof steps)[number]["scene"] }) {
  return (
    <>
      <SparkField />
      {scene === "keepsakes" && <KeepsakesScene />}
      {scene === "layers" && <LayersScene />}
      {scene === "atelier" && <AtelierScene />}
    </>
  );
}

export function ProcessStory() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <section className="overflow-hidden bg-ink px-5 py-20 text-cream sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="eyebrow !text-gold">Het proces</p>
          <h2 className="font-display mt-3 text-5xl leading-[.95] sm:text-6xl">Van herinnering naar erfstuk.</h2>
          <p className="mt-5 max-w-xl leading-7 text-cream/60">Kies een stap en zie hoe iets kleins langzaam een sieraad wordt dat generaties meegaat.</p>
        </div>

        <div className="mt-12 grid overflow-hidden rounded-[2.25rem] border border-cream/10 bg-[#181513] lg:grid-cols-[.82fr_1.18fr]">
          <div className="divide-y divide-cream/10 lg:border-r lg:border-cream/10">
            {steps.map((item, index) => (
              <button key={item.no} type="button" onClick={() => setActive(index)} aria-pressed={active === index} className={`group grid w-full grid-cols-[3.3rem_1fr] gap-3 px-6 py-7 text-left transition sm:px-8 ${active === index ? "bg-cream text-ink" : "hover:bg-cream/5"}`}>
                <span className={`font-display text-2xl ${active === index ? "text-taat" : "text-gold"}`}>{item.no}</span>
                <span><span className="block text-[9px] tracking-[.22em] uppercase opacity-55">{item.label}</span><span className="font-display mt-1 block text-2xl leading-none">{item.title}</span></span>
              </button>
            ))}
            <div className="px-6 py-7 sm:px-8">
              <p className="text-sm leading-6 text-cream/55">{step.text}</p>
              <Link href="/atelier" className="mt-5 inline-flex items-center gap-2 border-b border-cream/30 pb-1 text-xs">Bekijk het hele proces <ArrowUpRight size={14} /></Link>
            </div>
          </div>

          <div className="process-stage relative flex min-h-[31rem] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_42%,rgba(234,130,157,.16),transparent_31%),radial-gradient(circle_at_72%_20%,rgba(35,151,203,.12),transparent_28%)] sm:min-h-[38rem]">
            <div className="process-grid" aria-hidden="true" />
            <span className="process-shadow" aria-hidden="true" />
            <div key={step.scene} className="process-entry"><ProcessScene scene={step.scene} /></div>
            <span className="absolute bottom-6 left-7 z-20 text-[9px] tracking-[.22em] text-cream/35 uppercase">Stap {step.no} · jouw sieraad in wording</span>
          </div>
        </div>
      </div>
    </section>
  );
}
