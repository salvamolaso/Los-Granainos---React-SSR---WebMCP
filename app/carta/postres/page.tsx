import CategoryLayout from '@/components/CategoryLayout'

export default function PostresPage() {
  const items = [
    {
      name: 'Flan',
      description: 'Flan de huevo con caramelo',
      price: '€3.50',
    },
    {
      name: 'Fruta del Tiempo',
      description: 'Fruta fresca de temporada',
      price: 's/m',
    },
    {
      name: 'Helados',
      description: 'Helados variados (+1 bola de helado €2.50)',
      price: '€4.50',
    },
    {
      name: 'Postres Montero',
      description: 'Postres Montero',
      price: '€3.50',
    },
    {
      name: 'Tartas Caseras',
      description: 'Cheesecake, Tiramisú o Lemon Pie',
      price: '€5.50',
      highlight: true,
    },
  ]

  return (
    <CategoryLayout
      title="Postres"
      icon="🍮"
      description="El dulce final perfecto para tu comida"
      items={items}
      color="from-amber-500 to-yellow-500"
    />
  )
}
