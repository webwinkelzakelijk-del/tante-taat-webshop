import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCollection } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Eyebrow, Heading, Item, Reveal, Stagger } from "@/components/ui";
import { PersonalCta } from "@/components/home/Sections";

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = await getCollection((await params).handle);
  return { title: c?.title ?? "Collectie", description: c?.description };
}

export default async function CollectionPage({ params }: Props) {
  const c = await getCollection((await params).handle);
  if (!c) notFound();
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Collectie</Eyebrow>
            <Heading level={1} className="mt-3">{c.title}</Heading>
            <p className="mt-5 max-w-md text-lg text-ink-soft">{c.description}</p>
          </Reveal>
          {c.image && (
            <Reveal delay={0.1} className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-cream-deep">
              <Image src={c.image.url} alt={c.image.altText ?? c.title} fill priority sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </Reveal>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        {c.products && c.products.length > 0 ? (
          <Stagger className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {c.products.map((p) => <Item key={p.handle}><ProductCard product={p} /></Item>)}
          </Stagger>
        ) : (
          <p className="py-20 text-center text-ink-soft">Binnenkort meer in deze collectie.</p>
        )}
      </section>
      <PersonalCta />
    </>
  );
}
