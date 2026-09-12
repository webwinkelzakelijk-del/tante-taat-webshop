import { Button, Heading } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="font-hand text-4xl text-taat">oeps…</p>
      <Heading level={1} className="mt-3">Deze pagina is nog niet gesmeed.</Heading>
      <p className="mt-5 text-ink-soft">Misschien is hij verhuisd, of nog in de maak. Kijk gerust verder.</p>
      <div className="mt-8 flex justify-center gap-4">
        <Button href="/">Naar home</Button>
        <Button href="/collecties" variant="outline">Collecties</Button>
      </div>
    </div>
  );
}
