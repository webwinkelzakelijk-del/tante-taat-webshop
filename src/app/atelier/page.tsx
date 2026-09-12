import type { Metadata } from "next";
import Image from "next/image";
import { Button, Eyebrow, Heading, Reveal } from "@/components/ui";
import { Process, Testimonials } from "@/components/home/Sections";

export const metadata: Metadata = {
  title: "Het atelier",
  description: "Het verhaal achter Tante Taat: een kleine goudsmederij in Emmen waar sieraden ontstaan uit dingen die er écht toe doen.",
};

const chapters = [
  {
    eyebrow: "Hoofdstuk 1",
    title: "Waarom Tante Taat?",
    text: "Een naam die klinkt als thuiskomen. Tante Taat is de tante bij wie je altijd welkom was: de koektrommel, de warme keuken, de handen die altijd iets aan het maken waren. Zo willen we dat elk sieraad voelt – vertrouwd, warm en helemaal van jou.",
    img: "https://tantetaat.nl/image/cache/catalog/1.%20A%20Ajuni%20maansteen/EAC483F5-30F6-42C3-9778-FDA4C475A4E1-2774x2774.jpeg",
  },
  {
    eyebrow: "Hoofdstuk 2",
    title: "De werkbank in Emmen",
    text: "Geen fabriek, geen voorraad. Eén werkbank, een vlam, een hamer en heel veel geduld. Elk sieraad wordt hier van begin tot eind met de hand gesmeed – van het draad walsen tot de laatste polijstslag.",
    img: "https://tantetaat.nl/image/cache/catalog/1.%20A%20Ageboorteringen/9F3F7956-65D5-4036-A353-9BD55B6D48AD-3490x3490.jpeg",
  },
  {
    eyebrow: "Hoofdstuk 3",
    title: "Eerlijk goud, eerlijk zilver",
    text: "We werken uitsluitend met gerecycled en fairmined goud en zilver. Oude sieraden van opa of oma? Die smelten we graag om tot iets nieuws – zo blijft het verhaal doorgaan.",
    img: "https://tantetaat.nl/image/cache/catalog/1.%20A%20Afebruari%20Amethist/80F683E5-4DC2-41DD-B162-5DEF7F085E7E-500x500.jpeg",
  },
];

export default function AtelierPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-10 text-center">
        <Reveal>
          <Eyebrow>Het atelier</Eyebrow>
          <Heading level={1} className="mt-4">Waar elk sieraad begint<br />met een verhaal.</Heading>
          <p className="font-hand mt-6 text-3xl text-ink-soft">– Nikita, goudsmid & moeder</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl space-y-28 px-6 py-16">
        {chapters.map((c, i) => (
          <div key={c.title} className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-cream-deep">
              <Image src={c.img} alt={c.title} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </Reveal>
            <Reveal delay={0.1}>
              <Eyebrow>{c.eyebrow}</Eyebrow>
              <Heading className="mt-3">{c.title}</Heading>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">{c.text}</p>
            </Reveal>
          </div>
        ))}
      </section>

      <div id="proces"><Process /></div>
      <Testimonials />

      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <Reveal>
          <Heading>Kom langs, of app ons.</Heading>
          <p className="mt-4 text-ink-soft">Het atelier is op afspraak open. In schoolvakanties van Noord-Nederland zijn we gesloten – dan genieten we van ons kleine gezin.</p>
          <Button href="/contact" className="mt-8">Maak een afspraak</Button>
        </Reveal>
      </section>
    </>
  );
}
