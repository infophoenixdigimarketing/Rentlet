import { ShieldCheck, MapPinCheck, UserCheck, BadgeCheck } from "lucide-react";
import type { Property } from "@/types/property";

export function TrustBadges({ property }: { property: Property }) {
  if (property.verificationStatus !== "approved") return null;

  const items = [
    { icon: ShieldCheck, label: "Verified Property" },
    { icon: UserCheck, label: "Owner Verified" },
    { icon: MapPinCheck, label: "Location Verified" },
    { icon: BadgeCheck, label: "Photos Verified" },
  ];

  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 rounded-xl bg-emerald-50 px-4 py-3">
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
          <item.icon className="h-4 w-4" /> {item.label}
        </span>
      ))}
    </div>
  );
}
