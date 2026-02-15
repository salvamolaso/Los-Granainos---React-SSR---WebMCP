import CategoryLayout from '@/components/CategoryLayout'

export default function PostresPage() {
  const items = [
    {
      name: 'Tarta de Queso Casera',
      description: 'Tarta de queso cremosa al estilo tradicional',
      price: '€6.00',
    },
    {
      name: 'Coulant de Chocolate',
      description: 'Bizcocho de chocolate con corazón fundido, helado de vainilla',
      price: '€7.00',
      highlight: true,
    },
    {
      name: 'Flan de Huevo de la Abuela',
      description: 'Flan casero con caramelo líquido, receta familiar',
      price: '€5.50',
    },
    {
      name: 'Helados Artesanales',
      description: 'Selección de helados artesanos (vainilla, chocolate, fresa, limón)',
      price: '€5.00',
    },
    {
      name: 'Torrijas Caseras',
      description: 'Torrijas con miel y canela (temporada)',
      price: '€6.50',
    },
    {
      name: 'Tarta de Santiago',
      description: 'Tarta de almendra tradicional gallega con azúcar glasé',
      price: '€6.50',
    },
    {
      name: 'Crema Catalana',
      description: 'Crema catalana gratinada con azúcar caramelizado',
      price: '€6.00',
    },
    {
      name: 'Brownie con Helado',
      description: 'Brownie de chocolate caliente con helado de vainilla',
      price: '€7.50',
      highlight: true,
    },
    {
      name: 'Macedonia de Frutas',
      description: 'Frutas frescas de temporada con helado',
      price: '€5.50',
    },
    {
      name: 'Café y Postre',
      description: 'Café expreso con petit four de la casa',
      price: '€4.00',
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
