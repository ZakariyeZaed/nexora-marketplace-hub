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

import mensFashion from "@/assets/mens-fashion.jpg";
import kidsFashion from "@/assets/kids-fashion.jpg";
import watches from "@/assets/watches-jewelry.jpg";
import land from "@/assets/land-plot.jpg";
import office from "@/assets/office-space.jpg";
import motorcycle from "@/assets/motorcycle.jpg";
import minibus from "@/assets/minibus.jpg";
import tv from "@/assets/smart-tv.jpg";
import camera from "@/assets/camera.jpg";
import appliances from "@/assets/home-appliances.jpg";
import bedroom from "@/assets/bedroom.jpg";
import decor from "@/assets/decor-lighting.jpg";
import football from "@/assets/football-gear.jpg";
import bicycle from "@/assets/bicycle.jpg";
import plumbing from "@/assets/plumbing.jpg";
import moving from "@/assets/moving.jpg";
import { formatMoney } from "./currency";

export interface Subcategory {
  slug: string;
  name: string;
  description: string;
  image: string;
}
interface Template {
  title: string;
  brand: string;
  price: number;
  specs: Record<string, string>;
  model?: string;
}
interface SubSeed extends Subcategory {
  seller: string;
  items: Template[];
  /** Category-specific fields for the nth listing of this subcategory. */
  extra?: (n: number) => Partial<Listing>;
}
const LISTINGS_PER_SUB = 5;

const re = (
  purpose: "Rent" | "Sale",
  beds: number,
  baths: number,
  size: number,
  type: string,
): ((n: number) => Partial<Listing>) => (n) => {
  const b = beds ? beds + (n % 3) : 0;
  const ba = baths ? baths + (n % 2) : 0;
  const area = size + n * 15;
  const furnished = n % 2 === 0;
  return {
    purpose,
    ...(b ? { bedrooms: b } : {}),
    ...(ba ? { bathrooms: ba } : {}),
    size: area,
    furnished,
    specs: {
      "Property type": type,
      ...(b ? { Bedrooms: String(b), Bathrooms: String(ba) } : {}),
      Area: `${area} m²`,
      Furnished: furnished ? "Yes" : "No",
      "Listing type": purpose === "Rent" ? "For rent" : "For sale",
    },
  };
};
const veh = (
  purpose: "Rent" | "Sale",
  bodyType: string,
  fuel: string[],
  transmission: string,
): ((n: number) => Partial<Listing>) => (n) => {
  const year = 2022 - (n % 5);
  const f = fuel[n % fuel.length] ?? "Petrol";
  const condition = n === 1 ? "New" : "Used — excellent";
  return {
    purpose,
    year,
    fuel: f,
    transmission,
    condition,
    specs: {
      Year: String(year),
      Mileage: condition === "New" ? "0 km" : `${18000 + n * 9500} km`,
      Transmission: transmission,
      Fuel: f,
      "Body type": bodyType,
      Condition: condition,
    },
  };
};

