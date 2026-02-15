export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Los Granainos",
    "description": "Restaurante familiar junto a la playa en Cala de Mijas, Costa del Sol, Málaga. Cocina mediterránea auténtica desde 1987.",
    "image": "https://losgranainos.com/og-image.jpg",
    "servesCuisine": "Mediterranean",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Paseo Marítimo de la Cala",
      "addressLocality": "Cala de Mijas",
      "postalCode": "29649",
      "addressRegion": "Málaga",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "36.5167",
      "longitude": "-4.6333"
    },
    "telephone": "+34952XXXXXX",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "12:00",
        "closes": "16:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "19:00",
        "closes": "23:30"
      }
    ],
    "menu": "https://losgranainos.com/#menu",
    "acceptsReservations": "True"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
