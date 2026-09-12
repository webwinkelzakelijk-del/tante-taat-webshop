import type { Money } from "./types";

export function formatMoney(m: Money | undefined | null) {
  if (!m) return "";
  const n = Number(m.amount);
  if (!Number.isFinite(n) || n === 0) return "Prijs op aanvraag";
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: m.currencyCode || "EUR" }).format(n);
}
