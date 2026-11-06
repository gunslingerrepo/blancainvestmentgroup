"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";

type Row = { id: string; name: string; watts: number; qty: number; hours: number };

const defaults: Row[] = [
  { id: "bulbs", name: "LED bulbs", watts: 10, qty: 10, hours: 6 },
  { id: "fans", name: "Ceiling / standing fans", watts: 70, qty: 3, hours: 8 },
  { id: "tv", name: "Television", watts: 120, qty: 1, hours: 5 },
  { id: "fridge", name: "Refrigerator", watts: 150, qty: 1, hours: 10 },
  { id: "laptop", name: "Laptops / computers", watts: 65, qty: 2, hours: 6 },
  { id: "ac", name: "Air conditioner (1 HP)", watts: 900, qty: 0, hours: 5 },
  { id: "pump", name: "Water pump", watts: 750, qty: 0, hours: 1 },
];

const PEAK_SUN_HOURS = 5; // conservative average assumption for much of Nigeria
const SYSTEM_DERATE = 0.75; // wiring, temperature, dust and inverter losses
const BATTERY_DOD = 0.8; // usable fraction for lithium batteries

export default function SolarEstimator() {
  const [rows, setRows] = useState<Row[]>(defaults);
  const [backup, setBackup] = useState(50); // % of daily energy needed from battery

  const set = (id: string, patch: Partial<Row>) =>
    setRows((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const calc = useMemo(() => {
    const load = rows.reduce((s, r) => s + r.watts * r.qty, 0);
    const daily = rows.reduce((s, r) => s + r.watts * r.qty * r.hours, 0) / 1000; // kWh
    const inverterKva = load > 0 ? Math.max(1, Math.ceil(((load * 1.25) / 0.8 / 1000) * 2) / 2) : 0;
    const arrayKw = daily > 0 ? Math.ceil((daily / (PEAK_SUN_HOURS * SYSTEM_DERATE)) * 10) / 10 : 0;
    const batteryKwh = daily > 0 ? Math.ceil(((daily * (backup / 100)) / BATTERY_DOD) * 10) / 10 : 0;
    return { load, daily, inverterKva, arrayKw, batteryKwh };
  }, [rows, backup]);

  const selected = rows.filter((r) => r.qty > 0).map((r) => `${r.qty}× ${r.name}`).join(", ");
  const quoteHref = `/contact?service=renewable-energy&solarType=installation&kw=${calc.arrayKw}&appliances=${encodeURIComponent(selected)}#quote`;

  return (
    <div className="grid gap-px border border-line bg-line lg:grid-cols-12">
      <div className="bg-white p-6 sm:p-8 lg:col-span-7">
        <div className="hidden grid-cols-[1fr_6rem_8rem_6rem] gap-4 border-b border-line pb-3 font-display text-xs uppercase tracking-[0.14em] text-muted sm:grid">
          <span>Appliance</span><span>Watts</span><span>Quantity</span><span>Hours/day</span>
        </div>
        <ul className="divide-y divide-line">
          {rows.map((r) => (
            <li key={r.id} className="grid grid-cols-2 items-center gap-3 py-4 sm:grid-cols-[1fr_6rem_8rem_6rem] sm:gap-4">
              <span className="col-span-2 font-medium sm:col-span-1">{r.name}</span>
              <label className="text-xs text-muted sm:text-base">
                <span className="sm:sr-only">Watts</span>
                <input type="number" min={0} inputMode="numeric" value={r.watts} onChange={(e) => set(r.id, { watts: Math.max(0, Number(e.target.value) || 0) })} className="field !py-2" aria-label={`${r.name} wattage`} />
              </label>
              <div className="text-xs text-muted sm:text-base">
                <span className="sm:sr-only">Quantity</span>
                <div className="flex items-stretch border border-line">
                  <button type="button" onClick={() => set(r.id, { qty: Math.max(0, r.qty - 1) })} className="grid w-9 place-items-center hover:bg-mist" aria-label={`Fewer ${r.name}`}><Minus className="size-3.5" /></button>
                  <output className="flex-1 py-2 text-center tabular-nums text-ink" aria-live="polite">{r.qty}</output>
                  <button type="button" onClick={() => set(r.id, { qty: r.qty + 1 })} className="grid w-9 place-items-center hover:bg-mist" aria-label={`More ${r.name}`}><Plus className="size-3.5" /></button>
                </div>
              </div>
              <label className="col-span-2 text-xs text-muted sm:col-span-1 sm:text-base">
                <span className="sm:sr-only">Hours per day</span>
                <input type="number" min={0} max={24} inputMode="numeric" value={r.hours} onChange={(e) => set(r.id, { hours: Math.min(24, Math.max(0, Number(e.target.value) || 0)) })} className="field !py-2" aria-label={`${r.name} hours per day`} />
              </label>
            </li>
          ))}
        </ul>
        <label className="mt-6 block">
          <span className="field-label">Share of daily energy needed from batteries (night-time / outages): {backup}%</span>
          <input type="range" min={10} max={100} step={10} value={backup} onChange={(e) => setBackup(Number(e.target.value))} className="w-full accent-[#D9272E]" />
        </label>
      </div>

      <div className="flex flex-col bg-ink p-6 text-white sm:p-8 lg:col-span-5">
        <p className="eyebrow text-white/70">Indicative estimate</p>
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
          <div><dt className="text-sm text-white/60">Connected load</dt><dd className="mt-1 font-display text-3xl font-semibold tabular-nums">{calc.load.toLocaleString()} W</dd></div>
          <div><dt className="text-sm text-white/60">Daily energy</dt><dd className="mt-1 font-display text-3xl font-semibold tabular-nums">{calc.daily.toFixed(1)} kWh</dd></div>
          <div><dt className="text-sm text-white/60">Solar array</dt><dd className="mt-1 font-display text-3xl font-semibold tabular-nums text-brand">≈ {calc.arrayKw} kW</dd></div>
          <div><dt className="text-sm text-white/60">Inverter</dt><dd className="mt-1 font-display text-3xl font-semibold tabular-nums">≈ {calc.inverterKva} kVA</dd></div>
          <div className="col-span-2"><dt className="text-sm text-white/60">Battery storage</dt><dd className="mt-1 font-display text-3xl font-semibold tabular-nums">≈ {calc.batteryKwh} kWh</dd></div>
        </dl>
        <p className="mt-8 text-xs leading-relaxed text-white/50">
          Rough guide only, assuming {PEAK_SUN_HOURS} peak sun hours, {Math.round(SYSTEM_DERATE * 100)}% system efficiency and {Math.round(BATTERY_DOD * 100)}% battery depth of discharge. Actual sizing, equipment and price depend on a site survey and energy audit.
        </p>
        <Link href={quoteHref} className="btn btn-red mt-auto w-full !mt-8">Get a quote with these figures <ArrowRight className="size-4" /></Link>
      </div>
    </div>
  );
}
