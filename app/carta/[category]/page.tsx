export const runtime = "edge";

import { getRestaurant, getMenu, getCategories } from "@/lib/get-restaurant";
import { slugify } from "@/lib/menu-utils";
import CategoryLayout from "@/components/CategoryLayout";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const [info, menu] = await Promise.all([getRestaurant(), getMenu()]);
  const cat = menu.categories.find((c) => slugify(c.name) === slug || c.slug === slug);
  if (!info || !cat) return { title: "Categoría no encontrada" };
  return {
    title: `${cat.name} | ${info.name}`,
    description: `${cat.name} en ${info.name}. Descubre nuestra selección de platos.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const [info, menu, allCategories] = await Promise.all([
    getRestaurant(),
    getMenu(),
    getCategories(),
  ]);

  if (!info) return null;

  const category = menu.categories.find((c) => slugify(c.name) === slug || c.slug === slug);
  if (!category) notFound();

  const categoryMeta = allCategories.find((c) => c.slug === slug);
  const otherCategories = allCategories.filter((c) => c.slug !== slug);

  return (
    <CategoryLayout
      restaurant={info}
      category={categoryMeta ?? { name: category.name, slug, icon: "🍽️", description: "", color: "from-gray-500 to-gray-600", itemCount: category.items.length }}
      items={category.items}
      otherCategories={otherCategories}
    />
  );
}
