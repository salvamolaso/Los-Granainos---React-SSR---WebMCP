'use client'

import Link from 'next/link'

interface MenuItem {
  name: string
  description: string
  price: string
  highlight?: boolean
}

interface CategoryLayoutProps {
  title: string
  icon: string
  description: string
  items: MenuItem[]
  color: string
}

export default function CategoryLayout({ title, icon, description, items, color }: CategoryLayoutProps) {
  return (
    <main className="min-h-screen bg-mediterranean-cream">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-mediterranean-sand/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-display text-3xl font-bold text-gradient">
            Los Granainos
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
      <section className={`pt-32 pb-16 px-6 bg-gradient-to-br ${color}`}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <Link 
            href="/carta"
            className="inline-flex items-center gap-2 mb-8 text-white/80 hover:text-white transition-colors"
          >
            <span className="text-xl">←</span>
            Volver a la carta
          </Link>
          <div className="text-7xl mb-6 animate-float">{icon}</div>
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-4">
            {title}
          </h1>
          <p className="text-2xl font-light opacity-90">
            {description}
          </p>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6">
            {items.map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  item.highlight ? 'ring-2 ring-mediterranean-terracotta' : ''
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
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="font-display text-3xl font-bold text-mediterranean-terracotta">
                      {item.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 italic text-lg">
              Los precios incluyen IVA • Alérgenos disponibles bajo petición
            </p>
          </div>
        </div>
      </section>

      {/* Other Categories */}
      <section className="py-16 px-6 bg-mediterranean-sand">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-center mb-12">
            Explora otras categorías
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Bebidas', slug: 'bebidas', icon: '🍷' },
              { name: 'Entrantes', slug: 'entrantes', icon: '🥗' },
              { name: 'Pescaítos', slug: 'pescaitos', icon: '🐟' },
              { name: 'Carne', slug: 'carne', icon: '🥩' },
              { name: 'Postres', slug: 'postres', icon: '🍮' },
            ].filter(cat => cat.name !== title).map((category) => (
              <Link
                key={category.slug}
                href={`/carta/${category.slug}`}
                className="px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 flex items-center gap-3"
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="font-semibold">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="font-display text-3xl font-bold mb-4 text-gradient">
            Los Granainos
          </div>
          <p className="text-gray-400">
            © 2024 Los Granainos. Sabor mediterráneo desde 1987
          </p>
        </div>
      </footer>
    </main>
  )
}
