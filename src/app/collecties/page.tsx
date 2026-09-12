import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCollections, getProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Eyebrow, Heading, Item, Reveal, Stagger } from "@/components/ui";

export const metadata: Metadata = { title: "Collecties" };

export default async function CollectionsPage() {
  const [collections, products] = await Promise.all([getCollections(), getProducts(48)]);
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <Reveal className="max-w-2xl">
        <Eyebrow>Collecties</Eyebrow>
        <Heading level={1} className="mt-3">Alles wat we maken</Heading>
        <p className="mt-5 text-ink-soft">Elke collectie begint bij een verhaal. Kies er een – of bekijk gewoon alles.</p>
      </Reveal>

      <Stagger className="no-scrollbar mt-12 flex gap-4 overflow-x-auto pb-4">
        {collections.map((c) => (
          <Item key={c.handle} className="shrink-0">
            <Link href={`/collecties/${c.handle}`} className="group flex items-center gap-3 rounded-full border border-stone/40 bg-white/60 py-2 pl-2 pr-5 transition hover:border-ink">
              <span className="relative h-10 w-10 overflow-hidden rounded-full bg-cream-deep">
                {c.image && <Image src={c.image.url} alt="" fill sizes="40px" className="object-cover" />}
              </span>
              <span className="text-sm">{c.title}</span>
            </Link>
          </Item>
        ))}
      </Stagger>

      <Stagger className="mt-16 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
        {products.map((p, i) => (
          <Item key={p.handle}><ProductCard product={p} priority={i < 4} /></Item>
        ))}
      </Stagger>
    </div>
  );
}
