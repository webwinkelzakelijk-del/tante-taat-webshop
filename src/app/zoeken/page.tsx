import type { Metadata } from "next";
import { searchProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Eyebrow, Heading, Item, Stagger } from "@/components/ui";

export const metadata: Metadata = { title: "Zoeken" };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const results = q ? await searchProducts(q) : [];
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <Eyebrow>Zoeken</Eyebrow>
      <Heading level={1} className="mt-3">Waar zoek je naar?</Heading>
      <form className="mt-8 flex max-w-xl">
        <input
          name="q" defaultValue={q} autoFocus placeholder="moedermelk, amethist, trouwring…"
          className="w-full rounded-l-full border border-r-0 border-stone/50 bg-white/70 px-6 py-4 text-base outline-none focus:border-gold"
        />
        <button className="rounded-r-full bg-ink px-7 text-sm text-cream">Zoek</button>
      </form>
      {q && <p className="mt-8 text-sm text-ink-soft">{results.length} resultaten voor “{q}”</p>}
      <Stagger className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
        {results.map((p) => (
          <Item key={p.handle}><ProductCard product={p} /></Item>
        ))}
      </Stagger>
    </div>
  );
}
