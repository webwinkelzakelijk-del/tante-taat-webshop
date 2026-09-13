import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, Heading, Reveal } from "@/components/ui";
import { Faq } from "@/components/Faq";
import { faqs } from "@/lib/content";

export const metadata: Metadata = { title: "Veelgestelde vragen" };


export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <Eyebrow>Service</Eyebrow>
        <Heading level={1} className="mt-3">Veelgestelde vragen</Heading>
      </Reveal>
      <Faq items={faqs} />
      <Reveal className="mt-14 rounded-3xl bg-cream-deep p-8 text-center">
        <p className="font-display text-2xl">Staat je vraag er niet bij?</p>
        <Link href="/contact" className="mt-3 inline-block text-sm underline underline-offset-4">Stel hem gerust</Link>
      </Reveal>
    </div>
  );
}
