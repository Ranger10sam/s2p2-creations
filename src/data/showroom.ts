export const businessTypes = [
  "Café",
  "Restaurant",
  "Bakery",
  "Gym",
  "Salon",
  "Photographer",
  "Interior Designer",
  "Real Estate",
  "Coaching",
  "E-commerce",
  "Local Business",
  "Professional Services",
] as const;

export const websiteTypes = [
  "Business Website",
  "Landing Page",
  "Portfolio",
  "E-commerce",
  "Booking",
  "Restaurant / Menu",
  "Lead Generation",
] as const;

export const showroomFeatures = [
  "WhatsApp",
  "Booking",
  "Contact Form",
  "Gallery",
  "Menu",
  "Reviews",
  "Payments",
  "CMS",
  "Analytics",
  "Maps",
  "Social Links",
] as const;

export type BusinessType = (typeof businessTypes)[number];
export type WebsiteType = (typeof websiteTypes)[number];
export type ShowroomFeature = (typeof showroomFeatures)[number];

export type ShowroomAddon = {
  name: string;
  startingPrice?: number;
  description?: string;
};

export type ShowroomProduct = {
  id: string;
  slug: string;
  name: string;
  category: BusinessType[];
  websiteType: WebsiteType[];
  statement: string;
  description: string;
  shortDescription: string;
  overview: string;
  startingPrice: number;
  currency: "INR";
  deliveryDays: {
    min: number;
    max: number;
  };
  features: ShowroomFeature[];
  tags: string[];
  image: string;
  gallery?: string[];
  featured: boolean;
  sortOrder: number;
  publishedAt: string;
  status: "available" | "coming-soon";
  included: string[];
  customizable: string[];
  addons: ShowroomAddon[];
  demoUrl?: string;
};

const standardAddons: ShowroomAddon[] = [
  { name: "Additional page", startingPrice: 1500 },
  { name: "Booking integration", startingPrice: 3000 },
  { name: "Payment integration", startingPrice: 3000 },
  {
    name: "Custom functionality",
    description: "Quoted separately after the requirements are reviewed.",
  },
];

const standardCustomizations = [
  "Logo and brand colors",
  "Typography",
  "Text and business content",
  "Images and gallery",
  "Services, products, or menu",
  "Contact information",
  "Social links",
];

