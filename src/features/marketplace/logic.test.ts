import { describe, expect, it } from "vitest";
import { initialListings, currency, categories } from "./data";
import { canAddToCart, cartTotal, changeQuantity, filterListings } from "./logic";

describe("NEXORA marketplace rules", () => {
  it("uses Ethiopian Birr for marketplace prices", () => {
    expect(currency(85000)).toBe("ETB 85,000");
  });
  it("includes all seven requested marketplaces", () => {
    expect(categories.map((c) => c.id)).toEqual([
      "real-estate",
      "vehicles",
      "fashion",
      "electronics",
      "home-living",
      "sports",
      "services",
    ]);
  });
  it.each([
    ["real-estate", 30],
    ["vehicles", 20],
    ["electronics", 30],
    ["fashion", 25],
    ["home-living", 25],
    ["sports", 10],
    ["services", 10],
  ])("provides the requested sample count for %s", (category, count) => {
    expect(initialListings.filter((l) => l.category === category)).toHaveLength(count);
  });
  it("finds Addis Ababa listings with a case-insensitive search", () => {
    const results = filterListings(initialListings, { query: "bole", category: "real-estate" });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((l) => `${l.title} ${l.location}`.toLowerCase().includes("bole"))).toBe(
      true,
    );
  });
  it("filters properties by neighborhood, purpose, price, bedrooms, bathrooms, size, and furnished status", () => {
    const results = filterListings(initialListings, {
      category: "real-estate",
      location: "Bole",
      purpose: "Rent",
      minPrice: "80000",
      maxPrice: "90000",
      bedrooms: "3",
      bathrooms: "2",
      minSize: "100",
      furnished: "Yes",
    });
    expect(results.map((l) => l.id)).toEqual(["real-estate-1"]);
  });
  it("filters vehicles by year, fuel, transmission, condition, brand, and vehicle type", () => {
    const results = filterListings(initialListings, {
      category: "vehicles",
      year: "2022",
      fuel: "Petrol",
      transmission: "Automatic",
      condition: "Used — excellent",
      brand: "Toyota",
      type: "SUV",
      purpose: "Sale",
    });
    expect(results.map((l) => l.id)).toEqual(["vehicles-1"]);
  });
  it("filters products by category, brand, stock, and sample seller", () => {
    const results = filterListings(initialListings, {
      category: "electronics",
      type: "Audio",
      brand: "SoundPro",
      availability: "In stock",
      seller: "ethio-tech",
    });
    expect(results).toHaveLength(9);
    expect(results[0]?.id).toBe("electronics-3");
  });
  it('filters vehicles by their model', () => {
    const results = filterListings(initialListings, { category: 'vehicles', model: 'Corolla' });
    expect(results.map(l => l.id)).toEqual(['vehicles-2', 'vehicles-6', 'vehicles-10', 'vehicles-14', 'vehicles-18']);
  });
  it("filters services by provider, type, location, and price", () => {
    const results = filterListings(initialListings, {
      category: "services",
      type: "Cleaning",
      seller: "addis-care",
      location: "Bole",
      maxPrice: "3000",
    });
    expect(results.map((l) => l.id)).toEqual(["services-1"]);
  });
  it("sorts by actual prices from low to high", () => {
    const results = filterListings(initialListings, { category: "real-estate", sort: "price-low" });
    expect(results[0]?.price).toBe(85000);
    expect(results.every((l, i) => i === 0 || l.price >= (results[i - 1]?.price ?? 0))).toBe(true);
  });
  it("keeps pending demo listings out of public browsing", () => {
    expect(filterListings(initialListings, { category: "services" })).toHaveLength(9);
    expect(filterListings(initialListings, {}).some((l) => l.status === "pending")).toBe(false);
  });
  it("allows products in stock to be added to the demo bag", () => {
    const laptop = initialListings.find((l) => l.id === "electronics-1");
    if (!laptop) throw new Error("Missing sample laptop");
    expect(canAddToCart(laptop)).toBe(true);
  });
  it.each(["real-estate-1", "vehicles-1", "services-1", "fashion-9"])(
    "keeps inquiry-only and unavailable listings out of the bag: %s",
    (id) => {
      const listing = initialListings.find((l) => l.id === id);
      if (!listing) throw new Error("Missing sample listing");
      expect(canAddToCart(listing)).toBe(false);
    },
  );
  it("calculates the demo total from quantities and ETB listing prices", () => {
    expect(
      cartTotal(
        [
          { id: "electronics-1", quantity: 2 },
          { id: "electronics-3", quantity: 1 },
        ],
        initialListings,
      ),
    ).toBe(262500);
  });
  it("keeps product quantities positive whole numbers", () => {
    expect(changeQuantity(0)).toBe(1);
    expect(changeQuantity(2.9)).toBe(2);
  });
});
