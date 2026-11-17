import apartment from "@/assets/bole-apartment.jpg";
import villa from "@/assets/cmc-villa.jpg";
import interior from "@/assets/apartment-interior.jpg";
import car from "@/assets/toyota-rav4.jpg";
import laptop from "@/assets/premium-laptop.jpg";
import phone from "@/assets/smartphone.jpg";
import headphones from "@/assets/wireless-headphones.jpg";
import fashion from "@/assets/fashion-edit.jpg";
import sofa from "@/assets/modern-sofa.jpg";
import sports from "@/assets/fitness-equipment.jpg";
import services from "@/assets/home-services.jpg";
import corolla from '@/assets/toyota-corolla.jpg';
import prado from '@/assets/land-cruiser.jpg';
import hilux from '@/assets/toyota-hilux.jpg';
import dress from '@/assets/habesha-dress.jpg';
import bag from '@/assets/leather-bag.jpg';
import sneakers from '@/assets/everyday-sneakers.jpg';
import dining from '@/assets/oak-dining-set.jpg';
import repairs from '@/assets/home-repairs.jpg';

export const categories = [
  {
    id: "real-estate",
    name: "Real Estate",
    short: "Real Estate",
    href: "/real-estate",
    count: 30,
    description:
      "Find a place to call your own. Apartments, villas, and spaces across Addis Ababa.",
    types: ["Apartment", "Villa", "House", "Office", "Land", "Commercial"],
  },
  {
    id: "vehicles",
    name: "Cars & Vehicles",
    short: "Cars & Vehicles",
    href: "/vehicles",
    count: 20,
    description: "Your next journey starts here. Explore cars for sale and rent in Addis Ababa.",
    types: ["SUV", "Sedan", "Truck", "Motorcycle", "Bus"],
  },
  {
    id: "fashion",
    name: "Fashion",
    short: "Fashion",
    href: "/fashion",
    count: 25,
    description:
      "Everyday essentials, distinctive style. Discover local boutiques and contemporary fashion.",
    types: ["Women's fashion", "Men's fashion", "Accessories", "Shoes", "Kids"],
  },
  {
    id: "electronics",
    name: "Electronics & Technology",
    short: "Electronics",
    href: "/electronics",
    count: 30,
    description: "A little more connected. Find the technology that fits your everyday life.",
    types: ["Laptops", "Smartphones", "Audio", "Cameras", "TVs"],
  },
  {
    id: "home-living",
    name: "Home & Living",
    short: "Home & Living",
    href: "/home-living",
    count: 25,
    description: "Thoughtful pieces for a home that feels like you. Furniture and home essentials.",
    types: ["Sofas", "Furniture", "Kitchen", "Decor", "Beds"],
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    short: "Sports & Fitness",
    href: "/sports",
    count: 10,
    description: "Make room for movement. Equipment and essentials for your fitness journey.",
    types: ["Fitness equipment", "Sportswear", "Gym accessories"],
  },
  {
    id: "services",
    name: "Services",
    short: "Services",
    href: "/services",
    count: 10,
    description:
      "Good help, close to home. Discover local professionals for the everyday and beyond.",
    types: ["Cleaning", "Moving", "Repairs", "Electrical", "Plumbing"],
  },
] as const;
export type CategoryId = (typeof categories)[number]["id"];
export type ListingStatus = "active" | "pending" | "rejected";
export interface Listing {
  id: string;
  title: string;
  category: CategoryId;
  type: string;
  price: number;
  location: string;
  images: string[];
  description: string;
  seller: string;
  brand: string;
  model?: string;
  condition: string;
  featured: boolean;
  status: ListingStatus;
  created: number;
  specs: Record<string, string>;
  purpose: "Sale" | "Rent";
  bedrooms?: number;
  bathrooms?: number;
  size?: number;
  furnished?: boolean;
  year?: number;
  fuel?: string;
  transmission?: string;
  availability: string;
}
export const neighborhoods = [
  "Bole",
  "CMC",
  "Kazanchis",
  "Sar Bet",
  "Megenagna",
  "Piassa",
  "Mexico",
  "Ayat",
  "Summit",
  "Gerji",
  "Old Airport",
];
export const sellers = [
  {
    id: "addis-homes",
    name: "Addis Homes",
    initials: "AH",
    category: "Real estate",
    location: "Bole",
  },
  {
    id: "bole-motors",
    name: "Bole Motors",
    initials: "BM",
    category: "Cars & vehicles",
    location: "Bole",
  },
  {
    id: "ethio-tech",
    name: "Ethio Tech",
    initials: "ET",
    category: "Electronics",
    location: "Megenagna",
  },
  {
    id: "urban-living",
    name: "Urban Living",
    initials: "UL",
    category: "Home & fashion",
    location: "Kazanchis",
  },
  {
    id: "addis-care",
    name: "Addis Care",
    initials: "AC",
    category: "Local services",
    location: "CMC",
  },
];
const propertyTitles = [
  "Modern 3-Bedroom Apartment in Bole",
  "Contemporary Family Villa in CMC",
  "Bright City-View Apartment",
  "Spacious Family House",
  "Premium Apartment with Balcony",
  "Modern Office Space",
];
export const initialListings: Listing[] = categories.flatMap((category) =>
  Array.from({ length: category.count }, (_, i): Listing => {
    const location = neighborhoods[i % neighborhoods.length] ?? "Bole";
    const base = {
      id: `${category.id}-${i + 1}`,
      category: category.id,
      location,
      featured: i < 4,
      status: (i === category.count - 1 ? "pending" : "active") as ListingStatus,
      created: 1794916800000 - i * 3600000,
      condition: i % 4 === 3 ? "Used — excellent" : "New",
      purpose: "Sale" as const,
      availability: "In stock",
    };
    if (category.id === "real-estate") {
      const bedrooms = 2 + (i % 4),
        bathrooms = 2 + (i % 3),
        size = 120 + i * 9;
      const title = propertyTitles[i % propertyTitles.length] ?? "Modern Apartment";
      const images =
        i % 6 === 1 || i % 6 === 3 ? [villa, interior, apartment] : [apartment, interior, villa];
      const type =
        i % 6 === 1 ? "Villa" : i % 6 === 3 ? "House" : i % 6 === 5 ? "Office" : "Apartment";
      return {
        ...base,
        title: i < 2 ? title : `${title} in ${location}`,
        type,
        price: i % 3 === 0 ? 85000 + i * 1500 : 12500000 + i * 350000,
        purpose: i % 3 === 0 ? "Rent" : "Sale",
        images,
        seller: "addis-homes",
        brand: "Addis Homes",
        bedrooms: i === 0 ? 3 : bedrooms,
        bathrooms,
        size,
        furnished: i % 2 === 0,
        description: `A thoughtfully designed ${type.toLowerCase()} in ${location}, Addis Ababa. Enjoy generous living spaces, natural light, secure parking, and convenient access to the city. This sample property includes a modern kitchen, well-appointed bedrooms, and a welcoming living area. Arrange a demo inquiry to explore the details.`,
        specs: {
          Bedrooms: String(i === 0 ? 3 : bedrooms),
          Bathrooms: String(bathrooms),
          Area: `${size} m²`,
          Furnished: i % 2 === 0 ? "Yes" : "No",
          Parking: "2 spaces",
          "Listing type": i % 3 === 0 ? "For rent" : "For sale",
        },
      };
    }
    if (category.id === "vehicles") {
      const year = 2022 - (i % 5);
      const model = ['RAV4', 'Corolla', 'Prado', 'Hilux'][i % 4] ?? 'RAV4';
      const vehicleImage = [car, corolla, prado, hilux][i % 4] ?? car;
      const vehicleType = model === 'Corolla' ? 'Sedan' : model === 'Hilux' ? 'Truck' : 'SUV';
      return {
        ...base,
        title: `Toyota ${model} ${year} — ${i % 2 === 0 ? "Premium Edition" : "Comfort Edition"}`,
        type: vehicleType,
        price: i % 6 === 5 ? 6000 + i * 100 : 4850000 + i * 95000,
        purpose: i % 6 === 5 ? "Rent" : "Sale",
        images: [vehicleImage],
        seller: "bole-motors",
        brand: "Toyota",
        model,
        year,
        fuel: i % 2 === 0 ? "Petrol" : "Hybrid",
        transmission: "Automatic",
        condition: "Used — excellent",
        description: `A well-maintained Toyota ${model} in ${location}. Comfortable, capable, and ready for the city or a weekend away. This demonstration listing includes representative photography; actual condition, documentation, and inspection would be confirmed directly with the seller in a live marketplace.`,
        specs: {
          Year: String(year),
          Mileage: `${28000 + i * 2500} km`,
          Transmission: "Automatic",
          Fuel: i % 2 === 0 ? "Petrol" : "Hybrid",
          "Body type": vehicleType,
          Seats: "5",
        },
      };
    }
    if (category.id === "electronics") {
      const types = ["Laptops", "Smartphones", "Audio"];
      const titles = [
        "Premium Ultrabook — 16GB / 512GB",
        "Galaxy Smartphone — 256GB",
        "Wireless Noise-Cancelling Headphones",
      ];
      const imgs = [laptop, phone, headphones];
      const k = i % 3;
      return {
        ...base,
        title: `${titles[k]}${i > 2 ? ` · ${location}` : ""}`,
        type: types[k] ?? "Laptops",
        price: (k === 0 ? 125000 : k === 1 ? 78500 : 12500) + Math.floor(i / 3) * 750,
        images: [imgs[k] ?? laptop],
        seller: "ethio-tech",
        brand: k === 0 ? "NexBook" : k === 1 ? "Galaxy" : "SoundPro",
        description: `Designed for your everyday. Explore this ${types[k]?.toLowerCase()} listing from our sample Ethio Tech store in ${location}. Premium materials, practical features, and a clean modern design. Product photography is representative demo content, not a live inventory guarantee.`,
        specs:
          k === 0
            ? {
                Memory: "16GB",
                Storage: "512GB SSD",
                Display: "14-inch",
                Warranty: "12 months (sample)",
              }
            : k === 1
              ? { Storage: "256GB", Display: "6.5-inch", Connectivity: "5G", Color: "Graphite" }
              : {
                  Connectivity: "Bluetooth",
                  Battery: "30 hours",
                  "Noise cancellation": "Yes",
                  Color: "Black",
                },
      };
    }
    let product =
      category.id === "fashion"
        ? {
            title: "The Everyday Edit — Essential Outfit",
            type: "Women's fashion",
            image: fashion,
            price: 6500,
            brand: "Urban Edit",
            seller: "urban-living",
            specs: {
              Material: "Cotton blend",
              Sizes: "S, M, L, XL",
              Care: "Gentle wash",
              Collection: "Everyday essentials",
            },
          }
        : category.id === "home-living"
          ? {
              title: "Modern Three-Seater Sofa",
              type: "Sofas",
              image: sofa,
              price: 42000,
              brand: "Urban Living",
              seller: "urban-living",
              specs: {
                Width: "220 cm",
                Material: "Linen blend",
                Seating: "3 people",
                Frame: "Solid wood",
              },
            }
          : category.id === "sports"
            ? {
                title: "Home Fitness Set — Dumbbells & Mat",
                type: "Fitness equipment",
                image: sports,
                price: 8500,
                brand: "Active Addis",
                seller: "urban-living",
                specs: {
                  Weight: "Adjustable",
                  Includes: "2 dumbbells + mat",
                  Material: "Steel & rubber",
                  Use: "Home fitness",
                },
              }
            : {
                title: "Professional Home Cleaning",
                type: "Cleaning",
                image: services,
                price: 2500,
                brand: "Addis Care",
                seller: "addis-care",
                specs: {
                  Duration: "3 hours",
                  Team: "2 professionals",
                  Supplies: "Included",
                  Coverage: "Addis Ababa",
                },
              };
    if (category.id === 'fashion' && i % 4 !== 0) {
      const variant = i % 4 === 1 ? { title: 'Habesha Kemis — Gold Tibeb Dress', image: dress, type: "Women's fashion", price: 12500 } : i % 4 === 2 ? { title: 'Everyday Leather Crossbody Bag', image: bag, type: 'Accessories', price: 4500 } : { title: 'Everyday Leather Sneakers', image: sneakers, type: 'Shoes', price: 5500 };
      product = {...product, ...variant};
    }
    if (category.id === 'home-living' && i % 2 === 1) product = {...product, title: 'Oak Dining Set — Table & Four Chairs', image: dining, type: 'Furniture', price: 58000};
    if (category.id === 'services' && i % 2 === 1) product = {...product, title: 'Professional Home Repairs', image: repairs, type: 'Repairs', price: 3200};
    return {
      ...base,
      title: i === 0 ? product.title : `${product.title} · ${location}`,
      type: product.type,
      images: [product.image],
      price: product.price + i * (category.id === "home-living" ? 700 : 100),
      brand: product.brand,
      seller: product.seller,
      specs: product.specs,
      description: `${product.title}, available from our sample ${product.brand} collection in ${location}, Addis Ababa. Thoughtful quality and practical details for your everyday life. All photographs and availability are representative demonstration content.`,
      availability:
        i % 9 === 8
          ? "Out of stock"
          : category.id === "services"
            ? "Available to inquire"
            : "In stock",
    };
  }),
);
export const categoryName = (id: string) =>
  categories.find((c) => c.id === id)?.name ?? "Marketplace";
export const currency = (value: number) =>
  `ETB ${new Intl.NumberFormat("en-ET", { maximumFractionDigits: 0 }).format(value)}`;
export function pageHead(title: string, description: string) {
  return {
    meta: [
      { title: `${title} | NEXORA` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | NEXORA` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
