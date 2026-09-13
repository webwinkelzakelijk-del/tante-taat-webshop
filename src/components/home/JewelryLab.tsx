"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { Box, Rotate3D } from "lucide-react";
import type { Metal } from "@/components/three/Jewel";

const JewelViewer = dynamic(() => import("@/components/three/JewelViewer").then((module) => module.JewelViewer), { ssr: false, loading: () => <div className="absolute inset-0 animate-pulse bg-cream-deep" /> });
const metals: { id: Metal; label: string }[] = [{ id: "zilver", label: "Zilver" }, { id: "goud", label: "Geelgoud" }, { id: "rosegoud", label: "Roségoud" }];
const stones = [{ color: "#fbf6ee", label: "Moedermelk" }, { color: "#f2b8c6", label: "Rozenkwarts" }, { color: "#8e5fc4", label: "Amethist" }, { color: "#2c5ea8", label: "Saffier" }] as const;

export function JewelryLab() {
  const [enabled, setEnabled] = useState(false);
  const [metal, setMetal] = useState<Metal>("goud");
  const [stone, setStone] = useState<(typeof stones)[number]>(stones[0]);
  return (
    <div className="grid overflow-hidden rounded-[2.25rem] bg-ink text-cream lg:grid-cols-[1.1fr_.9fr]">
      <div className="relative min-h-[430px] overflow-hidden bg-[#ded2c7] lg:min-h-[620px]">
        {enabled ? <JewelViewer shape="ring" metal={metal} stone={stone.color} className="absolute inset-0" /> : (
          <>
            <Image src="/media/ring-moonstone.webp" alt="Handgesmede ring met lichte edelsteen" fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-ink/10" />
            <button type="button" onClick={() => setEnabled(true)} className="absolute inset-x-6 bottom-6 flex items-center justify-center gap-3 rounded-full bg-cream px-6 py-4 text-sm font-semibold text-ink shadow-xl transition hover:bg-white sm:inset-x-auto sm:left-8"><Box size={18} /> Open de 3D-schets</button>
          </>
        )}
        {enabled && <p className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-cream/85 px-4 py-2 text-xs text-ink backdrop-blur"><Rotate3D size={15} /> Sleep om te draaien</p>}
      </div>
      <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
        <p className="text-[10px] font-semibold tracking-[.24em] text-gold uppercase">Tante Taat Lab</p>
        <h2 className="font-display mt-3 text-5xl leading-[.95] sm:text-6xl">Speel met kleur en materiaal.</h2>
        <p className="mt-5 text-sm leading-6 text-cream/65">Deze digitale schets helpt je een richting te voelen. Het uiteindelijke sieraad ontstaat met de hand en is altijd uniek.</p>
        <fieldset className="mt-9"><legend className="text-[10px] tracking-[.2em] text-cream/50 uppercase">Metaal</legend><div className="mt-3 flex flex-wrap gap-2">{metals.map((item) => <button key={item.id} type="button" onClick={() => setMetal(item.id)} aria-pressed={metal === item.id} className={`rounded-full border px-4 py-2 text-xs transition ${metal === item.id ? "border-cream bg-cream text-ink" : "border-cream/20 hover:border-cream/50"}`}>{item.label}</button>)}</div></fieldset>
        <fieldset className="mt-7"><legend className="text-[10px] tracking-[.2em] text-cream/50 uppercase">Steen</legend><div className="mt-3 flex items-center gap-3">{stones.map((item) => <button key={item.color} type="button" title={item.label} aria-label={item.label} aria-pressed={stone.color === item.color} onClick={() => setStone(item)} className={`h-10 w-10 rounded-full border-2 transition hover:scale-105 ${stone.color === item.color ? "border-cream scale-105" : "border-transparent"}`} style={{ background: `radial-gradient(circle at 35% 28%, #fff, ${item.color})` }} />)}<span className="ml-2 text-xs text-cream/60">{stone.label}</span></div></fieldset>
      </div>
    </div>
  );
}
