"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui";

const JewelViewer = dynamic(() => import("@/components/three/JewelViewer").then((m) => m.JewelViewer), { ssr: false });

const words = ["Een", "druppel", "van", "jouw", "verhaal,"];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const yJewel = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="paper relative -mt-[73px] min-h-[100svh] overflow-hidden">
      {/* soft blush wash */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_75%_40%,#f3dcd6_0%,transparent_70%),radial-gradient(40%_40%_at_15%_85%,#dff0fa_0%,transparent_70%)]" />

      <div className="mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-28 pb-16 lg:grid-cols-[1.05fr_1fr] lg:pt-16">
        <motion.div style={{ y, opacity }} className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mb-6 text-[11px] tracking-[0.3em] text-gold-deep uppercase"
          >
            Goudsmederij · Emmen
          </motion.p>

          <h1 className="font-display text-[13vw] leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.6rem]">
            {words.map((w, i) => (
              <motion.span
                key={w}
                className="mr-[0.25em] inline-block"
                initial={{ opacity: 0, y: 40, rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.9, delay: 0.35 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            ))}
            <br />
            <motion.em
              className="gold-text not-italic"
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              voor altijd in goud.
            </motion.em>
          </h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="mt-8 max-w-md text-base leading-relaxed text-ink-soft"
          >
            Moedermelk, een vingerafdruk, een plukje vacht of een geboortesteen – met de hand gesmeed
            in 100% duurzaam goud en zilver. Geen twee sieraden zijn hetzelfde. Net als jij.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="/collecties/moedermelk-dna-sieraden">Ontdek moedermelk sieraden</Button>
            <Button href="/atelier" variant="outline">Zo maken we het</Button>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="font-hand mt-10 text-2xl text-ink-soft">
            “Draai me maar even rond →”
          </motion.p>
        </motion.div>

        <motion.div style={{ y: yJewel }} className="relative h-[52vh] lg:h-[78vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, delay: 0.5 }}
            className="absolute inset-0"
          >
            <JewelViewer shape="ring" metal="goud" stone="#fbf6ee" className="h-full w-full" />
          </motion.div>
          <div className="pointer-events-none absolute inset-x-[15%] bottom-[8%] h-24 rounded-[100%] bg-blush/60 blur-3xl" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-ink-soft uppercase"
      >
        Scroll
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}><ArrowDown size={14} /></motion.span>
      </motion.div>
    </section>
  );
}
