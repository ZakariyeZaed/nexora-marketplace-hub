import type { Listing } from "./data";
export interface Filters {
  query?: string | undefined;
  category?: string | undefined;
  location?: string | undefined;
  type?: string | undefined;
  minPrice?: string | undefined;
  maxPrice?: string | undefined;
  brand?: string | undefined;
  model?: string | undefined;
  condition?: string | undefined;
  purpose?: string | undefined;
  bedrooms?: string | undefined;
  bathrooms?: string | undefined;
  furnished?: string | undefined;
  minSize?: string | undefined;
  year?: string | undefined;
  fuel?: string | undefined;
  transmission?: string | undefined;
  availability?: string | undefined;
  seller?: string | undefined;
  sort?: string | undefined;
}
export function filterListings(items: Listing[], f: Filters): Listing[] {
  const result = items.filter(
    (l) =>
      l.status === "active" &&
      (!f.category || l.category === f.category) &&
      (!f.query ||
        `${l.title} ${l.location} ${l.brand} ${l.type}`
          .toLowerCase()
          .includes(f.query.toLowerCase())) &&
      (!f.location || l.location === f.location) &&
      (!f.type || l.type === f.type) &&
      (!f.minPrice || l.price >= Number(f.minPrice)) &&
      (!f.maxPrice || l.price <= Number(f.maxPrice)) &&
      (!f.brand || l.brand === f.brand) &&
      (!f.model || l.model === f.model) &&
      (!f.condition || l.condition === f.condition) &&
      (!f.purpose || l.purpose === f.purpose) &&
      (!f.bedrooms || (l.bedrooms ?? 0) >= Number(f.bedrooms)) &&
      (!f.bathrooms || (l.bathrooms ?? 0) >= Number(f.bathrooms)) &&
      (!f.furnished || l.furnished === (f.furnished === "Yes")) &&
      (!f.minSize || (l.size ?? 0) >= Number(f.minSize)) &&
      (!f.year || String(l.year) === f.year) &&
      (!f.fuel || l.fuel === f.fuel) &&
      (!f.transmission || l.transmission === f.transmission) &&
      (!f.availability || l.availability === f.availability) &&
      (!f.seller || l.seller === f.seller),
  );
  return result.sort((a, b) =>
    f.sort === "price-low"
      ? a.price - b.price
      : f.sort === "price-high"
        ? b.price - a.price
        : f.sort === "oldest"
          ? a.created - b.created
          : b.created - a.created,
  );
}
export interface CartItem {
  id: string;
  quantity: number;
  variant?: string | undefined;
}
export function cartTotal(cart: CartItem[], listings: Listing[]) {
  return cart.reduce(
    (sum, item) => sum + (listings.find((l) => l.id === item.id)?.price ?? 0) * item.quantity,
    0,
  );
}
export function canAddToCart(listing: Listing) {
  return (
    !["real-estate", "vehicles", "services"].includes(listing.category) &&
    listing.status === "active" &&
    listing.availability === "In stock"
  );
}
export function changeQuantity(value: number) {
  return Math.max(1, Math.min(99, Math.floor(Number.isFinite(value) ? value : 1)));
}
