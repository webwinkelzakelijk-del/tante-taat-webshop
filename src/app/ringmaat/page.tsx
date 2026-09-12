import type { Metadata } from "next";
import { RingSizer } from "@/components/RingSizer";
import { Eyebrow, Heading, Reveal } from "@/components/ui";

export const metadata: Metadata = { title: "Ringmaat bepalen", description: "Meet je ringmaat thuis met onze interactieve ringmaat-tool." };

export default function RingmaatPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Reveal className="max-w-2xl">
        <Eyebrow>Service</Eyebrow>
        <Heading level={1} className="mt-3">Welke ringmaat heb ik?</Heading>
        <p className="mt-5 text-ink-soft">Meet de binnendiameter van een ring die goed past, of meet de omtrek van je vinger met een strookje papier. Tip: meet aan het eind van de dag, als je vingers het dikst zijn.</p>
      </Reveal>
      <RingSizer />
      <Reveal className="mt-16 grid gap-6 sm:grid-cols-3">
        {[
          ["1. Papierstrook", "Knip een strookje papier van 1 cm breed. Wikkel het strak om je vinger en zet een streepje waar het overlapt."],
          ["2. Meet", "Meet de lengte tot het streepje in millimeters. Dat is je omtrek – vul hem hierboven in."],
          ["3. Twijfel?", "Kies dan de grotere maat. Of kom langs in het atelier – meten is gratis, koffie ook."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-3xl bg-cream-deep p-6">
            <h3 className="font-display text-xl">{t}</h3>
            <p className="mt-2 text-sm text-ink-soft">{d}</p>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
