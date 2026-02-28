// ── WebMCP Protocol Types ──────────────────────────────────────────

export interface WebMCPProperty {
  type: "string" | "number" | "boolean" | "array" | "object";
  description: string;
  enum?: string[];
  format?: string;
}

export interface WebMCPTool {
  name: string;
  description: string;
  input_schema: {
    type: "object";
    properties: Record<string, WebMCPProperty>;
    required?: string[];
  };
}

export interface WebMCPManifest {
  schema_version: "1.0";
  name: string;
  description: string;
  base_url: string;
  tools: WebMCPTool[];
  contact: {
    email?: string;
    phone?: string;
    whatsapp?: string;
  };
}

// ── Menu Types ─────────────────────────────────────────────────────

export type Allergen =
  | "gluten"
  | "crustaceans"
  | "eggs"
  | "fish"
  | "peanuts"
  | "soy"
  | "milk"
  | "nuts"
  | "celery"
  | "mustard"
  | "sesame"
  | "sulphites"
  | "lupin"
  | "molluscs";

export type DietLabel =
  | "vegetarian"
  | "vegan"
  | "gluten-free"
  | "pescatarian";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  allergens: Allergen[];
  dietLabels: DietLabel[];
  available: boolean;
  imageUrl?: string;
  tags?: string[];
  highlight?: boolean;
}

export interface AllergenInfo {
  id: number;
  name: string;
  es: string;
  icon: string;
}

export interface CategoryMeta {
  name: string;
  slug: string;
  icon: string;
  description: string;
  color: string;
  itemCount: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  items: MenuItem[];
}

export interface Menu {
  restaurantId: string;
  lastUpdated: string;
  currency: "EUR";
  categories: MenuCategory[];
}

// ── Restaurant Info Types ──────────────────────────────────────────

export interface OpeningHours {
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

export interface RestaurantInfo {
  id: string;
  name: string;
  legalName?: string;
  description: string;
  shortDescription: string;
  foundedYear?: number;
  cuisine: string[];
  priceRange: "€" | "€€" | "€€€" | "€€€€";
  address: {
    streetAddress: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  contact: {
    phone: string;
    email?: string;
    whatsapp?: string;
    website: string;
  };
  openingHours: OpeningHours[];
  features: {
    hasTerraza: boolean;
    hasParking: boolean;
    isAccessible: boolean;
    acceptsReservations: boolean;
    acceptsGroups: boolean;
    hasPrivateRoom: boolean;
  };
  social?: {
    instagram?: string;
    facebook?: string;
    tripadvisor?: string;
  };
  images: {
    hero: string;
    logo: string;
    gallery?: string[];
  };
  // Dynamic fields from onboarding
  heroHeadline?: string;
  heroSubheadline?: string;
  webTemplate?: string;
}

// ── Reservation Types ──────────────────────────────────────────────

export type ReservationSpace = "terraza" | "salon" | "any";
export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export interface ReservationRequest {
  name: string;
  email?: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  space: ReservationSpace;
  specialRequests?: string;
  dietaryRequirements?: DietLabel[];
}

export interface ReservationResponse {
  success: boolean;
  reservationId?: string;
  message: string;
  whatsappUrl?: string;
  confirmationDetails?: {
    date: string;
    time: string;
    guests: number;
    space: ReservationSpace;
  };
}
