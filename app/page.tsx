'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

type BookingStatus = 'idle' | 'success' | 'error'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [currentDay, setCurrentDay] = useState('')

  // ── Booking form state ────────────────────────────────────────────────────
  const [booking, setBooking] = useState({
    name: '',
    guests: '',
    date: '',
    preference: '' as '' | 'terraza' | 'salon',
    comments: '',
  })
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>('idle')

  const handleBookingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setBooking((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Basic client-side validation
    if (!booking.name || !booking.guests || !booking.date || !booking.preference) {
      setBookingStatus('error')
      return
    }
    // TODO: connect to real backend / book_table tool
    setBookingStatus('success')
    setBooking({ name: '', guests: '', date: '', preference: '', comments: '' })
  }

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)

    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    setCurrentDay(days[new Date().getDay()])

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { name: 'Fritura Variada', desc: 'Pescaíto frito crujiente, por persona', price: '€10' },
    { name: 'Dorada Plancha', desc: 'Dorada fresca a la plancha', price: '€20' },
    { name: 'Gambas a la Plancha o Cocidas', desc: 'Gambas frescas a la plancha o cocidas', price: '€18' },
    { name: 'Sardinas', desc: 'Sardinas frescas del Mediterráneo', price: '€7' },
    { name: 'Entrecot con Guarnición', desc: 'Entrecot jugoso con guarnición', price: '€19' },
    { name: 'Paella por Encargo', desc: 'Mínimo 2 personas, con antelación', price: '€24' },
  ]

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300"
           style={{
             background: scrollY > 50 
               ? 'rgba(244, 232, 208, 0.95)' 
               : 'transparent',
             backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none',
             boxShadow: scrollY > 50 ? '0 4px 20px rgba(0,0,0,0.1)' : 'none'
           }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-display text-3xl font-bold text-gradient">
            Los Granainos
          </div>
          <div className="hidden md:flex gap-8 font-light">
            <a href="#inicio" className="hover:text-mediterranean-terracotta transition-colors">Inicio</a>
            <a href="#menu" className="hover:text-mediterranean-terracotta transition-colors">Menú</a>
            <a href="/carta" className="hover:text-mediterranean-terracotta transition-colors">Carta Completa</a>
            <a href="/que-puedo-comer" className="hover:text-mediterranean-terracotta transition-colors">¿Qué puedo comer?</a>
            <a href="#nosotros" className="hover:text-mediterranean-terracotta transition-colors">Nosotros</a>
            <a href="#contacto" className="hover:text-mediterranean-terracotta transition-colors">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-mediterranean-blue via-mediterranean-sand to-mediterranean-cream">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-64 h-64 bg-mediterranean-terracotta rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-mediterranean-olive rounded-full blur-3xl animate-wave"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className="mb-6 opacity-0 animate-fadeInUp">
            <span className="text-mediterranean-terracotta font-light text-xl tracking-widest">
              DESDE 1987
            </span>
          </div>
          <h1 className="font-display text-7xl md:text-9xl font-bold mb-6 opacity-0 animate-fadeInUp delay-100">
            Los Granainos
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-12 opacity-0 animate-fadeInUp delay-200 max-w-2xl mx-auto">
            Sabores auténticos junto al mar en la Cala de Mijas
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center opacity-0 animate-fadeInUp delay-300">
            <a href="/carta"
               className="px-10 py-4 bg-mediterranean-terracotta text-white font-light text-lg rounded-full hover:bg-opacity-90 transition-all hover:scale-105 shadow-lg">
              Ver Carta Completa
            </a>
            <a href="/que-puedo-comer"
               className="px-10 py-4 bg-mediterranean-olive text-white font-light text-lg rounded-full hover:bg-opacity-90 transition-all hover:scale-105 shadow-lg">
              ¿Qué puedo comer?
            </a>
            <a href="https://api.whatsapp.com/send/?phone=+34667039082&text=Hola,+quiero+reservar+una+mesa&type=phone_number&app_absent=0"
               className="px-10 py-4 border-2 border-mediterranean-blue text-mediterranean-blue font-light text-lg rounded-full hover:bg-mediterranean-blue hover:text-white transition-all hover:scale-105">
              Reservar Mesa
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-mediterranean-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-32 px-6 bg-mediterranean-cream">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Una tradición familiar
            </h2>
            <p className="text-lg leading-relaxed mb-6 text-gray-700">
              Desde 1987, Los Granainos ha sido el hogar de la auténtica cocina mediterránea 
              en la Cala de Mijas. Nuestra familia ha compartido durante generaciones el amor 
              por los sabores tradicionales de la Costa del Sol.
            </p>
            <p className="text-lg leading-relaxed mb-6 text-gray-700">
              Con el mar como vecino y la brisa marina como compañía, cada plato cuenta una 
              historia de pescadores, agricultores locales y recetas transmitidas de abuelos 
              a nietos.
            </p>
            <div className="flex gap-8 mt-10">
              <div>
                <div className="font-display text-4xl font-bold text-mediterranean-terracotta">37+</div>
                <div className="text-sm text-gray-600 mt-1">Años de Historia</div>
              </div>
              <div>
                <div className="font-display text-4xl font-bold text-mediterranean-blue">100%</div>
                <div className="text-sm text-gray-600 mt-1">Local</div>
              </div>
              <div>
                <div className="font-display text-4xl font-bold text-mediterranean-olive">★★★★★</div>
                <div className="text-sm text-gray-600 mt-1">Familias Felices</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/logo.jpeg"
                alt="Logo Los Granainos en Cala de Mijas"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-mediterranean-olive rounded-full blur-2xl opacity-60"></div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-32 px-6 bg-mediterranean-sand relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-mediterranean-cream rounded-full blur-3xl opacity-70"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-6">
              Nuestro Menú
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Platos elaborados con ingredientes frescos de la región y recetas tradicionales
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {menuItems.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-display text-2xl font-semibold group-hover:text-mediterranean-blue transition-colors">
                    {item.name}
                  </h3>
                  <span className="font-display text-2xl font-bold text-mediterranean-terracotta">
                    {item.price}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-lg text-gray-700 italic mb-8">
              * Menú del día disponible • Pregunta por nuestras especialidades de {currentDay}
            </p>
            <a 
              href="/carta"
              className="inline-block px-10 py-4 bg-mediterranean-blue text-white font-light text-lg rounded-full hover:bg-opacity-90 transition-all hover:scale-105 shadow-lg"
            >
              Ver Carta Completa con Precios
            </a>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="contacto" className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-6 text-gradient">
              Visítanos
            </h2>
            <p className="text-xl text-gray-700">
              Te esperamos junto a la playa de Cala de Mijas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="text-4xl">📍</div>
                <div>
                  <h3 className="font-display text-2xl font-semibold mb-2">Ubicación</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Paseo Marítimo de la Cala<br />
                    29649 Cala de Mijas<br />
                    Málaga, España
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-4xl">🕐</div>
                <div>
                  <h3 className="font-display text-2xl font-semibold mb-2">Horario</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Lunes - Domingo<br />
                    12:00 - 16:00 | 19:00 - 23:30
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-4xl">📞</div>
                <div>
                  <h3 className="font-display text-2xl font-semibold mb-2">Contacto</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Teléfono: +34 667039082<br />
                    reservas@losgranainos.es
                  </p>
                </div>
              </div>

              <Link
                href="https://api.whatsapp.com/send/?phone=+34667039082&text=Hola,+quiero+reservar+una+mesa&type=phone_number&app_absent=0"
                className="inline-block px-10 py-4 bg-mediterranean-blue text-white font-light text-lg rounded-full hover:bg-opacity-90 transition-all hover:scale-105 shadow-lg"
              >
            Hacer una reserva
          </Link>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-2xl h-96 bg-gradient-to-br from-mediterranean-blue via-mediterranean-sand to-mediterranean-olive flex items-center justify-center">
            <img
                src="/restaurante.jpg"
                alt="Fachada Los Granainos en Cala de Mijas"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="font-display text-4xl font-bold mb-4 text-gradient">
            Los Granainos
          </div>
          <p className="text-gray-400 mb-8">
            Sabor mediterráneo desde 1987
          </p>
          <div className="flex justify-center gap-8 mb-8">
            <a href="#" className="hover:text-mediterranean-terracotta transition-colors">Facebook</a>
            <a href="#" className="hover:text-mediterranean-terracotta transition-colors">Instagram</a>
            <a href="#" className="hover:text-mediterranean-terracotta transition-colors">TripAdvisor</a>
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 Los Granainos. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  )
}
