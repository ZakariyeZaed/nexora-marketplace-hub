import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { SlidersHorizontal, LayoutGrid, List, Search, RotateCcw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useMarketplace } from "./store";
import { convertToEtb, useCurrency } from "./currency";
import { categories, neighborhoods, sellers, type CategoryId } from "./data";
import { filterListings, type Filters } from "./logic";
import { Breadcrumbs, CategoryTiles, PageHeading, ListingGrid, EmptyState } from "./components";
export function CategoriesPage() {
  return (
    <div className="container-main">
      <Breadcrumbs label="All categories" />
      <PageHeading
        title="A world of possibilities."
        description="Seven marketplaces. One NEXORA. Discover everything you need, right here in Addis Ababa."
      />
      <CategoryTiles />
      <div className="grid md:grid-cols-3 gap-8 py-12">
        {categories.map((c) => (
          <div key={c.id}>
            <Link to={c.href} className="text-base font-semibold flex gap-2 items-center">
              {c.name}
              <ArrowRight size={15} />
            </Link>
            <p className="section-subtitle mt-3">{c.description}</p>
            <ul className="text-xs text-muted-foreground leading-8 mt-3">
              {c.types.map((t) => (
                <li key={t}>
                  <Link to={c.href} search={{ type: t }}>{t}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
export function BrowsePage({
  category,
  featured = false,
  query = "",
  searchCategory = "",
  sellerId,
  initialType,
}: {
  initialType?: string | undefined;
  category?: CategoryId;
  featured?: boolean;
  query?: string;
  searchCategory?: string;
  sellerId?: string;
}) {
  const { listings, management } = useMarketplace();
  const [filters, setFilters] = useState<Filters>({
      query,
      category: category ?? searchCategory,
      seller: sellerId,
      type: initialType,
      sort: "newest",
    }),
    [limit, setLimit] = useState(12),
    [listView, setListView] = useState(false),
    [mobile, setMobile] = useState(false);
  const cat = categories.find((c) => c.id === category),
    originalSeller = sellers.find((s) => s.id === sellerId);
  const seller = originalSeller?.id === 'addis-homes' ? {...originalSeller, name: management['store-name'] ?? originalSeller.name, location: management['store-location'] ?? originalSeller.location} : originalSeller;
  const title = seller
    ? seller.name
    : cat
      ? cat.name
      : featured
        ? "The NEXORA edit"
        : query
          ? `Results for “${query}”`
          : "Explore the marketplace";
  const { code } = useCurrency();
  const toEtb = (v?: string) => (v ? String(convertToEtb(Number(v), code)) : undefined);
  const results = filterListings(featured ? listings.filter((l) => l.featured) : listings, {
    ...filters,
    minPrice: toEtb(filters.minPrice),
    maxPrice: toEtb(filters.maxPrice),
  });
  const update = (key: keyof Filters, value: string) => {
    setFilters((f) => ({ ...f, [key]: value }));
    setLimit(12);
  };
  const reset = () => {
    setFilters({ query, category: category ?? searchCategory, seller: sellerId, sort: "newest" });
    setLimit(12);
  };
  function SelectFilter({
    label,
    name,
    options,
  }: {
    label: string;
    name: keyof Filters;
    options: readonly string[];
  }) {
    return (
      <div className="filter-group">
        <label htmlFor={`filter-${name}`}>{label}</label>
        <select
          id={`filter-${name}`}
          className="field"
          value={filters[name] ?? ""}
          onChange={(e) => update(name, e.target.value)}
        >
          <option value="">All {label.toLowerCase()}</option>
          {options.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>
    );
  }
  const filterContent = (
    <>
      <div className="filter-heading">
        <span>Filters</span>
        <Button
          size="icon"
          variant="ghost"
          title="Clear filters"
          aria-label="Clear filters"
          onClick={reset}
        >
          <RotateCcw />
        </Button>
      </div>
      <div className="filter-group">
        <label htmlFor="listing-query">Search listings</label>
        <input
          id="listing-query"
          className="field"
          value={filters.query ?? ""}
          placeholder="Search by name or location"
          onChange={(e) => update("query", e.target.value)}
        />
      </div>
      {!category && (
        <div className="filter-group">
          <label htmlFor="filter-category">Category</label>
          <select
            id="filter-category"
            className="field"
            value={filters.category ?? ""}
            onChange={(e) => update("category", e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <SelectFilter label="Location" name="location" options={neighborhoods} />
      {cat && (
        <SelectFilter
          label={
            category === "vehicles"
              ? "Vehicle type"
              : category === "real-estate"
                ? "Property type"
                : category === "services"
                  ? "Service type"
                  : "Subcategory"
          }
          name="type"
          options={cat.types}
        />
      )}
      <div className="filter-group">
        <label>Price range ({code})</label>
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            className="field"
            aria-label="Minimum price"
            placeholder="Min"
            value={filters.minPrice ?? ""}
            onChange={(e) => update("minPrice", e.target.value)}
          />
          <input
            type="number"
            min="0"
            className="field"
            aria-label="Maximum price"
            placeholder="Max"
            value={filters.maxPrice ?? ""}
            onChange={(e) => update("maxPrice", e.target.value)}
          />
        </div>
      </div>
      {(category === "real-estate" || category === "vehicles") && (
        <SelectFilter label="Rent or sale" name="purpose" options={["Rent", "Sale"]} />
      )}{" "}
      {category === "real-estate" ? (
        <>
          <SelectFilter
            label="Bedrooms (minimum)"
            name="bedrooms"
            options={["1", "2", "3", "4", "5"]}
          />
          <SelectFilter
            label="Bathrooms (minimum)"
            name="bathrooms"
            options={["1", "2", "3", "4"]}
          />
          <SelectFilter label="Furnished" name="furnished" options={["Yes", "No"]} />
          <div className="filter-group">
            <label htmlFor="min-size">Minimum area (m²)</label>
            <input
              className="field"
              type="number"
              min="0"
              id="min-size"
              value={filters.minSize ?? ""}
              onChange={(e) => update("minSize", e.target.value)}
            />
          </div>
        </>
      ) : category === "vehicles" ? (
        <>
          <SelectFilter
            label="Brand"
            name="brand"
            options={[
              ...new Set(listings.filter((l) => l.category === "vehicles").map((l) => l.brand)),
            ]}
          />
          <SelectFilter label="Model" name="model" options={[...new Set(listings.filter((l) => l.category === "vehicles" && l.model).map((l) => l.model as string))]} />
          <SelectFilter
            label="Year"
            name="year"
            options={["2022", "2021", "2020", "2019", "2018"]}
          />
          <SelectFilter
            label="Fuel type"
            name="fuel"
            options={["Petrol", "Hybrid", "Diesel", "Electric"]}
          />
          <SelectFilter
            label="Transmission"
            name="transmission"
            options={["Automatic", "Manual"]}
          />
          <SelectFilter label="Condition" name="condition" options={["New", "Used — excellent"]} />
        </>
      ) : category !== "services" ? (
        <>
          <SelectFilter
            label="Brand"
            name="brand"
            options={[
              ...new Set(
                listings.filter((l) => !category || l.category === category).map((l) => l.brand),
              ),
            ]}
          />
          <SelectFilter label="Condition" name="condition" options={["New", "Used — excellent"]} />
          <SelectFilter
            label="Availability"
            name="availability"
            options={["In stock", "Out of stock"]}
          />
        </>
      ) : null}
      {!sellerId && (
        <div className="filter-group">
          <label htmlFor="filter-seller">{category === "services" ? "Provider" : "Seller"}</label>
          <select
            id="filter-seller"
            className="field"
            value={filters.seller ?? ""}
            onChange={(e) => update("seller", e.target.value)}
          >
            <option value="">All stores</option>
            {sellers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
  return (
    <div className="container-main">
      <Breadcrumbs label={title} />
      {seller && (
        <div className="flex items-center gap-4 mb-4">
          <span className="seller-avatar">{seller.initials}</span>
          <span className="demo-label">Demo store · {seller.location}, Addis Ababa</span>
        </div>
      )}
      <PageHeading
        title={title}
        description={
          seller
            ? `Explore the sample collection from ${seller.name}. Local finds, thoughtfully selected.`
            : (cat?.description ??
              "Discover standout listings, fresh arrivals, and local favorites. All listings are sample content.")
        }
      />
      {cat && (
        <div className="subcategory-grid" aria-label={`${cat.name} subcategories`}>
          {cat.subcategories.map((sub) => (
            <button
              type="button"
              key={sub.slug}
              className="subcategory-card"
              data-active={filters.type === sub.name}
              aria-pressed={filters.type === sub.name}
              onClick={() => update("type", filters.type === sub.name ? "" : sub.name)}
            >
              <img src={sub.image} alt={sub.name} width={1024} height={768} loading="lazy" />
              <div>
                <h3>{sub.name}</h3>
                <p>{sub.description}</p>
              </div>
            </button>
          ))}
        </div>
      )}
      <div className="browse-layout">
          <aside className="filter-sidebar">{!mobile && filterContent}</aside>
        <div>
          <div className="browse-toolbar">
            <p>
              <strong className="text-foreground">{results.length}</strong> sample listings{" "}
              {cat ? `in ${cat.short}` : ""}
            </p>
            <div className="flex items-center gap-2">
              <Button
                className="mobile-filter"
                variant="outline"
                size="sm"
                onClick={() => setMobile(true)}
              >
                <SlidersHorizontal />
                Filters
              </Button>
              <select
                aria-label="Sort listings"
                className="field"
                value={filters.sort}
                onChange={(e) => update("sort", e.target.value)}
              >
                <option value="newest">Newest first</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="oldest">Oldest first</option>
              </select>
              <Button
                variant={listView ? "ghost" : "secondary"}
                size="icon"
                aria-label="Grid view"
                title="Grid view"
                onClick={() => setListView(false)}
              >
                <LayoutGrid />
              </Button>
              <Button
                variant={listView ? "secondary" : "ghost"}
                size="icon"
                aria-label="List view"
                title="List view"
                onClick={() => setListView(true)}
              >
                <List />
              </Button>
            </div>
          </div>
          {results.length ? (
            <>
              <ListingGrid listings={results.slice(0, limit)} listView={listView} />
              {limit < results.length && (
                <div className="text-center mt-8">
                  <Button variant="outline" onClick={() => setLimit((v) => v + 12)}>
                    Discover more <ArrowRight />
                  </Button>
                  <p className="section-subtitle">
                    Showing {Math.min(limit, results.length)} of {results.length}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <Search />
              <h2>No matches just yet.</h2>
              <p>Try another search or widen your filters to discover more.</p>
              <Button onClick={reset}>
                <RotateCcw />
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
      <Dialog open={mobile} onOpenChange={setMobile}>
        <DialogContent className="w-[calc(100%-32px)] max-h-[85vh] overflow-y-auto">
          <DialogTitle>Refine your search</DialogTitle>
          <DialogDescription>Find the things that fit you.</DialogDescription>
          {filterContent}
          <Button onClick={() => setMobile(false)}>Show {results.length} listings</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export function SavedPage({ properties = false }: { properties?: boolean }) {
  const store = useMarketplace();
  const listings = store.listings.filter(
    (l) => store.wishlist.includes(l.id) && (!properties || l.category === "real-estate"),
  );
  return (
    <div className="container-main">
      <Breadcrumbs label="Saved listings" />
      <PageHeading
        title={properties ? "Your saved properties" : "A few of your favorite things."}
        description="Keep the things you love close. Your saved finds, all together."
      />
      <div className="pb-12">
        {listings.length ? (
          <ListingGrid listings={listings} />
        ) : (
          <EmptyState
            title="Your next favorite is out there."
            description="Save a listing with the heart icon and find it here whenever you need it."
          />
        )}
      </div>
    </div>
  );
}
