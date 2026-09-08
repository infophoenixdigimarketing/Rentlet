"use client";

import { useEffect } from "react";
import { recentlyViewedService } from "@/lib/services/recently-viewed.service";

/** Invisible — just logs this property into the viewer's Recently Viewed list on mount. */
export function RecordView({ propertyId }: { propertyId: string }) {
  useEffect(() => {
    recentlyViewedService.record(propertyId);
  }, [propertyId]);

  return null;
}
