import CategoryLayout from '@/components/CategoryLayout'

export default function EntrantesPage() {
  const items = [
    {
      name: 'Ensalada Especial',
      description: 'Ensalada especial de la casa',
      price: '€7.50',
    },
    {
      name: 'Tomate, Aguacate, Huevo y Atún',
      description: 'Tomate, aguacate, huevo y atún',
      price: '€8.50',
      highlight: true,
    },
    {
      name: 'Tomate solo',
      description: 'Tomate en lonchas',
      price: '€5.50',
    },
    {
      name: 'Boquerones en Vinagre',
      description: 'Boquerones marinados en vinagre',
      price: '€12.00',
    },
    {
      name: 'Gambas al Pil-Pil',
      description: 'Gambas al pil-pil',
      price: '€12.00',
      highlight: true,
    },
    {
      name: 'Gambas a la Plancha o Cocidas',
      description: 'Gambas a la plancha o cocidas',
      price: '€18.00',
      highlight: true,
    },
    {
      name: 'Mejillones al Vapor',
      description: 'Mejillones al vapor',
      price: '€12.00',
    },
    {
      name: 'Coquinas en Salsa',
      description: 'Coquinas en salsa',
      price: '€15.00',
    },
    {
      name: 'Almejas',
      description: 'Almejas',
      price: '€12.00',
    },
    {
      name: 'Queso Manchego',
      description: 'Queso manchego',
      price: '€8.00',
    },
    {
      name: 'Jamón Serrano',
      description: 'Jamón serrano',
      price: '€8.00',
    },
  ]

  return (
    <CategoryLayout
      title="Entradas"
      icon="🥗"
      description="Para empezar con sabores auténticos del Mediterráneo"
      items={items}
      color="from-green-500 to-emerald-500"
    />
  )
}
