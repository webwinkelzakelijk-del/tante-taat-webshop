import Link from "next/link";
import { Logo } from "./Logo";
import { Newsletter } from "./Newsletter";

const cols = [
  {
    title: "Collecties",
    links: [
      ["Moedermelk & DNA", "/collecties/moedermelk-dna-sieraden"],
      ["Vingerafdruk", "/collecties/vingerafdruk-sieraden"],
      ["Geboorteringen", "/collecties/geboorteringen"],
      ["Edelsteen & diamant", "/collecties/edelsteen-sieraden"],
      ["Trouw- & verlovingsringen", "/collecties/trouw-verlovingsringen"],
      ["Huisdier sieraden", "/collecties/huisdier-sieraden"],
    ],
  },
  {
    title: "Service",
    links: [
      ["Ringmaat bepalen", "/ringmaat"],
      ["Onderhoud van je sieraad", "/onderhoud"],
      ["Veelgestelde vragen", "/faq"],
      ["Verzenden & retourneren", "/faq#verzenden"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Tante Taat",
    links: [
      ["Het atelier", "/atelier"],
      ["Zo maken we het", "/atelier#proces"],
      ["Algemene voorwaarden", "/voorwaarden"],
      ["Privacy", "/privacy"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-stone/30 bg-cream-deep">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-soft">
              Goudsmederij in Emmen. Elk sieraad wordt met de hand gesmeed van duurzaam goud en zilver –
              en draagt een stukje van jouw verhaal.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="https://www.instagram.com/goudsmederij_nikita_sanna" target="_blank" rel="noreferrer" className="rounded-full border border-stone/40 p-2.5 transition hover:border-ink" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" /></svg></a>
              <a href="https://www.facebook.com/tantetaat" target="_blank" rel="noreferrer" className="rounded-full border border-stone/40 p-2.5 transition hover:border-ink" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
            </div>
            <div className="mt-8">
              <p className="mb-3 text-xs tracking-[0.2em] text-ink-soft uppercase">Blijf op de hoogte</p>
              <Newsletter compact />
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="mb-4 text-xs tracking-[0.2em] text-ink-soft uppercase">{c.title}</p>
              <ul className="space-y-2.5">
                {c.links.map(([label, href]) => (
                  <li key={href}><Link href={href} className="text-sm text-ink transition hover:text-gold-deep">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-stone/30 pt-6 text-xs text-ink-soft sm:flex-row">
          <span>© {new Date().getFullYear()} TanteTaat Jewelry · Emmen</span>
          <span className="font-hand text-lg">met liefde gesmeed ♡</span>
        </div>
      </div>
    </footer>
  );
}
