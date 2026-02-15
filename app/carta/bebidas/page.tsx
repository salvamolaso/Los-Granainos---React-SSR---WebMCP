import CategoryLayout from '@/components/CategoryLayout'

export default function BebidasPage() {
  const items = [
    {
      name: 'Vino Blanco de la Casa',
      description: 'Vino blanco afrutado de Málaga, perfecto con pescado',
      price: '€3.50',
    },
    {
      name: 'Vino Tinto Rioja Crianza',
      description: 'Crianza con 12 meses en barrica de roble americano',
      price: '€18.00',
      highlight: true,
    },
    {
      name: 'Cerveza Cruzcampo de Barril',
      description: 'Cerveza malagueña bien fría, caña o jarra',
      price: '€2.50',
    },
    {
      name: 'Tinto de Verano',
      description: 'Refresco de vino tinto con limón, ideal para el calor',
      price: '€3.00',
    },
    {
      name: 'Agua Mineral',
      description: 'Agua mineral natural con o sin gas',
      price: '€2.00',
    },
    {
      name: 'Refrescos Variados',
      description: 'Coca-Cola, Fanta, Sprite, Aquarius',
      price: '€2.50',
    },
    {
      name: 'Café Expreso',
      description: 'Café expreso italiano, solo o cortado',
      price: '€1.80',
    },
    {
      name: 'Vino Dulce de Málaga',
      description: 'Vino dulce tradicional malagueño, ideal con postre',
      price: '€4.00',
      highlight: true,
    },
  ]

  return (
    <CategoryLayout
      title="Bebidas"
      icon="🍷"
      description="Vinos, cervezas y refrescos para acompañar tu comida"
      items={items}
      color="from-purple-500 to-pink-500"
    />
  )
}
