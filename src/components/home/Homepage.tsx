import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Collection, Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { Newsletter } from "@/components/Newsletter";
import { Hero } from "./Hero";
import { StoryFinder } from "./StoryFinder";
import { JewelryLab } from "./JewelryLab";
import { ProcessStory } from "./ProcessStory";

const collectionMedia = ["/media/jewel-01.webp", "/media/jewel-03.webp", "/media/ring-birthstone.webp", "/media/jewel-04.webp"];
export function Homepage({ collections, products }: { collections: Collection[]; products: Product[] }) {
  return (
    <>
      <Hero />

      <section id="vind-jouw-sieraad" className="scroll-mt-24 px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl sm:mb-14">
            <p className="eyebrow">Begin bij het verhaal</p>
            <h2 className="font-display mt-3 text-5xl leading-[.95] sm:text-6xl">Wat wil jij dichtbij houden?</h2>
            <p className="mt-5 max-w-xl leading-7 text-ink-soft">Je hoeft nog niet te weten welk sieraad het wordt. Kies wat het voor jou betekent; de vorm volgt daarna.</p>
          </div>
          <StoryFinder />
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex items-end justify-between gap-5">
            <div><p className="eyebrow">Collecties</p><h2 className="font-display mt-2 text-4xl sm:text-5xl">Gemaakt om door te geven.</h2></div>
            <Link href="/collecties" className="hidden items-center gap-2 text-sm font-semibold sm:flex">Bekijk alles <ArrowUpRight size={16} /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {collections.slice(0, 4).map((collection, index) => (
              <Link key={collection.handle} href={`/collecties/${collection.handle}`} className="group relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-cream-deep">
                <Image src={collectionMedia[index] ?? collection.image?.url ?? "/media/jewel-01.webp"} alt={collection.title} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-[9px] tracking-[.22em] text-white/60 uppercase">Collectie 0{index + 1}</p>
                  <h3 className="font-display mt-1 text-3xl leading-none">{collection.title}</h3>
                  <span className="mt-4 flex translate-y-2 items-center gap-2 text-xs opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">Ontdek <ArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/collecties" className="mt-6 flex items-center justify-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold sm:hidden">Bekijk alle collecties <ArrowUpRight size={16} /></Link>
        </div>
      </section>

      <ProcessStory />

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="eyebrow">Uit het atelier</p>
            <h2 className="font-display mt-2 text-5xl sm:text-6xl">Sieraden met een verleden.</h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-ink-soft">Een selectie om te ontdekken. Zodra Shopify is gekoppeld, komen prijs, voorraad en varianten rechtstreeks uit de winkel.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-4">{products.slice(0, 4).map((product) => <ProductCard key={product.handle} product={product} />)}</div>
          <div className="mt-12 text-center"><Link href="/collecties" className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-semibold transition hover:bg-ink hover:text-cream">Bekijk alle sieraden <ArrowUpRight size={16} /></Link></div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:pb-28"><div className="mx-auto max-w-7xl"><JewelryLab /></div></section>

      <section className="overflow-hidden bg-brand-pink/20 px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.7rem]"><Image src="/media/jewel-05.webp" alt="Gouden ring met persoonlijke steen" fill sizes="(min-width:1024px) 30vw, 50vw" className="object-cover" /></div>
            <div className="relative mt-12 aspect-[4/5] overflow-hidden rounded-[1.7rem]"><Image src="/media/jewel-02.webp" alt="Handgemaakte ring gedragen aan de hand" fill sizes="(min-width:1024px) 30vw, 50vw" className="object-cover" /></div>
          </div>
          <div className="lg:pl-8">
            <p className="eyebrow">Tante Taat</p>
            <h2 className="font-display mt-3 text-5xl leading-[.95] sm:text-6xl">Niet gemaakt voor iedereen. Wel helemaal voor jou.</h2>
            <p className="mt-6 max-w-lg leading-7 text-ink-soft">In de goudsmederij in Emmen ontstaan sieraden rondom echte herinneringen. Geen anonieme voorraad, maar een persoonlijk proces met ruimte om te vragen, voelen en kiezen.</p>
            <Link href="/atelier" className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-cream">Maak kennis met het atelier <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:pb-28">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-stone/30 bg-cream-deep px-6 py-12 text-center sm:px-12">
          <p className="font-hand text-3xl text-taat">Een kijkje achter de werkbank?</p>
          <h2 className="font-display mt-2 text-4xl sm:text-5xl">Ateliernieuws, nieuwe stenen en verhalen.</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-ink-soft">Alleen wanneer er echt iets te vertellen is. Geen dagelijkse verkooppraatjes.</p>
          <div className="mt-7"><Newsletter /></div>
        </div>
      </section>
    </>
  );
}
