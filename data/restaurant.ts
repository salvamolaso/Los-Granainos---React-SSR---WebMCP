import type { RestaurantInfo } from "@/lib/types";

export const restaurantInfo: RestaurantInfo = {
  id: "los-granainos",
  name: "Los Granainos",
  legalName: "Restaurante Los Granainos",
  description:
    "Restaurante familiar con más de 37 años de historia en la Cala de Mijas. Cocina mediterránea auténtica, producto local y vistas al mar.",
  shortDescription: "Cocina mediterránea en Cala de Mijas desde 1987.",
  foundedYear: 1987,
  cuisine: ["Mediterranean", "Spanish", "Seafood"],
  priceRange: "€€",
  address: {
    streetAddress: "Paseo Marítimo de la Cala, 12",
    locality: "Cala de Mijas",
    region: "Málaga",
    postalCode: "29649",
    country: "ES",
  },
  geo: {
    latitude: 36.5021,
    longitude: -4.6414,
  },
  contact: {
    phone: "+34 667 039 082",
    email: "reservas@losgranainos.es",
    whatsapp: "+34667039082",
    website: "https://los-granainos.agentikas.ai",
  },
  openingHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "12:00",
      closes: "16:00",
    },
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "19:00",
      closes: "23:30",
    },
  ],
  features: {
    hasTerraza: true,
    hasParking: false,
    isAccessible: true,
    acceptsReservations: true,
    acceptsGroups: true,
    hasPrivateRoom: false,
  },
  social: {
    instagram: "https://instagram.com/losgranainos",
  },
  images: {
    hero: "/restaurante.jpg",
    logo: "/logo.jpeg",
  },
  heroHeadline: "Los Granainos",
  heroSubheadline: "Sabores auténticos junto al mar en la Cala de Mijas",
  webTemplate: "marea",
};
