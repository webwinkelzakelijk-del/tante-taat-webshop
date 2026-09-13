/**
 * Demo catalogus — wordt gebruikt zolang er geen Shopify Storefront token is ingesteld.
 * Zodra SHOPIFY_STOREFRONT_ACCESS_TOKEN is gezet, komt alles uit Shopify.
 */
import type { Collection, Product } from "./types";

const eur = (n: number) => ({ amount: n.toFixed(2), currencyCode: "EUR" });

function mk(p: {
  handle: string; title: string; type: string; price: number; images: string[];
  description: string; story: string; model3d: Product["model3d"]; material: Product["material"];
  stoneColor?: string; options?: { name: string; values: string[] }[]; tags?: string[];
}): Product {
  const options = p.options ?? [{ name: "Materiaal", values: ["Zilver", "Geelgoud", "Roségoud"] }];
  const variants = options[0].values.map((v, i) => ({
    id: `gid://demo/Variant/${p.handle}-${i}`,
    title: v,
    availableForSale: true,
    price: eur(p.price + (v.toLowerCase().includes("goud") ? 120 : 0)),
    selectedOptions: [{ name: options[0].name, value: v }],
    image: null,
  }));
  const images = p.images.map((url) => ({ url, altText: p.title, width: 1000, height: 1000 }));
  return {
    id: `gid://demo/Product/${p.handle}`,
    handle: p.handle,
    title: p.title,
    description: p.description,
    descriptionHtml: `<p>${p.description}</p>`,
    tags: p.tags ?? [],
    productType: p.type,
    featuredImage: images[0] ?? null,
    images,
    options,
    variants,
    priceRange: { minVariantPrice: eur(p.price), maxVariantPrice: eur(p.price + 120) },
    model3d: p.model3d,
    story: p.story,
    material: p.material,
    stoneColor: p.stoneColor,
  };
}

export const demoProducts: Product[] = [
  mk({
    handle: "moedermelk-ring-rond",
    title: "Moedermelk ring – rond",
    type: "Moedermelk sieraden",
    price: 89,
    images: ["/media/jewel-01.webp", "/media/jewel-02.webp"],
    description: "Een fijne ring met een handgemaakte steen van jouw eigen moedermelk. Elke steen wordt met de hand gegoten, geslepen en gezet in massief zilver of goud.",
    story: "Die eerste maanden – de nachten, de stilte, de kleine handjes. Het gaat zo snel voorbij. Deze ring bewaart een druppel van die tijd, voor altijd bij je.",
    model3d: "ring",
    material: "zilver",
    stoneColor: "#fbf6ee",
    tags: ["moedermelk", "bestseller"],
  }),
  mk({
    handle: "moedermelk-hanger-hart",
    title: "Moedermelk hanger – hart",
    type: "Moedermelk sieraden",
    price: 95,
    images: ["/media/jewel-05.webp", "/media/detail-03.webp"],
    description: "Hartvormige hanger met jouw moedermelk, eventueel met een vleugje goudglans of de geboortesteen van je kindje.",
    story: "Voor de moeder die haar kindje altijd dicht bij haar hart wil dragen.",
    model3d: "pendant",
    material: "goud",
    stoneColor: "#fbf6ee",
    tags: ["moedermelk"],
  }),
  mk({
    handle: "vingerafdruk-hanger",
    title: "Vingerafdruk hanger",
    type: "Vingerafdruk sieraden",
    price: 129,
    images: ["/media/detail-02.webp"],
    description: "De echte vingerafdruk van je kind, partner of ouder – in zilver of goud gesmeed. Je ontvangt van ons een afdrukset thuis.",
    story: "Geen twee vingerafdrukken zijn hetzelfde. Net als de mensen van wie we houden.",
    model3d: "pendant",
    material: "zilver",
    stoneColor: "#d9d9dc",
    tags: ["vingerafdruk"],
  }),
  mk({
    handle: "geboortering-februari-amethist",
    title: "Geboortering – Februari – Amethist",
    type: "Geboorteringen",
    price: 69,
    images: ["/media/ring-birthstone.webp", "/media/jewel-03.webp"],
    description: "Fijne stapelring met een echte amethist, de geboortesteen van februari. Handgesmeed in Emmen.",
    story: "Eén ring per kindje. Stapel ze en draag je hele gezin aan één vinger.",
    model3d: "ring",
    material: "zilver",
    stoneColor: "#8e5fc4",
    tags: ["geboortesteen", "stapelring"],
  }),
  mk({
    handle: "ring-rozenkwarts",
    title: "Ring – Zilver, Goud en Rozenkwarts",
    type: "Edelsteen sieraden",
    price: 149,
    images: ["/media/jewel-04.webp", "/media/detail-01.webp"],
    description: "Een ring waarin zilver en goud elkaar ontmoeten rond een zacht roze rozenkwarts. De steen van liefde en zachtheid.",
    story: "Rozenkwarts werd al in de oudheid gedragen als steen van het hart.",
    model3d: "ring",
    material: "rosegoud",
    stoneColor: "#f2b8c6",
    tags: ["edelsteen"],
  }),
  mk({
    handle: "bolletjes-ring-geelgoud",
    title: "Bolletjes ring – Geelgoud 2mm",
    type: "Ringen",
    price: 219,
    images: ["/media/ring-moonstone.webp", "/media/jewel-02.webp"],
    description: "Klassieke bolletjesband van 14 karaat geelgoud, 2mm breed. Ook als trouwring te bestellen.",
    story: "Elk bolletje is met de hand gevormd. Geen enkele band is exact hetzelfde.",
    model3d: "ring",
    material: "goud",
    options: [{ name: "Maat", values: ["15", "16", "17", "18", "19", "20"] }],
    tags: ["goud", "trouwring"],
  }),
  mk({
    handle: "gedraaide-ring-geelgoud",
    title: "Gedraaide ring – Geelgoud 1.5mm",
    type: "Ringen",
    price: 189,
    images: ["/media/detail-04.webp"],
    description: "Subtiele gedraaide ring van geelgoud. Prachtig alleen of gestapeld met een geboortering.",
    story: "Gedraaid uit één stuk draad – zoals twee levens die om elkaar heen groeien.",
    model3d: "ring",
    material: "goud",
    options: [{ name: "Maat", values: ["15", "16", "17", "18", "19", "20"] }],
    tags: ["goud"],
  }),
  mk({
    handle: "oorhangers-amethist",
    title: "Oorhangers Goud met Amethist",
    type: "Oorbellen",
    price: 179,
    images: ["/media/jewel-03.webp"],
    description: "Handgemaakte oorhangers met een druppelvormige amethist, gevat in 14 karaat goud.",
    story: "Voor wie glans in de kleine dingen zoekt.",
    model3d: "earring",
    material: "goud",
    stoneColor: "#8e5fc4",
    tags: ["edelsteen"],
  }),
  mk({
    handle: "huisdier-haar-hanger",
    title: "Huisdierhaar hanger",
    type: "Huisdier sieraden",
    price: 89,
    images: ["/media/detail-03.webp"],
    description: "Een tastbare herinnering aan je hond, kat of konijn: een hanger met een plukje vacht, gegoten in een heldere steen.",
    story: "Ze zijn er maar even, maar ze veranderen alles.",
    model3d: "pendant",
    material: "zilver",
    stoneColor: "#e8dccb",
    tags: ["huisdier"],
  }),
];

