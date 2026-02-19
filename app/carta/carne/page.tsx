import CategoryLayout from '@/components/CategoryLayout'

export default function CarnePage() {
  const items = [
    {
      name: 'Filete de Cerdo',
      description: 'Filete de cerdo',
      price: '€10.00',
    },
    {
      name: 'Filete de Cerdo Empanado',
      description: 'Filete de cerdo empanado',
      price: '€12.00',
    },
    {
      name: 'Entrecot con Guarnición',
      description: 'Entrecot con guarnición',
      price: '€19.00',
      highlight: true,
    },
    {
      name: 'Entrecot a la Pimienta o Roquefort',
      description: 'Entrecot con salsa a la pimienta o roquefort',
      price: '€19.00',
      highlight: true,
    },
    {
      name: 'Filete de Pollo Empanado',
      description: 'Filete de pollo empanado',
      price: '€12.00',
    },
    {
      name: 'Solomillo de Cerdo con Guarnición',
      description: 'Solomillo de cerdo con guarnición',
      price: '€12.00',
    },
    {
      name: 'Solomillo de Cerdo a la Pimienta o Roquefort',
      description: 'Solomillo de cerdo con salsa a la pimienta o roquefort',
      price: '€16.00',
    },
    {
      name: 'Filete de Pollo con Guarnición',
      description: 'Filete de pollo con guarnición',
      price: '€10.00',
    },
    {
      name: 'Hamburguesa con Patatas o Ensalada',
      description: 'Hamburguesa acompañada de patatas fritas o ensalada',
      price: '€8.00',
    },
  ]

  return (
    <CategoryLayout
      title="Carnes"
      icon="🥩"
      description="Filetes, entrecots y solomillos a tu gusto"
      items={items}
      color="from-red-500 to-orange-500"
    />
  )
}
