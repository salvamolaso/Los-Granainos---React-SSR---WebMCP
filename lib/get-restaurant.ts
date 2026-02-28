// lib/get-restaurant.ts
// Fetches restaurant data and menu from Supabase based on the subdomain (slug)
// Uses React cache() to deduplicate calls within the same request

import { cache } from "react";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import type { RestaurantInfo, Menu, CategoryMeta } from "./types";
import { numberToStringAllergens, slugify, buildCategoryMetas } from "./menu-utils";

// Uses service_role key (server-side only, never bundled to client).
function getSupabase() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// ── Extract slug from hostname ──────────────────────────────────────

export async function getSlug(): Promise<string> {
  const h = await headers();
  const host = h.get("host") ?? "";
  // "los-granainos.agentikas.ai" → "los-granainos"
  // "localhost:3000" → "localhost" (dev fallback)
  return host.split(".")[0].split(":")[0];
}

// ── Fetch restaurant from Supabase (cached per request) ─────────────

export const getRestaurant = cache(async (): Promise<RestaurantInfo | null> => {
  const supabase = getSupabase();
  const slug = await getSlug();

  if (!supabase || !slug || slug === "localhost" || slug === "127" || slug === "los-granainos-webmcp" || slug === "agentikas-restaurants") {
    // Dev fallback: use static data
    const { restaurantInfo } = await import("@/data/restaurant");
    return restaurantInfo;
  }

  const { data: r } = await supabase
    .from("restaurants")
    .select("*, web_onboarding(*), schedules(*)")
    .eq("slug", slug)
    .eq("web_published", true)
    .single();

  if (!r) return null;

  // Convert DB schedules to OpeningHours format
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const schedules = (r.schedules ?? []) as Array<{
    day_of_week: number;
    is_open: boolean;
    lunch_open: string | null;
    lunch_close: string | null;
    dinner_open: string | null;
    dinner_close: string | null;
  }>;

  const openingHours: RestaurantInfo["openingHours"] = [];
  const openDays = schedules.filter((s) => s.is_open).sort((a, b) => a.day_of_week - b.day_of_week);

  for (const s of openDays) {
    const dayName = dayNames[s.day_of_week] ?? "Monday";
    if (s.lunch_open && s.lunch_close) {
      const existing = openingHours.find(
        (h) => h.opens === s.lunch_open && h.closes === s.lunch_close,
      );
      if (existing) {
        existing.dayOfWeek.push(dayName);
      } else {
        openingHours.push({
          dayOfWeek: [dayName],
          opens: s.lunch_open.slice(0, 5),
          closes: s.lunch_close.slice(0, 5),
        });
      }
    }
    if (s.dinner_open && s.dinner_close) {
      const existing = openingHours.find(
        (h) => h.opens === s.dinner_open && h.closes === s.dinner_close,
      );
      if (existing) {
        existing.dayOfWeek.push(dayName);
      } else {
        openingHours.push({
          dayOfWeek: [dayName],
          opens: s.dinner_open.slice(0, 5),
          closes: s.dinner_close.slice(0, 5),
        });
      }
    }
  }

  const onb = Array.isArray(r.web_onboarding) ? r.web_onboarding[0] : r.web_onboarding;

  const priceMap: Record<number, RestaurantInfo["priceRange"]> = {
    1: "€",
    2: "€€",
    3: "€€€",
    4: "€€€€",
  };

  return {
    id: r.slug,
    name: r.name,
    legalName: r.name,
    description: onb?.about_text ?? r.description ?? "",
    shortDescription: onb?.hero_subheadline ?? r.description?.slice(0, 80) ?? "",
    heroHeadline: onb?.hero_headline ?? r.name,
    heroSubheadline: onb?.hero_subheadline ?? "",
    cuisine: r.cuisine_type ? [r.cuisine_type] : ["Española"],
    priceRange: priceMap[r.price_range] ?? "€€",
    address: {
      streetAddress: r.address ?? "",
      locality: r.city ?? "",
      region: r.province ?? r.city ?? "",
      postalCode: r.postal_code ?? "",
      country: "ES",
    },
    geo: {
      latitude: r.lat ? parseFloat(r.lat) : 0,
      longitude: r.lng ? parseFloat(r.lng) : 0,
    },
    contact: {
      phone: r.phone ?? "",
      email: r.email ?? "",
      whatsapp: r.mobile_phone ?? r.phone ?? "",
      website: `https://${r.slug}.agentikas.ai`,
    },
    openingHours: openingHours.length > 0 ? openingHours : [
      { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "13:00", closes: "23:00" },
    ],
    features: {
      hasTerraza: false,
      hasParking: false,
      isAccessible: true,
      acceptsReservations: true,
      acceptsGroups: true,
      hasPrivateRoom: false,
    },
    images: {
      hero: "/restaurante.jpg",
      logo: "/logo.jpeg",
    },
    webTemplate: r.web_template ?? "raices",
  };
});

// ── Fetch menu from Supabase (cached per request) ───────────────────

export const getMenu = cache(async (): Promise<Menu> => {
  const supabase = getSupabase();
  const slug = await getSlug();

  if (!supabase || !slug || slug === "localhost" || slug === "127" || slug === "los-granainos-webmcp" || slug === "agentikas-restaurants") {
    const { menu } = await import("@/data/menu");
    return menu;
  }

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!restaurant) {
    const { menu } = await import("@/data/menu");
    return menu;
  }

  const { data: categories } = await supabase
    .from("menu_categories")
    .select("id, name, sort_order, menu_items(id, name, description, price, allergens, sort_order)")
    .eq("restaurant_id", restaurant.id)
    .order("sort_order");

  if (!categories || categories.length === 0) {
    const { menu } = await import("@/data/menu");
    return menu;
  }

  return {
    restaurantId: slug,
    lastUpdated: new Date().toISOString().split("T")[0],
    currency: "EUR",
    categories: categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: slugify(cat.name),
      order: cat.sort_order,
      items: ((cat as any).menu_items ?? [])
        .sort((a: any, b: any) => a.sort_order - b.sort_order)
        .map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description ?? "",
          price: parseFloat(item.price) || 0,
          category: cat.name,
          allergens: numberToStringAllergens(item.allergens ?? []),
          dietLabels: [],
          available: true,
        })),
    })),
  };
});

// ── Get category metadata for carta hub ─────────────────────────────

export const getCategories = cache(async (): Promise<CategoryMeta[]> => {
  const menu = await getMenu();
  return buildCategoryMetas(menu.categories);
});