export const demoCollections: Collection[] = [
  {
    id: "gid://demo/Collection/moedermelk",
    handle: "moedermelk-dna-sieraden",
    title: "Moedermelk & DNA sieraden",
    description: "Een druppel van jouw verhaal, voor altijd bewaard in zilver of goud.",
    image: { url: "/media/jewel-01.webp", altText: "Moedermelk ring" },
  },
  {
    id: "gid://demo/Collection/vingerafdruk",
    handle: "vingerafdruk-sieraden",
    title: "Vingerafdruk & neusprint",
    description: "De afdruk van wie je liefhebt, gesmeed in edelmetaal.",
    image: { url: "/media/detail-02.webp", altText: "Vingerafdruk hanger" },
  },
  {
    id: "gid://demo/Collection/geboorte",
    handle: "geboorteringen",
    title: "Geboorteringen",
    description: "Eén fijne ring per kindje, met zijn of haar geboortesteen.",
    image: { url: "/media/ring-birthstone.webp", altText: "Geboorteringen" },
  },
  {
    id: "gid://demo/Collection/edelsteen",
    handle: "edelsteen-sieraden",
    title: "Edelsteen & diamant",
    description: "Van amethist tot saffier – ruim 40 stenen, allemaal met de hand gezet.",
    image: { url: "/media/jewel-04.webp", altText: "Amethist ring" },
  },
  {
    id: "gid://demo/Collection/trouwringen",
    handle: "trouw-verlovingsringen",
    title: "Trouw- & verlovingsringen",
    description: "Samen ontworpen, met de hand gesmeed. Voor een ja die blijft.",
    image: { url: "/media/ring-moonstone.webp", altText: "Bolletjesband" },
  },
  {
    id: "gid://demo/Collection/huisdier",
    handle: "huisdier-sieraden",
    title: "Huisdier sieraden",
    description: "Een plukje vacht van je trouwe maatje, voor altijd dichtbij.",
    image: { url: "/media/detail-03.webp", altText: "Huisdier hanger" },
  },
];

const byCollection: Record<string, string[]> = {
  "moedermelk-dna-sieraden": ["moedermelk-ring-rond", "moedermelk-hanger-hart"],
  "vingerafdruk-sieraden": ["vingerafdruk-hanger"],
  geboorteringen: ["geboortering-februari-amethist", "gedraaide-ring-geelgoud"],
  "edelsteen-sieraden": ["ring-rozenkwarts", "oorhangers-amethist", "geboortering-februari-amethist"],
  "trouw-verlovingsringen": ["bolletjes-ring-geelgoud", "gedraaide-ring-geelgoud"],
  "huisdier-sieraden": ["huisdier-haar-hanger"],
};

export function demoCollectionProducts(handle: string) {
  return (byCollection[handle] ?? [])
    .map((h) => demoProducts.find((p) => p.handle === h))
    .filter((p): p is Product => Boolean(p));
}
