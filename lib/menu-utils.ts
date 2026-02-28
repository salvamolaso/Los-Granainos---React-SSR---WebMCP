// lib/menu-utils.ts
// Utilidades de menú: alérgenos EU, filtros, helpers de categorías

import type { Allergen, AllergenInfo, MenuItem, MenuCategory, CategoryMeta } from "./types";

// ── Alérgenos EU 1-14 (Reglamento 1169/2011) ─────────────────────────

export const ALLERGENS: Record<number, AllergenInfo> = {
  1:  { id: 1,  name: "Gluten",      es: "Gluten",           icon: "🌾" },
  2:  { id: 2,  name: "Crustaceans", es: "Crustáceos",       icon: "🦐" },
  3:  { id: 3,  name: "Eggs",        es: "Huevo",            icon: "🥚" },
  4:  { id: 4,  name: "Fish",        es: "Pescado",          icon: "🐟" },
  5:  { id: 5,  name: "Peanuts",     es: "Cacahuetes",       icon: "🥜" },
  6:  { id: 6,  name: "Soy",         es: "Soja",             icon: "🫘" },
  7:  { id: 7,  name: "Milk",        es: "Lácteos",          icon: "🥛" },
  8:  { id: 8,  name: "Nuts",        es: "Frutos de cáscara", icon: "🌰" },
  9:  { id: 9,  name: "Celery",      es: "Apio",             icon: "🥬" },
  10: { id: 10, name: "Mustard",     es: "Mostaza",          icon: "🟡" },
  11: { id: 11, name: "Sesame",      es: "Sésamo",           icon: "⚪" },
  12: { id: 12, name: "Sulphites",   es: "Sulfitos",         icon: "🍷" },
  13: { id: 13, name: "Lupin",       es: "Altramuces",       icon: "🌸" },
  14: { id: 14, name: "Molluscs",    es: "Moluscos",         icon: "🦪" },
};

// ── Mapeo string ↔ número ─────────────────────────────────────────────

export const ALLERGEN_STRING_TO_NUMBER: Record<Allergen, number> = {
  gluten: 1,
  crustaceans: 2,
  eggs: 3,
  fish: 4,
  peanuts: 5,
  soy: 6,
  milk: 7,
  nuts: 8,
  celery: 9,
  mustard: 10,
  sesame: 11,
  sulphites: 12,
  lupin: 13,
  molluscs: 14,
};

const NUMBER_TO_STRING: Record<number, Allergen> = Object.fromEntries(
  Object.entries(ALLERGEN_STRING_TO_NUMBER).map(([k, v]) => [v, k as Allergen]),
) as Record<number, Allergen>;

export function numberToStringAllergens(nums: number[]): Allergen[] {
  return nums.map((n) => NUMBER_TO_STRING[n]).filter(Boolean);
}

export function getNumericAllergens(item: MenuItem): number[] {
  return item.allergens.map((a) => ALLERGEN_STRING_TO_NUMBER[a]).filter(Boolean);
}

// ── Filtros por tags ──────────────────────────────────────────────────

export const FILTERS = [
  { label: "Todo",           value: "todo",          icon: "🍽️" },
  { label: "Pescado",        value: "pescado",       icon: "🐟" },
  { label: "Marisco",        value: "marisco",       icon: "🦐" },
  { label: "Carne",          value: "carne",         icon: "🥩" },
  { label: "Vegetariano",    value: "vegetariano",   icon: "🥗" },
  { label: "Frito",          value: "frito",         icon: "🍳" },
  { label: "Plancha",        value: "plancha",       icon: "🔥" },
  { label: "Postres",        value: "postres",       icon: "🍰" },
  { label: "Vinos",          value: "vinos",         icon: "🍷" },
  { label: "Especialidades", value: "especialidad",  icon: "⭐" },
];

// ── Filtrado de items ─────────────────────────────────────────────────

export function filterMenuItems(
  items: MenuItem[],
  options: {
    tag?: string;
    search?: string;
    excludeAllergens?: number[];
  },
): MenuItem[] {
  let result = items.filter((i) => i.available);

  if (options.tag && options.tag !== "todo") {
    result = result.filter(
      (i) =>
        i.tags?.includes(options.tag!) ||
        i.category.toLowerCase().includes(options.tag!),
    );
  }

  if (options.search) {
    const q = options.search.toLowerCase();
    result = result.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q),
    );
  }

  if (options.excludeAllergens && options.excludeAllergens.length > 0) {
    const excluded = new Set(options.excludeAllergens);
    result = result.filter((i) => {
      const nums = getNumericAllergens(i);
      return !nums.some((n) => excluded.has(n));
    });
  }

  return result;
}

// ── Helpers de categorías ─────────────────────────────────────────────

const CATEGORY_ICONS: Record<string, string> = {
  entrantes: "🥗",
  entradas: "🥗",
  pescados: "🐟",
  "pescados y mariscos": "🐟",
  pescaitos: "🐟",
  carnes: "🥩",
  carne: "🥩",
  huevos: "🥚",
  postres: "🍰",
  arroces: "🥘",
  paella: "🥘",
  "menú del día": "📋",
  bebidas: "🍷",
  vinos: "🍷",
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  entrantes: "Para empezar con buen pie",
  entradas: "Para empezar con buen pie",
  pescados: "Frescos del día, del mar a tu mesa",
  "pescados y mariscos": "Frescos del día, del mar a tu mesa",
  pescaitos: "Frescos del día, del mar a tu mesa",
  carnes: "Selección de las mejores carnes",
  carne: "Selección de las mejores carnes",
  huevos: "Platos de huevo tradicionales",
  postres: "El broche dulce perfecto",
  arroces: "Arroces artesanales y paellas",
  paella: "Arroces artesanales y paellas",
  "menú del día": "Nuestra propuesta del día",
  bebidas: "Vinos, refrescos y más",
  vinos: "Nuestra selección de vinos",
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  entrantes: "from-emerald-500 to-teal-600",
  entradas: "from-emerald-500 to-teal-600",
  pescados: "from-blue-500 to-cyan-600",
  "pescados y mariscos": "from-blue-500 to-cyan-600",
  pescaitos: "from-blue-500 to-cyan-600",
  carnes: "from-red-600 to-rose-700",
  carne: "from-red-600 to-rose-700",
  huevos: "from-amber-400 to-yellow-500",
  postres: "from-pink-500 to-rose-500",
  arroces: "from-orange-500 to-amber-600",
  paella: "from-orange-500 to-amber-600",
  "menú del día": "from-violet-500 to-purple-600",
  bebidas: "from-purple-600 to-indigo-700",
  vinos: "from-purple-600 to-indigo-700",
};

export function getCategoryIcon(name: string): string {
  const key = name.toLowerCase();
  return CATEGORY_ICONS[key] ?? "🍽️";
}

export function getCategoryDescription(name: string): string {
  const key = name.toLowerCase();
  return CATEGORY_DESCRIPTIONS[key] ?? "";
}

export function getCategoryGradient(name: string): string {
  const key = name.toLowerCase();
  return CATEGORY_GRADIENTS[key] ?? "from-gray-500 to-gray-600";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function buildCategoryMetas(categories: MenuCategory[]): CategoryMeta[] {
  return categories.map((cat) => ({
    name: cat.name,
    slug: cat.slug,
    icon: getCategoryIcon(cat.name),
    description: getCategoryDescription(cat.name),
    color: getCategoryGradient(cat.name),
    itemCount: cat.items.length,
  }));
}
