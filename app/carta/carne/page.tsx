import CategoryLayout from '@/components/CategoryLayout'

export default function CarnePage() {
  const items = [
    {
      name: 'Solomillo de Ternera',
      description: 'Solomillo de ternera a la plancha con guarnición de patatas',
      price: '€22.00',
      highlight: true,
    },
    {
      name: 'Entrecot de Buey',
      description: 'Entrecot de buey madurado 500g, jugoso y tierno',
      price: '€26.00',
    },
    {
      name: 'Secreto Ibérico',
      description: 'Secreto de cerdo ibérico a la plancha con pimientos',
      price: '€16.00',
      highlight: true,
    },
    {
      name: 'Pluma Ibérica',
      description: 'Pluma de cerdo ibérico con salsa de vino Pedro Ximénez',
      price: '€18.00',
    },
    {
      name: 'Pollo al Ajillo',
      description: 'Pollo de corral salteado con ajo, vino blanco y perejil',
      price: '€14.00',
    },
    {
      name: 'Rabo de Toro',
      description: 'Rabo de toro estofado al estilo tradicional andaluz',
      price: '€19.00',
      highlight: true,
    },
    {
      name: 'Carrillada de Cerdo',
      description: 'Carrilleras de cerdo guisadas en salsa de vino tinto',
      price: '€17.00',
    },
    {
      name: 'Costillas de Cordero',
      description: 'Costillas de cordero lechal asadas al horno',
      price: '€20.00',
    },
  ]

  return (
    <CategoryLayout
      title="Carne"
      icon="🥩"
      description="Carnes selectas de la tierra malagueña"
      items={items}
      color="from-red-500 to-orange-500"
    />
  )
}
