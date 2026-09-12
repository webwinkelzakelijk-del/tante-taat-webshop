"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import clsx from "clsx";

export function Faq({ items }: { items: { id: string; q: string; a: string }[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  return (
    <div className="mt-10 divide-y divide-stone/30 border-y border-stone/30">
      {items.map((f) => (
        <div key={f.id} id={f.id}>
          <button onClick={() => setOpen(open === f.id ? null : f.id)} className="flex w-full items-center justify-between gap-6 py-5 text-left">
            <span className="font-display text-xl sm:text-2xl">{f.q}</span>
            <Plus size={20} className={clsx("shrink-0 transition-transform duration-300", open === f.id && "rotate-45")} />
          </button>
          <AnimatePresence initial={false}>
            {open === f.id && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <p className="pb-6 text-ink-soft leading-relaxed">{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
