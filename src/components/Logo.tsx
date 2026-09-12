/** Tante Taat wordmark with the blue bird. Swap for the official PNG/SVG in /public when available. */
export function Bird({ className = "h-6 w-6", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 64 44" className={className} fill={color} aria-hidden>
      <path d="M2 18c8-2 16-3 24-2 4-8 12-14 22-14 6 0 11 2 15 6l-6 2c2 2 3 5 3 8 0 9-7 16-17 18l3 6h-6l-2-5c-4 1-8 1-12 0l-2 5h-6l3-6C11 30 5 25 2 18zm45-7a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-end gap-2 ${className}`} aria-label="Tante Taat">
      <span className="font-display text-2xl font-semibold tracking-[0.18em] text-stone uppercase">Tante</span>
      <span className="relative font-display text-2xl font-semibold tracking-[0.18em] text-taat uppercase">
        Taat
        <Bird className="absolute -right-1 -top-4 h-5 w-7 rotate-[-8deg]" color="var(--color-taat)" />
      </span>
    </span>
  );
}
