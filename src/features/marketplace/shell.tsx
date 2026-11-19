import { CurrencySelect, RATES_NOTE } from "./currency";
import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Heart,
  ShoppingBag,
  Search,
  UserRound,
  MapPin,
  ChevronDown,
  Menu,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { categories } from "./data";
import { Logo } from "./components";
import { useMarketplace } from "./store";
export function MarketplaceShell({ children }: { children: ReactNode }) {
  const store = useMarketplace(),
    navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState(""),
    [menu, setMenu] = useState(false);
  function search(e: FormEvent) {
    e.preventDefault();
    navigate({ to: "/search", search: { q: query, category } });
  }
  const links = [
    { to: "/about", label: "About NEXORA" },
    { to: "/become-seller", label: "Become a seller" },
    { to: "/partnerships", label: "Partnerships" },
    { to: "/investors", label: "Investors" },
    { to: "/contact", label: "Contact us" },
  ] as const;
  return (
    <>
      <div className="announcement">
        <div className="container-main">
          <div className="announcement-center">
            <Sparkles />
            <span>A world of possibilities. One Ethiopian marketplace.</span>
          </div>
          <div className="announcement-side">
            <Link to="/become-seller">
              Start selling on NEXORA <ArrowUpRight className="inline size-3" />
            </Link>
            <Link to="/help">Help center</Link>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container-main header-main">
          <Logo />
          <form className="header-search" onSubmit={search}>
            <input
              aria-label="Search marketplace"
              placeholder="What are you looking for today?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              aria-label="Search category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.short}
                </option>
              ))}
            </select>
            <Button type="submit" size="icon" aria-label="Search">
              <Search />
            </Button>
          </form>
          <div className="header-actions">
            <CurrencySelect className="currency-select" />
            <Link className="account-link" to={store.user ? "/account" : "/login"}>
              <UserRound size={21} />
              <div>
                <small>{store.user ? "Welcome back" : "Hello, welcome"}</small>
                <span>{store.user ? store.user.name : "Sign in / Register"}</span>
              </div>
            </Link>
            <Link className="icon-link" to="/wishlist" aria-label="Wishlist" title="Saved listings">
              <Heart />
              {store.wishlist.length > 0 && (
                <span className="counter">{store.wishlist.length}</span>
              )}
            </Link>
            <Link className="icon-link" to="/cart" aria-label="Shopping bag" title="Shopping bag">
              <ShoppingBag />
              <span className="counter">{store.cart.reduce((n, i) => n + i.quantity, 0)}</span>
            </Link>
            <Button
              className="mobile-menu-trigger"
              variant="ghost"
              size="icon"
              onClick={() => setMenu(true)}
              aria-label="Open menu"
            >
              <Menu />
            </Button>
          </div>
        </div>
        <nav className="main-nav" aria-label="Main navigation">
          <div className="container-main nav-inner">
            <Link to="/categories" className="nav-categories">
              <Menu />
              All Categories
              <ChevronDown size={12} />
            </Link>
            {categories.map((c) => (
              <Link key={c.id} to={c.href} className="nav-link" data-active={path === c.href}>
                {c.short}
              </Link>
            ))}
            <Link to="/become-seller" className="sell-nav">
              Become a Seller <ArrowUpRight />
            </Link>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="container-main">
          <div className="footer-grid">
            <div className="footer-brand">
              <Logo />
              <p>
                Everything You Need.
                <br />
                All in One Place.
                <br />
                An Ethiopian marketplace, made for you.
              </p>
              <span className="demo-label">Demo marketplace</span>
            </div>
            <div className="footer-column">
              <h3>Explore</h3>
              {categories.slice(0, 5).map((c) => (
                <Link key={c.id} to={c.href}>
                  {c.short}
                </Link>
              ))}
            </div>
            <div className="footer-column">
              <h3>NEXORA</h3>
              {links.map((l) => (
                <Link key={l.to} to={l.to}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="footer-column">
              <h3>Here to help</h3>
              <Link to="/help">Help center</Link>
              <Link to="/faq">Frequently asked questions</Link>
              <Link to="/account/orders">My orders</Link>
              <Link to="/contact">Get in touch</Link>
              <Link to="/account/settings">Account settings</Link>
            </div>
            <div className="footer-column">
              <h3>Your marketplace</h3>
              <Link to="/account">Customer dashboard</Link>
              <Link to="/seller">Seller dashboard</Link>
              <Link to="/admin">Admin dashboard</Link>
              <Link to="/featured">Featured listings</Link>
              <div className="flex items-center gap-1 text-muted-foreground text-[10px] mt-4">
                <MapPin size={12} /> Addis Ababa, Ethiopia
              </div>
              <select
                className="mt-4 bg-transparent text-[10px] text-muted-foreground"
                aria-label="Language"
                value={store.language}
                onChange={(e) => store.setLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="am">አማርኛ</option>
              </select>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 NEXORA. Made for Ethiopia.</span>
            <span>All listings, stores, and transactions are demonstration content.</span>
            <span>{RATES_NOTE}</span>
          </div>
        </div>
      </footer>
      <Dialog open={menu} onOpenChange={setMenu}>
        <DialogContent className="max-h-[85vh] overflow-y-auto w-[calc(100%-32px)]">
          <DialogTitle>NEXORA</DialogTitle>
          <DialogDescription>Your Ethiopian marketplace</DialogDescription>
          <div className="flex flex-col gap-4">
            <label className="form-label" htmlFor="mobile-currency">Currency</label>
            <CurrencySelect />
            <p className="form-help">{RATES_NOTE}</p>
            <Link to="/login" onClick={() => setMenu(false)}>
              Sign in / Register
            </Link>
            {categories.map((c) => (
              <Link key={c.id} to={c.href} onClick={() => setMenu(false)}>
                {c.name}
              </Link>
            ))}
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setMenu(false)}>
                {l.label}
              </Link>
            ))}
            <Link to="/account" onClick={() => setMenu(false)}>
              My account
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
export function Newsletter() {
  return (
    <section className="newsletter">
      <div className="container-main newsletter-inner">
        <div>
          <h2>A little inspiration in your inbox.</h2>
          <p>Fresh finds, new stores, and the best of NEXORA.</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Demo subscription saved. No real emails will be sent.");
            e.currentTarget.reset();
          }}
        >
          <input
            className="field"
            type="email"
            required
            aria-label="Newsletter email"
            placeholder="Your email address"
          />
          <Button type="submit" className="h-11">
            Subscribe <ArrowUpRight />
          </Button>
        </form>
      </div>
    </section>
  );
}