const seeds: Record<string, SubSeed[]> = {
  "real-estate": [
    { slug: "apartments-rent", name: "Apartments for Rent", description: "Furnished and unfurnished apartments for monthly rent.", image: apartment, seller: "addis-homes",
      items: [{ title: "Modern 3-Bedroom Apartment", brand: "Addis Homes", price: 85000, specs: {} }, { title: "Bright City-View Apartment", brand: "Addis Homes", price: 62000, specs: {} }, { title: "Serviced 2-Bedroom Apartment", brand: "Addis Homes", price: 74000, specs: {} }],
      extra: re("Rent", 3, 2, 120, "Apartment") },
    { slug: "houses-villas-rent", name: "Houses & Villas for Rent", description: "Family houses and villas with gardens and parking.", image: villa, seller: "addis-homes",
      items: [{ title: "Contemporary Family Villa", brand: "Addis Homes", price: 180000, specs: {} }, { title: "G+1 House with Garden", brand: "Addis Homes", price: 135000, specs: {} }],
      extra: re("Rent", 4, 3, 280, "Villa") },
    { slug: "properties-sale", name: "Properties for Sale", description: "Apartments and homes available to buy.", image: interior, seller: "addis-homes",
      items: [{ title: "Premium Apartment with Balcony", brand: "Addis Homes", price: 12500000, specs: {} }, { title: "Spacious Family House", brand: "Addis Homes", price: 28500000, specs: {} }],
      extra: re("Sale", 3, 2, 150, "Apartment / House") },
    { slug: "land-plots", name: "Land & Plots", description: "Residential and investment land with lease documents.", image: land, seller: "addis-homes",
      items: [{ title: "Residential Plot — 500 m²", brand: "Addis Homes", price: 9500000, specs: {} }, { title: "Corner Investment Plot", brand: "Addis Homes", price: 16000000, specs: {} }],
      extra: re("Sale", 0, 0, 500, "Land") },
    { slug: "commercial", name: "Commercial Properties", description: "Warehouses, showrooms, and mixed-use buildings.", image: villa, seller: "addis-homes",
      items: [{ title: "Mixed-Use Commercial Building", brand: "Addis Homes", price: 65000000, specs: {} }, { title: "Ground-Floor Showroom", brand: "Addis Homes", price: 22000000, specs: {} }],
      extra: re("Sale", 0, 2, 420, "Commercial") },
    { slug: "offices-shops", name: "Offices & Shops", description: "Office floors and retail shops for rent.", image: office, seller: "addis-homes",
      items: [{ title: "Modern Office Space", brand: "Addis Homes", price: 95000, specs: {} }, { title: "Retail Shop on Main Road", brand: "Addis Homes", price: 55000, specs: {} }],
      extra: re("Rent", 0, 1, 90, "Office / Shop") },
  ],
  vehicles: [
    { slug: "cars-sale", name: "Cars for Sale", description: "Sedans and hatchbacks ready for a new owner.", image: corolla, seller: "bole-motors",
      items: [{ title: "Toyota Corolla", brand: "Toyota", model: "Corolla", price: 3950000, specs: {} }, { title: "Hyundai Elantra", brand: "Hyundai", model: "Elantra", price: 3600000, specs: {} }, { title: "Suzuki Dzire", brand: "Suzuki", model: "Dzire", price: 2450000, specs: {} }],
      extra: veh("Sale", "Sedan", ["Petrol", "Hybrid"], "Automatic") },
    { slug: "cars-rent", name: "Cars for Rent", description: "Daily rentals for business trips and events.", image: car, seller: "bole-motors",
      items: [{ title: "Toyota RAV4 — Daily Rental", brand: "Toyota", model: "RAV4", price: 6500, specs: {} }, { title: "Toyota Corolla — Daily Rental", brand: "Toyota", model: "Corolla", price: 4200, specs: {} }],
      extra: veh("Rent", "SUV / Sedan", ["Petrol"], "Automatic") },
    { slug: "suv-4x4", name: "SUVs & 4x4 Vehicles", description: "Capable SUVs for city roads and country trips.", image: prado, seller: "bole-motors",
      items: [{ title: "Toyota Land Cruiser Prado", brand: "Toyota", model: "Prado", price: 11500000, specs: {} }, { title: "Toyota RAV4", brand: "Toyota", model: "RAV4", price: 5800000, specs: {} }, { title: "Hyundai Tucson", brand: "Hyundai", model: "Tucson", price: 5200000, specs: {} }],
      extra: veh("Sale", "SUV", ["Petrol", "Diesel", "Hybrid"], "Automatic") },
    { slug: "trucks", name: "Trucks & Commercial Vehicles", description: "Pickups and trucks for work and delivery.", image: hilux, seller: "bole-motors",
      items: [{ title: "Toyota Hilux Double Cab", brand: "Toyota", model: "Hilux", price: 7200000, specs: {} }, { title: "Isuzu NPR Light Truck", brand: "Isuzu", model: "NPR", price: 6400000, specs: {} }],
      extra: veh("Sale", "Truck", ["Diesel"], "Manual") },
    { slug: "motorcycles", name: "Motorcycles & Scooters", description: "Efficient two-wheelers for quick city trips.", image: motorcycle, seller: "bole-motors",
      items: [{ title: "Honda CG125 Motorcycle", brand: "Honda", model: "CG125", price: 185000, specs: {} }, { title: "Bajaj Boxer 150", brand: "Bajaj", model: "Boxer", price: 165000, specs: {} }],
      extra: veh("Sale", "Motorcycle", ["Petrol"], "Manual") },
    { slug: "buses", name: "Buses & Minibuses", description: "Minibuses and buses for transport businesses.", image: minibus, seller: "bole-motors",
      items: [{ title: "Toyota HiAce Minibus", brand: "Toyota", model: "HiAce", price: 6900000, specs: {} }, { title: "Toyota Coaster Bus", brand: "Toyota", model: "Coaster", price: 9800000, specs: {} }],
      extra: veh("Sale", "Bus", ["Diesel"], "Manual") },
  ],
  fashion: [
    { slug: "mens", name: "Men's Fashion", description: "Shirts, blazers, and everyday menswear.", image: mensFashion, seller: "urban-living",
      items: [{ title: "Tailored Navy Blazer", brand: "Urban Edit", price: 7800, specs: { Material: "Wool blend", Sizes: "S–XXL", Fit: "Slim" } }, { title: "Oxford Cotton Shirt", brand: "Urban Edit", price: 2400, specs: { Material: "100% cotton", Sizes: "S–XXL", Fit: "Regular" } }, { title: "Classic Chino Trousers", brand: "Urban Edit", price: 3200, specs: { Material: "Cotton twill", Sizes: "30–40", Fit: "Straight" } }] },
    { slug: "womens", name: "Women's Fashion", description: "Habesha kemis, dresses, and contemporary looks.", image: dress, seller: "urban-living",
      items: [{ title: "Habesha Kemis — Gold Tibeb Dress", brand: "Shema Atelier", price: 12500, specs: { Material: "Handwoven cotton", Sizes: "S–XL", Detail: "Gold tibeb" } }, { title: "The Everyday Edit — Essential Outfit", brand: "Urban Edit", price: 6500, specs: { Material: "Cotton blend", Sizes: "S–XL", Care: "Gentle wash" } }] },
    { slug: "kids", name: "Kids' Fashion", description: "Comfortable clothing for children of all ages.", image: kidsFashion, seller: "urban-living",
      items: [{ title: "Kids' Denim Overall Set", brand: "Little Addis", price: 1800, specs: { Ages: "2–8 years", Material: "Soft denim" } }, { title: "Kids' Cotton T-Shirt Pack (4)", brand: "Little Addis", price: 1500, specs: { Ages: "3–10 years", Material: "Cotton" } }] },
    { slug: "shoes", name: "Shoes & Footwear", description: "Sneakers, formal shoes, and sandals.", image: sneakers, seller: "urban-living",
      items: [{ title: "Everyday Leather Sneakers", brand: "Step Addis", price: 5500, specs: { Material: "Genuine leather", Sizes: "38–45" } }, { title: "Classic Leather Oxford Shoes", brand: "Step Addis", price: 6800, specs: { Material: "Genuine leather", Sizes: "39–45" } }] },
    { slug: "bags", name: "Bags & Accessories", description: "Handbags, belts, and everyday accessories.", image: bag, seller: "urban-living",
      items: [{ title: "Everyday Leather Crossbody Bag", brand: "Urban Edit", price: 4500, specs: { Material: "Ethiopian leather", Strap: "Adjustable" } }, { title: "Leather Belt & Wallet Set", brand: "Urban Edit", price: 2900, specs: { Material: "Ethiopian leather" } }] },
    { slug: "watches", name: "Watches & Jewelry", description: "Wristwatches, necklaces, and rings.", image: watches, seller: "urban-living",
      items: [{ title: "Gold-Tone Analog Wristwatch", brand: "Timeline", price: 9500, specs: { Case: "40 mm", Water: "50 m resistant" } }, { title: "Pendant Necklace & Ring Set", brand: "Timeline", price: 7200, specs: { Finish: "Gold plated", Stone: "Green crystal" } }] },
  ],
  electronics: [
    { slug: "smartphones", name: "Smartphones", description: "The latest phones, new and gently used.", image: phone, seller: "ethio-tech",
      items: [{ title: "Galaxy Smartphone — 256GB", brand: "Samsung", model: "Galaxy S23", price: 78500, specs: { Storage: "256GB", Display: "6.5-inch", Connectivity: "5G" } }, { title: "iPhone 14 — 128GB", brand: "Apple", model: "iPhone 14", price: 92000, specs: { Storage: "128GB", Display: "6.1-inch", Connectivity: "5G" } }, { title: "Tecno Camon 20 — 256GB", brand: "Tecno", model: "Camon 20", price: 24500, specs: { Storage: "256GB", Display: "6.67-inch", Connectivity: "4G" } }] },
    { slug: "laptops", name: "Laptops & Computers", description: "Ultrabooks, workstations, and desktops.", image: laptop, seller: "ethio-tech",
      items: [{ title: "Premium Ultrabook — 16GB / 512GB", brand: "NexBook", model: "Air 14", price: 125000, specs: { Memory: "16GB", Storage: "512GB SSD", Display: "14-inch" } }, { title: "HP ProBook Business Laptop", brand: "HP", model: "ProBook 450", price: 88000, specs: { Memory: "8GB", Storage: "256GB SSD", Display: "15.6-inch" } }] },
    { slug: "tvs", name: "TVs & Entertainment", description: "Smart TVs, soundbars, and home cinema.", image: tv, seller: "ethio-tech",
      items: [{ title: "55-inch 4K Smart TV", brand: "Samsung", model: "Crystal UHD", price: 68000, specs: { Screen: "55-inch", Resolution: "4K UHD", Smart: "Yes" } }, { title: "Soundbar with Wireless Subwoofer", brand: "LG", model: "SN5Y", price: 27500, specs: { Power: "400W", Connectivity: "Bluetooth / HDMI" } }] },
    { slug: "cameras", name: "Cameras & Photography", description: "Mirrorless cameras, lenses, and gear.", image: camera, seller: "ethio-tech",
      items: [{ title: "Full-Frame Mirrorless Camera", brand: "Sony", model: "Alpha 7 III", price: 195000, specs: { Sensor: "24MP full frame", Video: "4K" } }, { title: "50mm f/1.8 Prime Lens", brand: "Sony", model: "FE 50mm", price: 32000, specs: { Mount: "Sony E", Aperture: "f/1.8" } }] },
    { slug: "audio", name: "Audio & Headphones", description: "Headphones, earbuds, and speakers.", image: headphones, seller: "ethio-tech",
      items: [{ title: "Wireless Noise-Cancelling Headphones", brand: "SoundPro", model: "NC700", price: 12500, specs: { Battery: "30 hours", "Noise cancellation": "Yes" } }, { title: "True Wireless Earbuds", brand: "SoundPro", model: "Buds 2", price: 6800, specs: { Battery: "24 hours with case", Connectivity: "Bluetooth 5.3" } }] },
    { slug: "appliances", name: "Home Appliances", description: "Fridges, washing machines, and more.", image: appliances, seller: "ethio-tech",
      items: [{ title: "French-Door Refrigerator", brand: "LG", model: "GR-X257", price: 145000, specs: { Capacity: "600 L", Finish: "Stainless steel" } }, { title: "Front-Load Washing Machine — 8kg", brand: "Samsung", model: "WW80", price: 62000, specs: { Capacity: "8 kg", Speed: "1400 rpm" } }] },
  ],
  "home-living": [
    { slug: "sofas", name: "Sofas & Living Room Furniture", description: "Sofas, armchairs, and coffee tables.", image: sofa, seller: "urban-living",
      items: [{ title: "Modern Three-Seater Sofa", brand: "Urban Living", price: 42000, specs: { Width: "220 cm", Material: "Linen blend", Frame: "Solid wood" } }, { title: "L-Shaped Sectional Sofa", brand: "Urban Living", price: 68000, specs: { Seating: "5 people", Material: "Velvet" } }] },
    { slug: "beds", name: "Beds & Bedroom Furniture", description: "Beds, wardrobes, and bedside tables.", image: bedroom, seller: "urban-living",
      items: [{ title: "Solid Oak Queen Bed Frame", brand: "Urban Living", price: 38000, specs: { Size: "160 × 200 cm", Material: "Oak" } }, { title: "Bedside Table Pair", brand: "Urban Living", price: 9500, specs: { Material: "Oak veneer", Drawers: "1 each" } }] },
    { slug: "dining", name: "Tables & Dining Furniture", description: "Dining sets, tables, and chairs.", image: dining, seller: "urban-living",
      items: [{ title: "Oak Dining Set — Table & Four Chairs", brand: "Urban Living", price: 58000, specs: { Seats: "4", Material: "Solid oak" } }, { title: "Extendable Six-Seater Dining Table", brand: "Urban Living", price: 46000, specs: { Seats: "6–8", Material: "Walnut veneer" } }] },
    { slug: "kitchen", name: "Kitchen Appliances", description: "Blenders, cookers, and coffee makers.", image: appliances, seller: "urban-living",
      items: [{ title: "Electric Jebena Coffee Maker", brand: "Buna Home", price: 4800, specs: { Capacity: "1 L", Power: "800W" } }, { title: "4-Burner Gas Cooker with Oven", brand: "Buna Home", price: 36000, specs: { Burners: "4", Oven: "60 L" } }] },
    { slug: "decor", name: "Home Decoration & Lighting", description: "Lamps, art, vases, and textiles.", image: decor, seller: "urban-living",
      items: [{ title: "Woven Pendant Lamp", brand: "Lumen Addis", price: 5200, specs: { Diameter: "45 cm", Material: "Natural fibre" } }, { title: "Ceramic Vase Set (3)", brand: "Lumen Addis", price: 3400, specs: { Material: "Handmade ceramic" } }] },
    { slug: "household", name: "Household Essentials", description: "Storage, cleaning, and everyday home basics.", image: services, seller: "urban-living",
      items: [{ title: "Home Cleaning Essentials Kit", brand: "Urban Living", price: 2200, specs: { Includes: "Mop, bucket, cloths" } }, { title: "Cotton Towel Set (6)", brand: "Urban Living", price: 2800, specs: { Material: "100% cotton" } }] },
  ],
  sports: [
    { slug: "gym", name: "Gym & Fitness Equipment", description: "Dumbbells, benches, and home gym sets.", image: sports, seller: "urban-living",
      items: [{ title: "Home Fitness Set — Dumbbells & Mat", brand: "Active Addis", price: 8500, specs: { Weight: "Adjustable", Includes: "2 dumbbells + mat" } }, { title: "Adjustable Weight Bench", brand: "Active Addis", price: 14500, specs: { "Max load": "250 kg" } }] },
    { slug: "sportswear", name: "Sportswear", description: "Training tops, track suits, and leggings.", image: fashion, seller: "urban-living",
      items: [{ title: "Breathable Training Track Suit", brand: "Active Addis", price: 4200, specs: { Material: "Polyester", Sizes: "S–XXL" } }, { title: "Women's Training Leggings", brand: "Active Addis", price: 2100, specs: { Material: "Stretch knit", Sizes: "XS–XL" } }] },
    { slug: "football", name: "Football Equipment", description: "Balls, boots, and protective gear.", image: football, seller: "urban-living",
      items: [{ title: "Match Football — Size 5", brand: "Kick Addis", price: 2600, specs: { Size: "5", Use: "Turf & grass" } }, { title: "Football Boots & Shin Guards", brand: "Kick Addis", price: 5900, specs: { Sizes: "38–45" } }] },
    { slug: "running", name: "Running & Outdoor Gear", description: "Running shoes, packs, and hiking gear.", image: sneakers, seller: "urban-living",
      items: [{ title: "Lightweight Running Shoes", brand: "Entoto Run", price: 6200, specs: { Sizes: "38–46", Drop: "8 mm" } }, { title: "Hydration Running Vest", brand: "Entoto Run", price: 3300, specs: { Capacity: "5 L" } }] },
    { slug: "cycling", name: "Cycling Equipment", description: "Bicycles, helmets, and accessories.", image: bicycle, seller: "urban-living",
      items: [{ title: "Carbon Road Bicycle", brand: "Velo Addis", price: 145000, specs: { Frame: "Carbon", Gears: "22-speed" } }, { title: "Cycling Helmet", brand: "Velo Addis", price: 4800, specs: { Sizes: "M / L" } }] },
    { slug: "accessories", name: "Sports Accessories", description: "Bags, bottles, and recovery tools.", image: sports, seller: "urban-living",
      items: [{ title: "Sports Duffel Bag", brand: "Active Addis", price: 2900, specs: { Capacity: "40 L" } }, { title: "Foam Roller & Resistance Bands", brand: "Active Addis", price: 1900, specs: { Includes: "Roller + 3 bands" } }] },
  ],
  services: [
    { slug: "cleaning", name: "Cleaning Services", description: "Home and office cleaning by local teams.", image: services, seller: "addis-care",
      items: [{ title: "Professional Home Cleaning", brand: "Addis Care", price: 2500, specs: { Duration: "3 hours", Team: "2 professionals", Supplies: "Included" } }, { title: "Office Deep Cleaning", brand: "Addis Care", price: 6500, specs: { Duration: "Full day", Team: "4 professionals" } }] },
    { slug: "plumbing", name: "Plumbing Services", description: "Leak repairs, installations, and drains.", image: plumbing, seller: "addis-care",
      items: [{ title: "Leak & Pipe Repair Visit", brand: "Addis Care", price: 1500, specs: { "Starting price": "Call-out + labour", Response: "Same day (sample)" } }, { title: "Bathroom Fixture Installation", brand: "Addis Care", price: 3800, specs: { Includes: "Labour only" } }] },
    { slug: "electrical", name: "Electrical Services", description: "Wiring, lighting, and safety checks.", image: repairs, seller: "addis-care",
      items: [{ title: "Home Electrical Safety Check", brand: "Addis Care", price: 1800, specs: { Duration: "2 hours" } }, { title: "Lighting & Socket Installation", brand: "Addis Care", price: 2400, specs: { Includes: "Labour only" } }] },
    { slug: "renovation", name: "Home Renovation", description: "Painting, tiling, and interior upgrades.", image: interior, seller: "addis-care",
      items: [{ title: "Interior Painting — Per Room", brand: "Addis Care", price: 7500, specs: { Includes: "Labour & primer" } }, { title: "Kitchen & Bathroom Tiling", brand: "Addis Care", price: 18000, specs: { Pricing: "From, per project" } }] },
    { slug: "moving", name: "Moving & Delivery Services", description: "House moves and furniture delivery.", image: moving, seller: "addis-care",
      items: [{ title: "Apartment Moving Service", brand: "Addis Care", price: 9500, specs: { Team: "3 movers + van" } }, { title: "Same-Day Furniture Delivery", brand: "Addis Care", price: 2200, specs: { Coverage: "Addis Ababa" } }] },
    { slug: "repairs", name: "Repair & Maintenance Services", description: "Appliance, furniture, and handyman repairs.", image: repairs, seller: "addis-care",
      items: [{ title: "Professional Home Repairs", brand: "Addis Care", price: 3200, specs: { Duration: "Half day" } }, { title: "Appliance Repair Visit", brand: "Addis Care", price: 1700, specs: { Covers: "Fridges, washers, cookers" } }] },
  ],
};

