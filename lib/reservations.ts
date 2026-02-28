import type { ReservationRequest, RestaurantInfo } from "@/lib/types";

export function buildWhatsAppReservationUrl(
  req: ReservationRequest,
  info: RestaurantInfo
): string {
  const spaceLabel =
    req.space === "terraza"
      ? "en la terraza"
      : req.space === "salon"
      ? "en el salón"
      : "sin preferencia de espacio";

  const lines = [
    `Hola! Me gustaría reservar mesa en ${info.name}.`,
    `Nombre: ${req.name}`,
    `Fecha: ${req.date} a las ${req.time}`,
    `Personas: ${req.guests}`,
    `Espacio: ${spaceLabel}`,
    req.specialRequests ? `Notas: ${req.specialRequests}` : "",
    `Teléfono de contacto: ${req.phone}`,
  ].filter(Boolean);

  const message = lines.join("\n");
  const phone = (info.contact.whatsapp ?? info.contact.phone).replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function isRestaurantOpen(
  info: RestaurantInfo,
  date: Date = new Date()
): boolean {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = dayNames[date.getDay()];
  return info.openingHours.some((h) => h.dayOfWeek.includes(dayName));
}
