import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { categories, neighborhoods } from "./data";
import {
  ArrowUpRight,
  CheckCircle2,
  Store,
  Building2,
  MessageCircle,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import hero from "@/assets/addis-skyline.jpg";
import services from "@/assets/home-services.jpg";
import { Breadcrumbs, PageHeading } from "./components";
export const infoPages = {
  about: {
    title: "A marketplace for our everyday.",
    description:
      "Rooted in Ethiopia. Built around the people, businesses, and possibilities that make our city.",
    heading: "Many possibilities. One shared home.",
    paragraphs: [
      "NEXORA brings the everyday together: a place to find a home, explore a new car, discover a local store, or connect with a service professional. Seven marketplaces, thoughtfully connected in one destination.",
      "Our journey begins in Addis Ababa. From Bole to Piassa, from Kazanchis to CMC, we are shaping an experience that reflects the way our city lives, shops, and grows.",
      "This is the NEXORA frontend demonstration. Listings, businesses, and transactions are sample content that shows our vision, not claims about live marketplace activity.",
    ],
    image: hero,
  },
  "become-seller": {
    title: "Your business deserves a bigger stage.",
    description: "Bring your ambition to NEXORA. Meet new customers and build your next chapter.",
    heading: "Local roots. Room to grow.",
    paragraphs: [
      "Whether you are a boutique owner, a property professional, an automotive business, or a service provider, there is a place for your business on NEXORA.",
      "Create your sample store, add listings, and explore seller tools designed to keep your business organized. Your demonstration account includes listing management, inquiries, and sales insights.",
      "Try the seller experience today. No subscription payment or real business registration is required for this demo.",
    ],
    image: services,
  },
  partnerships: {
    title: "Build something bigger, together.",
    description:
      "Explore the possibilities of a partnership rooted in Ethiopia’s entrepreneurial spirit.",
    heading: "A shared vision. A stronger ecosystem.",
    paragraphs: [
      "Great marketplaces are built through meaningful connections. We welcome conversations with local businesses, industry associations, property agencies, and technology partners.",
      "Our vision connects seven everyday marketplaces with one consistent experience. We are interested in partnerships that make discovery easier and bring more opportunities to Ethiopian businesses.",
      "Register a demonstration expression of interest below. This form saves demo feedback only; it does not send a real partnership request.",
    ],
    image: hero,
  },
  investors: {
    title: "The next chapter of Ethiopian commerce.",
    description: "A connected marketplace vision, starting in Addis Ababa.",
    heading: "One platform. An everyday opportunity.",
    paragraphs: [
      "NEXORA is a concept for a multi-vendor Ethiopian marketplace, connecting real estate, vehicles, fashion, technology, home, fitness, and local services.",
      "This interactive presentation demonstrates our product direction, local market focus, and a consistent customer-to-seller experience. All users, listings, financial figures, and sales shown are simulated.",
      "No fundraising terms, valuations, revenue claims, or investment offers are made here. Explore the product and share a demonstration expression of interest.",
    ],
    image: hero,
  },
} as const;

const pageSections: Record<string, { title: string; items: [string, string][] }[]> = {
  about: [
    { title: "What NEXORA is", items: [["Mission", "Make it simple for people in Ethiopia to find homes, vehicles, products, and trusted local services in one clear place."], ["Vision", "Become the everyday marketplace Ethiopians open first — starting in Addis Ababa and growing city by city."], ["The problem we solve", "Today, listings are scattered across social media groups, brokers, and word of mouth. Prices are unclear and comparing options takes time."]] },
    { title: "How the marketplace works", items: [["1. Discover", "Browse seven marketplaces with 42 subcategories, filters, and search."], ["2. Connect", "Buy products through the bag, or send an inquiry for property, vehicles, and services."], ["3. Grow", "Sellers manage listings, orders, and inquiries from one dashboard."]] },
    { title: "Why people choose NEXORA", items: [["For customers", "One search across categories, clear prices in your currency, saved favourites, and order tracking."], ["For sellers", "A storefront, listing tools, inquiry inbox, and sales insights without building a website."], ["Our values", "Honesty, local focus, simplicity, and respect for every buyer and seller."]] },
  ],
  "become-seller": [
    { title: "Who can sell", items: [["Product sellers", "Boutiques, electronics shops, and home stores can list stock with prices, photos, and availability."], ["Property agents", "List apartments, villas, land, and commercial space with bedrooms, size, and rent or sale status."], ["Car dealers", "Publish vehicles with brand, model, year, mileage, fuel, and transmission."], ["Service providers", "Cleaners, plumbers, electricians, and movers can show starting prices and receive inquiries."]] },
    { title: "How selling works", items: [["1. Apply", "Complete the short application below."], ["2. Set up your store", "Add your store name, location, and description in the seller dashboard."], ["3. List", "Add listings in any of the 42 subcategories. New listings go to admin approval."], ["4. Sell", "Manage orders, answer inquiries, and follow your analytics."]] },
    { title: "Seller tools", items: [["Listing manager", "Create, edit, and remove listings."], ["Orders & inquiries", "See bag orders and customer questions in one place."], ["Analytics & plans", "Preview sales insights and choose a demo subscription plan (Starter, Growth, Business)."]] },
  ],
  partnerships: [
    { title: "Who we want to work with", items: [["Retail & distributors", "Bring product ranges to a wider audience."], ["Property agencies & car dealers", "Showcase inventory to motivated buyers."], ["Manufacturers & service providers", "Reach customers directly."], ["Delivery & technology partners", "Help build logistics, payments, and tools for Ethiopian commerce."]] },
    { title: "How partnership works", items: [["1. Introduce yourself", "Send the inquiry form below."], ["2. Discovery call", "We discuss goals and fit."], ["3. Pilot", "A focused trial with clear success measures."], ["4. Launch", "Onboarding, co-marketing, and regular reviews."]] },
    { title: "Partnership questions", items: [["Do you have existing partners?", "NEXORA is at the demonstration stage. We do not list any partners yet."], ["Is there a fee?", "Terms would be agreed individually; nothing is fixed today."]] },
  ],
  investors: [
    { title: "The opportunity", items: [["The problem", "Buying and selling in Ethiopia relies on fragmented channels with limited price transparency and trust."], ["Proposed solution", "One multi-vendor marketplace covering the categories people use most, with consistent tools for sellers."], ["Target market", "Urban consumers and small-to-medium businesses, beginning in Addis Ababa."]] },
    { title: "Proposed business model (not current revenue)", items: [["Seller subscriptions", "Tiered monthly plans for stores and agents."], ["Featured listings", "Paid placement in search and category pages."], ["Advertising", "Brand placements across categories."], ["Commissions", "A percentage on completed product orders."], ["Premium business services", "Verification, photography, and analytics packages."]] },
    { title: "Roadmap & positioning (hypothetical)", items: [["Phase 1", "Addis Ababa launch with the seven core categories."], ["Phase 2", "Payments, delivery partners, and Amharic support."], ["Phase 3", "Expansion to other Ethiopian cities."], ["Positioning", "Broader than single-category classifieds; more local than global platforms."]] },
  ],
};
function Sections({ kind }: { kind: string }) {
  return (
    <div className="pb-12 space-y-12">
      {(pageSections[kind] ?? []).map((sec) => (
        <section key={sec.title}>
          <h2 className="section-title mb-6">{sec.title}</h2>
          <div className="benefits-grid">
            {sec.items.map(([t, d]) => (
              <div className="benefit-item" key={t}>
                <CheckCircle2 />
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
      {kind === "investors" && (
        <p className="form-help">All users, listings, sales, and figures shown across this site are simulated. No revenue, investors, or partnerships are claimed.</p>
      )}
    </div>
  );
}
export function InfoPage({ kind }: { kind: keyof typeof infoPages }) {
  const page = infoPages[kind];
  return (
    <div className="container-main">
      <Breadcrumbs
        label={
          kind === "about"
            ? "About NEXORA"
            : kind === "become-seller"
              ? "Become a seller"
              : kind === "investors"
                ? "Investor information"
                : "Business partnerships"
        }
      />
      <PageHeading title={page.title} description={page.description} />
      <div className="info-layout">
        <div className="info-copy">
          <h2>{page.heading}</h2>
          {page.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {kind === "about" ? (
            <Button asChild size="lg">
              <Link to="/categories">
                Explore NEXORA <ArrowUpRight />
              </Link>
            </Button>
          ) : kind === "become-seller" ? (
            <div className="flex gap-3 flex-wrap">
              <Button asChild size="lg">
                <a href="#seller-application">
                  Apply to sell <ArrowUpRight />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/seller">Explore seller tools</Link>
              </Button>
            </div>
          ) : (
            <InterestForm kind={kind} />
          )}
        </div>
        <img
          className="info-image"
          src={page.image}
          alt={
            kind === "become-seller"
              ? "Ethiopian service professional"
              : "Addis Ababa, the first city for NEXORA"
          }
          width={1024}
          height={768}
        />
      </div>
      {kind === "become-seller" && (
        <div className="benefits-grid pb-12">
          {[
            {
              Icon: Store,
              title: "Your own storefront",
              text: "A sample store that brings your story and products together.",
            },
            {
              Icon: Building2,
              title: "Organized from day one",
              text: "Manage listings, view inquiries, and explore sample orders.",
            },
            {
              Icon: Sparkles,
              title: "Designed for your growth",
              text: "Preview analytics and select a demonstration seller plan.",
            },
          ].map((b) => (
            <div className="benefit-item" key={b.title}>
              <b.Icon />
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
      )}
      <Sections kind={kind} />
      {kind === "about" && (
        <div className="flex gap-3 flex-wrap pb-12">
          <Button asChild size="lg"><Link to="/categories">Explore the marketplace <ArrowUpRight /></Link></Button>
          <Button asChild size="lg" variant="outline"><Link to="/become-seller">Become a seller</Link></Button>
        </div>
      )}
      {kind === "become-seller" && <SellerApplication />}
    </div>
  );
}
const field = (id: string, label: string, opts: { type?: string; required?: boolean; options?: string[]; area?: boolean; full?: boolean } = {}) => (
  <div className={opts.full || opts.area ? "full" : ""} key={id}>
    <label className="form-label" htmlFor={id}>{label}{opts.required === false ? " (optional)" : ""}</label>
    {opts.options ? (
      <select id={id} name={id} className="field" required defaultValue="">
        <option value="" disabled>Select…</option>
        {opts.options.map((o) => <option key={o}>{o}</option>)}
      </select>
    ) : opts.area ? (
      <textarea id={id} name={id} className="field" required minLength={20} />
    ) : (
      <input id={id} name={id} className="field" type={opts.type ?? "text"} required={opts.required !== false} {...(opts.type === "tel" ? { pattern: "[+0-9 ]{9,15}" } : {})} />
    )}
  </div>
);
function saveDemo(key: string, form: HTMLFormElement) {
  const data = Object.fromEntries(new FormData(form).entries());
  try {
    const list = JSON.parse(localStorage.getItem(key) ?? "[]");
    localStorage.setItem(key, JSON.stringify([{ ...data, date: new Date().toISOString() }, ...list]));
  } catch { /* demo storage unavailable */ }
}
function SellerApplication() {
  const [done, setDone] = useState(false);
  return (
    <section id="seller-application" className="form-panel mb-12">
      <h2 className="section-title">Seller application</h2>
      <p className="section-subtitle mb-6">Tell us about your business. This saves a demo application in your browser only.</p>
      {done ? (
        <div className="empty-state">
          <CheckCircle2 />
          <h2>Demo application received.</h2>
          <p>Your application is saved in this browser. No real account was created or verified.</p>
          <div className="flex gap-3 justify-center">
            <Button asChild><Link to="/seller">Explore seller tools</Link></Button>
            <Button variant="outline" onClick={() => setDone(false)}>Submit another</Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveDemo("nexora-seller-applications", e.currentTarget);
            toast.success("Demo seller application saved. No real account was created.");
            setDone(true);
          }}
          onInvalid={() => toast.error("Please complete the highlighted fields.")}
        >
          <div className="form-grid">
            {field("seller-name", "Full name")}
            {field("seller-store", "Business / store name")}
            {field("seller-email", "Email", { type: "email" })}
            {field("seller-phone", "Phone number", { type: "tel" })}
            {field("seller-type", "Seller type", { options: ["Product seller", "Property agent", "Car dealer", "Service provider"] })}
            {field("seller-location", "Business location", { options: neighborhoods })}
            {field("seller-category", "Category", { options: categories.map((c) => c.name), full: true })}
            {field("seller-description", "Short business description", { area: true })}
          </div>
          <Button type="submit" size="lg" className="mt-6">Submit demo application <ArrowUpRight /></Button>
        </form>
      )}
    </section>
  );
}
function InterestForm({ kind }: { kind: string }) {
  return (
    <form
      className="modal-form mt-7"
      onSubmit={(e) => {
        e.preventDefault();
        saveDemo(`nexora-${kind}-inquiries`, e.currentTarget);
        toast.success(
          `Demo ${kind === "investors" ? "investor" : "partnership"} inquiry saved. No real message was sent.`,
        );
        e.currentTarget.reset();
      }}
    >
      <div className="form-grid">
        <div>
          <label className="form-label" htmlFor="interest-name">
            Your name
          </label>
          <input className="field" id="interest-name" name="name" required />
        </div>
        <div>
          <label className="form-label" htmlFor="interest-email">
            Email
          </label>
          <input className="field" id="interest-email" name="email" type="email" required />
        </div>
        <div className="full">
          <label className="form-label" htmlFor="interest-company">
            Organization
          </label>
          <input className="field" id="interest-company" name="company" required />
        </div>
        {kind === "partnerships" && field("interest-type", "Partnership type", { full: true, options: ["Retail business", "Property agency", "Car dealership", "Distributor", "Manufacturer", "Service provider", "Delivery company", "Technology partner"] })}
        <div className="full">
          <label className="form-label" htmlFor="interest-message">
            Tell us a little more
          </label>
          <textarea className="field" id="interest-message" name="message" required minLength={10} />
        </div>
      </div>
      <Button type="submit">
        Save demo interest <ArrowUpRight />
      </Button>
    </form>
  );
}
export function ContactPage() {
  return (
    <div className="container-main">
      <Breadcrumbs label="Contact us" />
      <PageHeading
        title="A conversation starts here."
        description="Questions, ideas, or a little feedback — we’re glad you’re here."
      />
      <div className="info-layout">
        <div className="form-panel">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveDemo("nexora-contact-messages", e.currentTarget);
              toast.success("Demo message saved. No actual email was sent.");
              e.currentTarget.reset();
            }}
          >
            <div className="form-grid">
              <div>
                <label htmlFor="contact-name" className="form-label">
                  Your name
                </label>
                <input id="contact-name" name="name" className="field" required />
              </div>
              <div>
                <label htmlFor="contact-email" className="form-label">
                  Email address
                </label>
                <input id="contact-email" name="email" className="field" type="email" required />
              </div>
              {field("contact-phone", "Phone", { type: "tel", required: false })}
              {field("contact-topic", "Inquiry subject")}
              <div className="full">
                <label htmlFor="contact-subject" className="form-label">
                  Inquiry type
                </label>
                <select id="contact-subject" name="type" className="field">
                  <option>Customer support</option>
                  <option>Seller support</option>
                  <option>Business inquiry</option>
                  <option>Partnership inquiry</option>
                  <option>General question</option>
                </select>
              </div>
              <div className="full">
                <label htmlFor="contact-message" className="form-label">
                  Your message
                </label>
                <textarea id="contact-message" name="message" className="field" required minLength={10} />
              </div>
            </div>
            <Button type="submit" size="lg">
              Save demo message <MessageCircle />
            </Button>
            <p className="form-help">
              Demonstration only. No message is delivered to a real inbox.
            </p>
          </form>
        </div>
        <div className="info-copy">
          <MapPin className="text-accent size-8 mb-5" />
          <h2>Made for Addis Ababa.</h2>
          <p>
            Our first market is Addis Ababa, Ethiopia. Official phone, email, and office details
            will be published here once confirmed — none are listed yet.
          </p>
          <p>
            Looking for answers? Visit the help center for common questions about listings,
            shopping, and demo accounts.
          </p>
          <Button asChild variant="outline">
            <Link to="/help">
              Visit the help center <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
const faqs = [
  [
    "What is NEXORA?",
    "NEXORA is an Ethiopian multi-vendor marketplace concept. This frontend demonstration connects seven categories: real estate, vehicles, fashion, electronics, home and living, sports, and services.",
  ],
  [
    "Are these real listings and sellers?",
    "No. All listings, photographs, stores, reviews, and statistics are sample content used to demonstrate the marketplace. No seller is represented as verified.",
  ],
  [
    "Can I make a real purchase?",
    "No. Adding products to your bag and checking out creates a demonstration order only. No payments are processed and no items are delivered.",
  ],
  [
    "How do I contact a seller?",
    "Open a listing and select Contact seller or Ask the seller a question. Your inquiry is saved in the demo session and appears in My Inquiries. No real message is sent.",
  ],
  [
    "How do I become a seller?",
    "Create a simulated account and choose Seller, or open the seller dashboard directly to explore. Add a sample listing and approve it from the demo admin dashboard.",
  ],
  [
    "Which currency and areas are supported?",
    "Prices are stored in Ethiopian Birr (ETB) and can be shown in USD, EUR, GBP, KES, SAR, AED, or SOS using indicative demo exchange rates. Our initial market is Addis Ababa, including Bole, CMC, Kazanchis, Sar Bet, Megenagna, Piassa, Ayat, Summit, Gerji, and Old Airport.",
  ],
  [
    "Is Amharic supported?",
    "English is the default. The language selector includes an Amharic preview option. Full translations are not yet available, and listing content remains in English.",
  ],
  [
    "Where is my demo information stored?",
    "Demo accounts, saved listings, shopping bags, inquiries, and listing changes are saved in this browser. There is no connected database or real account service. Clearing your browser data removes the demo session.",
  ],
];
const faqGroups: Record<string, [string, string][]> = {
  General: faqs.slice(0, 2) as [string, string][],
  Buying: [["How do I buy a product?", "Add in-stock products to your bag and complete the demo checkout. Property, vehicles, and services are inquiry-only."], faqs[2] as [string, string]],
  Selling: [faqs[4] as [string, string], ["How are listings approved?", "New seller listings start as pending and appear publicly after an admin approves them in the demo admin dashboard."]],
  Payments: [["Which payment methods are available?", "None yet — checkout is simulated. Payment options such as Telebirr or bank transfer are future plans, not current features."], faqs[5] as [string, string]],
  Orders: [["Where can I see my orders?", "Open My Orders in your account. Demo orders are labelled and are not real purchases."], ["Can I return an order?", "Returns and refunds are not available in the demo. A future policy would be published here."]],
  Properties: [["How do I view a property?", "Send an inquiry from the listing. In a live marketplace, the agent would arrange a viewing."], ["Are property prices negotiable?", "That depends on each agent; sample prices are illustrative."]],
  Vehicles: [["Can I inspect a vehicle?", "Send an inquiry to the dealer. Inspections and documents would be confirmed directly with them."], ["Are vehicles for rent priced per day?", "Yes, rental vehicle prices are shown per day."]],
  "Account and security": [faqs[6] as [string, string], faqs[7] as [string, string]],
};
const articles = [
  { topic: "Getting started", title: "Creating your demo account", body: "Select Sign in / Register, choose customer or seller, and enter your details. The account lives only in this browser; no real account is created." },
  { topic: "Buying on NEXORA", title: "Finding what you need", body: "Use the header search or open a category, then pick one of its six subcategories. Refine with filters for location, price, brand, and more." },
  { topic: "Selling on NEXORA", title: "Adding your first listing", body: "Open the seller dashboard and choose Add listing. Select a category and subcategory, add details and price in ETB, and submit for approval." },
  { topic: "Payments and checkout", title: "How demo checkout works", body: "Checkout records a demo order with your delivery address. No payment is taken. Totals display in your selected currency using indicative rates." },
  { topic: "Orders", title: "Tracking your orders", body: "My Orders lists each demo order with its ID, date, items, status, and total. Open an order to see its details." },
  { topic: "Returns and refunds", title: "Returns policy", body: "There is no live returns process in the demo. A real policy would be agreed with sellers before launch." },
  { topic: "Property inquiries", title: "Asking about a property", body: "Open a property and select Contact seller. Your inquiry appears in My Inquiries and the seller's inbox in the demo." },
  { topic: "Vehicle inquiries", title: "Asking about a vehicle", body: "Open a vehicle, review year, mileage, fuel, and transmission, then send a demo inquiry to the dealer." },
  { topic: "Account and security", title: "Your data and password", body: "Demo data is stored in your browser. Password changes are simulated; no real security operations happen without a backend." },
  { topic: "Contact support", title: "Getting more help", body: "Use the contact page and choose Customer support or Seller support. Messages are saved as demos only." },
];
export function HelpPage({ faq = false }: { faq?: boolean }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<(typeof articles)[number] | null>(null);
  const term = q.trim().toLowerCase();
  const match = (...t: string[]) => !term || t.join(" ").toLowerCase().includes(term);
  return (
    <div className="container-main">
      <Breadcrumbs label={faq ? "FAQ" : "Help center"} />
      <PageHeading
        title={faq ? "Good questions. Clear answers." : "A little help, right here."}
        description="Everything you need to know about exploring the NEXORA demo marketplace."
      />
      <input className="field max-w-xl mb-8" aria-label={faq ? "Search questions" : "Search help articles"} placeholder={faq ? "Search questions…" : "Search help articles…"} value={q} onChange={(e) => setQ(e.target.value)} />
      {!faq && (
        <>
          <div className="seller-grid mb-10">
            {articles.filter((a) => match(a.topic, a.title, a.body)).map((a) => (
              <Button variant="ghost" key={a.title} className="seller-card text-left h-auto whitespace-normal justify-start" onClick={() => setOpen(a)}>
                <ShoppingHelpIcon />
                <div>
                  <h3>{a.topic}</h3>
                  <p>{a.title}</p>
                </div>
              </Button>
            ))}
          </div>
          {open && (
            <article className="form-panel mb-10" aria-live="polite">
              <p className="demo-label">{open.topic}</p>
              <h2 className="section-title mt-2">{open.title}</h2>
              <p className="section-subtitle mt-3">{open.body}</p>
              <div className="flex gap-3 mt-5">
                <Button variant="outline" onClick={() => setOpen(null)}>Close article</Button>
                <Button asChild variant="ghost"><Link to="/faq">Read the FAQ</Link></Button>
              </div>
            </article>
          )}
        </>
      )}
      {faq ? (
        Object.entries(faqGroups).map(([group, items]) => {
          const shown = items.filter(([qq, a]) => match(group, qq, a));
          return shown.length ? (
            <section key={group} className="mb-8">
              <h2 className="section-title mb-4">{group}</h2>
              <div className="faq-list">
                {shown.map(([qq, a]) => (
                  <details key={qq}><summary>{qq}</summary><p>{a}</p></details>
                ))}
              </div>
            </section>
          ) : null;
        })
      ) : (
        <div className="faq-list pb-12">
          {faqs.filter(([qq, a]) => match(qq ?? "", a ?? "")).map(([qq, a]) => (
            <details key={qq}><summary>{qq}</summary><p>{a}</p></details>
          ))}
        </div>
      )}
      {term && (faq ? !Object.entries(faqGroups).some(([group, items]) => items.some(([question, answer]) => match(group, question, answer))) : !articles.some((a) => match(a.topic, a.title, a.body))) && (
        <p className="section-subtitle pb-12">No results for “{q}”. Try another word or <Link to="/contact" className="underline">contact us</Link>.</p>
      )}
    </div>
  );
}
function ShoppingHelpIcon() {
  return <Sparkles className="size-6 text-accent" />;
}