const categoryMeta = [
  { id: "real-estate", name: "Real Estate", short: "Real Estate", href: "/real-estate", description: "Find a place to call your own. Apartments, villas, land, and commercial spaces across Addis Ababa." },
  { id: "vehicles", name: "Cars & Vehicles", short: "Cars & Vehicles", href: "/vehicles", description: "Your next journey starts here. Explore cars, motorcycles, trucks, and buses for sale and rent." },
  { id: "fashion", name: "Fashion", short: "Fashion", href: "/fashion", description: "Everyday essentials, distinctive style. Discover local boutiques and contemporary fashion." },
  { id: "electronics", name: "Electronics & Technology", short: "Electronics", href: "/electronics", description: "A little more connected. Find the technology that fits your everyday life." },
  { id: "home-living", name: "Home & Living", short: "Home & Living", href: "/home-living", description: "Thoughtful pieces for a home that feels like you. Furniture and home essentials." },
  { id: "sports", name: "Sports & Fitness", short: "Sports & Fitness", href: "/sports", description: "Make room for movement. Equipment and essentials for your fitness journey." },
  { id: "services", name: "Services", short: "Services", href: "/services", description: "Good help, close to home. Discover local professionals for the everyday and beyond." },
] as const;

export const categories = categoryMeta.map((c) => {
  const subs = seeds[c.id] ?? [];
  return {
    ...c,
    count: subs.length * LISTINGS_PER_SUB,
    types: subs.map((s) => s.name),
    subcategories: subs.map(({ slug, name, description, image }) => ({ slug, name, description, image })),
  };
});
export type CategoryId = (typeof categoryMeta)[number]["id"];
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
  { id: "addis-homes", name: "Addis Homes", initials: "AH", category: "Real estate", location: "Bole" },
  { id: "bole-motors", name: "Bole Motors", initials: "BM", category: "Cars & vehicles", location: "Bole" },
  { id: "ethio-tech", name: "Ethio Tech", initials: "ET", category: "Electronics", location: "Megenagna" },
  { id: "urban-living", name: "Urban Living", initials: "UL", category: "Home & fashion", location: "Kazanchis" },
  { id: "addis-care", name: "Addis Care", initials: "AC", category: "Local services", location: "CMC" },
];

