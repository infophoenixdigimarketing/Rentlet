"use client";

import { useAvatar } from "@/lib/services/avatar.service";
import { cn } from "@/lib/utils";

/** Shows the user's uploaded profile photo when there is one, else their initials — used
 *  anywhere the account is represented (header, sidebar, profile page) so an upload on the
 *  profile page is reflected everywhere immediately. */
export function Avatar({
  userId,
  name,
  className,
}: {
  userId: string;
  name: string;
  className?: string;
}) {
  const photo = useAvatar(userId);

  if (photo) {
    // eslint-disable-next-line @next/next/no-img-element -- local data URL, not a remote asset
    return <img src={photo} alt="" className={cn("rounded-full object-cover", className)} />;
  }

  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  return (
    <span className={cn("flex items-center justify-center rounded-full bg-brand-navy-light font-bold text-brand-navy", className)}>
      {initials}
    </span>
  );
}
