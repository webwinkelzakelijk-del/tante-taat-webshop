"use server";

import { cookies } from "next/headers";
import type { Cart, CartLine } from "./types";
import { demoProducts } from "./demo-data";
import {
  isShopifyConfigured,
  shopifyAddLines,
  shopifyCreateCart,
  shopifyGetCart,
  shopifyRemoveLines,
  shopifyUpdateLines,
} from "./shopify";

const CART_COOKIE = "tt_cart";
const cookieOpts = { path: "/", httpOnly: true, sameSite: "lax" as const, maxAge: 60 * 60 * 24 * 30 };

/* ---------------- Demo cart (no Shopify yet) ---------------- */

type DemoLine = { v: string; q: number; a?: { key: string; value: string }[] };

function demoCartFrom(lines: DemoLine[]): Cart {
  const full: CartLine[] = lines.flatMap((l) => {
    for (const p of demoProducts) {
      const v = p.variants.find((x) => x.id === l.v);
      if (v) {
        return [{
          id: `line:${l.v}`,
          quantity: l.q,
          attributes: l.a ?? [],
          merchandise: {
            id: v.id, title: v.title, price: v.price, selectedOptions: v.selectedOptions,
            product: { handle: p.handle, title: p.title, featuredImage: p.featuredImage },
          },
        }];
      }
    }
    return [];
  });
  const subtotal = full.reduce((s, l) => s + Number(l.merchandise.price.amount) * l.quantity, 0);
  const money = { amount: subtotal.toFixed(2), currencyCode: "EUR" };
  return {
    id: "demo-cart",
    checkoutUrl: "/winkelwagen?demo=1",
    totalQuantity: full.reduce((s, l) => s + l.quantity, 0),
    lines: full,
    cost: { subtotalAmount: money, totalAmount: money },
  };
}

async function readDemo(): Promise<DemoLine[]> {
  const raw = (await cookies()).get(CART_COOKIE)?.value;
  if (!raw || !raw.startsWith("demo:")) return [];
  try { return JSON.parse(raw.slice(5)); } catch { return []; }
}
async function writeDemo(lines: DemoLine[]) {
  (await cookies()).set(CART_COOKIE, "demo:" + JSON.stringify(lines), cookieOpts);
  return demoCartFrom(lines);
}

/* ---------------- Public actions ---------------- */

export async function getCart(): Promise<Cart | null> {
  if (!isShopifyConfigured) {
    const lines = await readDemo();
    return lines.length ? demoCartFrom(lines) : null;
  }
  const id = (await cookies()).get(CART_COOKIE)?.value;
  if (!id || id.startsWith("demo:")) return null;
  try { return await shopifyGetCart(id); } catch { return null; }
}

export async function addToCart(merchandiseId: string, quantity = 1, attributes?: { key: string; value: string }[]): Promise<Cart> {
  if (!isShopifyConfigured) {
    const lines = await readDemo();
    const ex = lines.find((l) => l.v === merchandiseId);
    if (ex) ex.q += quantity; else lines.push({ v: merchandiseId, q: quantity, a: attributes });
    return writeDemo(lines);
  }
  const jar = await cookies();
  let id = jar.get(CART_COOKIE)?.value;
  if (!id || id.startsWith("demo:")) {
    const c = await shopifyCreateCart();
    id = c.id;
    jar.set(CART_COOKIE, id, cookieOpts);
  }
  return shopifyAddLines(id, [{ merchandiseId, quantity, attributes }]);
}

export async function updateCartLine(lineId: string, quantity: number): Promise<Cart> {
  if (!isShopifyConfigured) {
    const lines = await readDemo();
    const v = lineId.replace(/^line:/, "");
    const next = quantity <= 0 ? lines.filter((l) => l.v !== v) : lines.map((l) => (l.v === v ? { ...l, q: quantity } : l));
    return writeDemo(next);
  }
  const id = (await cookies()).get(CART_COOKIE)!.value;
  return quantity <= 0 ? shopifyRemoveLines(id, [lineId]) : shopifyUpdateLines(id, [{ id: lineId, quantity }]);
}

export async function removeCartLine(lineId: string): Promise<Cart> {
  return updateCartLine(lineId, 0);
}
