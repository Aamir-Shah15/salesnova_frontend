import headphonesImg from "@/assets/products/headphones.jpg";
import smartwatchImg from "@/assets/products/smartwatch.jpg";
import laptopImg from "@/assets/products/laptop.jpg";

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  category: string;
  brand: string;
  description: string;
  specs: Record<string, string>;
  inStock: boolean;
  badge?: "sale" | "new" | "bestseller";
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  count: number;
}

export const categories: Category[] = [
  { id: 1, name: "Electronics", slug: "electronics", icon: "📱", count: 245 },
  { id: 2, name: "Fashion", slug: "fashion", icon: "👗", count: 512 },
  { id: 3, name: "Home & Kitchen", slug: "home-kitchen", icon: "🏠", count: 189 },
  { id: 4, name: "Sports", slug: "sports", icon: "⚽", count: 134 },
  { id: 5, name: "Books", slug: "books", icon: "📚", count: 367 },
  { id: 6, name: "Beauty", slug: "beauty", icon: "💄", count: 201 },
  { id: 7, name: "Toys", slug: "toys", icon: "🧸", count: 98 },
  { id: 8, name: "Automotive", slug: "automotive", icon: "🚗", count: 76 },
];

const placeholderImg = (text: string, bg = "e2e8f0", fg = "475569") =>
  `https://placehold.co/600x600/${bg}/${fg}?text=${encodeURIComponent(text)}`;

