/**
 * Demo catalogus — wordt gebruikt zolang er geen Shopify Storefront token is ingesteld.
 * Zodra SHOPIFY_STOREFRONT_ACCESS_TOKEN is gezet, komt alles uit Shopify.
 */
import type { Collection, Product } from "./types";

const TT = "https://tantetaat.nl/image/cache/catalog";
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
    images: [`${TT}/1.%20A%20Ajuni%20maansteen/EAC483F5-30F6-42C3-9778-FDA4C475A4E1-2774x2774.jpeg`, `${TT}/1.%20A%20Aringenw/C7B636EA-84A3-426A-BF2A-0AE0CD3C5E00-500x500.jpeg`],
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
    images: [`${TT}/0%20A%20Nieuw%20mm%20hangers%20goud/22D53BB1-108F-4FE5-BB13-A98C56AE6914-240x240.jpeg`, `${TT}/0%20A%20Nieuw%20mm%20hangers%20goud/69151D20-4075-467A-A4DC-1F0D5D421D48-240x240.jpeg`],
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
    images: [`${TT}/0%20A%20Nieuw%20mm%20hangers%20goud/86C8DC7B-41A8-4DD8-B2FD-B9DD63A538C5-240x240.jpeg`],
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
    images: [`${TT}/1.%20A%20Afebruari%20Amethist/80F683E5-4DC2-41DD-B162-5DEF7F085E7E-500x500.jpeg`, `${TT}/1.%20A%20Afebruari%20Amethist/98172C6E-92AA-4039-B235-661C88D86E96-500x500.jpeg`],
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
    images: [`${TT}/1.%20Rozenkwarts%20Ringen/846D8A4B-8F4F-4CFA-902D-5D9756C4255F-140x140.jpeg`, `${TT}/fotos/WhatsApp%20Image%202023-01-29%20at%2014.03.57-300x300fill.jpeg`],
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
    images: [`${TT}/1.%20Bolletjesband/A2E1567A-DE6B-43E2-B36A-E8595C90EE16-140x140.jpeg`, `${TT}/0%200%200%20nieuw%20toevoegen%20in%20de%20webshop%20ringen%20goud/4A699214-67F3-4C09-8707-2B8355A8D730-240x240.jpeg`],
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
    images: [`${TT}/0%200%200%20nieuw%20toevoegen%20in%20de%20webshop%20ringen%20goud/C85B3631-3ADF-4B1A-A84C-18EC44CE8DCF-240x240.jpeg`],
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
    images: [`${TT}/0%200%20%20speciale%20opdrachten%20ringen/3F1C7565-9153-4FEB-ACD9-AFB7698BCCBE-500x500.jpeg`],
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
    images: [`${TT}/0%200/6B27714E-4A7A-4FA4-AF79-6A6AF0AFB3B8-240x240.jpeg`],
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
    image: { url: `${TT}/1.%20A%20Ajuni%20maansteen/EAC483F5-30F6-42C3-9778-FDA4C475A4E1-2774x2774.jpeg`, altText: "Moedermelk ring" },
  },
  {
    id: "gid://demo/Collection/vingerafdruk",
    handle: "vingerafdruk-sieraden",
    title: "Vingerafdruk & neusprint",
    description: "De afdruk van wie je liefhebt, gesmeed in edelmetaal.",
    image: { url: `${TT}/0%20A%20Nieuw%20mm%20hangers%20goud/86C8DC7B-41A8-4DD8-B2FD-B9DD63A538C5-240x240.jpeg`, altText: "Vingerafdruk hanger" },
  },
  {
    id: "gid://demo/Collection/geboorte",
    handle: "geboorteringen",
    title: "Geboorteringen",
    description: "Eén fijne ring per kindje, met zijn of haar geboortesteen.",
    image: { url: `${TT}/1.%20A%20Ageboorteringen/9F3F7956-65D5-4036-A353-9BD55B6D48AD-3490x3490.jpeg`, altText: "Geboorteringen" },
  },
  {
    id: "gid://demo/Collection/edelsteen",
    handle: "edelsteen-sieraden",
    title: "Edelsteen & diamant",
    description: "Van amethist tot saffier – ruim 40 stenen, allemaal met de hand gezet.",
    image: { url: `${TT}/1.%20A%20Afebruari%20Amethist/80F683E5-4DC2-41DD-B162-5DEF7F085E7E-500x500.jpeg`, altText: "Amethist ring" },
  },
  {
    id: "gid://demo/Collection/trouwringen",
    handle: "trouw-verlovingsringen",
    title: "Trouw- & verlovingsringen",
    description: "Samen ontworpen, met de hand gesmeed. Voor een ja die blijft.",
    image: { url: `${TT}/1.%20Bolletjesband/A2E1567A-DE6B-43E2-B36A-E8595C90EE16-140x140.jpeg`, altText: "Bolletjesband" },
  },
  {
    id: "gid://demo/Collection/huisdier",
    handle: "huisdier-sieraden",
    title: "Huisdier sieraden",
    description: "Een plukje vacht van je trouwe maatje, voor altijd dichtbij.",
    image: { url: `${TT}/0%200/6B27714E-4A7A-4FA4-AF79-6A6AF0AFB3B8-240x240.jpeg`, altText: "Huisdier hanger" },
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
