import type { Metadata } from 'next'
import './globals.css'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Los Granainos - Restaurante Familiar en Cala de Mijas',
  description: 'Restaurante familiar junto a la playa en Cala de Mijas, Costa del Sol, Málaga. Cocina mediterránea con vistas al mar.',
  keywords: 'restaurante, Cala de Mijas, Costa del Sol, Málaga, playa, mediterráneo, familiar',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Los Granainos - Restaurante en Cala de Mijas',
    description: 'Cocina mediterránea junto al mar en la Costa del Sol',
    type: 'website',
    locale: 'es_ES',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <StructuredData />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
