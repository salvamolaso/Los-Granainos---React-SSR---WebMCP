// ─── Types ────────────────────────────────────────────────────────────────────

export type AllergenInfo = { name: string; es: string; icon: string }

export type MenuItem = {
  name: string
  category: string
  price: string
  tags: string[]
  allergens: number[]
  description?: string
  highlight?: boolean
}

// ─── Allergens ────────────────────────────────────────────────────────────────

export const ALLERGENS: Record<number, AllergenInfo> = {
  1:  { name: 'Gluten',      es: 'Gluten',           icon: '🌾' },
  2:  { name: 'Crustaceans', es: 'Crustáceos',       icon: '🦐' },
  3:  { name: 'Egg',         es: 'Huevo',             icon: '🥚' },
  4:  { name: 'Fish',        es: 'Pescado',           icon: '🐟' },
  5:  { name: 'Peanuts',     es: 'Cacahuetes',       icon: '🥜' },
  6:  { name: 'Soya',        es: 'Soja',              icon: '🫘' },
  7:  { name: 'Milk',        es: 'Lácteos',           icon: '🥛' },
  8:  { name: 'Nuts',        es: 'Frutos de cáscara', icon: '🌰' },
  9:  { name: 'Celery',      es: 'Apio',              icon: '🥬' },
  10: { name: 'Mustard',     es: 'Mostaza',           icon: '🌭' },
  11: { name: 'Sesame',      es: 'Sésamo',            icon: '🌱' },
  12: { name: 'Sulphite',    es: 'Sulfitos',          icon: '🍷' },
  13: { name: 'Lupins',      es: 'Altramuces',        icon: '🌼' },
  14: { name: 'Shellfish',   es: 'Moluscos',          icon: '🦪' },
}

// ─── Category Order ───────────────────────────────────────────────────────────

export const CATEGORY_ORDER = [
  'Entradas',
  'Pescados',
  'Carnes',
  'Huevos',
  'Postres',
  'Paella',
  'Menú del día',
  'Vinos',
]

// ─── Menu Items ───────────────────────────────────────────────────────────────

