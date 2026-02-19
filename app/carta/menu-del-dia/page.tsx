import CategoryLayout from '@/components/CategoryLayout'

export default function MenuDelDiaPage() {
  const items = [
    {
      name: 'Menú del Día',
      description: 'Plato del día + Carne o Pescado + Postre o Café + Pan + Vino o Refresco',
      price: 'Consultar',
      highlight: true,
    },
  ]

  return (
    <CategoryLayout
      title="Menú del Día"
      icon="🍽️"
      description="Plato del día, carne o pescado, postre o café, pan y bebida"
      items={items}
      color="from-teal-500 to-green-500"
    />
  )
}
