import { Link } from "@tanstack/react-router";
import {
  Building2,
  CarFront,
  Shirt,
  Laptop,
  Sofa,
  Dumbbell,
  Wrench,
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Gauge,
  Fuel,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMarketplace } from "./store";
import { categories, categoryName, currency, type Listing } from "./data";
export const categoryIcons = {
  "real-estate": Building2,
  vehicles: CarFront,
  fashion: Shirt,
  electronics: Laptop,
  "home-living": Sofa,
  sports: Dumbbell,
  services: Wrench,
};
export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="NEXORA home">
      <span className="logo-symbol" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="logo-word">
        NEXORA<span className="text-accent">.</span>
      </span>
    </Link>
  );
}
export function CategoryTiles() {
  return (
    <div className="category-grid">
      {categories.map((c) => {
        const Icon = categoryIcons[c.id];
        return (
          <Link key={c.id} to={c.href} className="category-tile">
            <div className="category-icon">
              <Icon />
            </div>
            <h3>{c.short}</h3>
            <p>{c.count} sample listings</p>
          </Link>
        );
      })}
    </div>
  );
}
export function ListingCard({ listing }: { listing: Listing }) {
  const store = useMarketplace();
  const saved = store.wishlist.includes(listing.id);
  return (
    <article className="listing-card">
      <div className="listing-image-wrap">
        <Link to="/listing/$id" params={{ id: listing.id }} aria-label={`View ${listing.title}`}>
          <img
            className="listing-image"
            src={listing.images[0]}
            alt={listing.title}
            width={1024}
            height={768}
            loading="lazy"
          />
        </Link>
        <span
          className={`listing-badge ${listing.category === "real-estate" && listing.purpose === "Sale" ? "gold" : ""}`}
        >
          {listing.category === "real-estate" || listing.category === "vehicles"
            ? `FOR ${listing.purpose.toUpperCase()}`
            : listing.featured
              ? "FEATURED"
              : "NEW ARRIVAL"}
        </span>
        <Button
          size="icon"
          variant="favorite"
          className="listing-save"
          data-saved={saved}
          onClick={() => store.toggleWish(listing.id)}
          aria-label={saved ? `Unsave ${listing.title}` : `Save ${listing.title}`}
          title={saved ? "Remove from saved" : "Save listing"}
        >
          <Heart fill={saved ? "currentColor" : "none"} />
        </Button>
      </div>
      <div className="listing-content">
        <div className="listing-meta-top">
          <span>{categoryName(listing.category)}</span>
          <span>Demo listing</span>
        </div>
        <Link to="/listing/$id" params={{ id: listing.id }}>
          <h3 title={listing.title}>{listing.title}</h3>
        </Link>
        <p className="listing-location">
          <MapPin />
          {listing.location}, Addis Ababa
        </p>
        <p className="listing-price">
          {currency(listing.price)}
          {listing.purpose === "Rent" && (
            <small> / {listing.category === "vehicles" ? "day" : "month"}</small>
          )}
        </p>
        <div className="listing-specs">
          {listing.category === "real-estate" ? (
            <>
              <span>
                <BedDouble />
                {listing.bedrooms} beds
              </span>
              <span>
                <Bath />
                {listing.bathrooms} baths
              </span>
              <span>
                <Maximize />
                {listing.size} m²
              </span>
            </>
          ) : listing.category === "vehicles" ? (
            <>
              <span>
                <Gauge />
                {listing.year}
              </span>
              <span>
                <Fuel />
                {listing.fuel}
              </span>
              <span>Automatic</span>
            </>
          ) : (
            <>
              <span>{listing.condition}</span>
              <span className={listing.availability === "In stock" ? "text-success" : ""}>
                {listing.availability}
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
export function ListingGrid({
  listings,
  listView = false,
}: {
  listings: Listing[];
  listView?: boolean;
}) {
  return (
    <div className={`listing-grid ${listView ? "list-view" : ""}`}>
      {listings.map((l) => (
        <ListingCard key={l.id} listing={l} />
      ))}
    </div>
  );
}
export function Breadcrumbs({ label }: { label: string }) {
  return (
    <div className="breadcrumbs">
      <Link to="/">Home</Link>
      <ArrowRight />
      <Link to="/categories">Marketplace</Link>
      <ArrowRight />
      <span>{label}</span>
    </div>
  );
}
export function PageHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="page-heading">
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}
export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="empty-state">
      <ShoppingBag />
      <h2>{title}</h2>
      <p>{description}</p>
      <Button asChild>
        <Link to="/categories">
          Explore marketplace <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}
