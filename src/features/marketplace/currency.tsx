import { useSyncExternalStore } from "react";

/** Illustrative demo rates: how many ETB one unit of each currency is worth. Not live or official. */
export const currencies = [
  { code: "ETB", name: "Ethiopian Birr", etbPerUnit: 1, decimals: 0 },
  { code: "USD", name: "US Dollar", etbPerUnit: 155, decimals: 2 },
  { code: "EUR", name: "Euro", etbPerUnit: 168, decimals: 2 },
  { code: "GBP", name: "British Pound", etbPerUnit: 197, decimals: 2 },
  { code: "KES", name: "Kenyan Shilling", etbPerUnit: 1.2, decimals: 0 },
  { code: "SAR", name: "Saudi Riyal", etbPerUnit: 41.3, decimals: 2 },
  { code: "AED", name: "UAE Dirham", etbPerUnit: 42.2, decimals: 2 },
  { code: "SOS", name: "Somali Shilling", etbPerUnit: 0.27, decimals: 0 },
] as const;
export type CurrencyCode = (typeof currencies)[number]["code"];
export const RATES_NOTE = "Indicative exchange rates — demo values, not live or official.";
const KEY = "nexora-currency";
let current: CurrencyCode = "ETB";
const listeners = new Set<() => void>();
let loaded = false;
function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  const saved = localStorage.getItem(KEY);
  if (currencies.some((c) => c.code === saved)) current = saved as CurrencyCode;
}
export function getCurrency(): CurrencyCode {
  load();
  return current;
}
export function setCurrency(code: CurrencyCode) {
  current = code;
  try { localStorage.setItem(KEY, code); } catch { /* ignore */ }
  listeners.forEach((l) => l());
}
export function convertFromEtb(etb: number, code: CurrencyCode = getCurrency()) {
  const c = currencies.find((x) => x.code === code) ?? currencies[0];
  return etb / c.etbPerUnit;
}
export function convertToEtb(amount: number, code: CurrencyCode = getCurrency()) {
  const c = currencies.find((x) => x.code === code) ?? currencies[0];
  return amount * c.etbPerUnit;
}
export function formatMoney(etb: number, code: CurrencyCode = getCurrency()) {
  const c = currencies.find((x) => x.code === code) ?? currencies[0];
  const value = etb / c.etbPerUnit;
  const decimals = value >= 1000 ? 0 : c.decimals;
  return `${c.code} ${new Intl.NumberFormat("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value)}`;
}
function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}
/** Single source of truth for the selected currency; ETB on the server and first paint. */
export function useCurrency() {
  const code = useSyncExternalStore(subscribe, getCurrency, () => "ETB" as CurrencyCode);
  return { code, setCurrency, format: (etb: number) => formatMoney(etb, code) };
}
export function Money({ value }: { value: number }) {
  const { format } = useCurrency();
  return <>{format(value)}</>;
}
export function CurrencySelect({ className = "field" }: { className?: string }) {
  const { code } = useCurrency();
  return (
    <select aria-label="Currency" title={RATES_NOTE} className={className} value={code} onChange={(e) => setCurrency(e.target.value as CurrencyCode)}>
      {currencies.map((c) => (
        <option key={c.code} value={c.code}>{c.code} — {c.name}</option>
      ))}
    </select>
  );
}
