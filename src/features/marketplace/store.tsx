import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { initialListings, type Listing } from "./data";
import { canAddToCart, changeQuantity, type CartItem } from "./logic";
import { marketplaceClient } from "./mock-service";
export interface DemoUser {
  name: string;
  email: string;
  phone: string;
  role: "customer" | "seller" | "admin";
  location: string;
}
export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: string;
  address: string;
}
export interface Inquiry {
  id: string;
  listingId: string;
  title: string;
  message: string;
  name: string;
  date: string;
  status: string;
}
interface DemoState {
  listings: Listing[];
  wishlist: string[];
  cart: CartItem[];
  user: DemoUser | null;
  orders: Order[];
  inquiries: Inquiry[];
  language: string;
  plan: string;
  settings: Record<string, boolean>;
  management: Record<string, string>;
}
const initialState: DemoState = {
  listings: initialListings,
  wishlist: [],
  cart: [],
  user: null,
  orders: [],
  inquiries: [],
  language: "en",
  plan: "Starter",
  settings: { notifications: true, newsletter: false, storeOpen: true, approvalRequired: true },
  management: {},
};
interface StoreValue extends DemoState {
  ready: boolean;
  toggleWish: (id: string) => void;
  addCart: (id: string, quantity?: number, variant?: string) => void;
  updateCart: (id: string, quantity: number) => void;
  removeCart: (id: string) => void;
  login: (user: DemoUser) => void;
  logout: () => void;
  saveUser: (user: DemoUser) => void;
  checkout: (address: string) => Order;
  inquire: (inquiry: Omit<Inquiry, "id" | "date" | "status">) => void;
  saveListing: (listing: Listing) => void;
  deleteListing: (id: string) => void;
  moderate: (id: string, status: Listing["status"]) => void;
  setLanguage: (language: string) => void;
  selectPlan: (plan: string) => void;
  setSetting: (key: string, value: boolean) => void;
  manage: (id: string, status: string) => void;
  reply: (id: string) => void;
}
const StoreContext = createContext<StoreValue | null>(null);
export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initialState);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const stored = localStorage.getItem(marketplaceClient.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed.listings) && Array.isArray(parsed.cart))
          setState({ ...initialState, ...parsed });
      }
    } catch {
      /* A corrupt demo session starts clean. */
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem(marketplaceClient.storageKey, JSON.stringify(state));
      } catch {
        toast.error("Your browser could not save this demo session.");
      }
    }
  }, [state, ready]);
  const value: StoreValue = {
    ...state,
    ready,
    toggleWish(id) {
      const exists = state.wishlist.includes(id);
      setState((s) => ({
        ...s,
        wishlist: exists ? s.wishlist.filter((v) => v !== id) : [...s.wishlist, id],
      }));
      toast.success(exists ? "Removed from saved listings" : "Added to saved listings");
    },
    addCart(id, quantity = 1, variant) {
      const listing = state.listings.find((l) => l.id === id);
      if (!listing || !canAddToCart(listing)) {
        toast.error("This listing is available by inquiry only, or is out of stock.");
        return;
      }
      setState((s) => {
        const existing = s.cart.find((x) => x.id === id);
        return {
          ...s,
          cart: existing
            ? s.cart.map((x) =>
                x.id === id
                  ? {
                      ...x,
                      quantity: changeQuantity(x.quantity + quantity),
                      variant: variant ?? x.variant,
                    }
                  : x,
              )
            : [...s.cart, { id, quantity: changeQuantity(quantity), variant }],
        };
      });
      toast.success("Added to your bag");
    },
    updateCart(id, quantity) {
      setState((s) => ({
        ...s,
        cart: s.cart.map((x) => (x.id === id ? { ...x, quantity: changeQuantity(quantity) } : x)),
      }));
    },
    removeCart(id) {
      setState((s) => ({ ...s, cart: s.cart.filter((x) => x.id !== id) }));
      toast.success("Removed from your bag");
    },
    login(user) {
      setState((s) => ({ ...s, user }));
      toast.success(`Welcome, ${user.name}. You are in a demo account.`);
    },
    logout() {
      setState((s) => ({ ...s, user: null }));
      toast.success("Signed out of your demo account");
    },
    saveUser(user) {
      setState((s) => ({ ...s, user }));
      toast.success("Demo profile saved");
    },
    checkout(address) {
      const order: Order = {
        id: `NX-${Date.now()}`,
        items: state.cart.map((i) => ({ ...i })),
        total: state.cart.reduce(
          (sum, item) =>
            sum + (state.listings.find((l) => l.id === item.id)?.price ?? 0) * item.quantity,
          0,
        ),
        date: new Date().toISOString(),
        status: "Demo confirmed",
        address,
      };
      setState((s) => ({ ...s, orders: [order, ...s.orders], cart: [] }));
      return order;
    },
    inquire(inquiry) {
      setState((s) => ({
        ...s,
        inquiries: [
          {
            ...inquiry,
            id: `IN-${Date.now()}`,
            date: new Date().toISOString(),
            status: "Demo received",
          },
          ...s.inquiries,
        ],
      }));
      toast.success("Demo inquiry saved. No message was sent to a real seller.");
    },
    saveListing(listing) {
      setState((s) => ({
        ...s,
        listings: s.listings.some((l) => l.id === listing.id)
          ? s.listings.map((l) => (l.id === listing.id ? listing : l))
          : [listing, ...s.listings],
      }));
      toast.success("Demo listing saved for approval");
    },
    deleteListing(id) {
      setState((s) => ({
        ...s,
        listings: s.listings.filter((l) => l.id !== id),
        wishlist: s.wishlist.filter((v) => v !== id),
        cart: s.cart.filter((v) => v.id !== id),
      }));
      toast.success("Demo listing deleted");
    },
    moderate(id, status) {
      setState((s) => ({
        ...s,
        listings: s.listings.map((l) => (l.id === id ? { ...l, status } : l)),
      }));
      toast.success(`Demo listing ${status === "active" ? "approved" : status}`);
    },
    setLanguage(language) {
      setState((s) => ({ ...s, language }));
      toast.info(
        language === "am"
          ? "Amharic selected. Full translations are coming soon; listing content remains in English."
          : "Language set to English",
      );
    },
    selectPlan(plan) {
      setState((s) => ({ ...s, plan }));
      toast.success(`${plan} selected for this demo. No payment was taken.`);
    },
    setSetting(key, value) {
      setState((s) => ({ ...s, settings: { ...s.settings, [key]: value } }));
      toast.success("Demo setting updated");
    },
    manage(id, status) {
      setState((s) => ({ ...s, management: { ...s.management, [id]: status } }));
      toast.success(`Demo record ${status}`);
    },
    reply(id) {
      setState((s) => ({
        ...s,
        inquiries: s.inquiries.map((i) => (i.id === id ? { ...i, status: "Demo replied" } : i)),
      }));
      toast.success("Demo reply recorded. No real message was sent.");
    },
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
export function useMarketplace() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("MarketplaceProvider is required");
  return value;
}
