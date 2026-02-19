import CategoryLayout from '@/components/CategoryLayout'

export default function PescadosPage() {
  const items = [
    {
      name: 'Fritura Variada',
      description: 'Fritura variada de pescado (por persona)',
      price: '€10.00',
      highlight: true,
    },
    {
      name: 'Dorada Plancha',
      description: 'Dorada a la plancha',
      price: '€20.00',
      highlight: true,
    },
    {
      name: 'Boquerones Fritos Vitorianos',
      description: 'Boquerones fritos vitorianos',
      price: '€12.00',
    },
    {
      name: 'Boquerones en Vinagre Fritos',
      description: 'Boquerones en vinagre fritos',
      price: '€15.00',
    },
    {
      name: 'Boquerones al Limón',
      description: 'Boquerones al limón',
      price: '€14.00',
    },
    {
      name: 'Calamares Fritos',
      description: 'Calamares fritos',
      price: '€12.00',
    },
    {
      name: 'Calamares a la Plancha',
      description: 'Calamares a la plancha',
      price: '€14.00',
    },
    {
      name: 'Jibia Frita',
      description: 'Jibia frita',
      price: '€12.00',
    },
    {
      name: 'Jibia Plancha',
      description: 'Jibia a la plancha',
      price: '€14.00',
    },
    {
      name: 'Rosada Frita',
      description: 'Rosada frita',
      price: '€12.00',
    },
    {
      name: 'Rosada Plancha',
      description: 'Rosada a la plancha',
      price: '€15.00',
    },
    {
      name: 'Pez Espada a la Plancha',
      description: 'Pez espada a la plancha',
      price: '€18.00',
    },
    {
      name: 'Jureles Fritos',
      description: 'Jureles fritos',
      price: '€10.00',
    },
    {
      name: 'Bacalao Frito',
      description: 'Bacalao frito',
      price: '€12.00',
    },
    {
      name: 'Pescadilla Frita',
      description: 'Pescadilla frita',
      price: '€14.00',
    },
    {
      name: 'Salmonetes',
      description: 'Salmonetes',
      price: '€14.00',
    },
    {
      name: 'Sardinas',
      description: 'Sardinas',
      price: '€7.00',
      highlight: true,
    },
    {
      name: 'Sardinas Fritas',
      description: 'Sardinas fritas',
      price: '€7.00',
    },
    {
      name: 'Puntillitas',
      description: 'Puntillitas (baby squid)',
      price: '€15.00',
    },
    {
      name: 'Atún',
      description: 'Atún',
      price: '€20.00',
      highlight: true,
    },
  ]

  return (
    <CategoryLayout
      title="Pescados"
      icon="🐟"
      description="Pescado fresco del día, frito o a la plancha"
      items={items}
      color="from-blue-500 to-cyan-500"
    />
  )
}
