'use client'

import { useEffect } from 'react'
import { ALLERGENS, ALL_MENU_ITEMS, filterMenuItems, groupByCategory } from '@/lib/menu'

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
            const excluded: number[] = (exclude_allergens ?? []).map(Number)

            // Sync allergen filter to the web page UI
            window.dispatchEvent(new CustomEvent('granainos:set-allergens', { detail: { allergens: excluded } }))

            // Map category slug (menu_del_dia) to category label ('Menú del día')
            const categoryMap: Record<string, string> = {
              entradas:     'Entradas',
              pescados:     'Pescados',
              carnes:       'Carnes',
              huevos:       'Huevos',
              postres:      'Postres',
              paella:       'Paella',
              menu_del_dia: 'Menú del día',
              vinos:        'Vinos',
            }

            const cat = category.toLowerCase()
            const categoryLabel = categoryMap[cat]

            if (cat !== 'all' && !categoryLabel) {
              return {
                content: [{
                  type: 'text',
                  text: `Categoría "${category}" no encontrada. Categorías disponibles: entradas, pescados, carnes, huevos, postres, paella, menu_del_dia, vinos, all`,
                }],
              }
            }

            // Reuse the same filterMenuItems function as the web page
            const sourceItems = categoryLabel
              ? ALL_MENU_ITEMS.filter((item) => item.category === categoryLabel)
              : ALL_MENU_ITEMS

            const safe = filterMenuItems(sourceItems, { excludeAllergens: excluded })
            const totalRemoved = sourceItems.length - safe.length

            if (safe.length === 0) {
              const excludedNames = excluded.map((n) => ALLERGENS[n]?.es ?? `alérgeno ${n}`).join(', ')
              return {
                content: [{
                  type: 'text',
                  text: `No hay platos disponibles sin los alérgenos indicados (${excludedNames}). Consulta con nuestro personal para opciones adaptadas.`,
                }],
              }
            }

            // Group and format results respecting CATEGORY_ORDER
            const grouped = groupByCategory(safe)

            const summary = grouped
              .map(([catName, items]) => {
                const itemList = items
                  .map((i) => {
                    const allergenList = i.allergens.length > 0
                      ? ` [alérgenos: ${i.allergens.map((a) => `${a}-${ALLERGENS[a]?.es}`).join(', ')}]`
                      : ' [sin alérgenos declarados]'
                    return `  • ${i.name} — ${i.price}${i.highlight ? ' ⭐' : ''}${allergenList}`
                  })
                  .join('\n')
                return `## ${catName}\n${itemList}`
              })
              .join('\n\n')

            const exclusionNote = excluded.length > 0
              ? `\n\n⚠️ Filtrado: se han ocultado ${totalRemoved} plato(s) con ${excluded.map((n) => ALLERGENS[n]?.es ?? n).join(', ')}. Consulte siempre con nuestro personal sobre posibles trazas.`
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
            const results = filterMenuItems(ALL_MENU_ITEMS, { search: query })

            if (results.length === 0) {
              return {
                content: [{
                  type: 'text',
                  text: `No se encontraron platos que contengan "${query}" en nuestra carta. Prueba con otro término.`,
                }],
              }
            }

            const formatted = results
              .map((item) => {
                const allergenList = item.allergens.length > 0
                  ? `\n  Alérgenos: ${item.allergens.map((a) => `${a}-${ALLERGENS[a]?.es}`).join(', ')}`
                  : '\n  Sin alérgenos declarados'
                return `• **${item.name}** (${item.category}) — ${item.price}${item.highlight ? ' ⭐' : ''}\n  ${item.description ?? ''}${allergenList}`
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
