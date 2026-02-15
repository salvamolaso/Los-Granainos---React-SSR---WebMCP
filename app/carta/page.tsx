'use client'

import Link from 'next/link'

export default function CartaPage() {
  const categories = [
    {
      name: 'Bebidas',
      slug: 'bebidas',
      icon: '🍷',
      description: 'Vinos, cervezas y refrescos',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Entrantes',
      slug: 'entrantes',
      icon: '🥗',
      description: 'Para empezar el festín',
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Pescaítos',
      slug: 'pescaitos',
      icon: '🐟',
      description: 'Nuestra especialidad',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Carne',
      slug: 'carne',
      icon: '🥩',
      description: 'De la tierra malagueña',
      color: 'from-red-500 to-orange-500'
    },
    {
      name: 'Postres',
      slug: 'postres',
      icon: '🍮',
      description: 'El dulce final',
      color: 'from-amber-500 to-yellow-500'
    }
  ]

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
            Sabores auténticos de la Costa del Sol
          </p>
        </div>
      </section>

      {/* Pescaito Frito Tradition */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-display text-5xl font-bold mb-6 text-gradient">
                La Tradición del Pescaíto Frito
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                <p>
                  El pescaíto frito es el alma de la gastronomía malagueña. Esta tradición centenaria 
                  nace en los chiringuitos de la costa, donde el pescado más fresco se fríe en abundante 
                  aceite de oliva virgen extra hasta alcanzar ese punto perfecto: crujiente por fuera, 
                  jugoso por dentro.
                </p>
                <p>
                  La técnica es un arte que se transmite de generación en generación. La temperatura 
                  del aceite, el punto exacto de la fritura, la calidad del pescado... todo debe estar 
                  en perfecta armonía. En Los Granainos mantenemos viva esta tradición desde 1987.
                </p>
                <p>
                  Nuestro pescado llega cada mañana directamente del puerto de La Cala. Boquerones, 
                  jureles, salmonetes... cada pieza es seleccionada con mimo y frita al momento, 
                  como manda la tradición malagueña.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-mediterranean-blue to-mediterranean-terracotta p-12 text-white flex flex-col justify-center shadow-2xl">
                <div className="text-7xl mb-6 text-center">🎣</div>
                <h3 className="font-display text-3xl font-bold text-center mb-4">
                  Del Mar a tu Mesa
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">✓</span>
                    <span>Pescado fresco diario</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">✓</span>
                    <span>Aceite de oliva virgen extra</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">✓</span>
                    <span>Fritura al momento</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">✓</span>
                    <span>Receta tradicional</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-mediterranean-sand p-8 rounded-2xl text-center">
              <div className="text-5xl mb-4">🌊</div>
              <h4 className="font-display text-2xl font-bold mb-2">5km</h4>
              <p className="text-gray-600">Distancia del puerto pesquero</p>
            </div>
            <div className="bg-mediterranean-sand p-8 rounded-2xl text-center">
              <div className="text-5xl mb-4">⏰</div>
              <h4 className="font-display text-2xl font-bold mb-2">2 minutos</h4>
              <p className="text-gray-600">Tiempo de fritura perfecto</p>
            </div>
            <div className="bg-mediterranean-sand p-8 rounded-2xl text-center">
              <div className="text-5xl mb-4">🔥</div>
              <h4 className="font-display text-2xl font-bold mb-2">180°C</h4>
              <p className="text-gray-600">Temperatura ideal del aceite</p>
            </div>
          </div>
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
                  <p className="text-gray-600 mb-6">
                    {category.description}
                  </p>
                  <div className={`inline-flex items-center gap-2 text-mediterranean-terracotta font-semibold group-hover:gap-4 transition-all`}>
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
          <h2 className="font-display text-5xl font-bold mb-6">
            ¿Listo para disfrutar?
          </h2>
          <p className="text-2xl mb-10 font-light">
            Reserva tu mesa y vive la experiencia Los Granainos
          </p>
          <Link
            href="/#contacto"
            className="inline-block px-12 py-5 bg-white text-mediterranean-blue font-semibold text-xl rounded-full hover:bg-mediterranean-cream transition-all hover:scale-105 shadow-xl"
          >
            Reservar Ahora
          </Link>
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
