"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const steps = [
  { no: "01", label: "Jouw verhaal", title: "Een herinnering komt binnen", text: "Je ontvangt precies wat nodig is om moedermelk, een afdruk of ander dierbaar materiaal veilig naar het atelier te sturen.", scene: "parcel" },
  { no: "02", label: "De vorm", title: "Materiaal wordt betekenis", text: "Laag voor laag ontstaat de steen of afdruk. Kleur, glans en kleine details worden met de hand opgebouwd.", scene: "stone" },
  { no: "03", label: "Het erfstuk", title: "Gesmeed om te blijven", text: "Goud of zilver wordt gevormd, gezet en gepolijst. Pas wanneer ieder detail klopt, gaat het sieraad naar jou.", scene: "ring" },
] as const;

function ProcessObject({ scene }: { scene: (typeof steps)[number]["scene"] }) {
  if (scene === "parcel") return <div className="process-object process-parcel" aria-hidden="true"><span className="process-ribbon" /><span className="process-drop" /></div>;
  if (scene === "stone") return <div className="process-object process-stone" aria-hidden="true"><span /><i>✦</i></div>;
  return <div className="process-object process-ring" aria-hidden="true"><span className="process-setting" /><span className="process-jewel" /></div>;
}

export function ProcessStory() {
  const [active, setActive] = useState(0);
  const step = steps[active];
  return (
    <section className="overflow-hidden bg-ink px-5 py-20 text-cream sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl"><p className="eyebrow !text-gold">Het proces</p><h2 className="font-display mt-3 text-5xl leading-[.95] sm:text-6xl">Van herinnering naar erfstuk.</h2><p className="mt-5 max-w-xl leading-7 text-cream/60">Kies een stap en zie hoe iets kleins langzaam een sieraad wordt dat generaties meegaat.</p></div>
        <div className="mt-12 grid overflow-hidden rounded-[2.25rem] border border-cream/10 bg-[#181513] lg:grid-cols-[.82fr_1.18fr]">
          <div className="divide-y divide-cream/10 lg:border-r lg:border-cream/10">
            {steps.map((item, index) => (
              <button key={item.no} type="button" onClick={() => setActive(index)} aria-pressed={active === index} className={`group grid w-full grid-cols-[3.3rem_1fr] gap-3 px-6 py-7 text-left transition sm:px-8 ${active === index ? "bg-cream text-ink" : "hover:bg-cream/5"}`}>
                <span className={`font-display text-2xl ${active === index ? "text-taat" : "text-gold"}`}>{item.no}</span><span><span className="block text-[9px] tracking-[.22em] uppercase opacity-55">{item.label}</span><span className="font-display mt-1 block text-2xl leading-none">{item.title}</span></span>
              </button>
            ))}
            <div className="px-6 py-7 sm:px-8"><p className="text-sm leading-6 text-cream/55">{step.text}</p><Link href="/atelier" className="mt-5 inline-flex items-center gap-2 border-b border-cream/30 pb-1 text-xs">Bekijk het hele proces <ArrowUpRight size={14} /></Link></div>
          </div>
          <div className="process-stage relative flex min-h-[28rem] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_42%,rgba(234,130,157,.16),transparent_31%),radial-gradient(circle_at_72%_20%,rgba(35,151,203,.12),transparent_28%)] sm:min-h-[38rem]">
            <div className="process-grid" aria-hidden="true" /><span className="process-shadow" aria-hidden="true" /><div key={step.scene} className="process-entry"><ProcessObject scene={step.scene} /></div>
            <span className="absolute bottom-6 left-7 text-[9px] tracking-[.22em] text-cream/35 uppercase">Stap {step.no} · interactief object</span>
          </div>
        </div>
      </div>
    </section>
  );
}
