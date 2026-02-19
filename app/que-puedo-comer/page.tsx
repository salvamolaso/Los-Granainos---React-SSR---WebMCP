'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─── Allergens ────────────────────────────────────────────────────────────────

const allergens: Record<number, { name: string; es: string; icon: string }> = {
  1:  { name: 'Gluten',      es: 'Gluten',          icon: '🌾' },
  2:  { name: 'Crustaceans', es: 'Crustáceos',      icon: '🦐' },
  3:  { name: 'Egg',         es: 'Huevo',            icon: '🥚' },
  4:  { name: 'Fish',        es: 'Pescado',          icon: '🐟' },
  5:  { name: 'Peanuts',     es: 'Cacahuetes',      icon: '🥜' },
  6:  { name: 'Soya',        es: 'Soja',             icon: '🫘' },
  7:  { name: 'Milk',        es: 'Lácteos',          icon: '🥛' },
  8:  { name: 'Nuts',        es: 'Frutos de cáscara',icon: '🌰' },
  9:  { name: 'Celery',      es: 'Apio',             icon: '🥬' },
  10: { name: 'Mustard',     es: 'Mostaza',          icon: '🌭' },
  11: { name: 'Sesame',      es: 'Sésamo',           icon: '🌱' },
  12: { name: 'Sulphite',    es: 'Sulfitos',         icon: '🍷' },
  13: { name: 'Lupins',      es: 'Altramuces',       icon: '🌼' },
  14: { name: 'Shellfish',   es: 'Moluscos',         icon: '🦪' },
}

// ─── Menu Items ───────────────────────────────────────────────────────────────

