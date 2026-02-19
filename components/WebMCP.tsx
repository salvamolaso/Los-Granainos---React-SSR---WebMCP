'use client'

import { useEffect } from 'react'

// ─── Allergen Names ───────────────────────────────────────────────────────────

const allergenNames: Record<number, string> = {
  1:  'Gluten',
  2:  'Crustáceos',
  3:  'Huevo',
  4:  'Pescado',
  5:  'Cacahuetes',
  6:  'Soja',
  7:  'Lácteos',
  8:  'Frutos de cáscara',
  9:  'Apio',
  10: 'Mostaza',
  11: 'Sésamo',
  12: 'Sulfitos',
  13: 'Altramuces',
  14: 'Moluscos',
}

// ─── Menu Data ────────────────────────────────────────────────────────────────

const menuData = {
  entradas: [
    { name: 'Ensalada Especial',                 description: 'Ensalada especial de la casa',          price: '€7.50',    allergens: [3, 4, 12] },
    { name: 'Tomate, Aguacate, Huevo y Atún',    description: 'Tomate, aguacate, huevo y atún',        price: '€8.50',    highlight: true, allergens: [] },
    { name: 'Tomate solo',                        description: 'Tomate en lonchas',                     price: '€5.50',    allergens: [] },
    { name: 'Boquerones en Vinagre',             description: 'Boquerones marinados en vinagre',       price: '€12.00',   allergens: [4, 12] },
    { name: 'Gambas al Pil-Pil',                 description: 'Gambas al pil-pil',                     price: '€12.00',   highlight: true, allergens: [2] },
    { name: 'Gambas a la Plancha o Cocidas',     description: 'Gambas a la plancha o cocidas',         price: '€18.00',   highlight: true, allergens: [2] },
    { name: 'Mejillones al Vapor',               description: 'Mejillones al vapor',                   price: '€12.00',   allergens: [14] },
    { name: 'Coquinas en Salsa',                 description: 'Coquinas en salsa',                     price: '€15.00',   allergens: [14] },
    { name: 'Almejas',                           description: 'Almejas',                               price: '€12.00',   allergens: [12, 14] },
    { name: 'Queso Manchego',                    description: 'Queso manchego',                        price: '€8.00',    allergens: [7] },
    { name: 'Jamón Serrano',                     description: 'Jamón serrano',                         price: '€8.00',    allergens: [] },
  ],
  pescados: [
    { name: 'Fritura Variada',                   description: 'Fritura variada de pescado (por persona)', price: '€10.00', highlight: true, allergens: [1, 4, 12, 14] },
    { name: 'Dorada Plancha',                    description: 'Dorada a la plancha',                   price: '€20.00',   highlight: true, allergens: [4] },
    { name: 'Boquerones Fritos Vitorianos',      description: 'Boquerones fritos vitorianos',          price: '€12.00',   allergens: [1, 4] },
    { name: 'Boquerones en Vinagre Fritos',      description: 'Boquerones en vinagre fritos',          price: '€15.00',   allergens: [1, 4] },
    { name: 'Boquerones al Limón',               description: 'Boquerones al limón',                   price: '€14.00',   allergens: [1, 4] },
    { name: 'Calamares Fritos',                  description: 'Calamares fritos',                      price: '€12.00',   allergens: [1, 12, 14] },
    { name: 'Calamares a la Plancha',            description: 'Calamares a la plancha',                price: '€14.00',   allergens: [12, 14] },
    { name: 'Jibia Frita',                       description: 'Jibia frita',                           price: '€12.00',   allergens: [1, 12, 14] },
    { name: 'Jibia Plancha',                     description: 'Jibia a la plancha',                    price: '€14.00',   allergens: [12, 14] },
    { name: 'Rosada Frita',                      description: 'Rosada frita',                          price: '€12.00',   allergens: [1, 4] },
    { name: 'Rosada Plancha',                    description: 'Rosada a la plancha',                   price: '€15.00',   allergens: [4] },
    { name: 'Pez Espada a la Plancha',           description: 'Pez espada a la plancha',               price: '€18.00',   allergens: [4, 12] },
    { name: 'Jureles Fritos',                    description: 'Jureles fritos',                        price: '€10.00',   allergens: [1, 4] },
    { name: 'Bacalao Frito',                     description: 'Bacalao frito',                         price: '€12.00',   allergens: [1, 4] },
    { name: 'Pescadilla Frita',                  description: 'Pescadilla frita',                      price: '€14.00',   allergens: [1, 4] },
    { name: 'Salmonetes',                        description: 'Salmonetes',                            price: '€14.00',   allergens: [1, 4] },
    { name: 'Sardinas',                          description: 'Sardinas',                              price: '€7.00',    highlight: true, allergens: [4] },
    { name: 'Sardinas Fritas',                   description: 'Sardinas fritas',                       price: '€7.00',    allergens: [14] },
    { name: 'Puntillitas',                       description: 'Puntillitas',                           price: '€15.00',   allergens: [] },
    { name: 'Atún',                              description: 'Atún',                                  price: '€20.00',   highlight: true, allergens: [] },
  ],
  carnes: [
    { name: 'Filete de Cerdo',                   description: 'Filete de cerdo',                       price: '€10.00',   allergens: [1] },
    { name: 'Filete de Cerdo Empanado',          description: 'Filete de cerdo empanado',              price: '€12.00',   allergens: [1, 3] },
    { name: 'Entrecot con Guarnición',           description: 'Entrecot con guarnición',               price: '€19.00',   highlight: true, allergens: [1] },
    { name: 'Entrecot a la Pimienta o Roquefort', description: 'Entrecot con salsa a la pimienta o roquefort', price: '€19.00', highlight: true, allergens: [1, 3, 4, 7, 9, 14] },
    { name: 'Filete de Pollo Empanado',          description: 'Filete de pollo empanado',              price: '€12.00',   allergens: [1, 3] },
    { name: 'Solomillo de Cerdo con Guarnición', description: 'Solomillo de cerdo con guarnición',     price: '€12.00',   allergens: [1] },
    { name: 'Solomillo de Cerdo a la Pimienta o Roquefort', description: 'Solomillo de cerdo con salsa a la pimienta o roquefort', price: '€16.00', allergens: [1, 3, 4, 7, 9, 14] },
    { name: 'Filete de Pollo con Guarnición',    description: 'Filete de pollo con guarnición',        price: '€10.00',   allergens: [1] },
    { name: 'Hamburguesa con Patatas o Ensalada', description: 'Hamburguesa con patatas fritas o ensalada', price: '€8.00', allergens: [1, 3, 6, 7, 11, 12] },
  ],
  huevos: [
    { name: 'Huevos Fritos con Patatas',         description: 'Huevos fritos con patatas',             price: '€8.50',    allergens: [1, 3] },
    { name: 'Tortilla Francesa',                 description: 'Tortilla francesa',                     price: '€8.50',    allergens: [3] },
    { name: 'Tortilla Española',                 description: 'Tortilla española',                     price: '€8.50',    allergens: [1, 3] },
    { name: 'Tortilla de Espárragos',            description: 'Tortilla de espárragos',                price: '€8.50',    allergens: [3] },
    { name: 'Tortilla de Queso',                 description: 'Tortilla de queso',                     price: '€8.50',    allergens: [3, 12] },
    { name: 'Tortilla de Atún',                  description: 'Tortilla de atún',                      price: '€8.50',    allergens: [3, 4] },
  ],
  postres: [
    { name: 'Flan',                              description: 'Flan de huevo con caramelo',            price: '€3.50',    allergens: [3, 7, 8] },
    { name: 'Fruta del Tiempo',                  description: 'Fruta fresca de temporada',             price: 's/m',      allergens: [] },
    { name: 'Helados',                           description: 'Helados variados (+1 bola €2.50)',      price: '€4.50',    allergens: [3, 7, 8, 12] },
    { name: 'Postres Montero',                   description: 'Postres Montero',                       price: '€3.50',    allergens: [3, 7, 8] },
    { name: 'Tartas Caseras',                    description: 'Cheesecake, Tiramisú o Lemon Pie',      price: '€5.50',    highlight: true, allergens: [1, 3, 7] },
  ],
  paella: [
    { name: 'Paella (por encargo)',              description: 'Paella por encargo, mínimo 2 personas. Precio por persona.', price: '€24.00', highlight: true, allergens: [1, 2, 3, 4, 6, 7, 9, 12, 14] },
  ],
  menu_del_dia: [
    { name: 'Menú del Día',                      description: 'Plato del día + Carne o Pescado + Postre o Café + Pan + Vino o Refresco', price: 'Consultar', allergens: [] },
  ],
  vinos: [
    { name: 'Vino Tinto de la Casa',             description: 'Vino tinto de la casa',                price: '€12.00',   allergens: [] },
    { name: 'Ribera de la Casa',                 description: 'Ribera de la casa',                    price: '€14.00',   allergens: [] },
    { name: 'Rioja de la Casa',                  description: 'Rioja de la casa',                     price: '€14.00',   allergens: [] },
    { name: 'Marqués de Cáceres Tinto',          description: 'Marqués de Cáceres (tinto)',           price: '€17.00',   highlight: true, allergens: [] },
    { name: 'Ramón Bilbao',                      description: 'Ramón Bilbao',                         price: '€18.00',   highlight: true, allergens: [] },
    { name: 'Marqués del Riscal',                description: 'Marqués del Riscal',                   price: '€18.00',   allergens: [] },
    { name: 'Protos',                            description: 'Protos',                               price: '€18.00',   allergens: [] },
    { name: 'Vino Rosado de la Casa',            description: 'Vino rosado de la casa',               price: '€12.00',   allergens: [] },
    { name: 'Marqués Cáceres Rosado',            description: 'Marqués Cáceres (rosado)',             price: '€17.00',   allergens: [] },
    { name: 'Lambrusco',                         description: 'Lambrusco',                            price: '€14.00',   allergens: [] },
    { name: 'Vino Blanco de la Casa',            description: 'Vino blanco de la casa',               price: '€12.00',   allergens: [] },
    { name: 'Barbadillo',                        description: 'Barbadillo',                           price: '€12.00',   allergens: [] },
    { name: 'Viñasol',                           description: 'Viñasol',                              price: '€15.00',   allergens: [] },
    { name: 'Albariño',                          description: 'Albariño',                             price: '€18.00',   highlight: true, allergens: [] },
  ],
}

