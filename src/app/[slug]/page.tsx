import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Eyebrow, Heading } from "@/components/ui";

/* Juridische pagina's – vul aan met de definitieve teksten (of laad ze uit Shopify "pages"). */
const pages: Record<string, { title: string; body: string[] }> = {
  voorwaarden: {
    title: "Algemene voorwaarden",
    body: [
      "Deze voorwaarden gelden voor alle bestellingen bij TanteTaat Jewelry, gevestigd in Emmen.",
      "Persoonlijke sieraden (met moedermelk, DNA, vingerafdruk, vacht, gravure of op maat) worden speciaal voor jou gemaakt en zijn uitgesloten van het herroepingsrecht. Overige sieraden kunnen binnen 14 dagen na ontvangst worden geretourneerd.",
      "Levertijden zijn indicatief. Betaling verloopt via de beveiligde Shopify-checkout. Alle prijzen zijn inclusief btw.",
      "Op deze voorwaarden is Nederlands recht van toepassing.",
    ],
  },
  privacy: {
    title: "Privacy",
    body: [
      "We gebruiken je gegevens alleen om je bestelling te maken, te verzenden en je op de hoogte te houden van de status.",
      "Betalingen en bestelgegevens worden verwerkt door Shopify. We delen je gegevens nooit met derden voor marketingdoeleinden.",
      "Moedermelk, afdrukken en ander persoonlijk materiaal worden uitsluitend gebruikt voor jouw sieraad en na afronding vernietigd, tenzij je anders aangeeft.",
      "Vragen? Mail naar info@tantetaat.nl.",
    ],
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = pages[(await params).slug];
  return { title: p?.title ?? "Pagina" };
}

export default async function LegalPage({ params }: Props) {
  const p = pages[(await params).slug];
  if (!p) notFound();
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>Tante Taat</Eyebrow>
      <Heading level={1} className="mt-3">{p.title}</Heading>
      <div className="mt-10 space-y-5 leading-relaxed text-ink-soft">
        {p.body.map((t, i) => <p key={i}>{t}</p>)}
      </div>
    </div>
  );
}
