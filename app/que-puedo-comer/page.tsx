export const runtime = "edge";

import { getRestaurant, getMenu, getCategories } from "@/lib/get-restaurant";
import AllergenFilter from "@/components/AllergenFilter";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const info = await getRestaurant();
  return {
    title: info ? `¿Qué puedo comer? | ${info.name}` : "¿Qué puedo comer?",
    description: info
      ? `Filtra platos por alérgenos y preferencias en ${info.name}. Consulta nuestra carta y encuentra tu plato ideal.`
      : "Filtra platos por alérgenos y preferencias",
  };
}

export default async function QuePuedoComerPage() {
  const [info, menu, categories] = await Promise.all([
    getRestaurant(),
    getMenu(),
    getCategories(),
  ]);

  if (!info) return null;

  const allItems = menu.categories.flatMap((c) => c.items);

  return (
    <AllergenFilter
      restaurant={info}
      allItems={allItems}
      categories={categories}
    />
  );
}
