import { Users } from "lucide-react";
import { divisions, leadership } from "@/content/site";

const Stem = ({ className = "h-8" }: { className?: string }) => <span className={`mx-auto block w-px bg-ink/25 ${className}`} aria-hidden />;

/** Text-only organization chart: board, executives, then divisions. */
export default function OrgChart() {
  const [md, gm] = leadership.executives;
  return (
    <div className="mt-14 lg:mt-20">
      {/* Leadership spine */}
      <div className="mx-auto flex max-w-2xl flex-col items-stretch text-center">
        <div className="reveal bg-ink px-6 py-7 text-white">
          <p className="eyebrow justify-center text-white/60">{leadership.board.title}</p>
          <p className="mt-4 font-display text-xl font-medium sm:text-2xl">
            {leadership.board.names.map((n, i) => (
              <span key={n} className="block whitespace-nowrap sm:inline">{i > 0 && <span className="mx-3 hidden text-brand sm:inline" aria-hidden>/</span>}{n}</span>
            ))}
          </p>
          <p className="mt-2 text-sm text-white/60">{leadership.board.text}</p>
        </div>
        <Stem />
        <div className="reveal bg-brand px-6 py-6 text-white">
          <p className="font-display text-2xl font-semibold">{md.name}</p>
          <p className="mt-1 text-sm text-white/85">{md.role}</p>
        </div>
        <Stem />
        <div className="reveal border border-ink px-6 py-6">
          <p className="font-display text-2xl font-semibold">{gm.name}</p>
          <p className="mt-1 text-sm text-muted">{gm.role}</p>
        </div>
        <Stem className="h-10" />
      </div>

      {/* Divisions */}
      <div className="relative border-t border-ink/25 pt-10">
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {divisions.map((d, i) => (
            <li key={d.title} className={`reveal reveal-delay-${(i % 3) + 1} flex flex-col border border-line bg-white ${i === 1 ? "lg:row-span-2" : ""}`}>
              <div className="border-t-2 border-brand px-6 pb-5 pt-6">
                <p className="font-display text-xs tabular-nums text-brand">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-xl font-medium leading-snug">{d.title}</h3>
                <p className="mt-1 text-sm text-muted">{d.head}</p>
              </div>
              <ul className="flex-1 divide-y divide-line border-t border-line bg-mist/50">
                {d.members.map((m) => (
                  <li key={m.name + m.role} className="px-6 py-4">
                    <p className={`font-display font-medium ${m.name === "To be assigned" ? "text-muted" : "text-ink"}`}>{m.name}</p>
                    <p className="text-sm font-medium text-brand">{m.role}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <div className="reveal mt-5 flex flex-col items-center gap-2 bg-mist px-6 py-6 text-center sm:flex-row sm:justify-center sm:gap-4">
          <Users className="size-6 text-brand" aria-hidden />
          <p className="font-display font-medium">Department supervisors and staff</p>
          <p className="text-sm text-muted">Support all divisions and keep day-to-day operations running smoothly.</p>
        </div>
      </div>
    </div>
  );
}
