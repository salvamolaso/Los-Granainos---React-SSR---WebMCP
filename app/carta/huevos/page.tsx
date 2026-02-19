import CategoryLayout from '@/components/CategoryLayout'

export default function HuevosPage() {
  const items = [
    {
      name: 'Huevos Fritos con Patatas',
      description: 'Huevos fritos acompañados de patatas',
      price: '€8.50',
      highlight: true,
    },
    {
      name: 'Tortilla Francesa',
      description: 'Tortilla francesa',
      price: '€8.50',
    },
    {
      name: 'Tortilla Española',
      description: 'Tortilla española',
      price: '€8.50',
    },
    {
      name: 'Tortilla de Espárragos',
      description: 'Tortilla de espárragos',
      price: '€8.50',
    },
    {
      name: 'Tortilla de Queso',
      description: 'Tortilla de queso',
      price: '€8.50',
    },
    {
      name: 'Tortilla de Atún',
      description: 'Tortilla de atún',
      price: '€8.50',
    },
  ]

  return (
    <CategoryLayout
      title="Huevos"
      icon="🍳"
      description="Tortillas y huevos preparados al momento"
      items={items}
      color="from-yellow-400 to-orange-400"
    />
  )
}
