import type { Metadata } from "next";
import { Clock, Mail, MapPin } from "lucide-react";
import { Eyebrow, Heading, Reveal } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact", description: "Neem contact op met goudsmederij Tante Taat in Emmen." };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
          <Heading level={1} className="mt-3">Vertel ons je verhaal.</Heading>
          <p className="mt-5 text-ink-soft">Een vraag over je bestelling, een idee dat nog nergens bestaat of gewoon even overleggen? We reageren meestal binnen een werkdag.</p>

          <ul className="mt-10 space-y-5 text-sm">
            <li className="flex gap-4"><MapPin className="shrink-0 text-gold-deep" strokeWidth={1.4} /><span>Atelier in Emmen (op afspraak)<br /><span className="text-ink-soft">Adres ontvang je bij het maken van je afspraak.</span></span></li>
            <li className="flex gap-4"><Mail className="shrink-0 text-gold-deep" strokeWidth={1.4} /><a href="mailto:info@tantetaat.nl" className="underline underline-offset-4">info@tantetaat.nl</a></li>
            <li className="flex gap-4"><Clock className="shrink-0 text-gold-deep" strokeWidth={1.4} /><span>Gesloten tijdens schoolvakanties (regio Noord)<br /><span className="text-ink-soft">Dan geniet ik van mijn kleine gezin ♡</span></span></li>
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
