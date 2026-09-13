import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = { title: "Wall of fame", description: "Een kijkje van dichtbij bij de persoonlijke sieraden van Tante Taat." };

const gallery = [
  { src: "/media/jewel-01.webp", alt: "Gouden ringen met persoonlijke stenen", tall: true },
  { src: "/media/ring-birthstone.webp", alt: "Geboorteringen met gekleurde edelstenen" },
  { src: "/media/detail-01.webp", alt: "Detail van een handgemaakt sieraad" },
  { src: "/media/jewel-02.webp", alt: "Ring met lichte steen aan een hand" },
  { src: "/media/jewel-03.webp", alt: "Gouden stapelringen", wide: true },
  { src: "/media/detail-03.webp", alt: "Persoonlijke hanger in goud" },
  { src: "/media/ring-moonstone.webp", alt: "Ring met maansteen", tall: true },
  { src: "/media/jewel-04.webp", alt: "Handgemaakte ring tussen bloemen" },
  { src: "/media/jewel-05.webp", alt: "Persoonlijk sieraad in een roze doosje" },
];

export default function WallOfFamePage() {
  return (
    <div className="px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <div><p className="eyebrow">Wall of fame</p><h1 className="font-display mt-3 text-6xl leading-[.88] sm:text-7xl">Echte sieraden.<br />Echte details.</h1></div>
          <p className="max-w-lg leading-7 text-ink-soft lg:justify-self-end">Een groeiend archief van werk uit het atelier. Na de Shopify-koppeling kunnen echte klantverhalen hier alleen met toestemming worden toegevoegd.</p>
        </div>
        <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-3 sm:auto-rows-[310px] lg:grid-cols-4">
          {gallery.map((image) => <div key={image.src} className={`relative overflow-hidden rounded-2xl bg-cream-deep ${image.tall ? "row-span-2" : ""} ${image.wide ? "col-span-2" : ""}`}><Image src={image.src} alt={image.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition duration-700 hover:scale-[1.035]" /></div>)}
        </div>
        <div className="mt-14 text-center"><Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-cream">Bespreek jouw sieraad <ArrowUpRight size={16} /></Link></div>
      </div>
    </div>
  );
}
