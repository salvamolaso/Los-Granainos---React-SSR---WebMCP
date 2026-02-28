import type { RestaurantInfo } from "@/lib/types";

export function buildRestaurantSchema(info: RestaurantInfo) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: info.name,
    legalName: info.legalName,
    description: info.description,
    foundingDate: info.foundedYear?.toString(),
    url: info.contact.website,
    telephone: info.contact.phone,
    email: info.contact.email,
    image: `${info.contact.website}${info.images.hero}`,
    priceRange: info.priceRange,
    servesCuisine: info.cuisine,
    address: {
      "@type": "PostalAddress",
      streetAddress: info.address.streetAddress,
      addressLocality: info.address.locality,
      addressRegion: info.address.region,
      postalCode: info.address.postalCode,
      addressCountry: info.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: info.geo.latitude,
      longitude: info.geo.longitude,
    },
    openingHoursSpecification: info.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek.map((d) => `https://schema.org/${d}`),
      opens: h.opens,
      closes: h.closes,
    })),
    hasMap: `https://maps.google.com/?q=${info.geo.latitude},${info.geo.longitude}`,
    acceptsReservations: info.features.acceptsReservations ? "True" : "False",
    amenityFeature: [
      info.features.hasTerraza && {
        "@type": "LocationFeatureSpecification",
        name: "Terraza",
        value: true,
      },
      info.features.isAccessible && {
        "@type": "LocationFeatureSpecification",
        name: "Accesible para sillas de ruedas",
        value: true,
      },
      info.features.hasParking && {
        "@type": "LocationFeatureSpecification",
        name: "Parking",
        value: true,
      },
    ].filter(Boolean),
  };
}
