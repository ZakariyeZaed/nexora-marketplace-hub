import { initialListings, type Listing } from "./data";
import { filterListings, type Filters } from "./logic";
// This browser-safe adapter is the boundary to replace with a real API client later.
export const marketplaceClient = {
  search: (filters: Filters, listings: Listing[] = initialListings) =>
    filterListings(listings, filters),
  detail: (id: string, listings: Listing[] = initialListings) => listings.find((l) => l.id === id),
  storageKey: "nexora-marketplace-demo-v1",
};