function describe(cat: CategoryId, sub: SubSeed, t: Template, location: string) {
  if (cat === "real-estate")
    return `${t.title} in ${location}, Addis Ababa — part of our ${sub.name.toLowerCase()} collection. Generous space, natural light, and convenient access to the city. This is sample property content; details would be confirmed directly with the agent in a live marketplace.`;
  if (cat === "vehicles")
    return `${t.title} offered in ${location}. ${sub.description} Representative photography and demo details; documentation, condition, and inspection would be confirmed directly with the dealer in a live marketplace.`;
  if (cat === "services")
    return `${t.title} by ${t.brand}, serving ${location} and nearby areas of Addis Ababa. Prices shown are sample starting prices. Send a demo inquiry to describe your job — no real provider is contacted.`;
  return `${t.title} from our sample ${t.brand} collection in ${location}, Addis Ababa. ${sub.description} All photographs and availability are representative demonstration content.`;
}

let seq = 0;
export const initialListings: Listing[] = categoryMeta.flatMap((c) => {
  const subs = seeds[c.id] ?? [];
  let i = 0;
  return subs.flatMap((sub, si) =>
    Array.from({ length: LISTINGS_PER_SUB }, (_, n): Listing => {
      const t = sub.items[n % sub.items.length] as Template;
      const location = neighborhoods[(si * LISTINGS_PER_SUB + n) % neighborhoods.length] ?? "Bole";
      const extra = sub.extra?.(n) ?? {};
      const commerce = !["real-estate", "vehicles", "services"].includes(c.id);
      const idx = i++;
      seq++;
      const listing: Listing = {
        id: `${c.id}-${idx + 1}`,
        title: n < sub.items.length ? `${t.title}${c.id === "real-estate" ? ` in ${location}` : ""}` : `${t.title} · ${location}`,
        category: c.id,
        type: sub.name,
        price: Math.round(t.price * (1 + (n >= sub.items.length ? 0.04 * n : 0))),
        location,
        images: c.id === "real-estate" ? [sub.image, interior, apartment] : [sub.image],
        description: describe(c.id, sub, t, location),
        seller: sub.seller,
        brand: t.brand,
        ...(t.model ? { model: t.model } : {}),
        condition: c.id === "services" ? "Service" : n % 4 === 3 ? "Used — excellent" : "New",
        featured: n === 0 && si < 4,
        status: idx === subs.length * LISTINGS_PER_SUB - 1 ? "pending" : "active",
        created: 1794916800000 - seq * 3600000,
        purpose: "Sale",
        availability: c.id === "services" ? "Available to inquire" : commerce && n === 4 && si % 2 === 1 ? "Out of stock" : "In stock",
        ...extra,
        specs: { ...(t.model ? { Brand: t.brand, Model: t.model } : {}), ...t.specs, ...(extra.specs ?? {}) },
      };
      return listing;
    }),
  );
});
export const subcategoryBySlug = (category: string, slug: string) =>
  categories.find((c) => c.id === category)?.subcategories.find((s) => s.slug === slug);
export const categoryName = (id: string) =>
  categories.find((c) => c.id === id)?.name ?? "Marketplace";
/** Formats an ETB base price in the selected currency. In JSX prefer <Money>, which re-renders on change. */
export const currency = (value: number) => formatMoney(value);
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
