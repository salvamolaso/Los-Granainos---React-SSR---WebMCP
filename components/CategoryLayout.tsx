import Link from "next/link";
import type { RestaurantInfo, MenuItem, CategoryMeta } from "@/lib/types";

interface CategoryLayoutProps {
  restaurant: RestaurantInfo;
  category: CategoryMeta;
  items: MenuItem[];
  otherCategories: CategoryMeta[];
}

export default function CategoryLayout({
  restaurant,
  category,
  items,
  otherCategories,
}: CategoryLayoutProps) {
  return (
    <main className="min-h-screen bg-mediterranean-cream">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-mediterranean-sand/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-display text-3xl font-bold text-gradient">
            {restaurant.name}
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-mediterranean-terracotta transition-colors">
              Inicio
            </Link>
            <Link href="/carta" className="hover:text-mediterranean-terracotta transition-colors">
              Carta
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`pt-32 pb-16 px-6 bg-gradient-to-br ${category.color}`}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <Link
            href="/carta"
            className="inline-flex items-center gap-2 mb-8 text-white/80 hover:text-white transition-colors"
          >
            <span className="text-xl">←</span>
            Volver a la carta
          </Link>
          <div className="text-7xl mb-6 animate-float">{category.icon}</div>
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-4">{category.name}</h1>
          <p className="text-2xl font-light opacity-90">{category.description}</p>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  item.highlight ? "ring-2 ring-mediterranean-terracotta" : ""
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex justify-between items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-2xl md:text-3xl font-semibold">
                        {item.name}
                      </h3>
                      {item.highlight && (
                        <span className="px-3 py-1 bg-mediterranean-terracotta text-white text-xs font-semibold rounded-full">
                          ESPECIALIDAD
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
                    {item.allergens.length > 0 && (
                      <p className="mt-2 text-sm text-gray-400">
                        Alérgenos: {item.allergens.join(", ")}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <div className="font-display text-3xl font-bold text-mediterranean-terracotta">
                      €{item.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600 italic text-lg">
              Los precios incluyen IVA &middot; Alérgenos disponibles bajo petición
            </p>
          </div>
        </div>
      </section>

      {/* Other Categories */}
      {otherCategories.length > 0 && (
        <section className="py-16 px-6 bg-mediterranean-sand">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-center mb-12">
              Explora otras categorías
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {otherCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/carta/${cat.slug}`}
                  className="px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 flex items-center gap-3"
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="font-semibold">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="font-display text-3xl font-bold mb-4 text-gradient">{restaurant.name}</div>
          <p className="text-gray-400">
            © {new Date().getFullYear()} {restaurant.legalName ?? restaurant.name}.{" "}
            {restaurant.shortDescription}
          </p>
        </div>
      </footer>
    </main>
  );
}