const allItems = [
  // Entradas
  { name: 'Ensalada Especial',                   category: 'Entradas',     price: '€7.50',    tags: ['vegetariano', 'fresco'],            allergens: [3, 4, 12] },
  { name: 'Tomate, Aguacate, Huevo y Atún',      category: 'Entradas',     price: '€8.50',    tags: ['fresco', 'pescado'],                allergens: [] },
  { name: 'Tomate solo',                          category: 'Entradas',     price: '€5.50',    tags: ['vegetariano', 'fresco'],            allergens: [] },
  { name: 'Boquerones en Vinagre',               category: 'Entradas',     price: '€12.00',   tags: ['pescado', 'fresco'],                allergens: [4, 12] },
  { name: 'Gambas al Pil-Pil',                   category: 'Entradas',     price: '€12.00',   tags: ['marisco', 'caliente'],              allergens: [2] },
  { name: 'Gambas a la Plancha o Cocidas',       category: 'Entradas',     price: '€18.00',   tags: ['marisco', 'plancha'],               allergens: [2] },
  { name: 'Mejillones al Vapor',                 category: 'Entradas',     price: '€12.00',   tags: ['marisco', 'caliente'],              allergens: [14] },
  { name: 'Coquinas en Salsa',                   category: 'Entradas',     price: '€15.00',   tags: ['marisco', 'caliente'],              allergens: [14] },
  { name: 'Almejas',                             category: 'Entradas',     price: '€12.00',   tags: ['marisco'],                          allergens: [12, 14] },
  { name: 'Queso Manchego',                      category: 'Entradas',     price: '€8.00',    tags: ['vegetariano', 'frío'],              allergens: [7] },
  { name: 'Jamón Serrano',                       category: 'Entradas',     price: '€8.00',    tags: ['carne', 'frío'],                    allergens: [] },

  // Pescados
  { name: 'Fritura Variada',                     category: 'Pescados',     price: '€10.00',   tags: ['pescado', 'frito', 'especialidad'], allergens: [1, 4, 12, 14] },
  { name: 'Dorada Plancha',                      category: 'Pescados',     price: '€20.00',   tags: ['pescado', 'plancha', 'especialidad'],allergens: [4] },
  { name: 'Boquerones Fritos Vitorianos',        category: 'Pescados',     price: '€12.00',   tags: ['pescado', 'frito'],                 allergens: [1, 4] },
  { name: 'Boquerones en Vinagre Fritos',        category: 'Pescados',     price: '€15.00',   tags: ['pescado', 'frito'],                 allergens: [1, 4] },
  { name: 'Boquerones al Limón',                 category: 'Pescados',     price: '€14.00',   tags: ['pescado', 'frito'],                 allergens: [1, 4] },
  { name: 'Calamares Fritos',                    category: 'Pescados',     price: '€12.00',   tags: ['pescado', 'frito'],                 allergens: [1, 12, 14] },
  { name: 'Calamares a la Plancha',              category: 'Pescados',     price: '€14.00',   tags: ['pescado', 'plancha'],               allergens: [12, 14] },
  { name: 'Jibia Frita',                         category: 'Pescados',     price: '€12.00',   tags: ['pescado', 'frito'],                 allergens: [1, 12, 14] },
  { name: 'Jibia Plancha',                       category: 'Pescados',     price: '€14.00',   tags: ['pescado', 'plancha'],               allergens: [12, 14] },
  { name: 'Rosada Frita',                        category: 'Pescados',     price: '€12.00',   tags: ['pescado', 'frito'],                 allergens: [1, 4] },
  { name: 'Rosada Plancha',                      category: 'Pescados',     price: '€15.00',   tags: ['pescado', 'plancha'],               allergens: [4] },
  { name: 'Pez Espada a la Plancha',             category: 'Pescados',     price: '€18.00',   tags: ['pescado', 'plancha'],               allergens: [4, 12] },
  { name: 'Jureles Fritos',                      category: 'Pescados',     price: '€10.00',   tags: ['pescado', 'frito'],                 allergens: [1, 4] },
  { name: 'Bacalao Frito',                       category: 'Pescados',     price: '€12.00',   tags: ['pescado', 'frito'],                 allergens: [1, 4] },
  { name: 'Pescadilla Frita',                    category: 'Pescados',     price: '€14.00',   tags: ['pescado', 'frito'],                 allergens: [1, 4] },
  { name: 'Salmonetes',                          category: 'Pescados',     price: '€14.00',   tags: ['pescado'],                          allergens: [1, 4] },
  { name: 'Sardinas',                            category: 'Pescados',     price: '€7.00',    tags: ['pescado', 'especialidad'],          allergens: [4] },
  { name: 'Sardinas Fritas',                     category: 'Pescados',     price: '€7.00',    tags: ['pescado', 'frito'],                 allergens: [14] },
  { name: 'Puntillitas',                         category: 'Pescados',     price: '€15.00',   tags: ['pescado', 'frito'],                 allergens: [] },
  { name: 'Atún',                                category: 'Pescados',     price: '€20.00',   tags: ['pescado', 'especialidad'],          allergens: [] },

  // Carnes
  { name: 'Filete de Cerdo',                     category: 'Carnes',       price: '€10.00',   tags: ['carne'],                            allergens: [1] },
  { name: 'Filete de Cerdo Empanado',            category: 'Carnes',       price: '€12.00',   tags: ['carne', 'frito'],                   allergens: [1, 3] },
  { name: 'Entrecot con Guarnición',             category: 'Carnes',       price: '€19.00',   tags: ['carne', 'especialidad'],            allergens: [1] },
  { name: 'Entrecot a la Pimienta o Roquefort',  category: 'Carnes',       price: '€19.00',   tags: ['carne', 'especialidad'],            allergens: [1, 3, 4, 7, 9, 14] },
  { name: 'Filete de Pollo Empanado',            category: 'Carnes',       price: '€12.00',   tags: ['carne', 'frito'],                   allergens: [1, 3] },
  { name: 'Solomillo de Cerdo con Guarnición',   category: 'Carnes',       price: '€12.00',   tags: ['carne'],                            allergens: [1] },
  { name: 'Solomillo de Cerdo a la Pimienta o Roquefort', category: 'Carnes', price: '€16.00', tags: ['carne'],                           allergens: [1, 3, 4, 7, 9, 14] },
  { name: 'Filete de Pollo con Guarnición',      category: 'Carnes',       price: '€10.00',   tags: ['carne'],                            allergens: [1] },
  { name: 'Hamburguesa con Patatas o Ensalada',  category: 'Carnes',       price: '€8.00',    tags: ['carne', 'frito'],                   allergens: [1, 3, 6, 7, 11, 12] },

  // Huevos
  { name: 'Huevos Fritos con Patatas',           category: 'Huevos',       price: '€8.50',    tags: ['vegetariano', 'caliente'],          allergens: [1, 3] },
  { name: 'Tortilla Francesa',                   category: 'Huevos',       price: '€8.50',    tags: ['vegetariano', 'caliente'],          allergens: [3] },
  { name: 'Tortilla Española',                   category: 'Huevos',       price: '€8.50',    tags: ['vegetariano', 'caliente'],          allergens: [1, 3] },
  { name: 'Tortilla de Espárragos',              category: 'Huevos',       price: '€8.50',    tags: ['vegetariano', 'caliente'],          allergens: [3] },
  { name: 'Tortilla de Queso',                   category: 'Huevos',       price: '€8.50',    tags: ['vegetariano', 'caliente'],          allergens: [3, 12] },
  { name: 'Tortilla de Atún',                    category: 'Huevos',       price: '€8.50',    tags: ['pescado', 'caliente'],              allergens: [3, 4] },

  // Postres
  { name: 'Flan',                                category: 'Postres',      price: '€3.50',    tags: ['postre', 'dulce'],                  allergens: [3, 7, 8] },
  { name: 'Fruta del Tiempo',                    category: 'Postres',      price: 's/m',      tags: ['postre', 'fresco', 'vegetariano'],  allergens: [] },
  { name: 'Helados',                             category: 'Postres',      price: '€4.50',    tags: ['postre', 'dulce', 'frío'],          allergens: [3, 7, 8, 12] },
  { name: 'Postres Montero',                     category: 'Postres',      price: '€3.50',    tags: ['postre', 'dulce'],                  allergens: [3, 7, 8] },
  { name: 'Tartas Caseras',                      category: 'Postres',      price: '€5.50',    tags: ['postre', 'dulce', 'especialidad'],  allergens: [1, 3, 7] },

  // Paella
  { name: 'Paella (por encargo)',                category: 'Paella',       price: '€24.00',   tags: ['pescado', 'marisco', 'caliente', 'especialidad'], allergens: [1, 2, 3, 4, 6, 7, 9, 12, 14] },

  // Menú del día
  { name: 'Menú del Día',                        category: 'Menú del día', price: 'Consultar',tags: ['menú'],                             allergens: [] },

  // Vinos
  { name: 'Vino Tinto de la Casa',               category: 'Vinos',        price: '€12.00',   tags: ['vino', 'tinto'],                    allergens: [] },
  { name: 'Ribera de la Casa',                   category: 'Vinos',        price: '€14.00',   tags: ['vino', 'tinto'],                    allergens: [] },
  { name: 'Rioja de la Casa',                    category: 'Vinos',        price: '€14.00',   tags: ['vino', 'tinto'],                    allergens: [] },
  { name: 'Marqués de Cáceres Tinto',            category: 'Vinos',        price: '€17.00',   tags: ['vino', 'tinto'],                    allergens: [] },
  { name: 'Ramón Bilbao',                        category: 'Vinos',        price: '€18.00',   tags: ['vino', 'tinto'],                    allergens: [] },
  { name: 'Marqués del Riscal',                  category: 'Vinos',        price: '€18.00',   tags: ['vino', 'tinto'],                    allergens: [] },
  { name: 'Protos',                              category: 'Vinos',        price: '€18.00',   tags: ['vino', 'tinto'],                    allergens: [] },
  { name: 'Vino Rosado de la Casa',              category: 'Vinos',        price: '€12.00',   tags: ['vino', 'rosado'],                   allergens: [] },
  { name: 'Marqués Cáceres Rosado',              category: 'Vinos',        price: '€17.00',   tags: ['vino', 'rosado'],                   allergens: [] },
  { name: 'Lambrusco',                           category: 'Vinos',        price: '€14.00',   tags: ['vino', 'rosado'],                   allergens: [] },
  { name: 'Vino Blanco de la Casa',              category: 'Vinos',        price: '€12.00',   tags: ['vino', 'blanco'],                   allergens: [] },
  { name: 'Barbadillo',                          category: 'Vinos',        price: '€12.00',   tags: ['vino', 'blanco'],                   allergens: [] },
  { name: 'Viñasol',                             category: 'Vinos',        price: '€15.00',   tags: ['vino', 'blanco'],                   allergens: [] },
  { name: 'Albariño',                            category: 'Vinos',        price: '€18.00',   tags: ['vino', 'blanco'],                   allergens: [] },
]

