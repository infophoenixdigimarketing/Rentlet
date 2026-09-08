"use client";

import { useRef, useState } from "react";
import { Upload, X, ImageIcon, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";
import type { WizardMediaFile, WizardState } from "@/types/wizard";

const MAX_SIZE_MB = 10;

function toMediaFile(file: File): WizardMediaFile {
  return { id: `${file.name}-${file.size}-${Date.now()}`, file, previewUrl: URL.createObjectURL(file) };
}

// Real drag-and-drop + browser File API — actual selected files are read and previewed via
// object URLs (no upload target yet, no Storage backend until Phase 12, so nothing is
// persisted beyond this browser tab, matching the honest-placeholder approach used for every
// other listing's photos).
function Dropzone({
  label,
  hint,
  accept,
  multiple,
  files,
  onFiles,
  onRemove,
}: {
  label: string;
  hint: string;
  accept: string;
  multiple: boolean;
  files: WizardMediaFile[];
  onFiles: (files: WizardMediaFile[]) => void;
  onRemove: (id: string) => void;
}) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(list: FileList | null) {
    if (!list) return;
    const accepted: WizardMediaFile[] = [];
    for (const file of Array.from(list)) {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        toast(`${file.name} is over ${MAX_SIZE_MB}MB and was skipped.`, "error");
        continue;
      }
      accepted.push(toMediaFile(file));
    }
    if (accepted.length) {
      onFiles(accepted);
      toast(`${accepted.length} file${accepted.length > 1 ? "s" : ""} added — compressed automatically for fast loading.`, "success");
    }
  }

  return (
    <div>
      <p className="text-xs font-semibold text-foreground/80">{label}</p>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        className={cn(
          "mt-1.5 flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed p-6 text-center transition-colors",
          dragOver ? "border-brand-orange bg-brand-orange-light/40" : "border-border hover:border-brand-navy hover:bg-muted"
        )}
      >
        <Upload className="h-5 w-5 text-muted-foreground" />
        <p className="text-xs font-semibold text-foreground">Drag &amp; drop or click to upload</p>
        <p className="text-[11px] text-muted-foreground">{hint}</p>
        <input ref={inputRef} type="file" accept={accept} multiple={multiple} className="hidden" onChange={(e) => handleFiles(e.target.files)} />
      </div>

      {files.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {files.map((f) => (
            <div key={f.id} className="group relative h-20 w-20 overflow-hidden rounded-lg border border-border">
              {f.file.type.startsWith("video") ? (
                <div className="flex h-full w-full items-center justify-center bg-brand-navy-light text-brand-navy">
                  <Video className="h-5 w-5" />
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- local object URL, not a remote asset next/image can optimize
                <img src={f.previewUrl} alt={f.file.name} className="h-full w-full object-cover" />
              )}
              <button
                type="button"
                aria-label={`Remove ${f.file.name}`}
                onClick={() => onRemove(f.id)}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function Step8Media({ state, update }: { state: WizardState; update: (p: Partial<WizardState>) => void }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-foreground">Photos &amp; videos</h2>
      <p className="mt-1 text-sm text-muted-foreground">Great photos get 3x more enquiries. Add as many as you can.</p>

      <div className="mt-5 flex flex-col gap-6">
        <Dropzone
          label="Cover Image"
          hint="This is the first photo people see"
          accept="image/*"
          multiple={false}
          files={state.cover ? [state.cover] : []}
          onFiles={(files) => update({ cover: files[0] })}
          onRemove={() => update({ cover: null })}
        />
        <Dropzone
          label="Gallery Images"
          hint="Up to 20 photos, JPG or PNG"
          accept="image/*"
          multiple
          files={state.gallery}
          onFiles={(files) => update({ gallery: [...state.gallery, ...files] })}
          onRemove={(id) => update({ gallery: state.gallery.filter((f) => f.id !== id) })}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Dropzone
            label="Property Video"
            hint="MP4, up to 10MB"
            accept="video/*"
            multiple={false}
            files={state.video ? [state.video] : []}
            onFiles={(files) => update({ video: files[0] })}
            onRemove={() => update({ video: null })}
          />
          <Dropzone
            label="Floor Plan"
            hint="Image of the floor layout"
            accept="image/*"
            multiple={false}
            files={state.floorPlan ? [state.floorPlan] : []}
            onFiles={(files) => update({ floorPlan: files[0] })}
            onRemove={() => update({ floorPlan: null })}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl bg-muted px-4 py-3 text-xs text-muted-foreground">
        <ImageIcon className="h-4 w-4 shrink-0" />
        Photos are compressed and optimized automatically on upload.
      </div>
    </div>
  );
}