// ─── Restaurant Info ──────────────────────────────────────────────────────────

const restaurantInfo = {
  name: 'Los Granainos',
  description: 'Restaurante familiar de cocina mediterránea tradicional junto a la playa de Cala de Mijas desde 1987.',
  address: 'Paseo Marítimo de la Cala, 29649 Cala de Mijas, Málaga, España',
  phone: '+34 667039082',
  email: 'reservas@losgranainos.es',
  openingHours: {
    monday: '12:00 - 16:00 | 19:00 - 23:30',
    tuesday: '12:00 - 16:00 | 19:00 - 23:30',
    wednesday: '12:00 - 16:00 | 19:00 - 23:30',
    thursday: '12:00 - 16:00 | 19:00 - 23:30',
    friday: '12:00 - 16:00 | 19:00 - 23:30',
    saturday: '12:00 - 16:00 | 19:00 - 23:30',
    sunday: '12:00 - 16:00 | 19:00 - 23:30',
  },
  cuisine: 'Mediterránea, Andaluza, Mariscos',
  priceRange: '€€',
  yearFounded: 1987,
  features: ['Terraza junto al mar', 'Pescado fresco diario', 'Menú del día', 'Reservas disponibles'],
}

// ─── In-memory reservations store ────────────────────────────────────────────