// ─── Filters ──────────────────────────────────────────────────────────────────

const filters = [
  { label: 'Todo',          value: 'todo',        icon: '🍽️' },
  { label: 'Pescado',       value: 'pescado',     icon: '🐟' },
  { label: 'Marisco',       value: 'marisco',     icon: '🦐' },
  { label: 'Carne',         value: 'carne',       icon: '🥩' },
  { label: 'Vegetariano',   value: 'vegetariano', icon: '🥗' },
  { label: 'Frito',         value: 'frito',       icon: '🍳' },
  { label: 'Plancha',       value: 'plancha',     icon: '♨️' },
  { label: 'Postres',       value: 'postre',      icon: '🍮' },
  { label: 'Vinos',         value: 'vino',        icon: '🍷' },
  { label: 'Especialidades',value: 'especialidad',icon: '⭐' },
]

// ─── Category meta ────────────────────────────────────────────────────────────

const categoryOrder = ['Entradas', 'Pescados', 'Carnes', 'Huevos', 'Postres', 'Paella', 'Menú del día', 'Vinos']

const categoryLinks: Record<string, string> = {
  Entradas:       '/carta/entrantes',
  Pescados:       '/carta/pescaitos',
  Carnes:         '/carta/carne',
  Huevos:         '/carta/huevos',
  Postres:        '/carta/postres',
  Paella:         '/carta/paella',
  'Menú del día': '/carta/menu-del-dia',
  Vinos:          '/carta/bebidas',
}

