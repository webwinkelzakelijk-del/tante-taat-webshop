import Link from "next/link";
import { HeroVideo } from "./HeroVideo";
import { ArrowDownRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="hero-shell relative isolate overflow-hidden bg-ink text-cream">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(234,130,157,.2),transparent_34%),radial-gradient(circle_at_78%_20%,rgba(35,151,203,.18),transparent_30%)]" />
      <div className="mx-auto grid min-h-[calc(100svh-2rem)] max-w-[1500px] items-center gap-10 px-5 pb-10 pt-12 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:px-10 lg:py-12">
        <div className="relative z-10 py-8 lg:py-16">
          <p className="mb-7 flex items-center gap-3 text-[10px] font-semibold tracking-[.28em] text-cream/65 uppercase">
            <span className="h-px w-8 bg-gold" /> Goudsmederij · Emmen
          </p>
          <h1 className="font-display max-w-[10ch] text-[clamp(4.2rem,8.2vw,8.7rem)] leading-[.78] tracking-[-.055em]">
            Draag wat je
            <span className="block pt-[.18em] font-hand text-[.72em] font-normal leading-none tracking-normal text-blush-deep">
              nooit kwijt wilt.
            </span>
          </h1>
          <p className="mt-9 max-w-xl text-base leading-7 text-cream/72 sm:text-lg">
            Handgesmede sieraden waarin een moedermelksteen, vingerafdruk,
            geboortesteen of dierbare herinnering een plek krijgt.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="#vind-jouw-sieraad" className="group inline-flex items-center gap-3 rounded-full bg-cream px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-blush">
              Vind jouw sieraad <ArrowDownRight size={17} className="transition group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </Link>
            <Link href="/atelier" className="inline-flex items-center gap-3 rounded-full border border-cream/25 px-6 py-3.5 text-sm transition hover:border-cream/60 hover:bg-cream/5">
              <Play size={15} fill="currentColor" /> Kijk mee in het atelier
            </Link>
          </div>
          <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-cream/15 pt-6 text-[10px] leading-4 tracking-[.12em] text-cream/55 uppercase sm:text-xs">
            <span>Handgesmeed<br />in Emmen</span>
            <span>Duurzaam<br />goud & zilver</span>
            <span>Veilig &<br />verzekerd verzonden</span>
          </div>
        </div>

        <div className="hero-media relative min-h-[48svh] overflow-hidden rounded-[2rem] bg-[#d7c6ae] lg:min-h-[calc(100svh-6rem)]">
          <HeroVideo src="/media/atelier-film.mp4" poster="/media/hero-poster.webp" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-white/5" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between rounded-2xl border border-white/25 bg-black/15 p-4 text-white backdrop-blur-sm sm:bottom-7 sm:left-7 sm:right-7 sm:p-5">
            <div>
              <p className="text-[10px] tracking-[.22em] uppercase opacity-70">Van herinnering naar erfstuk</p>
              <p className="font-display mt-1 text-2xl">Eén voor één gemaakt</p>
            </div>
            <span className="font-hand text-xl">in eigen atelier ♡</span>
          </div>
        </div>
      </div>
    </section>
  );
}
