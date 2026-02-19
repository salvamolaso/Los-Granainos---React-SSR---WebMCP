import CategoryLayout from '@/components/CategoryLayout'

export default function VinosPage() {
  const items = [
    // ── Tintos ──────────────────────────────────────────────────────────────
    {
      name: 'Vino Tinto de la Casa',
      description: 'Vino tinto de la casa',
      price: '€12.00',
    },
    {
      name: 'Ribera de la Casa',
      description: 'Ribera de la casa',
      price: '€14.00',
    },
    {
      name: 'Rioja de la Casa',
      description: 'Rioja de la casa',
      price: '€14.00',
    },
    {
      name: 'Marqués de Cáceres Tinto',
      description: 'Marqués de Cáceres (tinto)',
      price: '€17.00',
      highlight: true,
    },
    {
      name: 'Ramón Bilbao',
      description: 'Ramón Bilbao',
      price: '€18.00',
      highlight: true,
    },
    {
      name: 'Marqués del Riscal',
      description: 'Marqués del Riscal',
      price: '€18.00',
    },
    {
      name: 'Protos',
      description: 'Protos',
      price: '€18.00',
    },
    // ── Rosados ─────────────────────────────────────────────────────────────
    {
      name: 'Vino Rosado de la Casa',
      description: 'Vino rosado de la casa',
      price: '€12.00',
    },
    {
      name: 'Marqués Cáceres Rosado',
      description: 'Marqués Cáceres (rosado)',
      price: '€17.00',
    },
    {
      name: 'Lambrusco',
      description: 'Lambrusco',
      price: '€14.00',
    },
    // ── Blancos ─────────────────────────────────────────────────────────────
    {
      name: 'Vino Blanco de la Casa',
      description: 'Vino blanco de la casa',
      price: '€12.00',
    },
    {
      name: 'Barbadillo',
      description: 'Barbadillo',
      price: '€12.00',
    },
    {
      name: 'Viñasol',
      description: 'Viñasol',
      price: '€15.00',
    },
    {
      name: 'Albariño',
      description: 'Albariño',
      price: '€18.00',
      highlight: true,
    },
  ]

  return (
    <CategoryLayout
      title="Vinos"
      icon="🍷"
      description="Tintos, rosados y blancos para acompañar tu comida"
      items={items}
      color="from-purple-500 to-pink-500"
    />
  )
}
