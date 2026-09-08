import type { PropertyCategoryCard } from "@/types/property";

// Spec §6 — Quick Property Categories
export const quickCategories: PropertyCategoryCard[] = [
  { id: "apartments", title: "Apartments", icon: "building-2", propertyCount: 12400, imageUrl: "/images/categories/apartments.jpg", href: "/properties?type=apartment" },
  { id: "houses", title: "Independent Houses", icon: "home", propertyCount: 5230, imageUrl: "/images/categories/independent-houses.jpg", href: "/properties?type=independent_house" },
  { id: "commercial", title: "Commercial", icon: "briefcase", propertyCount: 3110, imageUrl: "/images/categories/commercial.jpg", href: "/commercial" },
  { id: "land", title: "Land & Plots", icon: "trees", propertyCount: 2870, imageUrl: "/images/categories/land.jpg", href: "/land" },
  { id: "pg", title: "PG / Hostel", icon: "bed-double", propertyCount: 6640, imageUrl: "/images/categories/pg.jpg", href: "/pg" },
  { id: "villas", title: "Villas", icon: "castle", propertyCount: 1560, imageUrl: "/images/categories/villas.jpg", href: "/properties?type=villa" },
  { id: "new-projects", title: "New Projects", icon: "hard-hat", propertyCount: 420, imageUrl: "/images/categories/new-projects.jpg", href: "/new-projects" },
  { id: "flatmates", title: "Flatmates", icon: "users", propertyCount: 3980, imageUrl: "/images/categories/flatmates.jpg", href: "/flatmates" },
];