export const products: Product[] = [
  {
    id: 1, name: "Wireless Noise Cancelling Headphones", slug: "wireless-headphones",
    price: 79.99, originalPrice: 149.99, discount: 47, rating: 4.5, reviews: 2341,
    image: headphonesImg,
    images: [headphonesImg, placeholderImg("Side View", "334155", "f8fafc"), placeholderImg("Detail", "0f172a", "f8fafc")],
    category: "Electronics", brand: "SoundMax", badge: "bestseller",
    description: "Immerse yourself in studio-quality sound with our flagship wireless headphones. Featuring advanced active noise cancellation, 40-hour battery life, and ultra-plush memory foam cushions for all-day comfort. Bluetooth 5.3 ensures seamless multipoint connectivity.",
    specs: { "Driver Size": "40mm", "Battery": "40 hours", "Bluetooth": "5.3", "Weight": "250g", "Noise Cancellation": "Active (ANC)" },
    inStock: true,
  },
  {
    id: 2, name: "Smart Fitness Watch Pro", slug: "fitness-watch-pro",
    price: 199.99, originalPrice: 299.99, discount: 33, rating: 4.7, reviews: 1876,
    image: smartwatchImg,
    images: [smartwatchImg, placeholderImg("Band", "14b8a6", "f8fafc")],
    category: "Electronics", brand: "FitTech", badge: "new",
    description: "Elevate your fitness journey with the most advanced health tracking smartwatch on the market. Built-in GPS, continuous heart rate monitoring, SpO2 sensor, and an incredible 14-day battery life — all in a sleek, water-resistant design.",
    specs: { "Display": "1.4\" AMOLED", "Battery": "14 days", "Water Resistance": "5 ATM", "GPS": "Built-in", "Sensors": "HR, SpO2, Accelerometer" },
    inStock: true,
  },
  {
    id: 3, name: "Ultra-Slim Laptop 15\"", slug: "ultra-slim-laptop",
    price: 899.99, originalPrice: 1199.99, discount: 25, rating: 4.6, reviews: 923,
    image: laptopImg,
    images: [laptopImg, placeholderImg("Keyboard", "2563eb", "f8fafc")],
    category: "Electronics", brand: "TechPro",
    description: "Power meets portability in this ultra-slim 15.6\" powerhouse. With a stunning 2K IPS display, Intel i7 processor, 16GB RAM, and lightning-fast 512GB SSD — it's built for professionals who refuse to compromise.",
    specs: { "Processor": "Intel i7-13700H", "RAM": "16GB DDR5", "Storage": "512GB NVMe SSD", "Display": "15.6\" 2K IPS", "Battery": "72Wh" },
    inStock: true,
  },
  {
    id: 4, name: "Premium Cotton T-Shirt", slug: "premium-cotton-tshirt",
    price: 24.99, originalPrice: 39.99, discount: 38, rating: 4.3, reviews: 4521,
    image: placeholderImg("T-Shirt", "6366f1", "f8fafc"),
    images: [placeholderImg("T-Shirt", "6366f1", "f8fafc")],
    category: "Fashion", brand: "UrbanWear", badge: "sale",
    description: "Crafted from 100% organic cotton, this premium relaxed-fit tee is designed for everyday luxury. Pre-shrunk fabric, reinforced stitching, and a buttery-soft feel that gets better with every wash.",
    specs: { "Material": "100% Organic Cotton", "Fit": "Relaxed", "Care": "Machine Washable", "Origin": "Ethically Made" },
    inStock: true,
  },
  {
    id: 5, name: "Stainless Steel Water Bottle", slug: "steel-water-bottle",
    price: 29.99, originalPrice: 44.99, discount: 33, rating: 4.8, reviews: 3102,
    image: placeholderImg("Bottle", "059669", "f8fafc"),
    images: [placeholderImg("Bottle", "059669", "f8fafc")],
    category: "Sports", brand: "HydroElite", badge: "bestseller",
    description: "Stay hydrated in style with our double-wall vacuum insulated bottle. Keeps beverages ice-cold for 24 hours or piping hot for 12 hours. BPA-free construction with a leak-proof lid — built to go wherever life takes you.",
    specs: { "Capacity": "750ml", "Material": "18/8 Stainless Steel", "Insulation": "Double Wall Vacuum", "Weight": "350g" },
    inStock: true,
  },
  {
    id: 6, name: "Robot Vacuum Cleaner", slug: "robot-vacuum",
    price: 349.99, originalPrice: 499.99, discount: 30, rating: 4.4, reviews: 1567,
    image: placeholderImg("Vacuum", "dc2626", "f8fafc"),
    images: [placeholderImg("Vacuum", "dc2626", "f8fafc")],
    category: "Home & Kitchen", brand: "CleanBot", badge: "sale",
    description: "Let smart cleaning do the heavy lifting. With LiDAR precision navigation, 5000Pa powerful suction, and a self-emptying base, this robot vacuum keeps your floors spotless — all controllable via Alexa or Google Home.",
    specs: { "Suction": "5000Pa", "Battery": "5200mAh", "Run Time": "180 min", "Navigation": "LiDAR", "Dust Bin": "400ml" },
    inStock: true,
  },
  {
    id: 7, name: "Organic Face Serum", slug: "organic-face-serum",
    price: 34.99, originalPrice: 49.99, discount: 30, rating: 4.6, reviews: 2890,
    image: placeholderImg("Serum", "ec4899", "f8fafc"),
    images: [placeholderImg("Serum", "ec4899", "f8fafc")],
    category: "Beauty", brand: "GlowNature", badge: "new",
    description: "Reveal your natural radiance with our award-winning Vitamin C and hyaluronic acid serum. 100% organic, cruelty-free ingredients deliver visible results in just 14 days — smoother, brighter, younger-looking skin.",
    specs: { "Volume": "30ml", "Key Ingredients": "Vitamin C, Hyaluronic Acid", "Skin Type": "All", "Certification": "Organic, Cruelty-Free" },
    inStock: true,
  },
  {
    id: 8, name: "Bestselling Novel Collection", slug: "novel-collection",
    price: 49.99, originalPrice: 79.99, discount: 38, rating: 4.9, reviews: 5621,
    image: placeholderImg("Books", "f59e0b", "1e293b"),
    images: [placeholderImg("Books", "f59e0b", "1e293b")],
    category: "Books", brand: "ReadMore",
    description: "Dive into five award-winning novels hand-picked by literary experts. Each beautifully bound hardcover edition is a collector's treasure — perfect for avid readers or as a thoughtful gift.",
    specs: { "Format": "Hardcover", "Pages": "~350 each", "Language": "English", "Quantity": "5 books" },
    inStock: true,
  },
  {
    id: 9, name: "Wireless Bluetooth Speaker", slug: "bluetooth-speaker",
    price: 59.99, originalPrice: 89.99, discount: 33, rating: 4.4, reviews: 1987,
    image: placeholderImg("Speaker", "7c3aed", "f8fafc"),
    images: [placeholderImg("Speaker", "7c3aed", "f8fafc")],
    category: "Electronics", brand: "SoundMax",
    description: "Take the party anywhere with immersive 360° surround sound. IPX7 waterproof, 20-hour battery, and Bluetooth 5.3 — this speaker is engineered for adventure.",
    specs: { "Power": "30W", "Battery": "20 hours", "Waterproof": "IPX7", "Bluetooth": "5.3" },
    inStock: true,
  },
  {
    id: 10, name: "Yoga Mat Premium", slug: "yoga-mat-premium",
    price: 39.99, originalPrice: 59.99, discount: 33, rating: 4.7, reviews: 2345,
    image: placeholderImg("Yoga Mat", "16a34a", "f8fafc"),
    images: [placeholderImg("Yoga Mat", "16a34a", "f8fafc")],
    category: "Sports", brand: "ZenFit", badge: "new",
    description: "Find your flow on our extra-thick 6mm non-slip yoga mat. Built with eco-friendly TPE material and precision alignment lines to perfect your practice. Includes a premium carrying strap.",
    specs: { "Thickness": "6mm", "Material": "TPE", "Size": "183 x 61cm", "Weight": "900g" },
    inStock: true,
  },
  {
    id: 11, name: "Men's Running Shoes", slug: "mens-running-shoes",
    price: 89.99, originalPrice: 129.99, discount: 31, rating: 4.5, reviews: 3456,
    image: placeholderImg("Shoes", "ea580c", "f8fafc"),
    images: [placeholderImg("Shoes", "ea580c", "f8fafc")],
    category: "Fashion", brand: "StrideMax", badge: "bestseller",
    description: "Engineered for performance and comfort, these lightweight running shoes feature responsive foam cushioning and a breathable mesh upper. Whether it's a morning jog or a marathon — your feet will thank you.",
    specs: { "Upper": "Breathable Mesh", "Sole": "Responsive Foam", "Weight": "280g", "Drop": "8mm" },
    inStock: true,
  },
  {
    id: 12, name: "Air Purifier HEPA", slug: "air-purifier",
    price: 159.99, originalPrice: 229.99, discount: 30, rating: 4.6, reviews: 876,
    image: placeholderImg("Purifier", "64748b", "f8fafc"),
    images: [placeholderImg("Purifier", "64748b", "f8fafc")],
    category: "Home & Kitchen", brand: "PureAir",
    description: "Breathe cleaner air with our True HEPA H13 purifier. Covers up to 500 sq ft and removes 99.97% of airborne particles, allergens, and odors. Ultra-quiet sleep mode for undisturbed rest.",
    specs: { "Coverage": "500 sq ft", "Filter": "True HEPA H13", "Noise Level": "24dB (sleep mode)", "CADR": "250 m³/h" },
    inStock: false,
  },
];
