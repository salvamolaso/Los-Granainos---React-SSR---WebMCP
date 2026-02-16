'use client'

import { useEffect } from 'react'

// ─── Menu Data ────────────────────────────────────────────────────────────────

const menuData = {
  entrantes: [
    { name: 'Gazpacho Andaluz', description: 'Sopa fría de tomate, pepino y pimiento. Refrescante y tradicional', price: '€6.50', highlight: true },
    { name: 'Ensalada Malagueña', description: 'Tomate, pepino, cebolla, aceitunas, bacalao y naranja', price: '€8.50' },
    { name: 'Aceitunas Aliñadas', description: 'Aceitunas de la tierra con ajo, tomillo y orégano', price: '€4.00' },
    { name: 'Jamón Ibérico de Bellota', description: 'Lonchas de jamón ibérico de bellota 100% pata negra', price: '€18.00', highlight: true },
    { name: 'Pimientos de Padrón', description: 'Pimientos de Padrón fritos con sal gorda', price: '€7.00' },
    { name: 'Croquetas de la Abuela', description: 'Croquetas caseras de jamón, bacalao o espinacas (6 unidades)', price: '€9.00' },
    { name: 'Boquerones en Vinagre', description: 'Boquerones frescos marinados en vinagre con ajo y perejil', price: '€7.50' },
    { name: 'Pan con Tomate y Aceite', description: 'Pan rústico con tomate rallado y aceite de oliva virgen extra', price: '€3.50' },
    { name: 'Tabla de Quesos Andaluces', description: 'Selección de quesos artesanales de Málaga y Cádiz', price: '€12.00' },
    { name: 'Pulpo a la Gallega', description: 'Pulpo cocido con cachelos, pimentón dulce y aceite de oliva', price: '€16.00' },
  ],
  pescaitos: [
    { name: 'Fritura Malagueña', description: 'Surtido de pescaíto frito: boquerones, jureles, calamares y gambas', price: '€18.00', highlight: true },
    { name: 'Boquerones Fritos', description: 'Boquerones frescos rebozados y fritos, crujientes y jugosos', price: '€12.00' },
    { name: 'Calamares a la Romana', description: 'Anillas de calamar rebozadas en su punto perfecto', price: '€14.00' },
    { name: 'Espeto de Sardinas', description: 'Sardinas asadas a la leña en espeto, tradición malagueña', price: '€10.00', highlight: true },
    { name: 'Jureles Fritos', description: 'Jureles del Mediterráneo fritos en aceite de oliva virgen extra', price: '€13.00' },
    { name: 'Gambas Blancas de la Costa', description: 'Gambas blancas de Málaga, a la plancha o cocidas', price: '€22.00', highlight: true },
    { name: 'Chopitos Fritos', description: 'Chipirones baby rebozados y fritos, tiernos y sabrosos', price: '€15.00' },
    { name: 'Pescado del Día a la Plancha', description: 'Pregunta por nuestra captura del día (precio según mercado)', price: '€18.00' },
    { name: 'Puntillitas Fritas', description: 'Puntillitas baby fritas al estilo malagueño', price: '€14.00' },
    { name: 'Acedías Fritas', description: 'Pequeños lenguados fritos enteros, delicados y sabrosos', price: '€16.00' },
  ],
  carne: [
    { name: 'Solomillo de Ternera', description: 'Solomillo de ternera a la plancha con guarnición de patatas', price: '€22.00', highlight: true },
    { name: 'Entrecot de Buey', description: 'Entrecot de buey madurado 500g, jugoso y tierno', price: '€26.00' },
    { name: 'Secreto Ibérico', description: 'Secreto de cerdo ibérico a la plancha con pimientos', price: '€16.00', highlight: true },
    { name: 'Pluma Ibérica', description: 'Pluma de cerdo ibérico con salsa de vino Pedro Ximénez', price: '€18.00' },
    { name: 'Pollo al Ajillo', description: 'Pollo de corral salteado con ajo, vino blanco y perejil', price: '€14.00' },
    { name: 'Rabo de Toro', description: 'Rabo de toro estofado al estilo tradicional andaluz', price: '€19.00', highlight: true },
    { name: 'Carrillada de Cerdo', description: 'Carrilleras de cerdo guisadas en salsa de vino tinto', price: '€17.00' },
    { name: 'Costillas de Cordero', description: 'Costillas de cordero lechal asadas al horno', price: '€20.00' },
  ],
  postres: [
    { name: 'Tarta de Queso Casera', description: 'Tarta de queso cremosa al estilo tradicional', price: '€6.00' },
    { name: 'Coulant de Chocolate', description: 'Bizcocho de chocolate con corazón fundido, helado de vainilla', price: '€7.00', highlight: true },
    { name: 'Flan de Huevo de la Abuela', description: 'Flan casero con caramelo líquido, receta familiar', price: '€5.50' },
    { name: 'Helados Artesanales', description: 'Selección de helados artesanos (vainilla, chocolate, fresa, limón)', price: '€5.00' },
    { name: 'Torrijas Caseras', description: 'Torrijas con miel y canela (temporada)', price: '€6.50' },
    { name: 'Tarta de Santiago', description: 'Tarta de almendra tradicional gallega con azúcar glasé', price: '€6.50' },
    { name: 'Crema Catalana', description: 'Crema catalana gratinada con azúcar caramelizado', price: '€6.00' },
    { name: 'Brownie con Helado', description: 'Brownie de chocolate caliente con helado de vainilla', price: '€7.50', highlight: true },
    { name: 'Macedonia de Frutas', description: 'Frutas frescas de temporada con helado', price: '€5.50' },
    { name: 'Café y Postre', description: 'Café expreso con petit four de la casa', price: '€4.00' },
  ],
  bebidas: [
    { name: 'Vino Blanco de la Casa', description: 'Vino blanco afrutado de Málaga, perfecto con pescado', price: '€3.50' },
    { name: 'Vino Tinto Rioja Crianza', description: 'Crianza con 12 meses en barrica de roble americano', price: '€18.00', highlight: true },
    { name: 'Cerveza Cruzcampo de Barril', description: 'Cerveza malagueña bien fría, caña o jarra', price: '€2.50' },
    { name: 'Tinto de Verano', description: 'Refresco de vino tinto con limón, ideal para el calor', price: '€3.00' },
    { name: 'Agua Mineral', description: 'Agua mineral natural con o sin gas', price: '€2.00' },
    { name: 'Refrescos Variados', description: 'Coca-Cola, Fanta, Sprite, Aquarius', price: '€2.50' },
    { name: 'Café Expreso', description: 'Café expreso italiano, solo o cortado', price: '€1.80' },
    { name: 'Vino Dulce de Málaga', description: 'Vino dulce tradicional malagueño, ideal con postre', price: '€4.00', highlight: true },
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
