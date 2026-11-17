import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, MapPin, MessageCircle, ShoppingBag, Minus, Plus, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useMarketplace } from "./store";
import { categoryName, currency, sellers } from "./data";
import { canAddToCart } from "./logic";
import { Breadcrumbs, ListingGrid, EmptyState } from "./components";
export function DetailPage({ id }: { id: string }) {
  const store = useMarketplace();
  const listing = store.listings.find((l) => l.id === id);
  const [image, setImage] = useState(0),
    [quantity, setQuantity] = useState(1),
    [variant, setVariant] = useState("M"),
    [inquiry, setInquiry] = useState(false);
  if (!listing)
    return (
      <div className="container-main">
        <EmptyState
          title="This listing is no longer available."
          description="There are still plenty of discoveries waiting for you in the marketplace."
        />
      </div>
    );
  const seller = sellers.find((s) => s.id === listing.seller);
  const product = !["real-estate", "vehicles", "services"].includes(listing.category);
  const related = store.listings
    .filter((l) => l.category === listing.category && l.id !== id && l.status === "active")
    .slice(0, 4);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!listing) return;
    const f = new FormData(e.currentTarget);
    store.inquire({
      listingId: id,
      title: listing.title,
      message: String(f.get("message")),
      name: String(f.get("name")),
    });
    setInquiry(false);
  }
  return (
    <div className="container-main">
      <Breadcrumbs label={categoryName(listing.category)} />
      <div className="detail-layout">
        <div>
          <img
            className="gallery-main"
            src={listing.images[image] ?? listing.images[0]}
            alt={`${listing.title} — photo ${image + 1}`}
            width={1024}
            height={768}
          />
          <div className="gallery-thumbs">
            {listing.images.map((src, i) => (
              <Button
                key={src}
                variant="ghost"
                data-active={image === i}
                onClick={() => setImage(i)}
                aria-label={`View photo ${i + 1}`}
              >
                <img src={src} alt={`Thumbnail ${i + 1}`} width={90} height={65} />
              </Button>
            ))}
          </div>
          <h2 className="text-lg font-semibold mt-7">
            {listing.category === "real-estate"
              ? "A closer look at your next home"
              : listing.category === "vehicles"
                ? "Built for your next chapter"
                : listing.category === "services"
                  ? "The little details, taken care of"
                  : "The details that make a difference"}
          </h2>
          <p className="detail-description">{listing.description}</p>
          <p className="form-help mt-4">
            Representative sample photography. This is a demo listing, not a live offer.
          </p>
        </div>
        <div className="detail-info">
          <div className="flex justify-between items-center">
            <span className="demo-label">
              Demo {listing.type} · {listing.purpose === "Rent" ? "For rent" : "For sale"}
            </span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Share listing"
              title="Copy listing link"
              onClick={() => {
                navigator.clipboard
                  ?.writeText(window.location.href)
                  .then(() => toast.success("Listing link copied"))
                  .catch(() => toast.error("Could not copy the link"));
              }}
            >
              <Share2 />
            </Button>
          </div>
          <h1>{listing.title}</h1>
          <p className="listing-location">
            <MapPin />
            {listing.location}, Addis Ababa, Ethiopia
          </p>
          <p className="listing-price">
            {currency(listing.price)}
            {listing.purpose === "Rent" && (
              <small> / {listing.category === "vehicles" ? "day" : "month"}</small>
            )}
            {listing.category === "services" && <small> / service</small>}
          </p>
          <div className="detail-spec-grid">
            {Object.entries(listing.specs).map(([k, v]) => (
              <div key={k}>
                <span>{k}</span>
                <strong className="text-xs mt-1 block">{v}</strong>
              </div>
            ))}
          </div>
          {product && (
            <div className="flex gap-4 items-end">
              <div>
                <label className="form-label">Quantity</label>
                <div className="quantity">
                  <Button
                    size="icon"
                    variant="ghost"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((n) => n - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus />
                  </Button>
                  <strong>{quantity}</strong>
                  <Button
                    size="icon"
                    variant="ghost"
                    disabled={quantity >= 99}
                    onClick={() => setQuantity((n) => n + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
              {listing.category === "fashion" && (
                <div>
                  <label htmlFor="size" className="form-label">
                    Size
                  </label>
                  <select
                    id="size"
                    className="field h-9"
                    value={variant}
                    onChange={(e) => setVariant(e.target.value)}
                  >
                    {["S", "M", "L", "XL"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              )}
              <span
                className={`text-xs pb-2 ${listing.availability === "In stock" ? "text-success" : "text-muted-foreground"}`}
              >
                {listing.availability}
              </span>
            </div>
          )}
          <div className="detail-actions">
            {product ? (
              <Button
                size="lg"
                disabled={!canAddToCart(listing)}
                onClick={() =>
                  store.addCart(id, quantity, listing.category === "fashion" ? variant : undefined)
                }
              >
                <ShoppingBag />
                Add to bag
              </Button>
            ) : (
              <Button size="lg" onClick={() => setInquiry(true)}>
                <MessageCircle />
                {listing.category === "real-estate"
                  ? "Arrange a demo viewing"
                  : listing.category === "services"
                    ? "Request a demo quote"
                    : "Contact seller"}
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              onClick={() => store.toggleWish(id)}
              aria-label="Save listing"
              title="Save listing"
            >
              <Heart fill={store.wishlist.includes(id) ? "currentColor" : "none"} />
            </Button>
          </div>
          {product && (
            <Button variant="link" className="px-0 mt-2" onClick={() => setInquiry(true)}>
              <MessageCircle />
              Ask the seller a question
            </Button>
          )}
          <div className="seller-detail">
            <span className="seller-avatar">{seller?.initials ?? "NS"}</span>
            <div>
              <strong className="text-sm">{seller?.name ?? "Your demo store"}</strong>
              <p>Sample store · {listing.location}</p>
            </div>
            <Link className="view-link ml-auto" to="/store/$id" params={{ id: listing.seller }}>
              View store
            </Link>
          </div>
          <p className="form-help mt-5">
            Demo experience only. No actual payments, messages, or bookings are made.
          </p>
        </div>
      </div>
      <section className="section border-t border-border">
        <div className="section-heading">
          <div>
            <h2 className="section-title">More you might love</h2>
            <p className="section-subtitle">A few more finds, selected for you.</p>
          </div>
        </div>
        <ListingGrid listings={related} />
      </section>
      <Dialog open={inquiry} onOpenChange={setInquiry}>
        <DialogContent className="w-[calc(100%-32px)]">
          <DialogTitle>Connect with the seller</DialogTitle>
          <DialogDescription>
            Demo inquiry for {listing.title}. No real message will be sent.
          </DialogDescription>
          <form className="modal-form" onSubmit={submit}>
            <div>
              <label htmlFor="inquiry-name" className="form-label">
                Your name
              </label>
              <input
                id="inquiry-name"
                name="name"
                className="field"
                required
                defaultValue={store.user?.name}
              />
            </div>
            <div>
              <label htmlFor="inquiry-email" className="form-label">
                Email
              </label>
              <input
                id="inquiry-email"
                name="email"
                type="email"
                className="field"
                required
                defaultValue={store.user?.email}
              />
            </div>
            <div>
              <label htmlFor="inquiry-message" className="form-label">
                Your message
              </label>
              <textarea
                id="inquiry-message"
                name="message"
                className="field"
                required
                minLength={10}
                placeholder="I'd like to know more about this listing…"
              />
            </div>
            <Button type="submit">
              Save demo inquiry <MessageCircle />
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
