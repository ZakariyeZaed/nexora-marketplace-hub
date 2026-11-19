import { Money } from "./currency";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  CheckCircle2,
  LockKeyhole,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMarketplace } from "./store";
import { cartTotal } from "./logic";
import { currency } from "./data";
import { Breadcrumbs, PageHeading, EmptyState } from "./components";
import skyline from '@/assets/addis-skyline.jpg';
export function CartPage() {
  const store = useMarketplace();
  const total = cartTotal(store.cart, store.listings);
  return (
    <div className="container-main">
      <Breadcrumbs label="Your bag" />
      <PageHeading
        title="Good finds, all together."
        description="Your shopping bag. Everything here is part of the NEXORA demo experience."
      />
      {store.cart.length ? (
        <div className="cart-layout">
          <div>
            {store.cart.map((item) => {
              const l = store.listings.find((l) => l.id === item.id);
              if (!l) return null;
              return (
                <div className="cart-row" key={item.id}>
                  <Link to="/listing/$id" params={{ id: l.id }}>
                    <img src={l.images[0]} alt={l.title} width={105} height={80} />
                  </Link>
                  <div>
                    <Link to="/listing/$id" params={{ id: l.id }}>
                      <h3>{l.title}</h3>
                    </Link>
                    <p className="text-xs font-semibold"><Money value={l.price} /></p>
                    <p className="form-help mt-1">
                      {item.variant ? `Size ${item.variant} · ` : ""}
                      {l.location} · Demo listing
                    </p>
                  </div>
                  <div className="quantity">
                    <Button
                      size="icon"
                      variant="ghost"
                      disabled={item.quantity <= 1}
                      aria-label={`Decrease ${l.title} quantity`}
                      onClick={() => store.updateCart(item.id, item.quantity - 1)}
                    >
                      <Minus />
                    </Button>
                    <strong>{item.quantity}</strong>
                    <Button
                      size="icon"
                      variant="ghost"
                      disabled={item.quantity >= 99}
                      aria-label={`Increase ${l.title} quantity`}
                      onClick={() => store.updateCart(item.id, item.quantity + 1)}
                    >
                      <Plus />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove ${l.title}`}
                    onClick={() => store.removeCart(item.id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              );
            })}
            <Button variant="link" asChild className="mt-6 px-0">
              <Link to="/categories">
                Keep exploring <ArrowRight />
              </Link>
            </Button>
          </div>
          <aside className="order-summary">
            <h2>Your bag summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <strong><Money value={total} /></strong>
            </div>
            <div className="summary-row">
              <span>Demo delivery</span>
              <span>Free</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span><Money value={total} /></span>
            </div>
            <Button asChild className="w-full mt-6 h-11">
              <Link to="/checkout">
                Continue to demo checkout <ArrowRight />
              </Link>
            </Button>
            <p className="form-help mt-4">
              <LockKeyhole className="inline size-3 mr-1" />
              No payment will be processed. No items will be shipped.
            </p>
          </aside>
        </div>
      ) : (
        <EmptyState
          title="Your bag is ready for something good."
          description="Find your next everyday favorite and add it to your bag."
        />
      )}
    </div>
  );
}
export function CheckoutPage() {
  const store = useMarketplace(),
    navigate = useNavigate();
  const [done, setDone] = useState("");
  const total = cartTotal(store.cart, store.listings);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const order = store.checkout(`${f.get("address")}, ${f.get("location")}, Addis Ababa`);
    setDone(order.id);
  }
  if (done)
    return (
      <div className="container-main success-panel">
        <CheckCircle2 />
        <h1>Your demo order is confirmed.</h1>
        <p>
          Order {done}. This is a simulation: no payment was collected and nothing will be
          delivered. You can find this order in your customer dashboard.
        </p>
        <Button asChild>
          <Link to="/account/orders">
            View my demo orders <ArrowRight />
          </Link>
        </Button>
      </div>
    );
  if (!store.cart.length)
    return (
      <div className="container-main">
        <EmptyState
          title="Your bag is empty."
          description="Add a product before continuing to demo checkout."
        />
      </div>
    );
  return (
    <div className="container-main">
      <Breadcrumbs label="Demo checkout" />
      <PageHeading
        title="One more step."
        description="Try the NEXORA checkout experience. Please use sample contact details; no real transaction will take place."
      />
      <div className="cart-layout">
        <form className="form-grid" onSubmit={submit}>
          <div>
            <label className="form-label" htmlFor="checkout-name">
              Full name
            </label>
            <input
              id="checkout-name"
              name="name"
              className="field"
              required
              defaultValue={store.user?.name}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="checkout-email">
              Email
            </label>
            <input
              id="checkout-email"
              name="email"
              className="field"
              type="email"
              required
              defaultValue={store.user?.email}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="checkout-phone">
              Phone number
            </label>
            <input
              id="checkout-phone"
              name="phone"
              className="field"
              type="tel"
              required
              pattern="(?:\+251|0)[0-9 ]{9,13}"
              placeholder="+251 9XX XXX XXX"
            />
          </div>
          <div>
            <label className="form-label" htmlFor="checkout-location">
              Neighborhood
            </label>
            <select id="checkout-location" name="location" className="field">
              {["Bole", "CMC", "Kazanchis", "Megenagna", "Ayat", "Gerji"].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
          <div className="full">
            <label className="form-label" htmlFor="checkout-address">
              Sample delivery address
            </label>
            <input
              id="checkout-address"
              name="address"
              className="field"
              required
              minLength={5}
              placeholder="Building name and street"
            />
          </div>
          <div className="full">
            <label className="flex items-start gap-2 text-xs leading-6">
              <input type="checkbox" required className="mt-1" />I understand this is a demo. No
              money will be charged and no delivery will be made.
            </label>
          </div>
          <div className="full">
            <Button type="submit" size="lg">
              Confirm demo order <ArrowRight />
            </Button>
          </div>
        </form>
        <aside className="order-summary">
          <h2>Order summary</h2>
          {store.cart.map((i) => (
            <div key={i.id} className="summary-row">
              <span>
                {store.listings.find((l) => l.id === i.id)?.title} × {i.quantity}
              </span>
            </div>
          ))}
          <div className="summary-row summary-total">
            <span>Total</span>
            <span><Money value={total} /></span>
          </div>
          <p className="form-help mt-4">Payment method: demonstration only.</p>
        </aside>
      </div>
    </div>
  );
}
export function AuthPage({ mode }: { mode: "login" | "register" | "forgot" }) {
  const store = useMarketplace(),
    navigate = useNavigate();
  const [sent, setSent] = useState(false);
  const title =
    mode === "register"
      ? "Make yourself at home."
      : mode === "forgot"
        ? "Let’s get you back in."
        : "Good to see you again.";
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (mode === "forgot") {
      setSent(true);
      return;
    }
    const f = new FormData(e.currentTarget);
    store.login({
      name: String(f.get("name") || String(f.get("email")).split("@")[0]),
      email: String(f.get("email")),
      phone: "",
      role: String(f.get("role") || "customer") as "customer" | "seller" | "admin",
      location: "Bole",
    });
    navigate({
      to:
        f.get("role") === "seller" ? "/seller" : f.get("role") === "admin" ? "/admin" : "/account",
    });
  }
  return (
    <div className="auth-page">
      <div className="auth-visual">
        <img
          src={skyline}
          alt="Addis Ababa skyline"
          width={1920}
          height={1024}
        />
        <div className="auth-visual-content">
          <span className="hero-eyebrow">YOUR EVERYDAY, REIMAGINED.</span>
          <h2>
            More discoveries.
            <br />
            More possibilities.
            <br />
            One NEXORA.
          </h2>
          <p>
            Your next chapter starts with a simple connection. Welcome to your Ethiopian
            marketplace.
          </p>
        </div>
      </div>
      <div className="auth-form-wrap">
        <div className="auth-form">
          {sent ? (
            <>
              <CheckCircle2 className="text-success size-10 mb-5" />
              <h1>Demo reset requested.</h1>
              <p>
                No real email was sent. Return to sign in to enter any sample email and password.
              </p>
              <Button asChild>
                <Link to="/login">Back to sign in</Link>
              </Button>
            </>
          ) : (
            <>
              <span className="demo-label">Demo account</span>
              <h1 className="mt-5">{title}</h1>
              <p>
                {mode === "forgot"
                  ? "Enter a sample email to preview password recovery."
                  : "Explore with a sample account. No real credentials or account are created."}
              </p>
              <form onSubmit={submit}>
                {mode === "register" && (
                  <div>
                    <label htmlFor="auth-name" className="form-label">
                      Full name
                    </label>
                    <input
                      id="auth-name"
                      className="field"
                      name="name"
                      required
                      minLength={2}
                      placeholder="Your name"
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="auth-email" className="form-label">
                    Email address
                  </label>
                  <input
                    id="auth-email"
                    className="field"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                  />
                </div>
                {mode !== "forgot" && (
                  <>
                    <div>
                      <label htmlFor="auth-password" className="form-label">
                        Password
                      </label>
                      <input
                        id="auth-password"
                        className="field"
                        name="password"
                        type="password"
                        required
                        minLength={8}
                        placeholder="At least 8 characters"
                      />
                      <p className="form-help mt-2">
                        Use a sample password, not your real password. It is never saved.
                      </p>
                    </div>
                    <div>
                      <label htmlFor="auth-role" className="form-label">
                        Demo account type
                      </label>
                      <select id="auth-role" className="field" name="role">
                        <option value="customer">Customer</option>
                        <option value="seller">Seller</option>
                        <option value="admin">Admin (demo only)</option>
                      </select>
                    </div>
                    {mode === "register" && (
                      <label className="flex gap-2 text-xs">
                        <input type="checkbox" required />I understand this is a demonstration
                        account.
                      </label>
                    )}
                    {mode === "login" && (
                      <Link to="/forgot-password" className="text-xs text-primary">
                        Forgot password?
                      </Link>
                    )}
                  </>
                )}
                <Button type="submit" className="h-11">
                  {mode === "login"
                    ? "Sign in to demo"
                    : mode === "register"
                      ? "Create demo account"
                      : "Request demo reset"}
                  <ArrowRight />
                </Button>
              </form>
              <p className="form-help">
                {mode === "login" ? (
                  <>
                    New to NEXORA?{" "}
                    <Link to="/register" className="text-primary font-semibold">
                      Join the marketplace
                    </Link>
                  </>
                ) : (
                  <Link to="/login" className="text-primary font-semibold">
                    Back to sign in
                  </Link>
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
