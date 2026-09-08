// Shared handler for every "Save"/heart button in the app (PropertyCard, PropertyListRow,
// ActionBar, MapView preview, ...) so the login-check + toast wording never drifts between them.
import { authService } from "@/lib/services/auth.service";
import { favoritesService } from "@/lib/services/favorites.service";
import { toast } from "@/lib/toast";

export function toggleFavorite(propertyId: string) {
  const user = authService.getCurrentUser();
  if (!user) {
    toast("Login to save properties", "info");
    return;
  }
  const wasSaved = favoritesService.isSaved(propertyId);
  favoritesService.toggle(propertyId);
  toast(wasSaved ? "Removed from favorites" : "Saved to favorites");
}
