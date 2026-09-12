import { getCollections, getProducts } from "@/lib/shopify";
import { Hero } from "@/components/home/Hero";
import { Collections, Featured, Maker, Marquee, NewsletterSection, PersonalCta, Playground, Process, Testimonials } from "@/components/home/Sections";

export default async function HomePage() {
  const [collections, products] = await Promise.all([getCollections(), getProducts(8)]);
  return (
    <>
      <Hero />
      <Marquee />
      <Collections collections={collections} />
      <Process />
      <Featured products={products} />
      <Playground />
      <Maker />
      <Testimonials />
      <PersonalCta />
      <NewsletterSection />
    </>
  );
}
