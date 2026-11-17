import { useState, type FormEvent, type ReactNode } from "react";
import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  UserRound,
  ShoppingBag,
  Heart,
  Building2,
  MessageCircle,
  Settings,
  Store,
  List,
  Plus,
  BarChart3,
  Users,
  CheckCircle2,
  Layers,
  CreditCard,
  LogOut,
  Pencil,
  Trash2,
  Check,
  X,
  ArrowRight,
  Download,
  Search,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useMarketplace, type DemoUser } from "./store";
import {
  categories,
  currency,
  initialListings,
  neighborhoods,
  sellers,
  type CategoryId,
  type Listing,
} from "./data";
import { ListingGrid, EmptyState } from "./components";
export type DashboardRole = "customer" | "seller" | "admin";
const navigation = {
  customer: [
    { to: "/account", name: "Overview", Icon: LayoutDashboard },
    { to: "/account/profile", name: "My profile", Icon: UserRound },
    { to: "/account/orders", name: "My orders", Icon: ShoppingBag },
    { to: "/account/wishlist", name: "Wishlist", Icon: Heart },
    { to: "/account/properties", name: "Saved properties", Icon: Building2 },
    { to: "/account/inquiries", name: "My inquiries", Icon: MessageCircle },
    { to: "/account/settings", name: "Account settings", Icon: Settings },
  ],
  seller: [
    { to: "/seller", name: "Overview", Icon: LayoutDashboard },
    { to: "/seller/listings", name: "My listings", Icon: List },
    { to: "/seller/add", name: "Add new listing", Icon: Plus },
    { to: "/seller/orders", name: "Orders", Icon: ShoppingBag },
    { to: "/seller/inquiries", name: "Customer inquiries", Icon: MessageCircle },
    { to: "/seller/profile", name: "Store profile", Icon: Store },
    { to: "/seller/settings", name: "Store settings", Icon: Settings },
    { to: "/seller/plans", name: "Subscription plans", Icon: CreditCard },
    { to: "/seller/analytics", name: "Sales analytics", Icon: BarChart3 },
  ],
  admin: [
    { to: "/admin", name: "Overview", Icon: LayoutDashboard },
    { to: "/admin/users", name: "User management", Icon: Users },
    { to: "/admin/sellers", name: "Seller management", Icon: Store },
    { to: "/admin/listings", name: "Listing management", Icon: List },
    { to: "/admin/approvals", name: "Listing approvals", Icon: CheckCircle2 },
    { to: "/admin/categories", name: "Category management", Icon: Layers },
    { to: "/admin/orders", name: "Order management", Icon: ShoppingBag },
    { to: "/admin/reports", name: "Reports & analytics", Icon: BarChart3 },
    { to: "/admin/settings", name: "Platform settings", Icon: Settings },
  ],
} as const;
export function DashboardLayout({ role }: { role: DashboardRole }) {
  const store = useMarketplace(),
    navigate = useNavigate(),
    path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <h3>
          {role === "customer"
            ? "Your NEXORA"
            : role === "seller"
              ? "Seller workspace"
              : "Platform administration"}
        </h3>
        <nav className="dashboard-nav" aria-label={`${role} dashboard`}>
          {navigation[role].map((n) => (
            <Link key={n.to} to={n.to} data-active={path === n.to}>
              <n.Icon />
              {n.name}
            </Link>
          ))}
        </nav>
        <div className="dashboard-switch">
          <Link to="/account">
            <UserRound />
            Customer demo
          </Link>
          <Link to="/seller">
            <Store />
            Seller demo
          </Link>
          <Link to="/admin">
            <Settings />
            Admin demo
          </Link>
          {store.user && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                store.logout();
                navigate({ to: "/" });
              }}
            >
              <LogOut />
              Sign out
            </Button>
          )}
        </div>
      </aside>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}
function DashboardHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="dashboard-heading">
      <div>
        <h1>{title}</h1>
        <p>{description ?? "Demonstration workspace · Sample activity only"}</p>
      </div>
      {action ?? <span className="demo-label">Demo workspace</span>}
    </div>
  );
}
function Stats({ items }: { items: { label: string; value: string; detail: string }[] }) {
  return (
    <div className="stats-grid">
      {items.map((i) => (
        <div key={i.label} className="stat-card">
          <p>{i.label}</p>
          <strong>{i.value}</strong>
          <small>{i.detail}</small>
        </div>
      ))}
    </div>
  );
}
const salesData = [
  { month: "Jun", revenue: 48000 },
  { month: "Jul", revenue: 62000 },
  { month: "Aug", revenue: 55000 },
  { month: "Sep", revenue: 88000 },
  { month: "Oct", revenue: 103000 },
  { month: "Nov", revenue: 125000 },
];
function AnalyticsChart() {
  const { ready } = useMarketplace();
  return (
    <div className="chart-area">
      {ready && (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesData} margin={{ top: 10, right: 15, left: 0, bottom: 5 }}>
            <CartesianGrid stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
              tickFormatter={(v) => `${v / 1000}k`}
            />
            <Tooltip formatter={(v) => currency(Number(v))} />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Demo revenue"
              fill="var(--gold-soft)"
              stroke="var(--accent)"
              strokeWidth={2}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
export function DashboardOverview({ role }: { role: DashboardRole }) {
  const store = useMarketplace();
  const pending = store.listings.filter((l) => l.status === "pending");
  const title =
    role === "customer"
      ? `Welcome${store.user ? `, ${store.user.name}` : " to your NEXORA"}.`
      : role === "seller"
        ? "A good day to grow."
        : "Your platform, at a glance.";
  const stats =
    role === "customer"
      ? [
          {
            label: "Your demo orders",
            value: String(store.orders.length),
            detail: "Your browser session",
          },
          {
            label: "Saved favorites",
            value: String(store.wishlist.length),
            detail: "A few things you love",
          },
          {
            label: "Saved properties",
            value: String(
              store.listings.filter(
                (l) => l.category === "real-estate" && store.wishlist.includes(l.id),
              ).length,
            ),
            detail: "Your next chapter",
          },
          {
            label: "Demo inquiries",
            value: String(store.inquiries.length),
            detail: "Your conversations",
          },
        ]
      : role === "seller"
        ? [
            { label: "Demo revenue", value: currency(125000), detail: "Simulated November sales" },
            {
              label: "Active listings",
              value: String(
                store.listings.filter((l) => l.seller === "addis-homes" && l.status === "active")
                  .length,
              ),
              detail: "Sample store listings",
            },
            {
              label: "Pending listings",
              value: String(pending.filter((l) => l.seller === "addis-homes").length),
              detail: "Awaiting demo review",
            },
            {
              label: "Demo inquiries",
              value: String(store.inquiries.length),
              detail: "Browser-session activity",
            },
          ]
        : [
            { label: "Demo users", value: "48", detail: "Simulated customer accounts" },
            {
              label: "Sample stores",
              value: String(sellers.length),
              detail: "Demonstration vendors",
            },
            {
              label: "Total listings",
              value: String(store.listings.length),
              detail: "Sample inventory",
            },
            {
              label: "Pending approvals",
              value: String(pending.length),
              detail: "Ready for demo review",
            },
          ];
  return (
    <>
      <DashboardHeading
        title={title}
        action={
          role === "seller" ? (
            <Button asChild>
              <Link to="/seller/add">
                <Plus />
                Add listing
              </Link>
            </Button>
          ) : undefined
        }
      />
      <Stats items={stats} />
      {role === "customer" ? (
        <>
          <div className="section-heading">
            <h2 className="text-lg font-semibold">Recent orders</h2>
            <Link className="view-link" to="/account/orders">
              All orders <ArrowRight />
            </Link>
          </div>
          <OrdersTable compact />
          <div className="section-heading mt-8">
            <h2 className="text-lg font-semibold">Your saved discoveries</h2>
            <Link className="view-link" to="/account/wishlist">
              All saved <ArrowRight />
            </Link>
          </div>
          {store.wishlist.length ? (
            <ListingGrid
              listings={store.listings.filter((l) => store.wishlist.includes(l.id)).slice(0, 4)}
            />
          ) : (
            <EmptyState
              title="A little inspiration for your everyday."
              description="Save the listings you love and keep them here for later."
            />
          )}
        </>
      ) : (
        <>
          <div className="section-heading">
            <div>
              <h2 className="text-lg font-semibold">
                {role === "seller" ? "Sales at a glance" : "Marketplace activity"}
              </h2>
              <p className="section-subtitle">Simulated June–November 2026 · ETB</p>
            </div>
            <Link
              to={role === "seller" ? "/seller/analytics" : "/admin/reports"}
              className="view-link"
            >
              View analytics <ArrowRight />
            </Link>
          </div>
          <AnalyticsChart />
          <div className="section-heading">
            <h2 className="text-lg font-semibold">
              {role === "seller" ? "Your latest listings" : "Awaiting approval"}
            </h2>
            <Link
              to={role === "seller" ? "/seller/listings" : "/admin/approvals"}
              className="view-link"
            >
              View all <ArrowRight />
            </Link>
          </div>
          <ListingTable role={role} compact />
        </>
      )}
    </>
  );
}
export function ListingManagement({
  role,
  approvals = false,
}: {
  role: "seller" | "admin";
  approvals?: boolean;
}) {
  return (
    <>
      <DashboardHeading
        title={
          approvals
            ? "Ready for a closer look."
            : role === "seller"
              ? "Your listings. Your possibilities."
              : "All marketplace listings."
        }
        action={
          role === "seller" ? (
            <Button asChild>
              <Link to="/seller/add">
                <Plus />
                Add new listing
              </Link>
            </Button>
          ) : undefined
        }
      />
      <ListingTable role={role} approvals={approvals} />
    </>
  );
}
function ListingTable({
  role,
  approvals = false,
  compact = false,
}: {
  role: "seller" | "admin";
  approvals?: boolean;
  compact?: boolean;
}) {
  const store = useMarketplace();
  const [query, setQuery] = useState(""),
    [status, setStatus] = useState(""),
    [limit, setLimit] = useState(compact ? 5 : 10),
    [deleting, setDeleting] = useState<string | null>(null);
  const rows = store.listings.filter(
    (l) =>
      (role === "admin" || l.seller === "addis-homes") &&
      (!approvals || l.status === "pending") &&
      (!status || l.status === status) &&
      l.title.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      {!compact && (
        <div className="browse-toolbar">
          <input
            className="field max-w-sm"
            aria-label="Search managed listings"
            placeholder="Search your listings…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(10);
            }}
          />
          {!approvals && (
            <select
              className="field"
              aria-label="Listing status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All statuses</option>
              <option>active</option>
              <option>pending</option>
              <option>rejected</option>
            </select>
          )}
        </div>
      )}
      {rows.length ? (
        <>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Listing</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, limit).map((l) => (
                  <tr key={l.id}>
                    <td>
                      <Link to="/listing/$id" params={{ id: l.id }} className="table-listing">
                        <img src={l.images[0]} alt="" width={45} height={36} />
                        <span>{l.title}</span>
                      </Link>
                    </td>
                    <td className="whitespace-nowrap">{currency(l.price)}</td>
                    <td>
                      <span className={`status ${l.status}`}>{l.status}</span>
                    </td>
                    <td>{l.location}</td>
                    <td>
                      <div className="table-actions">
                        {role === "admin" && l.status !== "active" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Approve ${l.title}`}
                            title="Approve listing"
                            onClick={() => store.moderate(l.id, "active")}
                          >
                            <Check className="text-success" />
                          </Button>
                        )}
                        {role === "admin" && l.status !== "rejected" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Reject ${l.title}`}
                            title="Reject listing"
                            onClick={() => store.moderate(l.id, "rejected")}
                          >
                            <X className="text-destructive" />
                          </Button>
                        )}
                        <Button asChild variant="ghost" size="icon" title="Edit listing">
                          <Link
                            to="/seller/listings/$id/edit"
                            params={{ id: l.id }}
                            aria-label={`Edit ${l.title}`}
                          >
                            <Pencil />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Delete ${l.title}`}
                          title="Delete listing"
                          onClick={() => setDeleting(l.id)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!compact && limit < rows.length && (
            <Button variant="outline" className="mt-5" onClick={() => setLimit((n) => n + 10)}>
              Load more listings
            </Button>
          )}
        </>
      ) : (
        <EmptyState
          title={approvals ? "All caught up." : "No listings match your search."}
          description={
            approvals
              ? "No demo listings are waiting for approval."
              : "Try another search, or create your next sample listing."
          }
        />
      )}
      <Dialog
        open={Boolean(deleting)}
        onOpenChange={(v) => {
          if (!v) setDeleting(null);
        }}
      >
        <DialogContent className="w-[calc(100%-32px)]">
          <DialogTitle>Delete this demo listing?</DialogTitle>
          <DialogDescription>
            This removes the listing from your current demo session. This action cannot be undone.
          </DialogDescription>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleting(null)}>
              Keep listing
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (deleting) store.deleteListing(deleting);
                setDeleting(null);
              }}
            >
              Delete listing
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
export function ListingForm({ id }: { id?: string }) {
  const store = useMarketplace(),
    navigate = useNavigate();
  const existing = store.listings.find((l) => l.id === id);
  const [category, setCategory] = useState<CategoryId>(existing?.category ?? "real-estate"),
    [photo, setPhoto] = useState(existing?.images[0] ?? ""),
    [purpose, setPurpose] = useState(existing?.purpose ?? "Sale");
  const cat = categories.find((c) => c.id === category);
  const input = (
    label: string,
    name: string,
    type = "text",
    defaultValue?: string | number,
    required = true,
  ) => (
    <div>
      <label className="form-label" htmlFor={`listing-${name}`}>
        {label}
      </label>
      <input
        className="field"
        id={`listing-${name}`}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        min={type === "number" ? 0 : undefined}
      />
    </div>
  );
  if (id && !existing)
    return (
      <EmptyState
        title="This listing was removed."
        description="Create a new sample listing from your seller workspace."
      />
    );
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const base = initialListings.find((l) => l.category === category);
    if (!base) return;
    const bedrooms = Number(f.get("bedrooms") || 3),
      bathrooms = Number(f.get("bathrooms") || 2),
      size = Number(f.get("size") || 120);
    const listing: Listing = {
      ...base,
      ...existing,
      id: existing?.id ?? `custom-${Date.now()}`,
      title: String(f.get("title")),
      category,
      type: String(f.get("type")),
      price: Number(f.get("price")),
      location: String(f.get("location")),
      description: String(f.get("description")),
      brand: String(f.get("brand") || base.brand),
      images: photo ? [photo] : base.images,
      seller: "addis-homes",
      status: "pending",
      purpose,
      created: Date.now(),
      featured: false,
      condition: String(f.get("condition")),
      availability: "In stock",
      bedrooms,
      bathrooms,
      size,
      furnished: f.get("furnished") === "Yes",
      year: Number(f.get("year") || 2022),
      fuel: String(f.get("fuel") || "Petrol"),
      transmission: String(f.get("transmission") || "Automatic"),
      specs:
        category === "real-estate"
          ? {
              Bedrooms: String(bedrooms),
              Bathrooms: String(bathrooms),
              Area: `${size} m²`,
              Furnished: String(f.get("furnished")),
              Purpose: purpose,
            }
          : category === "vehicles"
            ? {
                Year: String(f.get("year")),
                Fuel: String(f.get("fuel")),
                Transmission: String(f.get("transmission")),
              }
            : base.specs,
    };
    store.saveListing(listing);
    navigate({ to: "/seller/listings" });
  }
  return (
    <>
      <DashboardHeading
        title={existing ? "Give your listing a fresh look." : "A new listing. A new possibility."}
        description="Create sample inventory. Every saved listing enters the demo approval queue."
      />
      <div className="form-panel">
        <form key={id ?? "new"} onSubmit={submit}>
          <div className="form-grid">
            {input("Listing title", "title", "text", existing?.title)}
            <div>
              <label htmlFor="listing-category" className="form-label">
                Category
              </label>
              <select
                id="listing-category"
                className="field"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value as CategoryId);
                  setPhoto("");
                }}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="listing-type" className="form-label">
                Listing type
              </label>
              <select
                key={category}
                id="listing-type"
                name="type"
                className="field"
                defaultValue={existing?.type}
              >
                {cat?.types.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            {input("Price (ETB)", "price", "number", existing?.price)}
            <div>
              <label htmlFor="listing-location" className="form-label">
                Neighborhood
              </label>
              <select
                id="listing-location"
                name="location"
                className="field"
                defaultValue={existing?.location ?? "Bole"}
              >
                {neighborhoods.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="listing-condition" className="form-label">
                Condition
              </label>
              <select
                id="listing-condition"
                name="condition"
                className="field"
                defaultValue={existing?.condition}
              >
                <option>New</option>
                <option>Used — excellent</option>
              </select>
            </div>
            {(category === "real-estate" || category === "vehicles") && (
              <div>
                <label htmlFor="listing-purpose" className="form-label">
                  Rent or sale
                </label>
                <select
                  id="listing-purpose"
                  className="field"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value as "Sale" | "Rent")}
                >
                  <option>Sale</option>
                  <option>Rent</option>
                </select>
              </div>
            )}
            {category === "real-estate" && (
              <>
                {input("Bedrooms", "bedrooms", "number", existing?.bedrooms ?? 3)}
                {input("Bathrooms", "bathrooms", "number", existing?.bathrooms ?? 2)}
                {input("Area (m²)", "size", "number", existing?.size ?? 120)}
                <div>
                  <label htmlFor="listing-furnished" className="form-label">
                    Furnished
                  </label>
                  <select
                    id="listing-furnished"
                    className="field"
                    name="furnished"
                    defaultValue={existing?.furnished ? "Yes" : "No"}
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
              </>
            )}
            {category === "vehicles" && (
              <>
                {input("Model year", "year", "number", existing?.year ?? 2022)}
                {input("Brand / model", "brand", "text", existing?.brand ?? "Toyota")}
                <div>
                  <label htmlFor="listing-fuel" className="form-label">
                    Fuel
                  </label>
                  <select id="listing-fuel" name="fuel" className="field">
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>Hybrid</option>
                    <option>Electric</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="listing-transmission" className="form-label">
                    Transmission
                  </label>
                  <select id="listing-transmission" name="transmission" className="field">
                    <option>Automatic</option>
                    <option>Manual</option>
                  </select>
                </div>
              </>
            )}
            {!["real-estate", "vehicles", "services"].includes(category) &&
              input("Brand", "brand", "text", existing?.brand, false)}
            <div className="full">
              <label htmlFor="listing-description" className="form-label">
                Description
              </label>
              <textarea
                id="listing-description"
                name="description"
                className="field"
                required
                minLength={20}
                defaultValue={existing?.description}
                placeholder="Share the details that make this listing worth discovering."
              />
            </div>
            <div className="full">
              <label htmlFor="listing-photo" className="form-label">
                Photo (optional)
              </label>
              <input
                id="listing-photo"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (file.size > 3000000) {
                    toast.error("Please choose an image smaller than 3MB for the demo.");
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (typeof reader.result === "string") setPhoto(reader.result);
                  };
                  reader.readAsDataURL(file);
                }}
              />
              {photo && (
                <img
                  className="mt-4 rounded-md w-40 h-28 object-cover"
                  src={photo}
                  alt="Listing preview"
                />
              )}
              <p className="form-help mt-3">
                Without an upload, this demo uses a representative photo for your category.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button type="submit" size="lg">
              <Check />
              Save for demo approval
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/seller/listings">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
export function OrdersPage({ role }: { role: DashboardRole }) {
  return (
    <>
      <DashboardHeading
        title={role === "customer" ? "Your orders, all together." : "Order activity."}
      />
      <OrdersTable />
    </>
  );
}
function OrdersTable({ compact = false }: { compact?: boolean }) {
  const store = useMarketplace();
  if (!store.orders.length)
    return (
      <EmptyState
        title="No demo orders yet."
        description="Try adding a product to your bag and completing demo checkout. Your order will appear here."
      />
    );
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {store.orders.slice(0, compact ? 5 : 100).map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{new Date(o.date).toLocaleDateString("en-GB")}</td>
              <td>{o.items.reduce((n, i) => n + i.quantity, 0)}</td>
              <td className="whitespace-nowrap">{currency(o.total)}</td>
              <td>
                <span className="status completed">{o.status}</span>
              </td>
              <td>
                <Button variant="ghost" size="icon" asChild>
                  <Link
                    to="/account/orders/$id"
                    params={{ id: o.id }}
                    aria-label={`View order ${o.id}`}
                  >
                    <ArrowRight />
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function OrderDetail({ id }: { id: string }) {
  const store = useMarketplace();
  const o = store.orders.find((o) => o.id === id);
  if (!o)
    return (
      <EmptyState
        title="This order isn't in your demo session."
        description="Demo orders are saved only in the browser where you placed them."
      />
    );
  return (
    <>
      <DashboardHeading
        title="A closer look at your order."
        description={`${o.id} · ${new Date(o.date).toLocaleDateString("en-GB")}`}
      />
      <div className="order-summary max-w-3xl">
        <span className="status completed">{o.status}</span>
        <div className="mt-5">
          <h2>Sample delivery details</h2>
          <p className="form-help">{o.address}</p>
          <p className="form-help mt-2">No real delivery will be made.</p>
        </div>
        {o.items.map((item) => {
          const l = store.listings.find((l) => l.id === item.id);
          return (
            <div key={item.id} className="cart-row">
              {l && <img src={l.images[0]} alt={l.title} width={105} height={80} />}
              <div>
                <h3>{l?.title ?? "Removed listing"}</h3>
                <p className="form-help">
                  Quantity: {item.quantity}
                  {item.variant ? ` · Size ${item.variant}` : ""}
                </p>
              </div>
              <strong className="ml-auto">{currency((l?.price ?? 0) * item.quantity)}</strong>
            </div>
          );
        })}
        <div className="summary-row summary-total">
          <span>Demo total</span>
          <span>{currency(o.total)}</span>
        </div>
      </div>
    </>
  );
}
export function InquiriesPage({ role }: { role: DashboardRole }) {
  const store = useMarketplace(),
    [reply, setReply] = useState<string | null>(null);
  return (
    <>
      <DashboardHeading
        title={role === "customer" ? "Your conversations start here." : "Customer inquiries."}
      />
      {store.inquiries.length ? (
        store.inquiries.map((i) => (
          <div key={i.id} className="inquiry-item">
            <div className="flex justify-between gap-4">
              <h3>{i.title}</h3>
              <span className="status">{i.status}</span>
            </div>
            <p>{i.message}</p>
            <small>
              {i.name} · {new Date(i.date).toLocaleDateString("en-GB")} · Demo message
            </small>
            {role !== "customer" && (
              <Button variant="outline" size="sm" className="mt-3" onClick={() => setReply(i.id)}>
                <MessageCircle />
                Reply
              </Button>
            )}
          </div>
        ))
      ) : (
        <EmptyState
          title="No conversations just yet."
          description="Ask a question on any listing. Your demo inquiry will be saved here."
        />
      )}
      <Dialog
        open={Boolean(reply)}
        onOpenChange={(v) => {
          if (!v) setReply(null);
        }}
      >
        <DialogContent className="w-[calc(100%-32px)]">
          <DialogTitle>A thoughtful reply.</DialogTitle>
          <DialogDescription>
            This reply is simulated. No actual message will be sent.
          </DialogDescription>
          <form
            className="modal-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (reply) store.reply(reply);
              setReply(null);
            }}
          >
            <textarea aria-label="Reply message" className="field" required minLength={10} />
            <Button type="submit">Save demo reply</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
export function ProfilePage({ storeProfile = false }: { storeProfile?: boolean }) {
  const store = useMarketplace();
  const user: DemoUser = store.user ?? {
    name: "Demo Customer",
    email: "demo@example.com",
    phone: "",
    location: "Bole",
    role: "customer",
  };
  return (
    <>
      <DashboardHeading
        title={storeProfile ? "A store with your story." : "A little more about you."}
      />
      <div className="form-panel">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            if (storeProfile) {
              store.manage("store-name", String(f.get("name")));
              store.manage("store-description", String(f.get("description")));
              store.manage("store-location", String(f.get("location")));
              store.manage("store-email", String(f.get("email")));
              store.manage("store-phone", String(f.get("phone")));
            } else
              store.saveUser({
                ...user,
                name: String(f.get("name")),
                email: String(f.get("email")),
                phone: String(f.get("phone")),
                location: String(f.get("location")),
              });
          }}
        >
          <div className="form-grid">
            <div>
              <label htmlFor="profile-name" className="form-label">
                {storeProfile ? "Store name" : "Full name"}
              </label>
              <input
                id="profile-name"
                name="name"
                className="field"
                required
                minLength={2}
                defaultValue={
                  storeProfile ? (store.management["store-name"] ?? "Addis Homes") : user.name
                }
              />
            </div>
            <div>
              <label htmlFor="profile-email" className="form-label">
                Contact email
              </label>
              <input
                id="profile-email"
                name="email"
                type="email"
                className="field"
                required
                defaultValue={storeProfile ? store.management['store-email'] ?? user.email : user.email}
              />
            </div>
            <div>
              <label htmlFor="profile-phone" className="form-label">
                Phone number
              </label>
              <input
                id="profile-phone"
                name="phone"
                type="tel"
                className="field"
                defaultValue={storeProfile ? store.management['store-phone'] ?? user.phone : user.phone}
                placeholder="+251 9XX XXX XXX"
                pattern="(?:\+251|0)[0-9 ]{9,13}"
              />
            </div>
            <div>
              <label htmlFor="profile-location" className="form-label">
                Neighborhood
              </label>
              <select
                id="profile-location"
                name="location"
                className="field"
                defaultValue={
                  storeProfile ? (store.management["store-location"] ?? "Bole") : user.location
                }
              >
                {neighborhoods.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
            {storeProfile && (
              <div className="full">
                <label htmlFor="store-description" className="form-label">
                  Your store story
                </label>
                <textarea
                  id="store-description"
                  name="description"
                  className="field"
                  required
                  minLength={20}
                  defaultValue={
                    store.management["store-description"] ??
                    "Thoughtfully selected homes and properties across Addis Ababa. A sample NEXORA store."
                  }
                />
              </div>
            )}
          </div>
          <Button type="submit" size="lg">
            Save demo {storeProfile ? "store" : "profile"} <Check />
          </Button>
          {storeProfile && (
            <Button asChild variant="outline" size="lg">
              <Link to="/store/$id" params={{ id: "addis-homes" }}>
                View sample store
              </Link>
            </Button>
          )}
          <p className="form-help">
            Use sample contact details. Your changes are saved in this browser only.
          </p>
        </form>
      </div>
    </>
  );
}
export function SettingsPage({ role }: { role: DashboardRole }) {
  const store = useMarketplace();
  const options =
    role === "customer"
      ? [
          {
            key: "notifications",
            label: "Demo order notifications",
            description: "Preview your preferred account notification setting.",
          },
          {
            key: "newsletter",
            label: "Marketplace updates",
            description: "Save your preference. No real emails are sent.",
          },
        ]
      : role === "seller"
        ? [
            {
              key: "storeOpen",
              label: "Store accepting demo inquiries",
              description: "Set your sample store’s availability.",
            },
            {
              key: "notifications",
              label: "Listing and inquiry notifications",
              description: "Your demo notification preference.",
            },
          ]
        : [
            {
              key: "approvalRequired",
              label: "Listing approval workflow",
              description: "Preview the platform’s listing review setting.",
            },
            {
              key: "notifications",
              label: "Administration notifications",
              description: "Your demo platform activity preference.",
            },
          ];
  return (
    <>
      <DashboardHeading
        title={
          role === "admin"
            ? "A platform that fits your vision."
            : role === "seller"
              ? "Set your store up your way."
              : "Make NEXORA feel like you."
        }
      />
      <div className="form-panel">
        {options.map((o) => (
          <div
            key={o.key}
            className="flex items-center justify-between py-6 border-b border-border gap-5"
          >
            <div>
              <h2 className="text-sm font-semibold">{o.label}</h2>
              <p className="form-help mt-2">{o.description}</p>
            </div>
            <input
              type="checkbox"
              role="switch"
              aria-label={o.label}
              className="size-5 accent-primary shrink-0"
              checked={Boolean(store.settings[o.key])}
              onChange={(e) => store.setSetting(o.key, e.target.checked)}
            />
          </div>
        ))}
        <div className="py-7">
          <label htmlFor="settings-language" className="form-label">
            Language
          </label>
          <select
            id="settings-language"
            className="field max-w-sm"
            value={store.language}
            onChange={(e) => store.setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="am">አማርኛ (preview — translations coming soon)</option>
          </select>
        </div>
        <p className="form-help">
          These preferences are demonstration only. No real services are configured.
        </p>
      </div>
    </>
  );
}
export function AnalyticsPage({ admin = false }: { admin?: boolean }) {
  const store = useMarketplace();
  function exportReport() {
    const csv =
      "Month,Demo Revenue ETB\n" + salesData.map((d) => `${d.month},${d.revenue}`).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "nexora-demo-analytics.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Sample analytics exported");
  }
  return (
    <>
      <DashboardHeading
        title={admin ? "A wider view of your marketplace." : "See the bigger picture."}
        action={
          <Button variant="outline" onClick={exportReport}>
            <Download />
            Export demo report
          </Button>
        }
      />
      <Stats
        items={[
          { label: "Demo revenue", value: currency(481000), detail: "Simulated 6-month total" },
          { label: "Demo orders", value: "64", detail: "Sample sales volume" },
          { label: "Sample conversion", value: "3.2%", detail: "Illustrative only" },
          { label: "Demo average order", value: currency(7515), detail: "Illustrative only" },
        ]}
      />
      <h2 className="text-lg font-semibold">Demo revenue by month</h2>
      <p className="section-subtitle">
        Illustrative sample figures, not actual business performance.
      </p>
      <AnalyticsChart />
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Demo revenue (ETB)</th>
              <th>Data source</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((d) => (
              <tr key={d.month}>
                <td>{d.month} 2026</td>
                <td>{currency(d.revenue)}</td>
                <td>Simulated dataset</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export function PlansPage() {
  const store = useMarketplace();
  const plans = [
    {
      name: "Starter",
      price: "Free",
      features: ["5 sample listings", "Sample storefront", "Demo inquiries"],
    },
    {
      name: "Growth",
      price: "ETB 999 / month",
      features: ["50 sample listings", "Illustrative analytics", "Featured placement preview"],
    },
    {
      name: "Business",
      price: "ETB 2,499 / month",
      features: [
        "Unlimited sample listings",
        "Advanced analytics preview",
        "Priority support concept",
      ],
    },
  ];
  return (
    <>
      <DashboardHeading
        title="A little room to grow."
        description="Illustrative subscription plans. These are sample prices, not live offers."
      />
      <div className="plan-grid">
        {plans.map((p) => (
          <div key={p.name} className={`plan-card ${store.plan === p.name ? "selected" : ""}`}>
            <span className="demo-label">Demo plan</span>
            <h2 className="mt-5">{p.name}</h2>
            <strong>{p.price}</strong>
            <ul>
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Button
              className="w-full"
              variant={store.plan === p.name ? "gold" : "outline"}
              onClick={() => store.selectPlan(p.name)}
            >
              {store.plan === p.name ? (
                <>
                  <Check />
                  Selected
                </>
              ) : (
                "Select demo plan"
              )}
            </Button>
            <p>No charge. No real subscription.</p>
          </div>
        ))}
      </div>
    </>
  );
}
export function AdminRecords({ kind }: { kind: "users" | "sellers" | "categories" }) {
  const store = useMarketplace();
  const [query, setQuery] = useState(""),
    [editing, setEditing] = useState<string | null>(null);
  const records =
    kind === "users"
      ? [
          {
            id: "user-demo-1",
            name: store.user?.name ?? "Hana Bekele (sample)",
            detail: store.user?.email ?? "hana@example.com",
          },
          { id: "user-demo-2", name: "Dawit Tesfaye (sample)", detail: "dawit@example.com" },
          { id: "user-demo-3", name: "Selam Alemu (sample)", detail: "selam@example.com" },
        ]
      : kind === "sellers"
        ? sellers.map((s) => ({ id: s.id, name: s.name, detail: `${s.category} · ${s.location}` }))
        : categories.map((c) => ({
            id: c.id,
            name: c.name,
            detail: `${store.listings.filter((l) => l.category === c.id).length} sample listings`,
          }));
  return (
    <>
      <DashboardHeading
        title={
          kind === "users"
            ? "The people in your marketplace."
            : kind === "sellers"
              ? "The businesses behind the listings."
              : "Seven worlds. One marketplace."
        }
      />
      <input
        className="field max-w-sm mb-6"
        aria-label={`Search ${kind}`}
        placeholder={`Search ${kind}…`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>{kind === "categories" ? "Category" : "Name"}</th>
              <th>Details</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records
              .filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))
              .map((r) => (
                <tr key={r.id}>
                  <td>{store.management[`name-${r.id}`] ?? r.name}</td>
                  <td>{r.detail}</td>
                  <td>
                    <span className={`status ${store.management[r.id] ?? "active"}`}>
                      {store.management[r.id] ?? "active"} · demo
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      {kind === "categories" ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Edit ${r.name}`}
                          title="Edit category"
                          onClick={() => setEditing(r.id)}
                        >
                          <Pencil />
                        </Button>
                      ) : null}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          store.manage(
                            r.id,
                            store.management[r.id] === "suspended" ? "active" : "suspended",
                          )
                        }
                      >
                        {store.management[r.id] === "suspended"
                          ? "Activate"
                          : kind === "categories"
                            ? "Toggle visibility"
                            : "Suspend"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <p className="form-help mt-5">
        All records and management actions are simulated. Category labels and status changes apply
        to this demo workspace.
      </p>
      <Dialog
        open={Boolean(editing)}
        onOpenChange={(v) => {
          if (!v) setEditing(null);
        }}
      >
        <DialogContent className="w-[calc(100%-32px)]">
          <DialogTitle>Edit sample category</DialogTitle>
          <DialogDescription>
            This updates the category label in your demo management table.
          </DialogDescription>
          <form
            className="modal-form"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              if (editing) store.manage(`name-${editing}`, String(f.get("name")));
              setEditing(null);
            }}
          >
            <input
              name="name"
              className="field"
              aria-label="Category name"
              required
              defaultValue={records.find((r) => r.id === editing)?.name}
            />
            <Button type="submit">Save demo category</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
export function DashboardSaved({ properties = false }: { properties?: boolean }) {
  const store = useMarketplace();
  const rows = store.listings.filter(
    (l) => store.wishlist.includes(l.id) && (!properties || l.category === "real-estate"),
  );
  return (
    <>
      <DashboardHeading
        title={properties ? "A home for your next chapter." : "A few of your favorite things."}
      />
      {rows.length ? (
        <ListingGrid listings={rows} />
      ) : (
        <EmptyState
          title="Your next favorite is out there."
          description="Save a property or product in the marketplace and come back to find it here."
        />
      )}
    </>
  );
}
