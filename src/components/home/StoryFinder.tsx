"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

const stories = [
  { id: "begin", label: "Een nieuw begin", title: "Moedermelk & DNA", text: "Bewaar een klein stukje van de eerste maanden in een handgemaakte steen.", href: "/collecties/moedermelk-dna-sieraden", scene: "pearl" },
  { id: "afdruk", label: "Een afdruk", title: "Vinger- & neusafdruk", text: "Een unieke lijn, neusprint of pootafdruk vertaald naar zilver of goud.", href: "/collecties/vingerafdruk-sieraden", scene: "print" },
  { id: "geboorte", label: "Een geboortemaand", title: "Geboorteringen", text: "Eén steen per geliefde. Mooi op zichzelf en gemaakt om te stapelen.", href: "/collecties/geboorteringen", scene: "gem" },
  { id: "eigen", label: "Een eigen idee", title: "Persoonlijk ontwerp", text: "Een oud sieraad, bijzondere steen of verhaal waarvoor nog geen vorm bestaat.", href: "/contact", scene: "sketch" },
] as const;

type Scene = (typeof stories)[number]["scene"];

function StoryObject({ scene }: { scene: Scene }) {
  if (scene === "print") {
    return (
      <div className="story-object story-medallion" aria-hidden="true">
        <svg viewBox="0 0 160 160" className="h-full w-full p-8 text-[#312723]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M80 125c-32-13-40-44-27-68 12-22 43-25 59-7 16 19 8 51-14 61" />
          <path d="M66 112c-20-14-24-38-12-53 11-15 34-17 48-3 15 15 9 39-3 50" />
          <path d="M76 101c-12-10-14-25-6-34 7-8 20-9 28-1 9 10 5 25-2 32" />
          <path d="M84 87c-4-4-4-10-1-13 3-3 9-3 12 1" />
        </svg>
      </div>
    );
  }
  if (scene === "gem") return <div className="story-object story-gem" aria-hidden="true"><i /><i /><i /></div>;
  if (scene === "sketch") {
    return (
      <div className="story-object story-sketch" aria-hidden="true">
        <span className="story-orbit story-orbit-one" /><span className="story-orbit story-orbit-two" />
        <span className="story-spark story-spark-one">✦</span><span className="story-spark story-spark-two">✦</span>
      </div>
    );
  }
  return <div className="story-object story-pearl" aria-hidden="true"><span className="story-ring" /><span className="story-stone" /></div>;
}

export function StoryFinder() {
  const [active, setActive] = useState<(typeof stories)[number]["id"]>("begin");
  const story = stories.find((item) => item.id === active) ?? stories[0];

  return (
    <div className="grid gap-5 lg:grid-cols-[.88fr_1.12fr]">
      <div className="grid gap-2" role="tablist" aria-label="Kies jouw verhaal">
        {stories.map((item, index) => {
          const selected = active === item.id;
          return (
            <button key={item.id} type="button" role="tab" aria-selected={selected} aria-controls="story-result" onClick={() => setActive(item.id)} className={`group flex min-h-16 items-center justify-between rounded-2xl border px-5 py-4 text-left transition duration-300 sm:px-6 ${selected ? "border-ink bg-ink text-cream shadow-lg" : "border-stone/35 bg-white/30 hover:-translate-y-0.5 hover:border-ink/45"}`}>
              <span className="flex items-center gap-4"><span className={`font-display text-lg ${selected ? "text-gold" : "text-ink-soft"}`}>0{index + 1}</span><span className="text-sm font-medium sm:text-base">{item.label}</span></span>
              {selected ? <Check size={17} className="text-gold" /> : <ArrowUpRight size={17} className="opacity-45 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
            </button>
          );
        })}
      </div>

      <div id="story-result" role="tabpanel" aria-live="polite" className="relative min-h-[29rem] overflow-hidden rounded-[2rem] bg-[#211c1a] p-7 text-cream sm:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(232,180,154,.2),transparent_34%),radial-gradient(circle_at_18%_82%,rgba(35,151,203,.12),transparent_36%)]" />
        <div className="relative grid h-full min-h-[24rem] items-end gap-7 sm:grid-cols-[.9fr_1.1fr] sm:items-center">
          <div className="relative z-10 order-2 sm:order-1">
            <p className="text-[10px] font-semibold tracking-[.22em] text-gold uppercase">Misschien past dit bij jou</p>
            <h3 className="font-display mt-2 text-4xl leading-none sm:text-5xl">{story.title}</h3>
            <p className="mt-4 max-w-sm text-sm leading-6 text-cream/65">{story.text}</p>
            <Link href={story.href} className="mt-7 inline-flex items-center gap-2 border-b border-cream/50 pb-1 text-sm font-semibold">Bekijk de mogelijkheden <ArrowUpRight size={16} /></Link>
          </div>
          <div key={story.id} className="story-stage relative order-1 flex min-h-48 items-center justify-center sm:order-2 sm:min-h-80">
            <span className="story-shadow" aria-hidden="true" /><StoryObject scene={story.scene} />
          </div>
        </div>
      </div>
    </div>
  );
}
