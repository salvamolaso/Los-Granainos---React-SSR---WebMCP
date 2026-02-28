export const runtime = "edge";

import { getRestaurant, getMenu, getCategories } from "@/lib/get-restaurant";
import HomePage from "@/components/HomePage";

export default async function Home() {
  const info = await getRestaurant();

  if (!info) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "8px" }}>
            Restaurante no encontrado
          </h1>
          <p style={{ color: "#6B6B6B" }}>
            Este restaurante aún no está publicado en Agentikas.
          </p>
          <a
            href="https://agentikas.ai"
            style={{ color: "#C8352A", marginTop: "16px", display: "inline-block" }}
          >
            Ir a agentikas.ai
          </a>
        </div>
      </main>
    );
  }

  const menu = await getMenu();
  const categories = await getCategories();

  // Pick highlighted items for the menu preview (max 6)
  const featuredItems = menu.categories
    .flatMap((c) => c.items)
    .filter((i) => i.highlight)
    .slice(0, 6);

  return (
    <HomePage
      restaurant={info}
      featuredItems={featuredItems}
      categories={categories}
    />
  );
}
