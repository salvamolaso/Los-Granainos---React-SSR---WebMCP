"use client";

import { useEffect } from "react";
import type { RestaurantInfo, MenuItem } from "@/lib/types";
import { ALLERGENS, filterMenuItems, getNumericAllergens } from "@/lib/menu-utils";

interface WebMCPProps {
  restaurant: RestaurantInfo;
  allItems: MenuItem[];
}

const reservations: Array<{
  id: string;
  name: string;
  date: string;
  time: string;
  guests: number;
  phone: string;
  notes?: string;
  createdAt: string;
}> = [];

export default function WebMCP({ restaurant, allItems }: WebMCPProps) {
  useEffect(() => {
    if (!("modelContext" in window.navigator)) return;

    const modelContext = (
      window.navigator as Navigator & {
        modelContext: {
          provideContext: (ctx: { tools: unknown[] }) => void;
        };
      }
    ).modelContext;

    // Build category list from menu data
    const categoryNames = [...new Set(allItems.map((i) => i.category))];

    modelContext.provideContext({
      tools: [
        // ── 1. GET MENU ──────────────────────────────────────────────
        {
          name: "get_menu",
          description: `Returns the menu of ${restaurant.name} restaurant.
Optionally filter by category and/or exclude dishes that contain specific allergens.

Allergen numbers (EU Regulation 1169/2011):
1=Gluten, 2=Crustáceos, 3=Huevo, 4=Pescado, 5=Cacahuetes, 6=Soja,
7=Lácteos, 8=Frutos de cáscara, 9=Apio, 10=Mostaza, 11=Sésamo,
12=Sulfitos, 13=Altramuces, 14=Moluscos

Available categories: ${categoryNames.join(", ")}, all

Use exclude_allergens to hide dishes containing allergens the customer cannot eat.`,
          inputSchema: {
            type: "object",
            properties: {
              category: {
                type: "string",
                description: 'Menu category to retrieve. Use "all" to get the complete menu.',
              },
              exclude_allergens: {
                type: "array",
                items: { type: "number" },
                description: "List of allergen numbers to exclude (1-14).",
              },
            },
            required: [],
          },
          execute: ({
            category = "all",
            exclude_allergens = [],
          }: {
            category?: string;
            exclude_allergens?: number[];
          }) => {
            const excluded: number[] = (exclude_allergens ?? []).map(Number);

            window.dispatchEvent(
              new CustomEvent("granainos:set-allergens", { detail: { allergens: excluded } }),
            );

            const cat = category.toLowerCase();
            const sourceItems =
              cat === "all"
                ? allItems
                : allItems.filter((item) => item.category.toLowerCase().includes(cat));

            if (cat !== "all" && sourceItems.length === 0) {
              return {
                content: [
                  {
                    type: "text",
                    text: `Categoría "${category}" no encontrada. Categorías disponibles: ${categoryNames.join(", ")}, all`,
                  },
                ],
              };
            }

            const safe = filterMenuItems(sourceItems, { excludeAllergens: excluded });
            const totalRemoved = sourceItems.length - safe.length;

            if (safe.length === 0) {
              const excludedNames = excluded
                .map((n) => ALLERGENS[n]?.es ?? `alérgeno ${n}`)
                .join(", ");
              return {
                content: [
                  {
                    type: "text",
                    text: `No hay platos disponibles sin los alérgenos indicados (${excludedNames}). Consulta con nuestro personal para opciones adaptadas.`,
                  },
                ],
              };
            }

            // Group by category
            const grouped: [string, MenuItem[]][] = [];
            for (const item of safe) {
              const existing = grouped.find(([c]) => c === item.category);
              if (existing) existing[1].push(item);
              else grouped.push([item.category, [item]]);
            }

            const summary = grouped
              .map(([catName, items]) => {
                const itemList = items
                  .map((i) => {
                    const nums = getNumericAllergens(i);
                    const allergenList =
                      nums.length > 0
                        ? ` [alérgenos: ${nums.map((a) => `${a}-${ALLERGENS[a]?.es}`).join(", ")}]`
                        : " [sin alérgenos declarados]";
                    return `  • ${i.name} — €${i.price.toFixed(2)}${i.highlight ? " ⭐" : ""}${allergenList}`;
                  })
                  .join("\n");
                return `## ${catName}\n${itemList}`;
              })
              .join("\n\n");

            const exclusionNote =
              excluded.length > 0
                ? `\n\n⚠️ Filtrado: se han ocultado ${totalRemoved} plato(s) con ${excluded.map((n) => ALLERGENS[n]?.es ?? n).join(", ")}. Consulte siempre con nuestro personal sobre posibles trazas.`
                : "";

            return {
              content: [
                {
                  type: "text",
                  text: `# Carta de ${restaurant.name}\n\n${summary}${exclusionNote}\n\n⭐ = Especialidad de la casa`,
                },
              ],
            };
          },
        },

        // ── 2. SEARCH MEAL ──────────────────────────────────────────
        {
          name: "search_meal",
          description: `Search for a specific dish or ingredient across the entire menu of ${restaurant.name}.`,
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Name of a dish, ingredient, or keyword to search for.",
              },
            },
            required: ["query"],
          },
          execute: ({ query }: { query: string }) => {
            const results = filterMenuItems(allItems, { search: query });

            if (results.length === 0) {
              return {
                content: [
                  {
                    type: "text",
                    text: `No se encontraron platos que contengan "${query}" en nuestra carta. Prueba con otro término.`,
                  },
                ],
              };
            }

            const formatted = results
              .map((item) => {
                const nums = getNumericAllergens(item);
                const allergenList =
                  nums.length > 0
                    ? `\n  Alérgenos: ${nums.map((a) => `${a}-${ALLERGENS[a]?.es}`).join(", ")}`
                    : "\n  Sin alérgenos declarados";
                return `• **${item.name}** (${item.category}) — €${item.price.toFixed(2)}${item.highlight ? " ⭐" : ""}\n  ${item.description ?? ""}${allergenList}`;
              })
              .join("\n\n");

            return {
              content: [
                {
                  type: "text",
                  text: `# Resultados para "${query}"\n\nSe encontraron ${results.length} plato(s):\n\n${formatted}`,
                },
              ],
            };
          },
        },

        // ── 3. GET RESTAURANT INFO ──────────────────────────────────
        {
          name: "get_restaurant_info",
          description: `Returns general information about ${restaurant.name}: location, opening hours, contact, cuisine type and features.`,
          inputSchema: {
            type: "object",
            properties: {},
            required: [],
          },
          execute: () => {
            const hours = restaurant.openingHours
              .map(
                (h) =>
                  `  ${h.dayOfWeek.join(", ")}: ${h.opens} - ${h.closes}`,
              )
              .join("\n");

            const features = [];
            if (restaurant.features.hasTerraza) features.push("Terraza");
            if (restaurant.features.hasParking) features.push("Parking");
            if (restaurant.features.isAccessible) features.push("Accesible");
            if (restaurant.features.acceptsReservations) features.push("Reservas disponibles");
            if (restaurant.features.acceptsGroups) features.push("Grupos bienvenidos");
            if (restaurant.features.hasPrivateRoom) features.push("Salón privado");

            return {
              content: [
                {
                  type: "text",
                  text: `# ${restaurant.name}

${restaurant.description}

## 📍 Dirección
${restaurant.address.streetAddress}, ${restaurant.address.postalCode} ${restaurant.address.locality}, ${restaurant.address.region}, España

## 📞 Contacto
Teléfono: ${restaurant.contact.phone}
Email: ${restaurant.contact.email}
WhatsApp: ${restaurant.contact.whatsapp}

## 🕐 Horario
${hours}

## 🍽️ Cocina
${restaurant.cuisine.join(", ")}

## 💶 Precio medio
${restaurant.priceRange}

## ✨ Características
${features.map((f) => `• ${f}`).join("\n")}${restaurant.foundedYear ? `\n\n## 📅 Fundado en\n${restaurant.foundedYear}` : ""}`,
                },
              ],
            };
          },
        },

        // ── 4. BOOK A TABLE ─────────────────────────────────────────
        {
          name: "book_table",
          description: `Make a table reservation at ${restaurant.name} restaurant.`,
          inputSchema: {
            type: "object",
            properties: {
              name: { type: "string", description: "Full name of the person making the reservation." },
              date: { type: "string", description: 'Reservation date in YYYY-MM-DD format.' },
              time: { type: "string", description: "Reservation time in HH:MM format." },
              guests: { type: "number", description: "Number of guests (1-20)." },
              phone: { type: "string", description: "Contact phone number." },
              notes: { type: "string", description: "Optional notes: allergies, special occasions, etc." },
            },
            required: ["name", "date", "time", "guests", "phone"],
          },
          execute: ({
            name,
            date,
            time,
            guests,
            phone,
            notes,
          }: {
            name: string;
            date: string;
            time: string;
            guests: number;
            phone: string;
            notes?: string;
          }) => {
            if (guests < 1 || guests > 20) {
              return {
                content: [
                  {
                    type: "text",
                    text: "El número de comensales debe estar entre 1 y 20. Para grupos mayores, contacta directamente con el restaurante.",
                  },
                ],
              };
            }

            if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
              return {
                content: [
                  {
                    type: "text",
                    text: "Formato de fecha incorrecto. Usa el formato YYYY-MM-DD (ej: 2025-08-15).",
                  },
                ],
              };
            }

            const id = `RES-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
            reservations.push({ id, name, date, time, guests, phone, notes, createdAt: new Date().toISOString() });

            const address = `${restaurant.address.streetAddress}, ${restaurant.address.postalCode} ${restaurant.address.locality}`;

            return {
              content: [
                {
                  type: "text",
                  text: `# ✅ Reserva Confirmada

**Número de reserva:** ${id}

| Campo | Detalle |
|-------|---------|
| Nombre | ${name} |
| Fecha | ${date} |
| Hora | ${time} |
| Comensales | ${guests} persona${guests > 1 ? "s" : ""} |
| Teléfono | ${phone} |
${notes ? `| Notas | ${notes} |` : ""}

Te esperamos en **${address}**.

⚠️ Si necesitas cancelar o modificar la reserva, llama al ${restaurant.contact.phone} con al menos 2 horas de antelación.`,
                },
              ],
            };
          },
        },
      ],
    });
  }, [restaurant, allItems]);

  return null;
}
