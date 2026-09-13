import Link from "next/link";
import { ArrowUpRight, Fingerprint } from "lucide-react";

export function PersonalCta() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="relative overflow-hidden rounded-[2.25rem] bg-taat px-7 py-14 text-white sm:px-12 lg:flex lg:items-end lg:justify-between lg:px-16 lg:py-16">
        <Fingerprint className="absolute -right-14 -top-16 h-72 w-72 rotate-12 text-white/10" strokeWidth={0.65} />
        <div className="relative max-w-2xl"><p className="text-[10px] font-semibold tracking-[.24em] text-white/65 uppercase">Jouw idee, onze handen</p><h2 className="font-display mt-3 text-5xl leading-[.94] sm:text-6xl">Iets anders in gedachten?</h2><p className="mt-5 max-w-xl leading-7 text-white/75">Vertel wat je wilt bewaren of vieren. In het atelier denken we mee over een vorm die bij jouw verhaal past.</p></div>
        <Link href="/contact" className="relative mt-8 inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-cream lg:mt-0">Vertel jouw verhaal <ArrowUpRight size={17} /></Link>
      </div>
    </section>
  );
}
