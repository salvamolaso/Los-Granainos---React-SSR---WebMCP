export const runtime = "edge";

import type { Metadata } from "next";
import "./globals.css";
import { getRestaurant, getMenu } from "@/lib/get-restaurant";
import { buildRestaurantSchema } from "@/lib/schema";
import { getTheme, buildThemeCSS } from "@/lib/themes";
import WebMCP from "@/components/WebMCP";

export async function generateMetadata(): Promise<Metadata> {
  const info = await getRestaurant();
  if (!info) {
    return { title: "Restaurante · Agentikas" };
  }
  return {
    title: {
      default: `${info.name} — ${info.shortDescription}`,
      template: `%s | ${info.name}`,
    },
    description: info.description,
    metadataBase: new URL(info.contact.website),
    manifest: "/manifest.json",
    openGraph: {
      title: info.name,
      description: info.description,
      url: info.contact.website,
      siteName: info.name,
      locale: "es_ES",
      type: "website",
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
    alternates: { canonical: info.contact.website },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [info, menu] = await Promise.all([getRestaurant(), getMenu()]);
  const theme = getTheme(info?.webTemplate);
  const schema = info ? buildRestaurantSchema(info) : null;
  const themeCSS = buildThemeCSS(theme);
  const allItems = menu.categories.flatMap((c) => c.items);

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href={theme.fonts.googleImport} />
        <link rel="icon" href="/favicon.ico" />
        <style dangerouslySetInnerHTML={{ __html: themeCSS }} />
        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}
      </head>
      <body>
        {info && <WebMCP restaurant={info} allItems={allItems} />}
        {children}
      </body>
    </html>
  );
}
