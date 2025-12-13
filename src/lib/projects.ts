export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  color: string;
  heroImage?: string; // Placeholder for now
  overview: string;
  role?: string;
  timeline?: string;
  techStack: {
    category: string;
    items: string[];
  }[];
  features: {
    title: string;
    description: string;
  }[];
  challenges?: {
    title: string;
    description: string;
  }[];
  results?: {
    metric: string;
    label: string;
  }[];
}

export const projects: Project[] = [
  {
    slug: "chefbit",
    title: "ChefBit",
    description: "Smart kitchen management system for modern restaurants.",
    tags: ["React Native", "Firebase", "Redux", "Analytics"],
    link: "https://play.google.com/store/apps/details?id=com.chefbit.in",
    color: "bg-orange-500",
    overview: "Chefbit is a comprehensive mobile application designed to be a smart cooking companion. It combines recipe discovery, meal planning, and AI-powered assistance to help users explore culinary delights. The app features a modern, responsive UI built with React Native and Expo, backed by a robust Spring Boot backend.",
    role: "Full Stack Development",
    techStack: [
      { category: "Frontend", items: ["React Native (v0.79)", "Expo (SDK 53)", "TypeScript", "NativeWind / Tailwind CSS", "Reanimated"] },
      { category: "Backend", items: ["Spring Boot (v3.4.4)", "Java 21", "PostgreSQL", "Spring Security (JWT)"] },
      { category: "Integrations", items: ["Firebase Auth & Messaging", "Resend (Email)", "Expo Audio/AV"] }
    ],
    features: [
      { title: "Smart Recipe Discovery", description: "Advanced search with AI-powered fallback to generate custom recipes if specific ones aren't found." },
      { title: "\"Ask ChefBit\" AI Assistant", description: "Dedicated AI chat interface for cooking questions, tips, and recipe modifications." },
      { title: "User Personalization", description: "Favorites, \"My Kitchen\" space, and secure authentication flows." },
      { title: "Shopping & Monetization", description: "Recipe cost estimation and In-App Purchases for premium content." }
    ]
  },
  {
    slug: "formabit",
    title: "FormaBit",
    description: "A powerful SaaS platform for form building and data collection.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    link: "https://www.formabit.in",
    color: "bg-violet-500",
    overview: "FormaBit is a modern, enterprise-grade SaaS platform that revolutionizes how businesses handle online forms. Unlike traditional form builders with monthly subscriptions, FormaBit implements a unique pay-per-submission model where users only pay for actual form submissions and webhook deliveries.",
    role: "Lead Engineer",
    timeline: "Nov - Dec 2024",
    techStack: [
      { category: "Frontend", items: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Zustand", "Framer Motion"] },
      { category: "Backend", items: ["AWS Lambda", "AWS API Gateway", "DynamoDB", "Node.js 20"] },
      { category: "Infrastructure", items: ["AWS SAM", "Docker", "CloudFront"] }
    ],
    features: [
      { title: "Pay-Per-Use Pricing", description: "Revolutionary credit-based model. 1 credit = 1 submission. No monthly fees." },
      { title: "Shopify-Inspired Editor", description: "Intuitive 3-column layout with real-time preview and drag-and-drop reordering." },
      { title: "Advanced Logic", description: "Powerful conditional logic engine that works both client-side and server-side." },
      { title: "Atomic Transactions", description: "DynamoDB transactions ensure credits are deducted exactly when submissions are saved." }
    ],
    challenges: [
      { title: "Atomic Credit Deductions", description: "Ensuring credits are deducted atomically with submission saves to prevent double-charging or free submissions using DynamoDB TransactWriteCommand." },
      { title: "Multi-Currency Support", description: "Implementing GeoIP detection and currency-specific credit packs for INR and USD markets." }
    ]
  },
  {
    slug: "deployed-store",
    title: "Deployed Store",
    description: "High-conversion Shopify Plus store with custom headless architecture.",
    tags: ["Shopify Plus", "Liquid", "Hydrogen", "React"],
    link: "https://www.deployed.store",
    color: "bg-blue-500",
    overview: "Deployed is a premium apparel brand celebrating the spirit of aviation, military, and adventure. For the past 4 years, I have maintained the brand's digital presence, polishing the UI/UX, and implementing custom-coded features to drive conversions and brand loyalty.",
    role: "Lead Shopify Developer",
    timeline: "4 Years (Ongoing)",
    techStack: [
      { category: "Platform", items: ["Shopify Plus", "Liquid"] },
      { category: "Frontend", items: ["HTML5", "SCSS", "JavaScript", "React (Custom Sections)"] },
      { category: "Tools", items: ["Shopify CLI", "GitHub Actions", "Figma"] }
    ],
    features: [
      { title: "Custom Theme Development", description: "Built and maintained a bespoke Shopify theme tailored to the brand's military/adventure aesthetic." },
      { title: "Performance Optimization", description: "Continuous optimization of Core Web Vitals to ensure fast load times and smooth browsing." },
      { title: "Custom Features", description: "Developed unique features like 'Wear Your Valour' interactive storytelling sections." },
      { title: "Brand Maintenance", description: "Long-term partnership ensuring the site evolves with the brand's growth and new collection launches." }
    ]
  },
  {
    slug: "declutter",
    title: "Declutter",
    description: "Minimalist e-commerce experience focused on sustainable living.",
    tags: ["Shopify", "Theme Dev", "UX Design", "Performance"],
    link: "https://declutter.shop",
    color: "bg-emerald-500",
    overview: "Declutter is a minimalist e-commerce platform focused on sustainable living. The project involved creating a clean, distraction-free shopping experience that highlights the product's value and sustainability mission.",
    role: "Shopify Developer & UX Designer",
    techStack: [
      { category: "Platform", items: ["Shopify"] },
      { category: "Design", items: ["Figma", "Minimalist UI Principles"] },
      { category: "Development", items: ["Liquid", "Tailwind CSS", "Alpine.js"] }
    ],
    features: [
      { title: "Minimalist Design System", description: "A stripped-back UI that focuses entirely on the product and the sustainability message." },
      { title: "High Performance", description: "Optimized for speed with minimal JavaScript and efficient asset loading." },
      { title: "Conversion Focus", description: "Streamlined checkout flow and clear calls-to-action to maximize conversion rates." }
    ]
  }
];
