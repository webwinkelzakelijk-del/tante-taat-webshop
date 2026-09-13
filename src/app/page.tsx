import { getCollections, getProducts } from "@/lib/shopify";
import { Homepage } from "@/components/home/Homepage";

export default async function HomePage() {
  const [collections, products] = await Promise.all([getCollections(), getProducts(8)]);
  return <Homepage collections={collections} products={products} />;
}
