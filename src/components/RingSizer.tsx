"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

/** Nederlandse maat = binnenomtrek in mm (maat 17 ≈ 17 mm diameter ≈ 53.4 mm omtrek) */
export function RingSizer() {
  const [mode, setMode] = useState<"diameter" | "omtrek">("omtrek");
  const [value, setValue] = useState(54);

  const { diameter, omtrek, nl, eu, us } = useMemo(() => {
    const omtrek = mode === "omtrek" ? value : value * Math.PI;
    const diameter = omtrek / Math.PI;
    const nl = Math.round(diameter * 2) / 2; // Nederlandse maat ≈ diameter in mm
    const eu = Math.round(omtrek);
    const us = Math.round(((omtrek - 36.5) / 2.55) * 2) / 2;
    return { diameter, omtrek, nl, eu, us };
  }, [mode, value]);

  const min = mode === "omtrek" ? 44 : 14;
  const max = mode === "omtrek" ? 72 : 23;
  const step = mode === "omtrek" ? 0.5 : 0.1;
  // schaal voor visualisatie: 1 mm = 10 px (alleen relatief; schermen verschillen)
  const px = diameter * 10;

  return (
    <div className="mt-12 grid items-center gap-10 rounded-[2rem] bg-blush/40 p-8 lg:grid-cols-2 lg:p-12">
      <div>
        <div className="flex gap-2">
          {(["omtrek", "diameter"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setValue(m === "omtrek" ? Math.round(omtrek * 2) / 2 : Math.round(diameter * 10) / 10); }}
              className={`rounded-full px-5 py-2 text-sm transition ${mode === m ? "bg-ink text-cream" : "bg-white/60 hover:bg-white"}`}
            >
              {m === "omtrek" ? "Omtrek vinger" : "Binnendiameter ring"}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <div className="flex items-baseline justify-between">
            <label className="text-[11px] tracking-[0.2em] text-ink-soft uppercase">{mode === "omtrek" ? "Omtrek" : "Diameter"} (mm)</label>
            <input
              type="number" step={step} min={min} max={max} value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-24 rounded-xl border border-stone/50 bg-white/70 px-3 py-1.5 text-right text-lg outline-none focus:border-gold"
            />
          </div>
          <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => setValue(Number(e.target.value))} className="mt-4 w-full accent-ink" />
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4">
          {[["NL", nl.toFixed(1)], ["EU", String(eu)], ["US", us.toFixed(1)]].map(([l, v]) => (
            <div key={l} className="rounded-2xl bg-cream p-5 text-center">
              <p className="text-[11px] tracking-[0.2em] text-ink-soft uppercase">Maat {l}</p>
              <motion.p key={v} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="font-display mt-1 text-4xl">{v}</motion.p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-soft">Bij een bestelling geef je de NL-maat (binnendiameter in mm) door. Twijfel je? Kies de grotere maat.</p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="relative flex h-72 w-72 items-center justify-center">
          <motion.div
            initial={false}
            animate={{ width: px, height: px }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            className="rounded-full border-[10px] border-gold shadow-[inset_0_0_20px_rgba(0,0,0,.08),0_10px_30px_rgba(169,136,79,.25)]"
            style={{ width: px, height: px, background: "radial-gradient(circle, transparent 60%, rgba(255,255,255,.4))" }}
          />
          <span className="font-hand absolute -bottom-2 text-xl text-ink-soft">Ø {diameter.toFixed(1)} mm</span>
        </div>
        <p className="mt-8 max-w-xs text-center text-xs text-ink-soft">Ter illustratie – schermen verschillen in grootte, gebruik dus altijd een liniaal om te meten.</p>
      </div>
    </div>
  );
}
