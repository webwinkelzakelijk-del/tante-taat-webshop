import type { Metadata } from "next";
import { Eyebrow, Heading, Item, Reveal, Stagger } from "@/components/ui";
import { Testimonials } from "@/components/home/Sections";

export const metadata: Metadata = { title: "Wall of fame" };

/* Geboortekaartjes & momenten – vervang door echte inzendingen (bijv. via Shopify metaobjects of Instagram-feed). */
const moments = [
  { name: "Noor", date: "12 maart 2024", note: "3.240 gram puur geluk", color: "bg-blush" },
  { name: "Jip & Fien", date: "2 juli 2023", note: "tweeling, dubbel feest", color: "bg-taat-soft" },
  { name: "Mees", date: "28 november 2023", note: "geboortering: topaas", color: "bg-gold/20" },
  { name: "Liv", date: "5 januari 2025", note: "moedermelk hanger, hart", color: "bg-cream-deep" },
  { name: "Sem", date: "19 mei 2024", note: "vingerafdruk van papa", color: "bg-blush" },
  { name: "Bobbie 🐾", date: "2012 – 2024", note: "voor altijd bij ons", color: "bg-taat-soft" },
];

export default function WallOfFamePage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <Reveal className="max-w-2xl">
          <Eyebrow>Wall of fame</Eyebrow>
          <Heading level={1} className="mt-3">De verhalen die we mochten bewaren.</Heading>
          <p className="mt-5 text-ink-soft">Geboortekaartjes, foto’s en berichtjes die we ontvangen. Wil jij er ook bij? Stuur je kaartje naar het atelier.</p>
        </Reveal>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {moments.map((m, i) => (
            <Item key={m.name}>
              <div className={`${m.color} rounded-3xl p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md`} style={{ transform: `rotate(${(i % 3) - 1}deg)` }}>
                <p className="font-hand text-4xl">{m.name}</p>
                <p className="mt-2 text-xs tracking-[0.2em] text-ink-soft uppercase">{m.date}</p>
                <p className="font-display mt-4 text-xl italic">{m.note}</p>
              </div>
            </Item>
          ))}
        </Stagger>
      </div>
      <Testimonials />
    </>
  );
}
