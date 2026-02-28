export const runtime = "edge";

import Link from "next/link";
import { getRestaurant, getCategories } from "@/lib/get-restaurant";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const info = await getRestaurant();
  return {
    title: info ? `Carta | ${info.name}` : "Carta",
    description: info
      ? `Descubre la carta completa de ${info.name}. Platos de cocina ${info.cuisine.join(", ").toLowerCase()}.`
      : "Nuestra carta",
  };
}

export default async function CartaPage() {
  const [info, categories] = await Promise.all([getRestaurant(), getCategories()]);

  if (!info) return null;

  const phone = (info.contact.whatsapp ?? info.contact.phone).replace(/\D/g, "");
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(`Hola, quiero reservar una mesa en ${info.name}`)}&type=phone_number&app_absent=0`;

  return (
    <main className="min-h-screen bg-mediterranean-cream">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-mediterranean-sand/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-display text-3xl font-bold text-gradient">
            {info.name}
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-mediterranean-terracotta transition-colors">
              Inicio
            </Link>
            <Link href="/carta" className="text-mediterranean-terracotta font-semibold">
              Carta
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-mediterranean-blue via-mediterranean-sand to-mediterranean-cream">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6 animate-float">🐟</div>
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-6 opacity-0 animate-fadeInUp">
            Nuestra Carta
          </h1>
          <p className="text-2xl font-light opacity-0 animate-fadeInUp delay-100">
            {info.shortDescription}
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 px-6 bg-mediterranean-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-5xl font-bold text-center mb-4">
            Explora Nuestra Carta
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            Selecciona una categoría para ver todos nuestros platos
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/carta/${category.slug}`}
                className="group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-display text-3xl font-bold mb-3 group-hover:text-mediterranean-blue transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{category.description}</p>
                  <p className="text-sm text-gray-400 mb-6">{category.itemCount} platos</p>
                  <div className="inline-flex items-center gap-2 text-mediterranean-terracotta font-semibold group-hover:gap-4 transition-all">
                    Ver carta completa
                    <span className="text-xl">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-mediterranean-blue to-mediterranean-terracotta text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-5xl font-bold mb-6">¿Listo para disfrutar?</h2>
          <p className="text-2xl mb-10 font-light">
            Reserva tu mesa y vive la experiencia {info.name}
          </p>
          <Link
            href={whatsappUrl}
            className="inline-block px-12 py-5 bg-white text-mediterranean-blue font-semibold text-xl rounded-full hover:bg-mediterranean-cream transition-all hover:scale-105 shadow-xl"
          >
            Reservar Ahora
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="font-display text-3xl font-bold mb-4 text-gradient">{info.name}</div>
          <p className="text-gray-400">
            © {new Date().getFullYear()} {info.legalName ?? info.name}. {info.shortDescription}
          </p>
        </div>
      </footer>
    </main>
  );
}
