"use client";

import { useState } from "react";
import { Expand, X, ChevronLeft, ChevronRight, Play, LayoutGrid, ImageIcon } from "lucide-react";
import { PropertyImage } from "@/components/ui/PropertyImage";
import { cn } from "@/lib/utils";
import type { Property } from "@/types/property";

// Real listings (Firebase mode, spec §51) carry `images`/`videos`/`floorPlanUrl` — genuine
// Storage URLs from lib/firebase/storage-upload.ts. Mock/seed listings have none (spec §64 —
// no fake external URLs), so this falls back to a fixed set of on-brand generated placeholders.
const PLACEHOLDER_PHOTO_COUNT = 6;

type Tab = "photos" | "floorplan" | "video";

function PhotoSlide({ url, seed, propertyType, className }: { url?: string; seed: string; propertyType: Property["propertyType"]; className?: string }) {
  if (url) {
    // eslint-disable-next-line @next/next/no-img-element -- Firebase Storage URL, not a local asset next/image needs to optimize
    return <img src={url} alt="" className={cn("object-cover", className)} />;
  }
  return <PropertyImage id={seed} propertyType={propertyType} className={className} />;
}

export function Gallery({ property }: { property: Property }) {
  const [tab, setTab] = useState<Tab>("photos");
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const hasRealPhotos = property.images.length > 0;
  const photos: (string | undefined)[] = hasRealPhotos
    ? property.images
    : Array.from({ length: PLACEHOLDER_PHOTO_COUNT }, () => undefined);
  const photoSeed = (i: number) => `${property.id}-photo-${i}`;

  const videoUrl = property.videos?.[0];
  const floorPlanUrl = property.floorPlanUrl;

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl">
        <div className="relative h-64 w-full sm:h-96 lg:h-[26rem]">
          {tab === "photos" && (
            <PhotoSlide url={photos[active]} seed={photoSeed(active)} propertyType={property.propertyType} className="h-full w-full" />
          )}
          {tab === "floorplan" &&
            (floorPlanUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- Firebase Storage URL
              <img src={floorPlanUrl} alt="Floor plan" className="h-full w-full object-contain bg-brand-navy-light" />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-brand-navy-light text-brand-navy">
                <LayoutGrid className="h-12 w-12" strokeWidth={1.25} />
                <span className="text-sm font-semibold">No floor plan uploaded</span>
              </div>
            ))}
          {tab === "video" &&
            (videoUrl ? (
              <video src={videoUrl} controls className="h-full w-full bg-black object-contain" />
            ) : (
              <div className="relative h-full w-full">
                <PropertyImage id={`${property.id}-video`} propertyType={property.propertyType} className="h-full w-full" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-brand-navy shadow-lg">
                    <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
                  </span>
                </div>
              </div>
            ))}

          {tab === "photos" && (
            <button
              type="button"
              onClick={() => setLightbox(true)}
              aria-label="View fullscreen"
              className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-black/70"
            >
              <Expand className="h-3.5 w-3.5" /> {active + 1}/{photos.length}
            </button>
          )}
        </div>

        <div className="absolute left-3 top-3 flex gap-1 rounded-lg bg-black/40 p-1 backdrop-blur">
          {(
            [
              { id: "photos", label: "Photos", icon: ImageIcon },
              { id: "floorplan", label: "Floor Plan", icon: LayoutGrid },
              { id: "video", label: "Video", icon: Play },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors",
                tab === t.id ? "bg-white text-brand-navy" : "text-white/80 hover:text-white"
              )}
            >
              <t.icon className="h-3.5 w-3.5" /> {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "photos" && (
        <div className="no-scrollbar mt-2.5 flex gap-2 overflow-x-auto">
          {photos.map((url, i) => (
            <button
              key={url ?? photoSeed(i)}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Photo ${i + 1}`}
              aria-current={active === i}
              className={cn(
                "h-16 w-24 shrink-0 overflow-hidden rounded-lg ring-2 transition-all",
                active === i ? "ring-brand-orange" : "ring-transparent opacity-70 hover:opacity-100"
              )}
            >
              <PhotoSlide url={url} seed={photoSeed(i)} propertyType={property.propertyType} className="h-full w-full" />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/95">
          <div className="flex items-center justify-between p-4">
            <span className="text-sm font-medium text-white/70">
              {active + 1} / {photos.length}
            </span>
            <button
              type="button"
              aria-label="Close fullscreen"
              onClick={() => setLightbox(false)}
              className="rounded-full p-2 text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4 pb-6">
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => setActive((i) => (i - 1 + photos.length) % photos.length)}
              className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="h-full w-full max-w-3xl">
              <PhotoSlide url={photos[active]} seed={photoSeed(active)} propertyType={property.propertyType} className="h-full w-full rounded-xl" />
            </div>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => setActive((i) => (i + 1) % photos.length)}
              className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
