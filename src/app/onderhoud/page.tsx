import type { Metadata } from "next";
import { Droplets, Sun, SprayCan, Sparkles, Moon, Heart } from "lucide-react";
import { Eyebrow, Heading, Item, Reveal, Stagger } from "@/components/ui";

export const metadata: Metadata = { title: "Onderhoud van je sieraad" };

const tips = [
  { icon: Droplets, t: "Af bij water", d: "Douchen, zwemmen, afwassen: doe je sieraad even af. Chloor en zeep zijn niet bevriend met goud, zilver of hars." },
  { icon: SprayCan, t: "Eerst parfum, dan sieraad", d: "Parfum, crème en haarlak kunnen de steen dof maken. Sieraad als laatste om, als eerste af." },
  { icon: Sun, t: "Niet in de volle zon", d: "Moedermelk- en harsstenen houden niet van urenlang direct zonlicht. Even is prima, een hele dag op het strand liever niet." },
  { icon: Sparkles, t: "Zilver poetsen", d: "Zilver kan oxideren (donker worden). Een zacht poetsdoekje brengt de glans terug. Geen zilverpoets op de steen." },
  { icon: Moon, t: "Nachtrust", d: "Slaap zonder sieraad. Ringen en kettingen slijten en haken in je slaap sneller dan je denkt." },
  { icon: Heart, t: "Onderhoudsbeurt", d: "Elke ring mag eens per jaar langskomen voor een poetsbeurt en check van de zetting – gratis voor onze eigen sieraden." },
];

export default function OnderhoudPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Reveal className="max-w-2xl">
        <Eyebrow>Service</Eyebrow>
        <Heading level={1} className="mt-3">Zo blijft het mooi.</Heading>
        <p className="mt-5 text-ink-soft">Een handgemaakt sieraad gaat een leven lang mee – met een beetje liefde. Zes tips.</p>
      </Reveal>
      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tips.map((t) => (
          <Item key={t.t}>
            <div className="h-full rounded-3xl bg-cream-deep p-7">
              <t.icon className="text-gold-deep" strokeWidth={1.3} />
              <h3 className="font-display mt-4 text-2xl">{t.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.d}</p>
            </div>
          </Item>
        ))}
      </Stagger>
    </div>
  );
}
