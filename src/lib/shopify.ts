import "server-only";
import type { Cart, Collection, Product } from "./types";
import { demoCollectionProducts, demoCollections, demoProducts } from "./demo-data";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2026-07";

export const isShopifyConfigured = Boolean(domain && token);

async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}, revalidate = 60): Promise<T> {
  const res = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token!,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data as T;
}

/* ---------- Fragments ---------- */

const IMAGE = `url altText width height`;

const PRODUCT = `
  id handle title description descriptionHtml tags productType
  featuredImage { ${IMAGE} }
  images(first: 10) { edges { node { ${IMAGE} } } }
  options { name values }
  priceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } }
  variants(first: 50) { edges { node {
    id title availableForSale price { amount currencyCode }
    selectedOptions { name value }
    image { ${IMAGE} }
  } } }
  model3d: metafield(namespace: "tantetaat", key: "model3d") { value }
  story: metafield(namespace: "tantetaat", key: "story") { value }
  material: metafield(namespace: "tantetaat", key: "material") { value }
  stoneColor: metafield(namespace: "tantetaat", key: "stone_color") { value }
`;

const CART = `
  id checkoutUrl totalQuantity
  cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } }
  lines(first: 100) { edges { node {
    id quantity attributes { key value }
    merchandise { ... on ProductVariant {
      id title price { amount currencyCode } selectedOptions { name value }
      product { handle title featuredImage { ${IMAGE} } }
    } }
  } } }
`;

/* ---------- Reshaping ---------- */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reshapeProduct(p: any): Product {
  return {
    ...p,
    images: p.images.edges.map((e: { node: unknown }) => e.node),
    variants: p.variants.edges.map((e: { node: unknown }) => e.node),
    model3d: p.model3d?.value ?? guessModel(p.productType, p.title),
    story: p.story?.value ?? undefined,
    material: p.material?.value ?? guessMaterial(p.title),
    stoneColor: p.stoneColor?.value ?? undefined,
  };
}

function guessModel(type = "", title = ""): Product["model3d"] {
  const s = `${type} ${title}`.toLowerCase();
  if (s.includes("ring")) return "ring";
  if (s.includes("hanger") || s.includes("ketting")) return "pendant";
  if (s.includes("oor")) return "earring";
  if (s.includes("armband")) return "bracelet";
  return "none";
}
function guessMaterial(title = ""): Product["material"] {
  const s = title.toLowerCase();
  if (s.includes("ros")) return "rosegoud";
  if (s.includes("goud")) return "goud";
  return "zilver";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reshapeCart(c: any): Cart {
  return { ...c, lines: c.lines.edges.map((e: { node: unknown }) => e.node) };
}

/* ---------- Catalog ---------- */

export async function getProducts(first = 24): Promise<Product[]> {
  if (!isShopifyConfigured) return demoProducts;
  const data = await shopifyFetch<{ products: { edges: { node: unknown }[] } }>(
    `query($first:Int!){ products(first:$first, sortKey: BEST_SELLING){ edges{ node{ ${PRODUCT} } } } }`,
    { first },
  );
  return data.products.edges.map((e) => reshapeProduct(e.node));
}

export async function getProduct(handle: string): Promise<Product | null> {
  if (!isShopifyConfigured) return demoProducts.find((p) => p.handle === handle) ?? null;
  const data = await shopifyFetch<{ product: unknown }>(
    `query($handle:String!){ product(handle:$handle){ ${PRODUCT} } }`,
    { handle },
  );
  return data.product ? reshapeProduct(data.product) : null;
}

export async function getCollections(): Promise<Collection[]> {
  if (!isShopifyConfigured) return demoCollections;
  const data = await shopifyFetch<{ collections: { edges: { node: Collection }[] } }>(
    `{ collections(first: 20){ edges{ node{ id handle title description image { ${IMAGE} } } } } }`,
  );
  return data.collections.edges.map((e) => e.node).filter((c) => c.handle !== "frontpage");
}

export async function getCollection(handle: string): Promise<Collection | null> {
  if (!isShopifyConfigured) {
    const c = demoCollections.find((c) => c.handle === handle);
    return c ? { ...c, products: demoCollectionProducts(handle) } : null;
  }
  const data = await shopifyFetch<{ collection: (Collection & { products: { edges: { node: unknown }[] } }) | null }>(
    `query($handle:String!){ collection(handle:$handle){
      id handle title description image { ${IMAGE} }
      products(first: 48){ edges{ node{ ${PRODUCT} } } }
    } }`,
    { handle },
  );
  if (!data.collection) return null;
  return { ...data.collection, products: data.collection.products.edges.map((e) => reshapeProduct(e.node)) };
}

export async function searchProducts(q: string): Promise<Product[]> {
  if (!isShopifyConfigured) {
    const s = q.toLowerCase();
    return demoProducts.filter((p) => `${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase().includes(s));
  }
  const data = await shopifyFetch<{ products: { edges: { node: unknown }[] } }>(
    `query($q:String!){ products(first: 24, query:$q){ edges{ node{ ${PRODUCT} } } } }`,
    { q },
    0,
  );
  return data.products.edges.map((e) => reshapeProduct(e.node));
}

/* ---------- Cart ---------- */

export async function shopifyCreateCart(): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: unknown } }>(
    `mutation{ cartCreate{ cart{ ${CART} } } }`, {}, 0,
  );
  return reshapeCart(data.cartCreate.cart);
}

export async function shopifyGetCart(id: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: unknown | null }>(
    `query($id:ID!){ cart(id:$id){ ${CART} } }`, { id }, 0,
  );
  return data.cart ? reshapeCart(data.cart) : null;
}

export async function shopifyAddLines(cartId: string, lines: { merchandiseId: string; quantity: number; attributes?: { key: string; value: string }[] }[]) {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: unknown } }>(
    `mutation($cartId:ID!,$lines:[CartLineInput!]!){ cartLinesAdd(cartId:$cartId, lines:$lines){ cart{ ${CART} } } }`,
    { cartId, lines }, 0,
  );
  return reshapeCart(data.cartLinesAdd.cart);
}

export async function shopifyUpdateLines(cartId: string, lines: { id: string; quantity: number }[]) {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: unknown } }>(
    `mutation($cartId:ID!,$lines:[CartLineUpdateInput!]!){ cartLinesUpdate(cartId:$cartId, lines:$lines){ cart{ ${CART} } } }`,
    { cartId, lines }, 0,
  );
  return reshapeCart(data.cartLinesUpdate.cart);
}

export async function shopifyRemoveLines(cartId: string, lineIds: string[]) {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: unknown } }>(
    `mutation($cartId:ID!,$lineIds:[ID!]!){ cartLinesRemove(cartId:$cartId, lineIds:$lineIds){ cart{ ${CART} } } }`,
    { cartId, lineIds }, 0,
  );
  return reshapeCart(data.cartLinesRemove.cart);
}
