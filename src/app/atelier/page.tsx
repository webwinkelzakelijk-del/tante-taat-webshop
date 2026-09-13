import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Flame, Gem, Hand } from "lucide-react";

export const metadata: Metadata = {
  title: "Het atelier",
  description: "Kijk mee in de goudsmederij van Tante Taat in Emmen, waar persoonlijke sieraden met de hand ontstaan.",
};

const steps = [
  { icon: Hand, title: "Luisteren", text: "We beginnen bij wat je wilt bewaren, vieren of doorgeven. Dat verhaal bepaalt de richting." },
  { icon: Flame, title: "Smeden", text: "Goud en zilver worden gevormd aan de werkbank. De sporen van de hand maken ieder stuk eigen." },
  { icon: Gem, title: "Zetten", text: "De persoonlijke steen of afdruk krijgt zijn plek en het sieraad wordt zorgvuldig afgewerkt." },
];

export default function AtelierPage() {
  return (
    <>
      <section className="px-5 pb-16 pt-12 sm:px-8 lg:pb-24 lg:pt-20">
        <div className="mx-auto grid max-w-7xl items-end gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div className="pb-4">
            <p className="eyebrow">Het atelier · Emmen</p>
            <h1 className="font-display mt-4 text-6xl leading-[.86] tracking-[-.04em] sm:text-7xl lg:text-8xl">Hier krijgt jouw verhaal vorm.</h1>
            <p className="mt-7 max-w-lg leading-7 text-ink-soft">Persoonlijke sieraden ontstaan niet aan een lopende band. Ze vragen om aandacht, vakmanschap en tijd aan de werkbank.</p>
          </div>
          <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] bg-cream-deep">
            <video className="absolute inset-0 h-full w-full object-cover" controls playsInline preload="none" poster="/media/hero-poster.webp"><source src="/media/atelier-film.mp4" type="video/mp4" /></video>
          </div>
        </div>
      </section>

      <section id="proces" className="scroll-mt-24 bg-ink px-5 py-20 text-cream sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl"><p className="eyebrow !text-gold">Van idee naar sieraad</p><h2 className="font-display mt-3 text-5xl leading-none sm:text-6xl">Drie momenten. Veel kleine handelingen.</h2></div>
          <div className="grid gap-px overflow-hidden rounded-[2rem] bg-cream/15 lg:grid-cols-3">
            {steps.map((step, index) => <article key={step.title} className="bg-ink p-8 sm:p-10"><span className="font-display text-2xl text-gold">0{index + 1}</span><step.icon className="mt-10 text-cream/55" strokeWidth={1.2} /><h3 className="font-display mt-5 text-3xl">{step.title}</h3><p className="mt-3 text-sm leading-6 text-cream/60">{step.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="grid grid-cols-2 gap-3"><div className="relative aspect-[4/5] overflow-hidden rounded-[1.7rem]"><Image src="/media/jewel-01.webp" alt="Persoonlijk handgemaakt sieraad" fill sizes="50vw" className="object-cover" /></div><div className="relative mt-12 aspect-[4/5] overflow-hidden rounded-[1.7rem]"><Image src="/media/jewel-05.webp" alt="Gouden sieraad in sieradendoosje" fill sizes="50vw" className="object-cover" /></div></div>
          <div><p className="eyebrow">Een afspraak in het atelier</p><h2 className="font-display mt-3 text-5xl leading-[.95] sm:text-6xl">Voelen, passen en samen kiezen.</h2><p className="mt-6 leading-7 text-ink-soft">Wil je een oud sieraad laten omsmelten, trouwringen bespreken of gewoon eerst materialen bekijken? Het atelier is op afspraak open. Neem contact op, dan kijken we rustig wat mogelijk is.</p><Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-cream">Neem contact op <ArrowUpRight size={16} /></Link></div>
        </div>
      </section>
    </>
  );
}
