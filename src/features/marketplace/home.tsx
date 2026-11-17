import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Headphones,
  HeartHandshake,
  Store,
  Search,
  MessageCircle,
  Check,
  Globe,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/addis-skyline.jpg";
import services from "@/assets/home-services.jpg";
import { useMarketplace } from "./store";
import { CategoryTiles, ListingGrid } from "./components";
import { Newsletter } from "./shell";
import { sellers, type CategoryId } from "./data";
function SectionHeader({
  title,
  subtitle,
  to,
}: {
  title: string;
  subtitle: string;
  to: "/real-estate" | "/vehicles" | "/featured" | "/categories";
}) {
  return (
    <div className="section-heading">
      <div>
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>
      </div>
      <Link className="view-link" to={to}>
        View all <ArrowRight />
      </Link>
    </div>
  );
}
export function HomePage() {
  const { listings } = useMarketplace();
  const [tab, setTab] = useState<CategoryId | "all">("all");
  const active = listings.filter((l) => l.status === "active");
  return (
    <>
      <section className="hero">
        <img
          className="hero-image"
          src={hero}
          alt="Modern Addis Ababa skyline with tree-lined neighborhoods"
          width={1920}
          height={1024}
          fetchPriority="high"
        />
        <div className="container-main hero-inner">
          <p className="hero-eyebrow">ROOTED IN ETHIOPIA. MADE FOR YOUR EVERYDAY.</p>
          <h1>
            Everything You Need.
            <br />
            <span>All in One Place.</span>
          </h1>
          <p className="hero-description">
            Find your next home. Drive your next adventure.
            <br />
            Discover everyday favorites — all on NEXORA,
            <br />
            your Ethiopian marketplace.
          </p>
          <div className="hero-buttons">
            <Button variant="gold" size="lg" asChild>
              <Link to="/categories">
                Explore Marketplace <ArrowRight />
              </Link>
            </Button>
            <Button variant="hero" size="lg" asChild>
              <Link to="/become-seller">
                Become a Seller <ArrowUpRight />
              </Link>
            </Button>
          </div>
          <div className="hero-bottom">
            <span>
              <MapPin />
              Locally connected
            </span>
            <span>
              <ShoppingBag />7 marketplaces, one place
            </span>
            <span>
              <HeartHandshake />
              Built around you
            </span>
          </div>
          <div className="hero-place">
            <MapPin />
            Addis Ababa, Ethiopia
          </div>
        </div>
      </section>
      <div className="trust-strip">
        <div className="container-main trust-grid">
          {[
            {
              Icon: ShieldCheck,
              title: "Shop with confidence",
              sub: "Clear details. Informed choices.",
            },
            {
              Icon: Store,
              title: "Discover local businesses",
              sub: "Find your next favorite store.",
            },
            {
              Icon: ShoppingBag,
              title: "More choice, less searching",
              sub: "Your everyday, all in one place.",
            },
            {
              Icon: Headphones,
              title: "Here when you need us",
              sub: "A more personal experience.",
            },
          ].map((b) => (
            <div className="trust-item" key={b.title}>
              <b.Icon />
              <div>
                <strong>{b.title}</strong>
                <small>{b.sub}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
      <section className="section">
        <div className="container-main">
          <SectionHeader
            title="What are you looking for?"
            subtitle="Big possibilities. Everyday essentials. Find your kind of thing."
            to="/categories"
          />
          <CategoryTiles />
        </div>
      </section>
      <section className="section section-white">
        <div className="container-main">
          <SectionHeader
            title="Find a place to call home"
            subtitle="Thoughtfully selected properties across Addis Ababa."
            to="/real-estate"
          />
          <ListingGrid listings={active.filter((l) => l.category === "real-estate").slice(0, 4)} />
        </div>
      </section>
      <section className="section">
        <div className="container-main">
          <SectionHeader
            title="Your next journey starts here"
            subtitle="Explore cars that take you further."
            to="/vehicles"
          />
          <ListingGrid listings={active.filter((l) => l.category === "vehicles").slice(0, 4)} />
        </div>
      </section>
      <section className="section section-white">
        <div className="container-main">
          <SectionHeader
            title="Everyday finds. Extraordinary choice."
            subtitle="Fresh picks for your life, your style, and your space."
            to="/featured"
          />
          <div className="section-tabs">
            {(
              [
                { id: "all", name: "For you" },
                { id: "electronics", name: "Electronics" },
                { id: "fashion", name: "Fashion" },
                { id: "home-living", name: "Home & Living" },
              ] as const
            ).map((t) => (
              <Button
                key={t.id}
                variant={tab === t.id ? "default" : "ghost"}
                onClick={() => setTab(t.id)}
              >
                {t.name}
              </Button>
            ))}
          </div>
          <ListingGrid
            listings={
              tab === "all"
                ? [
                    active.find((l) => l.id === "electronics-1"),
                    active.find((l) => l.id === "fashion-1"),
                    active.find((l) => l.id === "home-living-1"),
                    active.find((l) => l.id === "electronics-3"),
                  ].filter((l): l is NonNullable<typeof l> => Boolean(l))
                : active.filter((l) => l.category === tab).slice(0, 4)
            }
          />
        </div>
      </section>
      <section className="section">
        <div className="container-main">
          <SectionHeader
            title="Just arrived on NEXORA"
            subtitle="Something new to discover, every day."
            to="/featured"
          />
          <ListingGrid
            listings={[
              active.find((l) => l.id === "electronics-2"),
              active.find((l) => l.id === "real-estate-3"),
              active.find((l) => l.id === "sports-1"),
              active.find((l) => l.id === "services-1"),
            ].filter((l): l is NonNullable<typeof l> => Boolean(l))}
          />
        </div>
      </section>
      <section className="section section-white">
        <div className="container-main">
          <div className="section-heading">
            <div>
              <h2 className="section-title">Meet your next favorite store</h2>
              <p className="section-subtitle">
                Local businesses. New discoveries. Sample stores worth exploring.
              </p>
            </div>
            <span className="demo-label">Demo stores</span>
          </div>
          <div className="seller-grid">
            {sellers.slice(0, 4).map((s) => (
              <Link key={s.id} to="/store/$id" params={{ id: s.id }} className="seller-card">
                <span className="seller-avatar">{s.initials}</span>
                <div>
                  <h3>{s.name}</h3>
                  <p>
                    {s.category} · {s.location}
                  </p>
                </div>
                <ArrowUpRight className="size-4 ml-auto text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="seller-promotion">
        <div className="container-main">
          <div className="promotion-text">
            <span className="hero-eyebrow">YOUR BUSINESS. A BIGGER OPPORTUNITY.</span>
            <h2>
              Local ambition.
              <br />
              Limitless possibilities.
            </h2>
            <p>
              Give your business a new home on NEXORA. Connect with customers across Addis Ababa,
              tell your story, and grow on your terms.
            </p>
            <Button asChild variant="gold" size="lg">
              <Link to="/become-seller">
                Start your seller journey <ArrowUpRight />
              </Link>
            </Button>
          </div>
          <img
            className="promotion-image"
            src={services}
            alt="Ethiopian home-service professional in a modern apartment"
            width={1024}
            height={768}
            loading="lazy"
          />
        </div>
      </section>
      <section className="section">
        <div className="container-main">
          <div className="section-heading">
            <div>
              <h2 className="section-title">Made for the way you live</h2>
              <p className="section-subtitle">
                A simpler way to discover, connect, and find what matters.
              </p>
            </div>
            <Link to="/about" className="view-link">
              Our story <ArrowRight />
            </Link>
          </div>
          <div className="benefits-grid">
            {[
              {
                Icon: Globe,
                title: "One place. More possibilities.",
                text: "From your next apartment to a pair of headphones, discover seven marketplaces in one destination.",
              },
              {
                Icon: MapPin,
                title: "Closer to what matters.",
                text: "Explore local neighborhoods and businesses. An experience built around life in Addis Ababa.",
              },
              {
                Icon: HeartHandshake,
                title: "People behind every listing.",
                text: "Connect directly, ask your questions, and make decisions with the details you need.",
              },
            ].map((b) => (
              <div key={b.title} className="benefit-item">
                <b.Icon />
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-white">
        <div className="container-main">
          <h2 className="section-title text-center mb-7">From discovery to possibility</h2>
          <div className="benefits-grid">
            {[
              {
                Icon: Search,
                title: "01. Find your thing",
                text: "Explore categories and narrow your search to what fits you.",
              },
              {
                Icon: MessageCircle,
                title: "02. Make a connection",
                text: "Get the details, ask questions, and connect with a seller.",
              },
              {
                Icon: Check,
                title: "03. Make it yours",
                text: "Save a favorite or try the demonstration shopping experience.",
              },
            ].map((b) => (
              <div key={b.title} className="benefit-item">
                <b.Icon />
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 mt-9 pt-6 border-t border-border">
            <div className="flex items-center gap-3">
              <Sparkles className="text-accent size-5" />
              <div>
                <h3 className="text-sm font-semibold">Build something bigger, together.</h3>
                <p className="section-subtitle">
                  Explore business and partnership opportunities with NEXORA.
                </p>
              </div>
            </div>
            <Link to="/partnerships" className="view-link">
              Partner with us <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  );
}