const categoryIcons: Record<string, string> = {
  Entradas:       '🥗',
  Pescados:       '🐟',
  Carnes:         '🥩',
  Huevos:         '🍳',
  Postres:        '🍮',
  Paella:         '🥘',
  'Menú del día': '🍽️',
  Vinos:          '🍷',
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function QuePuedoComerPage() {
  const [activeFilter, setActiveFilter] = useState('todo')
  const [search, setSearch] = useState('')
  const [excludedAllergens, setExcludedAllergens] = useState<number[]>([])

  const toggleAllergen = (num: number) => {
    setExcludedAllergens((prev) => {
      const asNum = Number(num)
      return prev.includes(asNum) ? prev.filter((n) => n !== asNum) : [...prev, asNum]
    })
  }

  const filtered = allItems.filter((item) => {
    const matchesFilter = activeFilter === 'todo' || item.tags.includes(activeFilter)
    const matchesSearch =
      search.trim() === '' ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    const matchesAllergens =
      excludedAllergens.length === 0 ||
      !item.allergens.some((a) => excludedAllergens.includes(Number(a)))
    return matchesFilter && matchesSearch && matchesAllergens
  })

  const groupedRaw = filtered.reduce<Record<string, typeof allItems>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  const grouped = categoryOrder
    .filter((cat) => groupedRaw[cat] && groupedRaw[cat].length > 0)
    .map((cat) => [cat, groupedRaw[cat]] as [string, typeof allItems])

  return (
    <main className="min-h-screen bg-mediterranean-cream">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-mediterranean-sand/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-display text-3xl font-bold text-gradient">
            Los Granainos
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-mediterranean-terracotta transition-colors">Inicio</Link>
            <Link href="/carta" className="hover:text-mediterranean-terracotta transition-colors">Carta</Link>
            <Link href="/que-puedo-comer" className="text-mediterranean-terracotta font-semibold">¿Qué puedo comer?</Link>
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

          {/* Tipo de plato */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Tipo de plato</p>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all hover:scale-105 ${
                    activeFilter === f.value
                      ? 'bg-mediterranean-terracotta text-white shadow-lg'
                      : 'bg-mediterranean-sand text-gray-700 hover:bg-mediterranean-terracotta/20'
                  }`}
                >
                  <span>{f.icon}</span>
                  <span>{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Alérgenos a excluir */}
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
              {([1,2,3,4,5,6,7,8,9,10,11,12,13,14] as const).map((n) => {
                const a = allergens[n]
                const active = excludedAllergens.includes(n)
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => toggleAllergen(n)}
                    title={active ? `Quitar exclusión de ${a.es}` : `Excluir platos con ${a.es}`}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105 ${
                      active
                        ? 'bg-red-500 text-white shadow-md ring-2 ring-red-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                    }`}
                  >
                    <span>{a.icon}</span>
                    <span>{n}</span>
                    <span>{a.es}</span>
                    {active && <span className="ml-0.5 font-bold">✕</span>}
                  </button>
                )
              })}
            </div>
            {excludedAllergens.length > 0 && (
              <p className="text-xs text-red-500 mt-2 font-medium">
                ⚠️ Mostrando platos sin: {excludedAllergens.map((n) => allergens[n]?.es).join(', ')}
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
              <p className="text-xl text-gray-600 mb-8">No encontramos platos con ese filtro o búsqueda.</p>
              <button
                onClick={() => { setActiveFilter('todo'); setSearch(''); setExcludedAllergens([]) }}
                className="px-8 py-3 bg-mediterranean-terracotta text-white rounded-full font-semibold hover:scale-105 transition-all"
              >
                Ver todos los platos
              </button>
            </div>
          ) : (
            <div className="space-y-16">
              <p className="text-gray-500 text-lg">
                {filtered.length} plato{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
              </p>

              {grouped.map(([category, items]) => (
                <div key={category}>
                  {/* Category header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{categoryIcons[category] ?? '🍽️'}</span>
                      <h2 className="font-display text-4xl font-bold">{category}</h2>
                    </div>
                    {categoryLinks[category] && (
                      <Link
                        href={categoryLinks[category]}
                        className="text-mediterranean-terracotta font-semibold hover:underline flex items-center gap-1"
                      >
                        Ver sección completa <span>→</span>
                      </Link>
                    )}
                  </div>

                  {/* Items grid */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {items.map((item, i) => (
                      <div
                        key={i}
                        className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                          item.tags.includes('especialidad') ? 'ring-2 ring-mediterranean-terracotta' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="font-display text-xl font-semibold">{item.name}</h3>
                              {item.tags.includes('especialidad') && (
                                <span className="px-2 py-0.5 bg-mediterranean-terracotta text-white text-xs font-semibold rounded-full">
                                  ESPECIALIDAD
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.tags.filter(t => t !== 'especialidad').map((tag) => (
                                <span key={tag} className="px-2 py-0.5 bg-mediterranean-sand text-gray-600 text-xs rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="font-display text-2xl font-bold text-mediterranean-terracotta flex-shrink-0">
                            {item.price}
                          </div>
                        </div>

                        {/* Allergens */}
                        {item.allergens.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
                            {item.allergens.map((num) => (
                              <span
                                key={num}
                                title={allergens[num]?.es}
                                className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-600 font-medium"
                              >
                                <span>{allergens[num]?.icon}</span>
                                <span>{num} {allergens[num]?.es}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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
              href="https://api.whatsapp.com/send/?phone=+34667039082&text=Hola,+quiero+reservar+una+mesa&type=phone_number&app_absent=0"
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
          <div className="font-display text-3xl font-bold mb-4 text-gradient">Los Granainos</div>
          <p className="text-gray-400">© 2024 Los Granainos. Sabor mediterráneo desde 1987</p>
        </div>
      </footer>
    </main>
  )
}
