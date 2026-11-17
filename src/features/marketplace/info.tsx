import { Link } from "@tanstack/react-router";
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
            <div className="flex gap-3">
              <Button asChild size="lg">
                <Link to="/register">
                  Create a demo store <ArrowUpRight />
                </Link>
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
    </div>
  );
}
function InterestForm({ kind }: { kind: string }) {
  return (
    <form
      className="modal-form mt-7"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success(
          `Demo ${kind === "investors" ? "investor" : "partnership"} interest recorded. No real message was sent.`,
        );
        e.currentTarget.reset();
      }}
    >
      <div className="form-grid">
        <div>
          <label className="form-label" htmlFor="interest-name">
            Your name
          </label>
          <input className="field" id="interest-name" required />
        </div>
        <div>
          <label className="form-label" htmlFor="interest-email">
            Email
          </label>
          <input className="field" id="interest-email" type="email" required />
        </div>
        <div className="full">
          <label className="form-label" htmlFor="interest-company">
            Organization
          </label>
          <input className="field" id="interest-company" required />
        </div>
        <div className="full">
          <label className="form-label" htmlFor="interest-message">
            Tell us a little more
          </label>
          <textarea className="field" id="interest-message" required minLength={10} />
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
              toast.success("Demo message recorded. No actual email was sent.");
              e.currentTarget.reset();
            }}
          >
            <div className="form-grid">
              <div>
                <label htmlFor="contact-name" className="form-label">
                  Your name
                </label>
                <input id="contact-name" className="field" required />
              </div>
              <div>
                <label htmlFor="contact-email" className="form-label">
                  Email address
                </label>
                <input id="contact-email" className="field" type="email" required />
              </div>
              <div className="full">
                <label htmlFor="contact-subject" className="form-label">
                  What is it about?
                </label>
                <select id="contact-subject" className="field">
                  <option>General question</option>
                  <option>Selling on NEXORA</option>
                  <option>Partnerships</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div className="full">
                <label htmlFor="contact-message" className="form-label">
                  Your message
                </label>
                <textarea id="contact-message" className="field" required minLength={10} />
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
            Our first market is Addis Ababa, Ethiopia. The product demonstration is open for you to
            explore.
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
    "Prices are displayed in Ethiopian Birr (ETB). Our initial market is Addis Ababa, including Bole, CMC, Kazanchis, Sar Bet, Megenagna, Piassa, Ayat, Summit, Gerji, and Old Airport.",
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
export function HelpPage({ faq = false }: { faq?: boolean }) {
  return (
    <div className="container-main">
      <Breadcrumbs label={faq ? "FAQ" : "Help center"} />
      <PageHeading
        title={faq ? "Good questions. Clear answers." : "A little help, right here."}
        description="Everything you need to know about exploring the NEXORA demo marketplace."
      />
      {!faq && (
        <div className="seller-grid mb-10">
          <Link to="/categories" className="seller-card">
            <ShoppingHelpIcon />
            <div>
              <h3>Browsing & shopping</h3>
              <p>Explore categories and listings</p>
            </div>
          </Link>
          <Link to="/seller" className="seller-card">
            <Store />
            <div>
              <h3>Selling on NEXORA</h3>
              <p>Explore your demo store</p>
            </div>
          </Link>
          <Link to="/account" className="seller-card">
            <CheckCircle2 />
            <div>
              <h3>Your demo account</h3>
              <p>Orders, saved finds & inquiries</p>
            </div>
          </Link>
          <Link to="/contact" className="seller-card">
            <MessageCircle />
            <div>
              <h3>Get in touch</h3>
              <p>Share your questions</p>
            </div>
          </Link>
        </div>
      )}
      <div className="faq-list">
        {faqs.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
function ShoppingHelpIcon() {
  return <Sparkles className="size-6 text-accent" />;
}
