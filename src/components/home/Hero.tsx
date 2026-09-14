import Link from "next/link";
import { HeroVideo } from "./HeroVideo";
import { ArrowDownRight, ArrowUpRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="hero-shell relative isolate overflow-hidden bg-cream text-ink">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_8%_4%,rgba(227,159,190,.23),transparent_27%),radial-gradient(circle_at_88%_12%,rgba(26,143,208,.09),transparent_27%)]" />
      <div className="mx-auto grid max-w-[1400px] items-center gap-9 px-5 py-6 sm:px-8 sm:py-8 lg:grid-cols-[.92fr_1.08fr] lg:gap-12 lg:px-10">
        <div className="relative z-10 py-4 lg:py-8">
          <p className="mb-6 flex items-center gap-3 text-[10px] font-semibold tracking-[.28em] text-ink/55 uppercase">
            <span className="h-px w-8 bg-brand-pink-deep" /> Goudsmederij · Emmen
          </p>
          <h1 className="font-display max-w-[10ch] text-[clamp(4rem,6.5vw,7rem)] leading-[.82] tracking-[-.052em]">
            Draag wat je
            <span className="relative mt-[.08em] block w-fit text-brand-pink-deep">
              nooit kwijt
              <span className="absolute inset-x-0 -bottom-[.06em] -z-10 h-[.12em] origin-left -rotate-1 rounded-full bg-brand-pink" aria-hidden="true" />
            </span>
            <span className="block">wilt.</span>
          </h1>
          <p className="mt-7 max-w-lg text-base leading-7 text-ink-soft sm:text-lg">
            Handgesmede sieraden waarin een moedermelksteen, vingerafdruk,
            geboortesteen of dierbare herinnering een plek krijgt.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#vind-jouw-sieraad" className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-cream transition hover:bg-brand-pink hover:text-ink">
              Vind jouw sieraad <ArrowDownRight size={17} className="transition group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </Link>
            <Link href="/atelier" className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-6 py-3.5 text-sm transition hover:border-brand-pink-deep hover:bg-brand-pink/10">
              <Play size={15} fill="currentColor" /> Kijk mee in het atelier
            </Link>
          </div>
        </div>

        <div className="hero-media relative h-[22rem] overflow-hidden rounded-[1.75rem] bg-[#d7c6ae] shadow-[0_28px_70px_rgba(43,38,34,.16)] sm:h-[28rem] lg:h-[30rem]">
          <HeroVideo src="/media/atelier-film.mp4" webm="/media/atelier-film.webm" poster="/media/hero-poster.webp" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-white/5" />
          <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/25 bg-ink/25 px-3 py-2 text-[9px] tracking-[.18em] text-white uppercase backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-pink" /> Film loopt
          </div>
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white sm:bottom-7 sm:left-7 sm:right-7">
            <div>
              <p className="text-[10px] tracking-[.22em] uppercase opacity-70">Van herinnering naar erfstuk</p>
              <p className="font-display mt-1 text-2xl">Eén voor één gemaakt</p>
            </div>
            <span className="hidden items-center rounded-full bg-brand-pink px-4 py-2 text-[10px] font-semibold tracking-[.12em] text-ink uppercase sm:flex">
              Eigen atelier <span className="ml-1.5 text-[18px] leading-none" aria-hidden="true">♡</span>
            </span>
          </div>
        </div>
      </div>

      <div className="border-y border-ink/10 bg-cream/75 backdrop-blur-sm">
        <div className="mx-auto grid max-w-[1400px] sm:grid-cols-3">
          <Link href="#vind-jouw-sieraad" className="group flex items-center justify-between gap-5 border-b border-ink/10 px-5 py-4 transition hover:bg-brand-pink/12 sm:border-b-0 sm:border-r sm:px-8 lg:px-10">
            <span><span className="block text-[8px] tracking-[.2em] text-brand-pink-deep uppercase">Begin bij jouw verhaal</span><span className="font-display mt-0.5 block text-xl">Wat wil jij dichtbij houden?</span></span><ArrowDownRight size={17} className="shrink-0 transition group-hover:translate-y-0.5" />
          </Link>
          <Link href="/collecties" className="group flex items-center justify-between gap-5 border-b border-ink/10 px-5 py-4 transition hover:bg-brand-pink/12 sm:border-b-0 sm:border-r sm:px-8 lg:px-10">
            <span><span className="block text-[8px] tracking-[.2em] text-brand-pink-deep uppercase">Sneller naar de shop</span><span className="font-display mt-0.5 block text-xl">Ontdek de collecties</span></span><ArrowUpRight size={17} className="shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link href="/atelier" className="group flex items-center justify-between gap-5 px-5 py-4 transition hover:bg-brand-pink/12 sm:px-8 lg:px-10">
            <span><span className="block text-[8px] tracking-[.2em] text-brand-pink-deep uppercase">Persoonlijk gemaakt</span><span className="font-display mt-0.5 block text-xl">Ontmoet de goudsmid</span></span><ArrowUpRight size={17} className="shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
