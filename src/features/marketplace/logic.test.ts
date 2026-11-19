import { describe, expect, it } from "vitest";
import { initialListings, currency, categories } from "./data";
import { formatMoney, convertToEtb } from "./currency";
import { canAddToCart, cartTotal, changeQuantity, filterListings } from "./logic";

describe("NEXORA marketplace rules", () => {
  it("uses Ethiopian Birr as the default currency", () => {
    expect(currency(85000)).toBe("ETB 85,000");
  });
  it("converts ETB prices numerically with the demo rates", () => {
    expect(formatMoney(155000, "USD")).toBe("USD 1,000");
    expect(formatMoney(1550, "USD")).toBe("USD 10.00");
    expect(convertToEtb(10, "EUR")).toBe(1680);
  });
  it("gives every marketplace six distinct subcategories", () => {
    for (const c of categories) {
      expect(new Set(c.subcategories.map((s) => s.name)).size).toBe(6);
      for (const s of c.subcategories)
        expect(initialListings.filter((l) => l.category === c.id && l.type === s.name)).toHaveLength(5);
    }
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
    ["vehicles", 30],
    ["electronics", 30],
    ["fashion", 30],
    ["home-living", 30],
    ["sports", 30],
    ["services", 30],
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
  it("filters SUVs by their subcategory", () => {
    const results = filterListings(initialListings, { category: "vehicles", type: "SUVs & 4x4 Vehicles" });
    expect(results).toHaveLength(5);
    expect(results.every((l) => l.specs["Body type"] === "SUV")).toBe(true);
  });
  it("filters products by subcategory, brand, stock, and sample seller", () => {
    const results = filterListings(initialListings, {
      category: "electronics",
      type: "Audio & Headphones",
      brand: "SoundPro",
      availability: "In stock",
      seller: "ethio-tech",
    });
    expect(results).toHaveLength(5);
  });
  it("filters vehicles by their model", () => {
    const results = filterListings(initialListings, { category: "vehicles", model: "Corolla" });
    expect(results).toHaveLength(4);
    expect(results.every((l) => l.model === "Corolla")).toBe(true);
  });
  it("filters services by provider, type, location, and price", () => {
    const results = filterListings(initialListings, {
      category: "services",
      type: "Cleaning Services",
      seller: "addis-care",
      location: "Bole",
      maxPrice: "3000",
    });
    expect(results.map((l) => l.id)).toEqual(["services-1"]);
  });
  it("sorts by actual prices from low to high", () => {
    const results = filterListings(initialListings, { category: "real-estate", sort: "price-low" });
    expect(results[0]?.price).toBe(55000);
    expect(results.every((l, i) => i === 0 || l.price >= (results[i - 1]?.price ?? 0))).toBe(true);
  });
  it("keeps pending demo listings out of public browsing", () => {
    expect(filterListings(initialListings, { category: "services" })).toHaveLength(29);
    expect(filterListings(initialListings, {}).some((l) => l.status === "pending")).toBe(false);
  });
  it("allows products in stock to be added to the demo bag", () => {
    const laptop = initialListings.find((l) => l.id === "electronics-1");
    if (!laptop) throw new Error("Missing sample laptop");
    expect(canAddToCart(laptop)).toBe(true);
  });
  it.each(["real-estate-1", "vehicles-1", "services-1", "fashion-10"])(
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
    ).toBe(181500);
  });
  it("keeps product quantities positive whole numbers", () => {
    expect(changeQuantity(0)).toBe(1);
    expect(changeQuantity(2.9)).toBe(2);
  });
});
