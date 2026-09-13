"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import clsx from "clsx";
import { Logo } from "./Logo";
import { useCart } from "./cart/CartProvider";

const nav = [
  { href: "/collecties", label: "Collecties" },
  { href: "/collecties/moedermelk-dna-sieraden", label: "Moedermelk" },
  { href: "/collecties/trouw-verlovingsringen", label: "Trouwringen" },
  { href: "/atelier", label: "Het atelier" },
  { href: "/ringmaat", label: "Ringmaat" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const { cart, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  return (
    <>
      <div className="bg-ink text-cream">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-4 py-2 text-[11px] tracking-[0.15em] uppercase">
          <span>Handgesmeed in Emmen</span>
          <span className="hidden text-gold sm:inline">✦</span>
          <span className="hidden sm:inline">100% duurzaam goud & zilver</span>
          <span className="hidden text-gold md:inline">✦</span>
          <span className="hidden md:inline">Veilig & verzekerd verstuurd</span>
        </div>
      </div>

      <header className={clsx("sticky top-0 z-50 bg-cream/90 backdrop-blur-md transition-all duration-300", scrolled && "shadow-[0_1px_0_0_rgba(184,175,166,.35)]")}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <button className="rounded-full p-2 lg:hidden" onClick={() => setMenu(true)} aria-label="Menu">
            <Menu size={22} strokeWidth={1.5} />
          </button>

          <Link href="/" className="lg:mr-10">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={clsx(
                  "relative text-sm tracking-wide transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full",
                  pathname.startsWith(n.href) ? "text-ink after:w-full" : "text-ink-soft hover:text-ink",
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link href="/zoeken" className="rounded-full p-2 hover:bg-cream-deep" aria-label="Zoeken">
              <Search size={20} strokeWidth={1.5} />
            </Link>
            <button onClick={() => setOpen(true)} className="relative rounded-full p-2 hover:bg-cream-deep" aria-label="Winkelwagen">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cart && cart.totalQuantity > 0 && (
                <motion.span
                  key={cart.totalQuantity}
                  initial={{ scale: 0.5 }} animate={{ scale: 1 }}
                  className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-taat text-[10px] font-semibold text-white"
                >
                  {cart.totalQuantity}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-cream px-6 py-6"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button onClick={() => setMenu(false)} className="rounded-full p-2" aria-label="Sluiten"><X /></button>
            </div>
            <nav className="mt-12 flex flex-col gap-6">
              {nav.map((n, i) => (
                <motion.div key={n.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <Link href={n.href} className="font-display text-4xl">{n.label}</Link>
                </motion.div>
              ))}
            </nav>
            <p className="font-hand mt-auto text-2xl text-ink-soft">met liefde gemaakt in Emmen ♡</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
