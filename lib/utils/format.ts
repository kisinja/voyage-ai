// lib/utils/format.ts

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function getDayCount(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = end.getTime() - start.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const BUDGET_OPTIONS = [
  { value: "budget", label: "Budget", description: "Under $100/day", icon: "🎒" },
  { value: "moderate", label: "Moderate", description: "$100-$250/day", icon: "✈️" },
  { value: "luxury", label: "Luxury", description: "$250-$500/day", icon: "💎" },
  { value: "ultra-luxury", label: "Ultra Luxury", description: "$500+/day", icon: "👑" },
];

export const TRAVEL_STYLES = [
  { value: "adventure", label: "Adventure", icon: "🏔️" },
  { value: "luxury", label: "Luxury", icon: "✨" },
  { value: "nightlife", label: "Nightlife", icon: "🌃" },
  { value: "romantic", label: "Romantic", icon: "💕" },
  { value: "chill", label: "Chill", icon: "🌊" },
  { value: "foodie", label: "Foodie", icon: "🍜" },
  { value: "nature", label: "Nature", icon: "🌿" },
  { value: "cultural", label: "Cultural", icon: "🏛️" },
];

export const INTEREST_OPTIONS = [
  "Museums", "Art Galleries", "Street Food", "Fine Dining",
  "Hiking", "Beach", "Nightclubs", "Live Music", "Shopping",
  "Architecture", "History", "Local Markets", "Yoga & Wellness",
  "Water Sports", "Wine Tasting", "Photography", "Cycling",
  "Theater", "Sports Events", "Cooking Classes",
];

export const FEATURED_DESTINATIONS = [
  {
    city: "Tokyo",
    country: "Japan",
    tagline: "Where ancient meets ultramodern",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    tags: ["Culture", "Foodie", "Nightlife"],
  },
  {
    city: "Santorini",
    country: "Greece",
    tagline: "Sunsets that stop time",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    tags: ["Romantic", "Luxury", "Nature"],
  },
  {
    city: "Medellín",
    country: "Colombia",
    tagline: "The city of eternal spring",
    image: "https://images.unsplash.com/photo-1599484987107-4b8e4de17e6f?w=800&q=80",
    tags: ["Adventure", "Nightlife", "Culture"],
  },
  {
    city: "Bali",
    country: "Indonesia",
    tagline: "Island of gods and sunsets",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    tags: ["Chill", "Nature", "Spiritual"],
  },
  {
    city: "New York",
    country: "USA",
    tagline: "The city that never sleeps",
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80",
    tags: ["Urban", "Culture", "Foodie"],
  },
  {
    city: "Cape Town",
    country: "South Africa",
    tagline: "Where mountains meet the ocean",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80",
    tags: ["Adventure", "Nature", "Luxury"],
  },
];