export const showroomProducts: ShowroomProduct[] = [
  {
    id: "cafe-01",
    slug: "cafe-01",
    name: "Café No. 01",
    category: ["Café", "Restaurant"],
    websiteType: ["Business Website", "Restaurant / Menu"],
    statement: "A modern digital storefront for cafés that want to turn visitors into customers.",
    description: "A warm, editorial café website built around the menu, atmosphere, and a clear path to visit or order.",
    shortDescription: "A warm café website focused on menu discovery and local visits.",
    overview: "Designed for independent cafés and casual restaurants that need a polished home online. The concept gives visitors the essentials quickly: what you serve, what the space feels like, where to find you, and how to get in touch.",
    startingPrice: 7999,
    currency: "INR",
    deliveryDays: { min: 7, max: 10 },
    features: ["Menu", "Gallery", "WhatsApp", "Maps", "Contact Form", "Social Links"],
    tags: ["Menu", "WhatsApp", "Gallery"],
    image: "/showroom/cafe-01.svg",
    featured: true,
    sortOrder: 1,
    publishedAt: "2026-09-20",
    status: "available",
    included: ["Responsive homepage", "About section", "Menu", "Gallery", "Location and maps", "WhatsApp CTA", "Contact section", "Social links", "Deployment"],
    customizable: standardCustomizations,
    addons: standardAddons,
    demoUrl: "/showroom-demos/cafe-01/index.html",
  },
  {
    id: "bakery-01",
    slug: "bakery-01",
    name: "Bakery No. 01",
    category: ["Bakery"],
    websiteType: ["Business Website", "Lead Generation"],
    statement: "A product-led bakery website that makes every bake feel worth ordering.",
    description: "A bright, product-forward concept for bakeries that take custom orders and rely on local discovery.",
    shortDescription: "A product-forward bakery site for enquiries and custom orders.",
    overview: "Built for neighbourhood bakeries, home bakers, and specialty dessert brands. The visual system gives products room to shine while WhatsApp and enquiry actions keep ordering straightforward.",
    startingPrice: 7999,
    currency: "INR",
    deliveryDays: { min: 7, max: 10 },
    features: ["Gallery", "WhatsApp", "Contact Form", "Maps", "Social Links"],
    tags: ["Product Gallery", "WhatsApp", "Enquiries"],
    image: "/showroom/bakery-01.svg",
    featured: true,
    sortOrder: 2,
    publishedAt: "2026-09-18",
    status: "available",
    included: ["Responsive homepage", "Brand story", "Product gallery", "Custom order CTA", "WhatsApp CTA", "Location and maps", "Contact form", "Social links", "Deployment"],
    customizable: standardCustomizations,
    addons: standardAddons,
    demoUrl: "/showroom-demos/bakery-01/index.html",
  },
  {
    id: "gym-01",
    slug: "gym-01",
    name: "Gym No. 01",
    category: ["Gym"],
    websiteType: ["Business Website", "Lead Generation"],
    statement: "A confident gym website built to turn local interest into trial visits.",
    description: "A direct, energetic concept that presents memberships, trainers, proof, and trial-session enquiries.",
    shortDescription: "An energetic gym site built around memberships and trial visits.",
    overview: "Designed for independent gyms and fitness studios that need to communicate credibility quickly. Membership options, trainer profiles, reviews, and enquiry actions work together without making the experience feel crowded.",
    startingPrice: 8999,
    currency: "INR",
    deliveryDays: { min: 7, max: 10 },
    features: ["WhatsApp", "Contact Form", "Reviews", "Gallery", "Maps"],
    tags: ["Memberships", "Trainers", "Reviews"],
    image: "/showroom/gym-01.svg",
    featured: true,
    sortOrder: 3,
    publishedAt: "2026-09-15",
    status: "available",
    included: ["Responsive homepage", "Membership plans", "Trainer profiles", "Facilities gallery", "Reviews", "Trial-session CTA", "Contact form", "Location and maps", "Deployment"],
    customizable: standardCustomizations,
    addons: standardAddons,
    demoUrl: "/showroom-demos/gym-01/index.html",
  },
  {
    id: "salon-01",
    slug: "salon-01",
    name: "Salon No. 01",
    category: ["Salon"],
    websiteType: ["Business Website", "Booking"],
    statement: "A refined salon website that makes services clear and booking feel effortless.",
    description: "A polished local-service concept with treatments, visual proof, location details, and booking actions.",
    shortDescription: "A refined salon site with services, proof, and booking actions.",
    overview: "Created for salons and beauty studios that want a calm, premium presentation. Visitors can scan services, see the quality of the work, and move naturally toward booking or WhatsApp.",
    startingPrice: 7999,
    currency: "INR",
    deliveryDays: { min: 7, max: 10 },
    features: ["Booking", "Gallery", "WhatsApp", "Maps", "Social Links"],
    tags: ["Services", "Booking CTA", "Gallery"],
    image: "/showroom/salon-01.svg",
    featured: false,
    sortOrder: 4,
    publishedAt: "2026-09-12",
    status: "available",
    included: ["Responsive homepage", "Services and pricing", "Gallery", "Booking CTA", "WhatsApp CTA", "Location and maps", "Social links", "Deployment"],
    customizable: standardCustomizations,
    addons: standardAddons,
    demoUrl: "/showroom-demos/salon-01/index.html",
  },
  {
    id: "photographer-01",
    slug: "photographer-01",
    name: "Photographer No. 01",
    category: ["Photographer"],
    websiteType: ["Portfolio", "Lead Generation"],
    statement: "An image-first portfolio that helps the right clients picture working with you.",
    description: "An editorial portfolio concept for photographers who need strong work presentation and qualified enquiries.",
    shortDescription: "An image-first portfolio for packages and qualified enquiries.",
    overview: "Made for independent photographers across weddings, portraits, products, and events. The layout prioritizes imagery while still giving packages, testimonials, and enquiries a clear role.",
    startingPrice: 9999,
    currency: "INR",
    deliveryDays: { min: 10, max: 14 },
    features: ["Gallery", "Contact Form", "Reviews", "Social Links"],
    tags: ["Portfolio Gallery", "Packages", "Testimonials"],
    image: "/showroom/photographer-01.svg",
    featured: false,
    sortOrder: 5,
    publishedAt: "2026-09-10",
    status: "available",
    included: ["Responsive portfolio", "About section", "Project galleries", "Packages", "Testimonials", "Enquiry form", "Social links", "Deployment"],
    customizable: standardCustomizations,
    addons: standardAddons,
    demoUrl: "/showroom-demos/photographer-01/index.html",
  },
  {
    id: "interior-studio-01",
    slug: "interior-studio-01",
    name: "Interior Studio No. 01",
    category: ["Interior Designer"],
    websiteType: ["Portfolio", "Lead Generation"],
    statement: "A considered studio portfolio for spaces, services, and serious project enquiries.",
    description: "A spacious portfolio concept for interior designers who need to present projects with clarity and restraint.",
    shortDescription: "A spacious studio portfolio for projects and serious enquiries.",
    overview: "Designed for interior designers and small architecture studios. The concept balances large project imagery with services, process, testimonials, and a focused enquiry path.",
    startingPrice: 12999,
    currency: "INR",
    deliveryDays: { min: 14, max: 21 },
    features: ["Gallery", "Contact Form", "Reviews", "Maps", "Social Links"],
    tags: ["Project Gallery", "Services", "Testimonials"],
    image: "/showroom/interior-studio-01.svg",
    featured: false,
    sortOrder: 6,
    publishedAt: "2026-09-08",
    status: "available",
    included: ["Responsive portfolio", "Studio profile", "Project gallery", "Services", "Process", "Testimonials", "Enquiry form", "Location and maps", "Deployment"],
    customizable: standardCustomizations,
    addons: standardAddons,
    demoUrl: "/showroom-demos/interior-studio-01/index.html",
  },
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDelivery(product: ShowroomProduct) {
  const { min, max } = product.deliveryDays;
  return min === max ? `${max} days` : `${min}–${max} days`;
}

export function getShowroomProduct(slug: string) {
  return showroomProducts.find((product) => product.slug === slug);
}