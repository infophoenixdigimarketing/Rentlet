// Admin-editable platform config (spec §47: cities, property types, amenities). A working
// mutable store so Add/Remove genuinely works in this session; Phase 12 backs this with a
// Firestore `config` collection that the public site (homepage cities, post-property amenity
// picker) reads from directly instead of the static lib/data/* lists used today.
import { allCities } from "@/lib/data/cities";
import { amenities as defaultAmenities } from "@/lib/data/amenities";

let cities: string[] = allCities.map((c) => c.name);
let amenityLabels: string[] = defaultAmenities.map((a) => a.label);
let listeners: (() => void)[] = [];
let snapshot = { cities: cities.slice(), amenities: amenityLabels.slice() };

function emit() {
  snapshot = { cities: cities.slice(), amenities: amenityLabels.slice() };
  listeners.forEach((l) => l());
}

export const adminSettingsService = {
  get() {
    return snapshot;
  },
  subscribe(listener: () => void) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  addCity(name: string) {
    if (!name.trim() || cities.includes(name.trim())) return;
    cities = [...cities, name.trim()];
    emit();
  },
  removeCity(name: string) {
    cities = cities.filter((c) => c !== name);
    emit();
  },
  addAmenity(label: string) {
    if (!label.trim() || amenityLabels.includes(label.trim())) return;
    amenityLabels = [...amenityLabels, label.trim()];
    emit();
  },
  removeAmenity(label: string) {
    amenityLabels = amenityLabels.filter((a) => a !== label);
    emit();
  },
};
