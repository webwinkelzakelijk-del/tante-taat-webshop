"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="font-hand text-4xl text-taat">oeps…</p>
      <h1 className="font-display mt-3 text-5xl leading-tight">Er ging iets mis.</h1>
      <p className="mt-5 text-ink-soft">Dat hoort niet. Probeer het nog een keer, of ga terug naar de voorpagina.</p>
      <div className="mt-8 flex justify-center gap-4">
        <button onClick={reset} className="rounded-full bg-ink px-7 py-3.5 text-sm text-cream transition hover:bg-ink-soft">Opnieuw proberen</button>
        <Link href="/" className="rounded-full border border-ink/30 px-7 py-3.5 text-sm transition hover:border-ink">Naar home</Link>
      </div>
    </div>
  );
}
