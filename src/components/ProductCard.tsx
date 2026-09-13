import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatMoney } from "@/lib/format";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [a, b] = product.images;
  const from = formatMoney(product.priceRange.minVariantPrice);
  return (
    <Link href={`/producten/${product.handle}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-cream-deep transition duration-500 group-hover:-translate-y-1.5">
        {a && (
          <Image
            src={a.url} alt={a.altText ?? product.title} fill priority={priority}
            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-all duration-700 group-hover:scale-105"
            style={{ opacity: 1 }}
          />
        )}
        {b && (
          <Image
            src={b.url} alt="" fill sizes="(min-width:1024px) 25vw, 50vw"
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
        {product.tags.includes("bestseller") && (
          <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[10px] tracking-[0.2em] uppercase backdrop-blur">
            Favoriet
          </span>
        )}
        <span className="absolute bottom-4 right-4 translate-y-3 rounded-full bg-ink px-4 py-2 text-xs text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          Bekijk
        </span>
      </div>
      <div className="mt-4 flex flex-col items-start gap-2 px-1 sm:flex-row sm:justify-between sm:gap-3">
        <div>
          <p className="text-[10px] tracking-[0.2em] text-ink-soft uppercase">{product.productType}</p>
          <h3 className="font-display mt-1 text-xl leading-tight">{product.title}</h3>
        </div>
        <p className="text-sm text-ink-soft sm:shrink-0 sm:pt-4">{from.startsWith("Prijs") ? from : `vanaf ${from}`}</p>
      </div>
    </Link>
  );
}
