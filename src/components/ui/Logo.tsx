// The official RENTLET logo — the real uploaded asset at public/brand/logo.png, rendered as a
// plain <img>. No SVG/CSS/text recreation: that approach (used earlier in this project) was
// explicitly rejected in favor of the actual file once it was made available. Do not reintroduce
// a code-drawn approximation here — if the asset ever needs to change, replace the file at
// public/brand/logo.png, not this component.
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- local /public asset, not user-uploaded/remote
    <img
      src="/brand/logo.png"
      alt="Rentlet — Your Space. Your Choice."
      className={cn("h-10 w-auto object-contain", className)}
    />
  );
}
