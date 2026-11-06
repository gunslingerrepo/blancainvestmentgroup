import { Info } from "lucide-react";

/** Visible disclosure for placeholder / illustrative content. */
export default function SampleNotice({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <p className={`flex items-start gap-3 border-l-2 border-brand px-4 py-3 text-[0.85rem] leading-relaxed ${tone === "dark" ? "bg-white/5 text-white/70" : "bg-mist text-muted"}`}>
      <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

export function SampleTag({ label = "Sample entry" }: { label?: string }) {
  return <span className="tag bg-white text-ink ring-1 ring-ink/10">{label}</span>;
}
