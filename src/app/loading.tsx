export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-6 py-16">
      <div className="h-3 w-24 rounded bg-cream-deep" />
      <div className="mt-5 h-12 w-2/3 rounded-xl bg-cream-deep" />
      <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-3xl bg-cream-deep" />
        ))}
      </div>
    </div>
  );
}
