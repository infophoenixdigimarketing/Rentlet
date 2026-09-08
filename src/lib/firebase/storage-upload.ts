// Firebase Storage upload for property media (spec §16 step 8 / §51). Handles validation,
// client-side image compression (canvas re-encode — cheaper than a Cloud Function and good
// enough for listing photos), and upload progress via uploadBytesResumable.
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { getFirebaseStorage } from "@/lib/firebase/client";

const MAX_IMAGE_MB = 10;
const MAX_VIDEO_MB = 100;
const MAX_IMAGE_DIMENSION = 1920;
const JPEG_QUALITY = 0.82;

export interface UploadResult {
  url: string;
  path: string;
}

export class FileValidationError extends Error {}

function assertValid(file: File, kind: "image" | "video") {
  if (kind === "image") {
    if (!file.type.startsWith("image/")) throw new FileValidationError(`${file.name} is not an image.`);
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) throw new FileValidationError(`${file.name} is larger than ${MAX_IMAGE_MB}MB.`);
  } else {
    if (!file.type.startsWith("video/")) throw new FileValidationError(`${file.name} is not a video.`);
    if (file.size > MAX_VIDEO_MB * 1024 * 1024) throw new FileValidationError(`${file.name} is larger than ${MAX_VIDEO_MB}MB.`);
  }
}

/** Re-encodes an image client-side, capping the longest edge and re-compressing as JPEG. */
async function compressImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file; // canvas unsupported — fall back to the original file

  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY));
  return blob ?? file;
}

/**
 * Uploads one file to `storagePath` and resolves with its public download URL.
 * `onProgress` receives 0–100. Images are compressed client-side first; videos upload as-is.
 */
export async function uploadPropertyMedia(
  file: File,
  storagePath: string,
  kind: "image" | "video",
  onProgress?: (pct: number) => void
): Promise<UploadResult> {
  assertValid(file, kind);
  const body = kind === "image" ? await compressImage(file) : file;

  const storageRef = ref(getFirebaseStorage(), storagePath);
  const task = uploadBytesResumable(storageRef, body, { contentType: kind === "image" ? "image/jpeg" : file.type });

  await new Promise<void>((resolve, reject) => {
    task.on(
      "state_changed",
      (snap) => onProgress?.(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
      reject,
      () => resolve()
    );
  });

  const url = await getDownloadURL(storageRef);
  return { url, path: storagePath };
}

export async function deletePropertyMedia(path: string): Promise<void> {
  await deleteObject(ref(getFirebaseStorage(), path)).catch(() => {
    // Already gone or never existed — not worth surfacing to the caller.
  });
}

/** `properties/{propertyId}/{slot}-{filename}` — predictable, collision-free per listing. */
export function propertyMediaPath(propertyId: string, slot: string, file: File): string {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  return `properties/${propertyId}/${slot}-${Date.now()}-${safeName}`;
}
