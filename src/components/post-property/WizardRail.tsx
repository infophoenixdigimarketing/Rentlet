import { Check, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// The 12 wizard steps grouped into the sections shown on the left rail. `end` is the
// last step number that belongs to the section (inclusive).
const SECTIONS = [
  { label: "Property Details", end: 4 },
  { label: "Pricing & Features", end: 7 },
  { label: "Photos & Description", end: 9 },
  { label: "Owner & Review", end: 12 },
] as const;

const TOTAL_STEPS = 12;

function sectionState(step: number, start: number, end: number): "done" | "active" | "pending" {
  if (step > end) return "done";
  if (step >= start) return "active";
  return "pending";
}

export function WizardRail({ step }: { step: number }) {
  const percent = Math.round(((step - 1) / TOTAL_STEPS) * 100);

  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <h1 className="text-lg font-extrabold text-foreground">Post your property</h1>
      <p className="mt-0.5 text-sm text-muted-foreground">Sell or rent your property</p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>Progress</span>
          <span>{percent}%</span>
        </div>
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-brand-orange transition-all" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <ol className="mt-5 flex flex-col gap-4">
        {SECTIONS.map((s, i) => {
          const start = i === 0 ? 1 : SECTIONS[i - 1].end + 1;
          const st = sectionState(step, start, s.end);
          return (
            <li key={s.label} className="flex gap-3">
              <span
                className={cn(
                  "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold",
                  st === "done" && "border-emerald-600 bg-emerald-600 text-white",
                  st === "active" && "border-brand-orange text-brand-orange",
                  st === "pending" && "border-border text-muted-foreground"
                )}
              >
                {st === "done" ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className="flex flex-col">
                <span
                  className={cn(
                    "text-sm font-semibold",
                    st === "pending" ? "text-muted-foreground" : "text-foreground"
                  )}
                >
                  {s.label}
                </span>
                <span
                  className={cn(
                    "mt-1 w-fit rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                    st === "done" && "bg-emerald-50 text-emerald-700",
                    st === "active" && "bg-brand-orange-light text-brand-orange-dark",
                    st === "pending" && "bg-muted text-muted-foreground"
                  )}
                >
                  {st === "done" ? "Done" : st === "active" ? "In progress" : "Pending"}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 rounded-xl bg-muted/50 p-3 text-xs leading-relaxed text-muted-foreground">
        <span className="font-semibold text-foreground">Need help?</span> Post your property directly via{" "}
        <a
          href={`https://wa.me/?text=${encodeURIComponent("Hi Rentlet, I'd like to post my property.")}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-emerald-600 hover:underline"
        >
          <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
        </a>
      </div>
    </div>
  );
}

// Same four sections, laid out horizontally — used on small screens in place of the rail.
export function WizardRailCompact({ step }: { step: number }) {
  const percent = Math.round(((step - 1) / TOTAL_STEPS) * 100);
  const activeIndex = SECTIONS.findIndex((s, i) => {
    const start = i === 0 ? 1 : SECTIONS[i - 1].end + 1;
    return sectionState(step, start, s.end) === "active";
  });

  return (
    <div>
      <div className="flex items-center gap-2">
        {SECTIONS.map((s, i) => {
          const start = i === 0 ? 1 : SECTIONS[i - 1].end + 1;
          const st = sectionState(step, start, s.end);
          return (
            <span
              key={s.label}
              className={cn(
                "h-1.5 flex-1 rounded-full",
                st === "done" && "bg-emerald-600",
                st === "active" && "bg-brand-orange",
                st === "pending" && "bg-muted"
              )}
            />
          );
        })}
      </div>
      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="font-semibold text-foreground">
          {activeIndex >= 0 ? SECTIONS[activeIndex].label : SECTIONS[SECTIONS.length - 1].label}
        </span>
        <span className="text-muted-foreground">
          {activeIndex >= 0 ? `Step ${activeIndex + 1} of ${SECTIONS.length}` : "Complete"} · {percent}%
        </span>
      </div>
    </div>
  );
}
