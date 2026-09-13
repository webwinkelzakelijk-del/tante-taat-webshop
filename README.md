# Tante Taat — webshop

Headless webshop voor [tantetaat.nl](https://tantetaat.nl): handgesmeden sieraden met een verhaal.
Front-end in Next.js, Shopify als backend (producten, winkelwagen, checkout, betalingen, orders).

## Stack

| Laag | Keuze |
| --- | --- |
| Framework | Next.js 15 (App Router, React 19, TypeScript) |
| Styling | Tailwind CSS v4, eigen design tokens in `src/app/globals.css` |
| Animaties | Framer Motion (scroll reveals, hero, drawers) |
| 3D | React Three Fiber + drei — procedurele sieraden (`src/components/three`) |
| Commerce | Shopify Storefront API (GraphQL) — `src/lib/shopify.ts` |
| Cart | Shopify Cart API via server actions, cart-id in cookie — `src/lib/cart-actions.ts` |

Zonder Shopify-token draait de site op **demo-data** (`src/lib/demo-data.ts`) inclusief een werkende demo-winkelwagen.

## Starten

```bash
npm ci
cp .env.example .env.local   # vul Shopify-gegevens in (optioneel)
npm run dev
```

Op **Replit** draait de site bewust als geoptimaliseerde productiebuild via `scripts/start.sh`; gebruik daar niet `next dev`. Na een push naar `main` start je de workflow **Pull latest & restart**. Die haalt de laatste commit op, bouwt alleen als de code is veranderd en start `next start` op poort 3000. Zet de env-variabelen in *Secrets*.

## Shopify koppelen

1. Shopify admin → **Settings → Apps and sales channels → Develop apps → Create an app**.
2. Configure *Storefront API scopes*: `unauthenticated_read_product_listings`, `unauthenticated_read_product_inventory`, `unauthenticated_write_checkouts`, `unauthenticated_read_checkouts`, `unauthenticated_read_content`.
3. Install app → kopieer de **Storefront API access token**.
4. Zet in `.env.local` / Replit Secrets:

```
SHOPIFY_STORE_DOMAIN=tantetaat.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_xxx
SHOPIFY_API_VERSION=2026-07
```

"Afrekenen" leidt dan naar de Shopify-checkout (iDEAL, creditcard, Klarna, Apple/Google Pay). Orders, e-mails, verzending en btw regelt Shopify.

### Metafields (optioneel, voor 3D en storytelling)

Maak in Shopify **Settings → Custom data → Products** deze metafields aan (namespace `tantetaat`):

| Key | Type | Waarden | Effect |
| --- | --- | --- | --- |
| `model3d` | Single line text | `ring`, `pendant`, `earring`, `bracelet`, `none` | Welk 3D-model de productpagina toont. Zonder metafield wordt het geraden uit type/titel. |
| `material` | Single line text | `goud`, `zilver`, `rosegoud` | Standaardmetaal van het 3D-model (variant-optie "Materiaal" overschrijft dit live). |
| `stone_color` | Single line text | hex, bv. `#8e5fc4` | Kleur van de steen. Lichte kleuren (moedermelk) worden automatisch "melkachtig" gerenderd. |
| `story` | Multi-line text | vrij | Het cursieve verhaaltje bovenaan de productpagina. |

Gravure en opmerkingen van de klant gaan als **line item properties** mee naar de Shopify-order.

## Structuur

```
src/app/                 routes (home, collecties, producten, atelier, ringmaat, contact, faq, …)
src/components/home/     homepage-secties (hero, proces, playground, testimonials…)
src/components/product/  productpagina (3D/foto's, opties, gravure, accordions)
src/components/cart/     CartProvider, drawer, winkelwagenpagina
src/components/three/    Jewel (procedurele modellen) + JewelViewer (canvas, licht, controls)
src/lib/                 shopify client, cart server actions, types, demo-data, content
```

## Volgende stappen

- Echte foto's / 3D-scans (GLB) per product laden via een `model_url` metafield in `JewelViewer`.
- Nieuwsbrief (`/api/newsletter`) koppelen aan Shopify Email of Klaviyo.
- Contactformulier (`/api/contact`) koppelen aan Resend/Postmark.
- Blog ("Mom life", onderhoud, tips) via Shopify Blogs of MDX.