export const ALL_MENU_ITEMS: MenuItem[] = [
  // Entradas
  { name: 'Ensalada Especial',                   category: 'Entradas',     price: '€7.50',    tags: ['vegetariano', 'fresco'],            allergens: [3, 4, 12],          description: 'Ensalada especial de la casa' },
  { name: 'Tomate, Aguacate, Huevo y Atún',      category: 'Entradas',     price: '€8.50',    tags: ['fresco', 'pescado'],                allergens: [],                  description: 'Tomate, aguacate, huevo y atún' },
  { name: 'Tomate solo',                          category: 'Entradas',     price: '€5.50',    tags: ['vegetariano', 'fresco'],            allergens: [],                  description: 'Tomate en lonchas' },
  { name: 'Boquerones en Vinagre',               category: 'Entradas',     price: '€12.00',   tags: ['pescado', 'fresco'],                allergens: [4, 12],             description: 'Boquerones marinados en vinagre' },
  { name: 'Gambas al Pil-Pil',                   category: 'Entradas',     price: '€12.00',   tags: ['marisco', 'caliente'],              allergens: [2],                 description: 'Gambas al pil-pil',              highlight: true },
  { name: 'Gambas a la Plancha o Cocidas',       category: 'Entradas',     price: '€18.00',   tags: ['marisco', 'plancha'],               allergens: [2],                 description: 'Gambas a la plancha o cocidas',  highlight: true },
  { name: 'Mejillones al Vapor',                 category: 'Entradas',     price: '€12.00',   tags: ['marisco', 'caliente'],              allergens: [14],                description: 'Mejillones al vapor' },
  { name: 'Coquinas en Salsa',                   category: 'Entradas',     price: '€15.00',   tags: ['marisco', 'caliente'],              allergens: [14],                description: 'Coquinas en salsa' },
  { name: 'Almejas',                             category: 'Entradas',     price: '€12.00',   tags: ['marisco'],                          allergens: [12, 14],            description: 'Almejas' },
  { name: 'Queso Manchego',                      category: 'Entradas',     price: '€8.00',    tags: ['vegetariano', 'frío'],              allergens: [7],                 description: 'Queso manchego' },
  { name: 'Jamón Serrano',                       category: 'Entradas',     price: '€8.00',    tags: ['carne', 'frío'],                    allergens: [],                  description: 'Jamón serrano' },

  // Pescados
  { name: 'Fritura Variada',                     category: 'Pescados',     price: '€10.00',   tags: ['pescado', 'frito', 'especialidad'], allergens: [1, 4, 12, 14],      description: 'Fritura variada de pescado (por persona)', highlight: true },
  { name: 'Dorada Plancha',                      category: 'Pescados',     price: '€20.00',   tags: ['pescado', 'plancha', 'especialidad'],allergens: [4],                description: 'Dorada a la plancha',            highlight: true },
  { name: 'Boquerones Fritos Vitorianos',        category: 'Pescados',     price: '€12.00',   tags: ['pescado', 'frito'],                 allergens: [1, 4],              description: 'Boquerones fritos vitorianos' },
  { name: 'Boquerones en Vinagre Fritos',        category: 'Pescados',     price: '€15.00',   tags: ['pescado', 'frito'],                 allergens: [1, 4],              description: 'Boquerones en vinagre fritos' },
  { name: 'Boquerones al Limón',                 category: 'Pescados',     price: '€14.00',   tags: ['pescado', 'frito'],                 allergens: [1, 4],              description: 'Boquerones al limón' },
  { name: 'Calamares Fritos',                    category: 'Pescados',     price: '€12.00',   tags: ['pescado', 'frito'],                 allergens: [1, 12, 14],         description: 'Calamares fritos' },
  { name: 'Calamares a la Plancha',              category: 'Pescados',     price: '€14.00',   tags: ['pescado', 'plancha'],               allergens: [12, 14],            description: 'Calamares a la plancha' },
  { name: 'Jibia Frita',                         category: 'Pescados',     price: '€12.00',   tags: ['pescado', 'frito'],                 allergens: [1, 12, 14],         description: 'Jibia frita' },
  { name: 'Jibia Plancha',                       category: 'Pescados',     price: '€14.00',   tags: ['pescado', 'plancha'],               allergens: [12, 14],            description: 'Jibia a la plancha' },
  { name: 'Rosada Frita',                        category: 'Pescados',     price: '€12.00',   tags: ['pescado', 'frito'],                 allergens: [1, 4],              description: 'Rosada frita' },
  { name: 'Rosada Plancha',                      category: 'Pescados',     price: '€15.00',   tags: ['pescado', 'plancha'],               allergens: [4],                 description: 'Rosada a la plancha' },
  { name: 'Pez Espada a la Plancha',             category: 'Pescados',     price: '€18.00',   tags: ['pescado', 'plancha'],               allergens: [4, 12],             description: 'Pez espada a la plancha' },
  { name: 'Jureles Fritos',                      category: 'Pescados',     price: '€10.00',   tags: ['pescado', 'frito'],                 allergens: [1, 4],              description: 'Jureles fritos' },
  { name: 'Bacalao Frito',                       category: 'Pescados',     price: '€12.00',   tags: ['pescado', 'frito'],                 allergens: [1, 4],              description: 'Bacalao frito' },
  { name: 'Pescadilla Frita',                    category: 'Pescados',     price: '€14.00',   tags: ['pescado', 'frito'],                 allergens: [1, 4],              description: 'Pescadilla frita' },
  { name: 'Salmonetes',                          category: 'Pescados',     price: '€14.00',   tags: ['pescado'],                          allergens: [1, 4],              description: 'Salmonetes' },
  { name: 'Sardinas',                            category: 'Pescados',     price: '€7.00',    tags: ['pescado', 'especialidad'],          allergens: [4],                 description: 'Sardinas',                       highlight: true },
  { name: 'Sardinas Fritas',                     category: 'Pescados',     price: '€7.00',    tags: ['pescado', 'frito'],                 allergens: [14],                description: 'Sardinas fritas' },
  { name: 'Puntillitas',                         category: 'Pescados',     price: '€15.00',   tags: ['pescado', 'frito'],                 allergens: [],                  description: 'Puntillitas' },
  { name: 'Atún',                                category: 'Pescados',     price: '€20.00',   tags: ['pescado', 'especialidad'],          allergens: [],                  description: 'Atún',                           highlight: true },

  // Carnes
  { name: 'Filete de Cerdo',                     category: 'Carnes',       price: '€10.00',   tags: ['carne'],                            allergens: [1],                 description: 'Filete de cerdo' },
  { name: 'Filete de Cerdo Empanado',            category: 'Carnes',       price: '€12.00',   tags: ['carne', 'frito'],                   allergens: [1, 3],              description: 'Filete de cerdo empanado' },
  { name: 'Entrecot con Guarnición',             category: 'Carnes',       price: '€19.00',   tags: ['carne', 'especialidad'],            allergens: [1],                 description: 'Entrecot con guarnición',        highlight: true },
  { name: 'Entrecot a la Pimienta o Roquefort',  category: 'Carnes',       price: '€19.00',   tags: ['carne', 'especialidad'],            allergens: [1, 3, 4, 7, 9, 14],description: 'Entrecot con salsa a la pimienta o roquefort', highlight: true },
  { name: 'Filete de Pollo Empanado',            category: 'Carnes',       price: '€12.00',   tags: ['carne', 'frito'],                   allergens: [1, 3],              description: 'Filete de pollo empanado' },
  { name: 'Solomillo de Cerdo con Guarnición',   category: 'Carnes',       price: '€12.00',   tags: ['carne'],                            allergens: [1],                 description: 'Solomillo de cerdo con guarnición' },
  { name: 'Solomillo de Cerdo a la Pimienta o Roquefort', category: 'Carnes', price: '€16.00',tags: ['carne'],                           allergens: [1, 3, 4, 7, 9, 14],description: 'Solomillo de cerdo con salsa a la pimienta o roquefort' },
  { name: 'Filete de Pollo con Guarnición',      category: 'Carnes',       price: '€10.00',   tags: ['carne'],                            allergens: [1],                 description: 'Filete de pollo con guarnición' },
  { name: 'Hamburguesa con Patatas o Ensalada',  category: 'Carnes',       price: '€8.00',    tags: ['carne', 'frito'],                   allergens: [1, 3, 6, 7, 11, 12],description: 'Hamburguesa con patatas fritas o ensalada' },

  // Huevos
  { name: 'Huevos Fritos con Patatas',           category: 'Huevos',       price: '€8.50',    tags: ['vegetariano', 'caliente'],          allergens: [1, 3],              description: 'Huevos fritos con patatas' },
  { name: 'Tortilla Francesa',                   category: 'Huevos',       price: '€8.50',    tags: ['vegetariano', 'caliente'],          allergens: [3],                 description: 'Tortilla francesa' },
  { name: 'Tortilla Española',                   category: 'Huevos',       price: '€8.50',    tags: ['vegetariano', 'caliente'],          allergens: [1, 3],              description: 'Tortilla española' },
  { name: 'Tortilla de Espárragos',              category: 'Huevos',       price: '€8.50',    tags: ['vegetariano', 'caliente'],          allergens: [3],                 description: 'Tortilla de espárragos' },
  { name: 'Tortilla de Queso',                   category: 'Huevos',       price: '€8.50',    tags: ['vegetariano', 'caliente'],          allergens: [3, 12],             description: 'Tortilla de queso' },
  { name: 'Tortilla de Atún',                    category: 'Huevos',       price: '€8.50',    tags: ['pescado', 'caliente'],              allergens: [3, 4],              description: 'Tortilla de atún' },

  // Postres
  { name: 'Flan',                                category: 'Postres',      price: '€3.50',    tags: ['postre', 'dulce'],                  allergens: [3, 7, 8],           description: 'Flan de huevo con caramelo' },
  { name: 'Fruta del Tiempo',                    category: 'Postres',      price: 's/m',      tags: ['postre', 'fresco', 'vegetariano'],  allergens: [],                  description: 'Fruta fresca de temporada' },
  { name: 'Helados',                             category: 'Postres',      price: '€4.50',    tags: ['postre', 'dulce', 'frío'],          allergens: [3, 7, 8, 12],       description: 'Helados variados (+1 bola €2.50)' },
  { name: 'Postres Montero',                     category: 'Postres',      price: '€3.50',    tags: ['postre', 'dulce'],                  allergens: [3, 7, 8],           description: 'Postres Montero' },
  { name: 'Tartas Caseras',                      category: 'Postres',      price: '€5.50',    tags: ['postre', 'dulce', 'especialidad'],  allergens: [1, 3, 7],           description: 'Cheesecake, Tiramisú o Lemon Pie', highlight: true },

  // Paella
  { name: 'Paella (por encargo)',                category: 'Paella',       price: '€24.00',   tags: ['pescado', 'marisco', 'caliente', 'especialidad'], allergens: [1, 2, 3, 4, 6, 7, 9, 12, 14], description: 'Paella por encargo, mínimo 2 personas. Precio por persona.', highlight: true },

  // Menú del día
  { name: 'Menú del Día',                        category: 'Menú del día', price: 'Consultar',tags: ['menú'],                             allergens: [],                  description: 'Plato del día + Carne o Pescado + Postre o Café + Pan + Vino o Refresco' },

  // Vinos
  { name: 'Vino Tinto de la Casa',               category: 'Vinos',        price: '€12.00',   tags: ['vino', 'tinto'],                    allergens: [],                  description: 'Vino tinto de la casa' },
  { name: 'Ribera de la Casa',                   category: 'Vinos',        price: '€14.00',   tags: ['vino', 'tinto'],                    allergens: [],                  description: 'Ribera de la casa' },
  { name: 'Rioja de la Casa',                    category: 'Vinos',        price: '€14.00',   tags: ['vino', 'tinto'],                    allergens: [],                  description: 'Rioja de la casa' },
  { name: 'Marqués de Cáceres Tinto',            category: 'Vinos',        price: '€17.00',   tags: ['vino', 'tinto'],                    allergens: [],                  description: 'Marqués de Cáceres (tinto)',     highlight: true },
  { name: 'Ramón Bilbao',                        category: 'Vinos',        price: '€18.00',   tags: ['vino', 'tinto'],                    allergens: [],                  description: 'Ramón Bilbao',                   highlight: true },
  { name: 'Marqués del Riscal',                  category: 'Vinos',        price: '€18.00',   tags: ['vino', 'tinto'],                    allergens: [],                  description: 'Marqués del Riscal' },
  { name: 'Protos',                              category: 'Vinos',        price: '€18.00',   tags: ['vino', 'tinto'],                    allergens: [],                  description: 'Protos' },
  { name: 'Vino Rosado de la Casa',              category: 'Vinos',        price: '€12.00',   tags: ['vino', 'rosado'],                   allergens: [],                  description: 'Vino rosado de la casa' },
  { name: 'Marqués Cáceres Rosado',              category: 'Vinos',        price: '€17.00',   tags: ['vino', 'rosado'],                   allergens: [],                  description: 'Marqués Cáceres (rosado)' },
  { name: 'Lambrusco',                           category: 'Vinos',        price: '€14.00',   tags: ['vino', 'rosado'],                   allergens: [],                  description: 'Lambrusco' },
  { name: 'Vino Blanco de la Casa',              category: 'Vinos',        price: '€12.00',   tags: ['vino', 'blanco'],                   allergens: [],                  description: 'Vino blanco de la casa' },
  { name: 'Barbadillo',                          category: 'Vinos',        price: '€12.00',   tags: ['vino', 'blanco'],                   allergens: [],                  description: 'Barbadillo' },
  { name: 'Viñasol',                             category: 'Vinos',        price: '€15.00',   tags: ['vino', 'blanco'],                   allergens: [],                  description: 'Viñasol' },
  { name: 'Albariño',                            category: 'Vinos',        price: '€18.00',   tags: ['vino', 'blanco'],                   allergens: [],                  description: 'Albariño',                       highlight: true },
]

// ─── Filter Function ──────────────────────────────────────────────────────────

export function filterMenuItems(
  items: MenuItem[],
  options: {
    tag?: string
    search?: string
    excludeAllergens?: number[]
  }
): MenuItem[] {
  const { tag = 'todo', search = '', excludeAllergens = [] } = options
  return items.filter((item) => {
    const matchesTag =
      tag === 'todo' || item.tags.includes(tag)
    const matchesSearch =
      !search.trim() ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    const matchesAllergens =
      excludeAllergens.length === 0 ||
      !item.allergens.some((a) => excludeAllergens.includes(Number(a)))
    return matchesTag && matchesSearch && matchesAllergens
  })
}

// ─── Group by Category ────────────────────────────────────────────────────────

export function groupByCategory(items: MenuItem[]): [string, MenuItem[]][] {
  const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})
  return CATEGORY_ORDER
    .filter((cat) => grouped[cat] && grouped[cat].length > 0)
    .map((cat) => [cat, grouped[cat]])
}
