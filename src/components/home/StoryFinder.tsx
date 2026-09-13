"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Fingerprint, Gem, Heart, Sparkles } from "lucide-react";

const stories = [
  { id: "begin", label: "Een nieuw begin", title: "Moedermelk & DNA", text: "Bewaar een klein stukje van de eerste maanden in een handgemaakte steen.", href: "/collecties/moedermelk-dna-sieraden", icon: Heart },
  { id: "afdruk", label: "Een afdruk", title: "Vinger- & neusafdruk", text: "Een unieke lijn, neusprint of pootafdruk vertaald naar zilver of goud.", href: "/collecties/vingerafdruk-sieraden", icon: Fingerprint },
  { id: "geboorte", label: "Een geboortemaand", title: "Geboorteringen", text: "Eén steen per geliefde. Mooi op zichzelf en gemaakt om te stapelen.", href: "/collecties/geboorteringen", icon: Gem },
  { id: "eigen", label: "Een eigen idee", title: "Persoonlijk ontwerp", text: "Een oud sieraad, bijzondere steen of verhaal waarvoor nog geen vorm bestaat.", href: "/contact", icon: Sparkles },
] as const;

export function StoryFinder() {
  const [active, setActive] = useState<(typeof stories)[number]["id"]>("begin");
  const story = stories.find((item) => item.id === active) ?? stories[0];
  const Icon = story.icon;

  return (
    <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
      <div className="grid gap-2">
        {stories.map((item, index) => (
          <button key={item.id} type="button" aria-pressed={active === item.id} onClick={() => setActive(item.id)} className={`group flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition sm:px-6 ${active === item.id ? "border-ink bg-ink text-cream" : "border-stone/35 bg-white/30 hover:border-ink/40"}`}>
            <span className="flex items-center gap-4">
              <span className={`font-display text-lg ${active === item.id ? "text-gold" : "text-ink-soft"}`}>0{index + 1}</span>
              <span className="text-sm font-medium sm:text-base">{item.label}</span>
            </span>
            <ArrowUpRight size={18} className="opacity-55 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        ))}
      </div>
      <div className="flex min-h-72 flex-col justify-between rounded-[2rem] bg-blush p-7 sm:p-10">
        <Icon size={34} strokeWidth={1.25} className="text-taat" />
        <div className="mt-12">
          <p className="text-[10px] font-semibold tracking-[.22em] text-ink-soft uppercase">Misschien past dit bij jou</p>
          <h3 className="font-display mt-2 text-4xl leading-none sm:text-5xl">{story.title}</h3>
          <p className="mt-4 max-w-md text-sm leading-6 text-ink-soft sm:text-base">{story.text}</p>
          <Link href={story.href} className="mt-7 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-semibold">Bekijk de mogelijkheden <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </div>
  );
}
