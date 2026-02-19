'use client'

import { useEffect } from 'react'

// ─── Menu Data ────────────────────────────────────────────────────────────────

const menuData = {
  entrantes: [
    { name: 'Ensalada Especial', description: 'Ensalada especial de la casa', price: '€7.50' },
    { name: 'Tomate, Aguacate, Huevo y Atún', description: 'Tomate, aguacate, huevo y atún', price: '€8.50', highlight: true },
    { name: 'Tomate solo', description: 'Tomate en lonchas', price: '€5.50' },
    { name: 'Boquerones en Vinagre', description: 'Boquerones marinados en vinagre', price: '€12.00' },
    { name: 'Gambas al Pil-Pil', description: 'Gambas al pil-pil', price: '€12.00', highlight: true },
    { name: 'Gambas a la Plancha o Cocidas', description: 'Gambas a la plancha o cocidas', price: '€18.00', highlight: true },
    { name: 'Mejillones al Vapor', description: 'Mejillones al vapor', price: '€12.00' },
    { name: 'Coquinas en Salsa', description: 'Coquinas en salsa', price: '€15.00' },
    { name: 'Almejas', description: 'Almejas', price: '€12.00' },
    { name: 'Queso Manchego', description: 'Queso manchego', price: '€8.00' },
    { name: 'Jamón Serrano', description: 'Jamón serrano', price: '€8.00' },
  ],
  pescaitos: [
    { name: 'Fritura Variada', description: 'Fritura variada de pescado (por persona)', price: '€10.00', highlight: true },
    { name: 'Dorada Plancha', description: 'Dorada a la plancha', price: '€20.00', highlight: true },
    { name: 'Boquerones Fritos Vitorianos', description: 'Boquerones fritos vitorianos', price: '€12.00' },
    { name: 'Boquerones en Vinagre Fritos', description: 'Boquerones en vinagre fritos', price: '€15.00' },
    { name: 'Boquerones al Limón', description: 'Boquerones al limón', price: '€14.00' },
    { name: 'Calamares Fritos', description: 'Calamares fritos', price: '€12.00' },
    { name: 'Calamares a la Plancha', description: 'Calamares a la plancha', price: '€14.00' },
    { name: 'Jibia Frita', description: 'Jibia frita', price: '€12.00' },
    { name: 'Jibia Plancha', description: 'Jibia a la plancha', price: '€14.00' },
    { name: 'Rosada Frita', description: 'Rosada frita', price: '€12.00' },
    { name: 'Rosada Plancha', description: 'Rosada a la plancha', price: '€15.00' },
    { name: 'Pez Espada a la Plancha', description: 'Pez espada a la plancha', price: '€18.00' },
    { name: 'Jureles Fritos', description: 'Jureles fritos', price: '€10.00' },
    { name: 'Bacalao Frito', description: 'Bacalao frito', price: '€12.00' },
    { name: 'Pescadilla Frita', description: 'Pescadilla frita', price: '€14.00' },
    { name: 'Salmonetes', description: 'Salmonetes', price: '€14.00' },
    { name: 'Sardinas', description: 'Sardinas', price: '€7.00', highlight: true },
    { name: 'Sardinas Fritas', description: 'Sardinas fritas', price: '€7.00' },
    { name: 'Puntillitas', description: 'Puntillitas baby squid', price: '€15.00' },
    { name: 'Atún', description: 'Atún', price: '€20.00', highlight: true },
  ],
  carne: [
    { name: 'Filete de Cerdo', description: 'Filete de cerdo', price: '€10.00' },
    { name: 'Filete de Cerdo Empanado', description: 'Filete de cerdo empanado', price: '€12.00' },
    { name: 'Entrecot con Guarnición', description: 'Entrecot con guarnición', price: '€19.00', highlight: true },
    { name: 'Entrecot a la Pimienta o Roquefort', description: 'Entrecot con salsa a la pimienta o roquefort', price: '€19.00', highlight: true },
    { name: 'Filete de Pollo Empanado', description: 'Filete de pollo empanado', price: '€12.00' },
    { name: 'Solomillo de Cerdo con Guarnición', description: 'Solomillo de cerdo con guarnición', price: '€12.00' },
    { name: 'Solomillo de Cerdo a la Pimienta o Roquefort', description: 'Solomillo de cerdo con salsa a la pimienta o roquefort', price: '€16.00' },
    { name: 'Filete de Pollo con Guarnición', description: 'Filete de pollo con guarnición', price: '€10.00' },
    { name: 'Hamburguesa con Patatas o Ensalada', description: 'Hamburguesa con patatas fritas o ensalada', price: '€8.00' },
  ],
  postres: [
    { name: 'Flan', description: 'Flan de huevo con caramelo', price: '€3.50' },
    { name: 'Fruta del Tiempo', description: 'Fruta fresca de temporada', price: 's/m' },
    { name: 'Helados', description: 'Helados variados', price: '€4.50' },
    { name: 'Postres Montero', description: 'Postres Montero', price: '€3.50' },
    { name: 'Tartas Caseras', description: 'Cheesecake, Tiramisú, Lemon Pie', price: '€5.50', highlight: true },
  ],
  bebidas: [
    { name: 'Vino Tinto de la Casa', description: 'Vino tinto de la casa', price: '€12.00' },
    { name: 'Ribera de la Casa', description: 'Ribera de la casa', price: '€14.00' },
    { name: 'Rioja de la Casa', description: 'Rioja de la casa', price: '€14.00' },
    { name: 'Marqués de Cáceres Tinto', description: 'Marqués de Cáceres (tinto)', price: '€17.00', highlight: true },
    { name: 'Ramón Bilbao', description: 'Ramón Bilbao', price: '€18.00', highlight: true },
    { name: 'Marqués del Riscal', description: 'Marqués del Riscal', price: '€18.00' },
    { name: 'Protos', description: 'Protos', price: '€18.00' },
    { name: 'Vino Rosado de la Casa', description: 'Vino rosado de la casa', price: '€12.00' },
    { name: 'Marqués Cáceres Rosado', description: 'Marqués Cáceres (rosado)', price: '€17.00' },
    { name: 'Lambrusco', description: 'Lambrusco', price: '€14.00' },
    { name: 'Vino Blanco de la Casa', description: 'Vino blanco de la casa', price: '€12.00' },
    { name: 'Barbadillo', description: 'Barbadillo', price: '€12.00' },
    { name: 'Viñasol', description: 'Viñasol', price: '€15.00' },
    { name: 'Albariño', description: 'Albariño', price: '€18.00', highlight: true },
  ],
}