const reservations: Array<{
  id: string
  name: string
  date: string
  time: string
  guests: number
  phone: string
  notes?: string
  createdAt: string
}> = []

// ─── WebMCP Component ─────────────────────────────────────────────────────────

export default function WebMCP() {
  useEffect(() => {
    if (!('modelContext' in window.navigator)) return

    const modelContext = (window.navigator as Navigator & {
      modelContext: {
        provideContext: (ctx: { tools: unknown[] }) => void
      }
    }).modelContext

    modelContext.provideContext({
      tools: [

        // ── 1. GET MENU ──────────────────────────────────────────────────────
        {
          name: 'get_menu',
          description: `Returns the menu of Los Granainos restaurant.
Optionally filter by category and/or exclude dishes that contain specific allergens.

Allergen numbers (EU Regulation 1169/2011):
1=Gluten, 2=Crustáceos, 3=Huevo, 4=Pescado, 5=Cacahuetes, 6=Soja,
7=Lácteos, 8=Frutos de cáscara, 9=Apio, 10=Mostaza, 11=Sésamo,
12=Sulfitos, 13=Altramuces, 14=Moluscos

Use exclude_allergens to hide dishes containing allergens the customer cannot eat.
For example, a customer with gluten intolerance and fish allergy would pass exclude_allergens: [1, 4].`,
          inputSchema: {
            type: 'object',
            properties: {
              category: {
                type: 'string',
                enum: ['entradas', 'pescados', 'carnes', 'huevos', 'postres', 'paella', 'menu_del_dia', 'vinos', 'all'],
                description: 'Menu category to retrieve. Use "all" to get the complete menu.',
              },
              exclude_allergens: {
                type: 'array',
                items: { type: 'number' },
                description: 'List of allergen numbers to exclude (1–14). Dishes containing any of these allergens will be removed from the results.',
              },
            },
            required: [],
          },
          execute: ({ category = 'all', exclude_allergens = [] }: { category?: string; exclude_allergens?: number[] }) => {
            const cat = category.toLowerCase()
            let result: Record<string, unknown>

            if (cat === 'all' || !cat) {
              result = menuData
            } else if (cat in menuData) {
              result = { [cat]: menuData[cat as keyof typeof menuData] }
            } else {
              return {
                content: [{
                  type: 'text',
                  text: `Categoría "${category}" no encontrada. Categorías disponibles: entradas, pescados, carnes, huevos, postres, paella, menu_del_dia, vinos, all`,
                }],
              }
            }

            // Apply allergen exclusion filter
            const excluded: number[] = (exclude_allergens ?? []).map(Number)
            const hasExclusion = excluded.length > 0

            const filteredResult: Record<string, unknown> = {}
            let totalRemoved = 0

            for (const [catName, items] of Object.entries(result)) {
              const allItems = items as typeof menuData.entradas
              const safe = hasExclusion
                ? allItems.filter(item => !item.allergens.some(a => excluded.includes(a)))
                : allItems
              totalRemoved += allItems.length - safe.length
              if (safe.length > 0) {
                filteredResult[catName] = safe
              }
            }

            if (Object.keys(filteredResult).length === 0) {
              const excludedNames = excluded.map(n => allergenNames[n] ?? `alérgeno ${n}`).join(', ')
              return {
                content: [{
                  type: 'text',
                  text: `No hay platos disponibles sin los alérgenos indicados (${excludedNames}). Consulta con nuestro personal para opciones adaptadas.`,
                }],
              }
            }

            const summary = Object.entries(filteredResult)
              .map(([catName, items]) => {
                const itemList = (items as typeof menuData.entradas)
                  .map(i => {
                    const allergenList = i.allergens.length > 0
                      ? ` [alérgenos: ${i.allergens.map(a => `${a}-${allergenNames[a]}`).join(', ')}]`
                      : ' [sin alérgenos declarados]'
                    return `  • ${i.name} — ${i.price}${i.highlight ? ' ⭐' : ''}${allergenList}`
                  })
                  .join('\n')
                const label = catName === 'menu_del_dia' ? 'Menú del Día' : catName.charAt(0).toUpperCase() + catName.slice(1)
                return `## ${label}\n${itemList}`
              })
              .join('\n\n')

            const exclusionNote = hasExclusion
              ? `\n\n⚠️ Filtrado: se han ocultado ${totalRemoved} plato(s) con ${excluded.map(n => allergenNames[n] ?? n).join(', ')}. Consulte siempre con nuestro personal sobre posibles trazas.`
              : ''

            return {
              content: [{
                type: 'text',
                text: `# Carta de Los Granainos\n\n${summary}${exclusionNote}\n\n⭐ = Especialidad de la casa`,
              }],
            }
          },
        },

        // ── 2. SEARCH MEAL ───────────────────────────────────────────────────
        {
          name: 'search_meal',
          description: 'Search for a specific dish or ingredient across the entire menu of Los Granainos.',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'Name of a dish, ingredient, or keyword to search for (e.g. "gambas", "tortilla", "chocolate").',
              },
            },
            required: ['query'],
          },
          execute: ({ query }: { query: string }) => {
            const q = query.toLowerCase()
            const results: Array<{ category: string; item: typeof menuData.entradas[0] }> = []

            for (const [catName, items] of Object.entries(menuData)) {
              for (const item of items) {
                if (
                  item.name.toLowerCase().includes(q) ||
                  item.description.toLowerCase().includes(q)
                ) {
                  results.push({ category: catName, item })
                }
              }
            }

            if (results.length === 0) {
              return {
                content: [{
                  type: 'text',
                  text: `No se encontraron platos que contengan "${query}" en nuestra carta. Prueba con otro término.`,
                }],
              }
            }

            const formatted = results
              .map(({ category, item }) => {
                const allergenList = item.allergens.length > 0
                  ? `\n  Alérgenos: ${item.allergens.map(a => `${a}-${allergenNames[a]}`).join(', ')}`
                  : '\n  Sin alérgenos declarados'
                return `• **${item.name}** (${category}) — ${item.price}${item.highlight ? ' ⭐' : ''}\n  ${item.description}${allergenList}`
              })
              .join('\n\n')

            return {
              content: [{
                type: 'text',
                text: `# Resultados para "${query}"\n\nSe encontraron ${results.length} plato(s):\n\n${formatted}`,
              }],
            }
          },
        },

        // ── 3. GET RESTAURANT INFO ───────────────────────────────────────────
        {
          name: 'get_restaurant_info',
          description: 'Returns general information about Los Granainos restaurant: location, opening hours, contact, cuisine type and features.',
          inputSchema: {
            type: 'object',
            properties: {},
            required: [],
          },
          execute: () => {
            const hours = Object.entries(restaurantInfo.openingHours)
              .map(([day, h]) => `  ${day.charAt(0).toUpperCase() + day.slice(1)}: ${h}`)
              .join('\n')

            return {
              content: [{
                type: 'text',
                text: `# ${restaurantInfo.name}

${restaurantInfo.description}

## 📍 Dirección
${restaurantInfo.address}

## 📞 Contacto
Teléfono: ${restaurantInfo.phone}
Email: ${restaurantInfo.email}

## 🕐 Horario
${hours}

## 🍽️ Cocina
${restaurantInfo.cuisine}

## 💶 Precio medio
${restaurantInfo.priceRange}

## ✨ Características
${restaurantInfo.features.map(f => `• ${f}`).join('\n')}

## 📅 Fundado en
${restaurantInfo.yearFounded}`,
              }],
            }
          },
        },

        // ── 4. BOOK A TABLE ──────────────────────────────────────────────────
        {
          name: 'book_table',
          description: 'Make a table reservation at Los Granainos restaurant.',
          inputSchema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Full name of the person making the reservation.',
              },
              date: {
                type: 'string',
                description: 'Reservation date in YYYY-MM-DD format (e.g. "2025-08-15").',
              },
              time: {
                type: 'string',
                description: 'Reservation time in HH:MM format. Lunch: 12:00-15:30, Dinner: 19:00-23:00.',
              },
              guests: {
                type: 'number',
                description: 'Number of guests (1-20).',
              },
              phone: {
                type: 'string',
                description: 'Contact phone number for the reservation.',
              },
              notes: {
                type: 'string',
                description: 'Optional notes: allergies, special occasions, preferences, etc.',
              },
            },
            required: ['name', 'date', 'time', 'guests', 'phone'],
          },
          execute: ({ name, date, time, guests, phone, notes }: {
            name: string
            date: string
            time: string
            guests: number
            phone: string
            notes?: string
          }) => {
            if (guests < 1 || guests > 20) {
              return {
                content: [{
                  type: 'text',
                  text: 'El número de comensales debe estar entre 1 y 20. Para grupos mayores, contacta directamente con el restaurante.',
                }],
              }
            }

            const dateRegex = /^\d{4}-\d{2}-\d{2}$/
            if (!dateRegex.test(date)) {
              return {
                content: [{
                  type: 'text',
                  text: 'Formato de fecha incorrecto. Usa el formato YYYY-MM-DD (ej: 2025-08-15).',
                }],
              }
            }

            const [hours, minutes] = time.split(':').map(Number)
            const totalMinutes = hours * 60 + minutes
            const isValidTime =
              (totalMinutes >= 12 * 60 && totalMinutes <= 15 * 60 + 30) ||
              (totalMinutes >= 19 * 60 && totalMinutes <= 23 * 60)

            if (!isValidTime) {
              return {
                content: [{
                  type: 'text',
                  text: `Horario no disponible. Nuestros turnos son:\n• Comida: 12:00 - 15:30\n• Cena: 19:00 - 23:00\n\nPor favor elige una hora dentro de estos turnos.`,
                }],
              }
            }

            const id = `RES-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`
            reservations.push({ id, name, date, time, guests, phone, notes, createdAt: new Date().toISOString() })

            return {
              content: [{
                type: 'text',
                text: `# ✅ Reserva Confirmada

**Número de reserva:** ${id}

| Campo | Detalle |
|-------|---------|
| Nombre | ${name} |
| Fecha | ${date} |
| Hora | ${time} |
| Comensales | ${guests} persona${guests > 1 ? 's' : ''} |
| Teléfono | ${phone} |
${notes ? `| Notas | ${notes} |` : ''}

Te esperamos en **${restaurantInfo.address}**.

⚠️ Si necesitas cancelar o modificar la reserva, llama al ${restaurantInfo.phone} con al menos 2 horas de antelación.`,
              }],
            }
          },
        },

      ],
    })
  }, [])

  return null
}
