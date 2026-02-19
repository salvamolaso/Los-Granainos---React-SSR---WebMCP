import CategoryLayout from '@/components/CategoryLayout'

export default function PaellaPage() {
  const items = [
    {
      name: 'Paella (por encargo)',
      description: 'Paella por encargo, mínimo 2 personas. Precio por persona.',
      price: '€24.00',
      highlight: true,
    },
  ]

  return (
    <CategoryLayout
      title="Paella"
      icon="🥘"
      description="Paella por encargo, mínimo 2 personas"
      items={items}
      color="from-orange-500 to-yellow-500"
    />
  )
}
