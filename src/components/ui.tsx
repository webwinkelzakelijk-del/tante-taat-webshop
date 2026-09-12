"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";

const up: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export function Reveal({ children, className, delay = 0, as = "div" }: { children: React.ReactNode; className?: string; delay?: number; as?: "div" | "section" | "p" | "h2" | "li" }) {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      variants={up}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </M>
  );
}

export function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: 0.09 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Item({ children, className }: { children: React.ReactNode; className?: string }) {
  return <motion.div variants={up} className={className}>{children}</motion.div>;
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={clsx("text-[11px] tracking-[0.25em] text-gold-deep uppercase", className)}>{children}</p>;
}

export function Heading({ children, className, level = 2 }: { children: React.ReactNode; className?: string; level?: 1 | 2 | 3 }) {
  const Tag = `h${level}` as const;
  return (
    <Tag className={clsx("font-display leading-[1.05] tracking-tight", level === 1 ? "text-5xl sm:text-6xl lg:text-7xl" : level === 2 ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl", className)}>
      {children}
    </Tag>
  );
}

export function Button({ href, children, variant = "dark", className, onClick, type }: { href?: string; children: React.ReactNode; variant?: "dark" | "light" | "outline" | "gold"; className?: string; onClick?: () => void; type?: "button" | "submit" }) {
  const cls = clsx(
    "shimmer inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm tracking-wide transition-all duration-300 disabled:opacity-50",
    variant === "dark" && "bg-ink text-cream hover:bg-ink-soft hover:shadow-lg",
    variant === "light" && "bg-cream text-ink hover:bg-white hover:shadow-lg",
    variant === "gold" && "bg-gold text-ink hover:bg-gold-deep hover:text-cream",
    variant === "outline" && "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-cream",
    className,
  );
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button type={type ?? "button"} onClick={onClick} className={cls}>{children}</button>;
}
