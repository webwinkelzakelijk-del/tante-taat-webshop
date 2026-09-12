import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/shopify";
import { ProductView } from "@/components/product/ProductView";
import { ProductCard } from "@/components/ProductCard";
import { Eyebrow, Heading, Item, Reveal, Stagger } from "@/components/ui";

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProduct((await params).handle);
  if (!p) return { title: "Niet gevonden" };
  return {
    title: p.title,
    description: p.description.slice(0, 160),
    openGraph: { images: p.featuredImage ? [p.featuredImage.url] : [] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const [product, all] = await Promise.all([getProduct(handle), getProducts(12)]);
  if (!product) notFound();
  const related = all
    .filter((p) => p.handle !== handle && (p.productType === product.productType || p.tags.some((t) => product.tags.includes(t))))
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((i) => i.url),
    brand: { "@type": "Brand", name: "Tante Taat" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      lowPrice: product.priceRange.minVariantPrice.amount,
      highPrice: product.priceRange.maxVariantPrice.amount,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductView product={product} />
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20">
          <Reveal className="mb-10">
            <Eyebrow>Past hierbij</Eyebrow>
            <Heading className="mt-3">Misschien ook mooi</Heading>
          </Reveal>
          <Stagger className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {related.map((p) => (
              <Item key={p.handle}><ProductCard product={p} /></Item>
            ))}
          </Stagger>
        </section>
      )}
    </>
  );
}
