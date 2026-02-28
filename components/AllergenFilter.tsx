"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { RestaurantInfo, MenuItem, CategoryMeta } from "@/lib/types";
import {
  ALLERGENS,
  FILTERS,
  filterMenuItems,
  getNumericAllergens,
  getCategoryIcon,
  slugify,
} from "@/lib/menu-utils";

interface AllergenFilterProps {
  restaurant: RestaurantInfo;
  allItems: MenuItem[];
  categories: CategoryMeta[];
}

export default function AllergenFilter({
  restaurant,
  allItems,
  categories,
}: AllergenFilterProps) {
  const [activeFilter, setActiveFilter] = useState("todo");
  const [search, setSearch] = useState("");
  const [excludedAllergens, setExcludedAllergens] = useState<number[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const { allergens } = (e as CustomEvent<{ allergens: number[] }>).detail;
      setExcludedAllergens(allergens);
    };
    window.addEventListener("granainos:set-allergens", handler);
    return () => window.removeEventListener("granainos:set-allergens", handler);
  }, []);

  const toggleAllergen = (num: number) => {
    setExcludedAllergens((prev) => {
      const asNum = Number(num);
      return prev.includes(asNum) ? prev.filter((n) => n !== asNum) : [...prev, asNum];
    });
  };

  const filtered = filterMenuItems(allItems, {
    tag: activeFilter,
    search,
    excludeAllergens: excludedAllergens,
  });

  // Group filtered items by category
  const grouped: [string, MenuItem[]][] = [];
  for (const item of filtered) {
    const cat = item.category;
    const existing = grouped.find(([c]) => c === cat);
    if (existing) {
      existing[1].push(item);
    } else {
      grouped.push([cat, [item]]);
    }
  }

  const phone = (restaurant.contact.whatsapp ?? restaurant.contact.phone).replace(/\D/g, "");
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(`Hola, quiero reservar una mesa en ${restaurant.name}`)}&type=phone_number&app_absent=0`;

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
            <Link
              href="/que-puedo-comer"
              className="text-mediterranean-terracotta font-semibold"
            >
              ¿Qué puedo comer?
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-mediterranean-blue via-mediterranean-sand to-mediterranean-cream">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6 animate-float">🤔</div>
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-6 opacity-0 animate-fadeInUp">
            ¿Qué puedo comer?
          </h1>
          <p className="text-2xl font-light opacity-0 animate-fadeInUp delay-100 max-w-2xl mx-auto">
            Filtra por lo que te apetece y encuentra tu plato ideal
          </p>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="py-8 px-6 bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-5xl mx-auto space-y-5">
          {/* Search */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
            <input
              type="text"
              placeholder="Busca un plato o categoría..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-mediterranean-sand focus:border-mediterranean-blue outline-none text-lg transition-colors"
            />
          </div>

          {/* Tag filters */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
              Tipo de plato
            </p>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all hover:scale-105 ${
                    activeFilter === f.value
                      ? "bg-mediterranean-terracotta text-white shadow-lg"
                      : "bg-mediterranean-sand text-gray-700 hover:bg-mediterranean-terracotta/20"
                  }`}
                >
                  <span>{f.icon}</span>
                  <span>{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Allergen exclusion */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Excluir alérgenos
              </p>
              {excludedAllergens.length > 0 && (
                <button
                  onClick={() => setExcludedAllergens([])}
                  className="text-xs text-mediterranean-terracotta font-semibold hover:underline"
                >
                  Limpiar ({excludedAllergens.length})
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] as const).map((n) => {
                const a = ALLERGENS[n];
                const active = excludedAllergens.includes(n);
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => toggleAllergen(n)}
                    title={active ? `Quitar exclusión de ${a.es}` : `Excluir platos con ${a.es}`}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105 ${
                      active
                        ? "bg-red-500 text-white shadow-md ring-2 ring-red-300"
                        : "bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600"
                    }`}
                  >
                    <span>{a.icon}</span>
                    <span>{n}</span>
                    <span>{a.es}</span>
                    {active && <span className="ml-0.5 font-bold">✕</span>}
                  </button>
                );
              })}
            </div>
            {excludedAllergens.length > 0 && (
              <p className="text-xs text-red-500 mt-2 font-medium">
                ⚠️ Mostrando platos sin:{" "}
                {excludedAllergens.map((n) => ALLERGENS[n]?.es).join(", ")}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              Pida confirmación a nuestro personal sobre posibles trazas.
            </p>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-7xl mb-6">😔</div>
              <h2 className="font-display text-4xl font-bold mb-4">Sin resultados</h2>
              <p className="text-xl text-gray-600 mb-8">
                No encontramos platos con ese filtro o búsqueda.
              </p>
              <button
                onClick={() => {
                  setActiveFilter("todo");
                  setSearch("");
                  setExcludedAllergens([]);
                }}
                className="px-8 py-3 bg-mediterranean-terracotta text-white rounded-full font-semibold hover:scale-105 transition-all"
              >
                Ver todos los platos
              </button>
            </div>
          ) : (
            <div className="space-y-16">
              <p className="text-gray-500 text-lg">
                {filtered.length} plato{filtered.length !== 1 ? "s" : ""} encontrado
                {filtered.length !== 1 ? "s" : ""}
              </p>

              {grouped.map(([category, items]) => {
                const catSlug = slugify(category);
                return (
                  <div key={category}>
                    {/* Category header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{getCategoryIcon(category)}</span>
                        <h2 className="font-display text-4xl font-bold">{category}</h2>
                      </div>
                      <Link
                        href={`/carta/${catSlug}`}
                        className="text-mediterranean-terracotta font-semibold hover:underline flex items-center gap-1"
                      >
                        Ver sección completa <span>→</span>
                      </Link>
                    </div>

                    {/* Items grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                            item.highlight ? "ring-2 ring-mediterranean-terracotta" : ""
                          }`}
                        >
                          <div className="flex justify-between items-start gap-4 mb-3">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h3 className="font-display text-xl font-semibold">
                                  {item.name}
                                </h3>
                                {item.highlight && (
                                  <span className="px-2 py-0.5 bg-mediterranean-terracotta text-white text-xs font-semibold rounded-full">
                                    ESPECIALIDAD
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500">{item.description}</p>
                              {item.tags && item.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {item.tags
                                    .filter((t) => t !== "especialidad")
                                    .map((tag) => (
                                      <span
                                        key={tag}
                                        className="px-2 py-0.5 bg-mediterranean-sand text-gray-600 text-xs rounded-full"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                </div>
                              )}
                            </div>
                            <div className="font-display text-2xl font-bold text-mediterranean-terracotta flex-shrink-0">
                              €{item.price.toFixed(2)}
                            </div>
                          </div>

                          {/* Allergens */}
                          {item.allergens.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
                              {getNumericAllergens(item).map((num) => (
                                <span
                                  key={num}
                                  title={ALLERGENS[num]?.es}
                                  className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-600 font-medium"
                                >
                                  <span>{ALLERGENS[num]?.icon}</span>
                                  <span>
                                    {num} {ALLERGENS[num]?.es}
                                  </span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-mediterranean-blue to-mediterranean-terracotta text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-5xl font-bold mb-6">¿Ya sabes lo que quieres?</h2>
          <p className="text-2xl mb-10 font-light">Reserva tu mesa y te lo preparamos</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/carta"
              className="inline-block px-10 py-4 bg-white/20 border-2 border-white text-white font-semibold text-lg rounded-full hover:bg-white hover:text-mediterranean-blue transition-all hover:scale-105"
            >
              Ver carta completa
            </Link>
            <Link
              href={whatsappUrl}
              className="inline-block px-10 py-4 bg-white text-mediterranean-blue font-semibold text-lg rounded-full hover:bg-mediterranean-cream transition-all hover:scale-105 shadow-xl"
            >
              Reservar Mesa
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="font-display text-3xl font-bold mb-4 text-gradient">
            {restaurant.name}
          </div>
          <p className="text-gray-400">
            © {new Date().getFullYear()} {restaurant.legalName ?? restaurant.name}.{" "}
            {restaurant.shortDescription}
          </p>
        </div>
      </footer>
    </main>
  );
}