// ─── Restaurant Info ──────────────────────────────────────────────────────────

const restaurantInfo = {
  name: 'Los Granainos',
  description: 'Restaurante familiar de cocina mediterránea tradicional junto a la playa de Cala de Mijas desde 1987.',
  address: 'Paseo Marítimo de la Cala, 29649 Cala de Mijas, Málaga, España',
  phone: '+34 952 XXX XXX',
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
          description: 'Returns the full menu of Los Granainos restaurant, optionally filtered by category.',
          inputSchema: {
            type: 'object',
            properties: {
              category: {
                type: 'string',
                enum: ['entrantes', 'pescaitos', 'carne', 'postres', 'bebidas', 'all'],
                description: 'Menu category to retrieve. Use "all" to get the complete menu.',
              },
            },
            required: [],
          },
          execute: ({ category = 'all' }: { category?: string }) => {
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
                  text: `Categoría "${category}" no encontrada. Categorías disponibles: entrantes, pescaitos, carne, postres, bebidas, all`,
                }],
              }
            }

            const summary = Object.entries(result)
              .map(([catName, items]) => {
                const itemList = (items as typeof menuData.entrantes)
                  .map(i => `  • ${i.name} — ${i.price}${i.highlight ? ' ⭐' : ''}`)
                  .join('\n')
                return `## ${catName.charAt(0).toUpperCase() + catName.slice(1)}\n${itemList}`
              })
              .join('\n\n')

            return {
              content: [{
                type: 'text',
                text: `# Carta de Los Granainos\n\n${summary}\n\n⭐ = Especialidad de la casa`,
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
                description: 'Name of a dish, ingredient, or keyword to search for (e.g. "gambas", "ibérico", "chocolate").',
              },
            },
            required: ['query'],
          },
          execute: ({ query }: { query: string }) => {
            const q = query.toLowerCase()
            const results: Array<{ category: string; item: typeof menuData.entrantes[0] }> = []

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
              .map(({ category, item }) =>
                `• **${item.name}** (${category}) — ${item.price}\n  ${item.description}${item.highlight ? ' ⭐' : ''}`)
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
              .map(([day, hours]) => `  ${day.charAt(0).toUpperCase() + day.slice(1)}: ${hours}`)
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
            // Validate guests
            if (guests < 1 || guests > 20) {
              return {
                content: [{
                  type: 'text',
                  text: 'El número de comensales debe estar entre 1 y 20. Para grupos mayores, contacta directamente con el restaurante.',
                }],
              }
            }

            // Validate date format
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/
            if (!dateRegex.test(date)) {
              return {
                content: [{
                  type: 'text',
                  text: 'Formato de fecha incorrecto. Usa el formato YYYY-MM-DD (ej: 2025-08-15).',
                }],
              }
            }

            // Validate time is within opening hours
            const [hours, minutes] = time.split(':').map(Number)
            const totalMinutes = hours * 60 + minutes
            const lunchStart = 12 * 60
            const lunchEnd = 15 * 60 + 30
            const dinnerStart = 19 * 60
            const dinnerEnd = 23 * 60

            const isValidTime =
              (totalMinutes >= lunchStart && totalMinutes <= lunchEnd) ||
              (totalMinutes >= dinnerStart && totalMinutes <= dinnerEnd)

            if (!isValidTime) {
              return {
                content: [{
                  type: 'text',
                  text: `Horario no disponible. Nuestros turnos son:\n• Comida: 12:00 - 15:30\n• Cena: 19:00 - 23:00\n\nPor favor elige una hora dentro de estos turnos.`,
                }],
              }
            }

            // Create reservation
            const id = `RES-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`
            const reservation = {
              id,
              name,
              date,
              time,
              guests,
              phone,
              notes,
              createdAt: new Date().toISOString(),
            }
            reservations.push(reservation)

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
