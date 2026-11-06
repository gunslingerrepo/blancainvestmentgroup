import Link from "next/link";
import { ArrowRight, BatteryCharging, BatteryFull, BatteryMedium, Cctv, Combine, Drone, Fingerprint, Gauge, HousePlug, LampWallUp, Refrigerator, ScanBarcode, Server, SolarPanel, Zap, type LucideIcon } from "lucide-react";
import { productGroups } from "@/content/site";

const icons: Record<string, LucideIcon> = { BatteryCharging, BatteryFull, BatteryMedium, Cctv, Combine, Drone, Fingerprint, Gauge, HousePlug, LampWallUp, Refrigerator, ScanBarcode, Server, SolarPanel, Zap };

const enquiry = (service: string, item: string) =>
  `/contact?service=${service}&message=${encodeURIComponent(`I would like prices and availability for: ${item}.`)}#quote`;

/** Full product catalogue, grouped by category. */
export default function ProductsCatalogue() {
  return (
    <div className="flex flex-col gap-16 lg:gap-20">
      {productGroups.map((g, gi) => (
        <div key={g.id} className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="font-display text-sm tabular-nums text-brand">{String(gi + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-3xl font-semibold leading-tight">{g.title}</h3>
              <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-muted">{g.text}</p>
              <Link href={enquiry(g.service, g.title.toLowerCase() + " products")} className="link-underline mt-5 inline-flex items-center gap-2 font-display text-sm font-medium hover:text-brand">
                Request prices <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
          <ul className="grid border-l border-t border-line sm:grid-cols-2 lg:col-span-8 xl:grid-cols-3">
            {g.items.map((it) => {
              const Icon = icons[it.icon] ?? Zap;
              return (
                <li key={it.name} className="border-b border-r border-line">
                  <Link href={enquiry(g.service, it.name)} className="group flex h-full flex-col p-6 transition-colors duration-[1200ms] hover:bg-ink hover:text-white sm:p-7">
                    <span className="flex items-start justify-between">
                      <span className="grid size-12 place-items-center bg-mist text-brand transition-colors duration-[1200ms] group-hover:bg-brand group-hover:text-white">
                        <Icon className="size-6" strokeWidth={1.6} aria-hidden />
                      </span>
                      <ArrowRight className="size-4 -rotate-45 text-muted-light transition-colors duration-[1200ms] group-hover:text-white" aria-hidden />
                    </span>
                    <span className="mt-8 font-display text-lg font-medium leading-snug">{it.name}</span>
                    <span className="mt-2 text-[0.88rem] leading-relaxed text-muted transition-colors duration-[1200ms] group-hover:text-white/70">{it.text}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
