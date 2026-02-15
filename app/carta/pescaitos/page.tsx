import CategoryLayout from '@/components/CategoryLayout'

export default function PescaitosPage() {
  const items = [
    {
      name: 'Fritura Malagueña',
      description: 'Surtido de pescaíto frito: boquerones, jureles, calamares y gambas',
      price: '€18.00',
      highlight: true,
    },
    {
      name: 'Boquerones Fritos',
      description: 'Boquerones frescos rebozados y fritos, crujientes y jugosos',
      price: '€12.00',
    },
    {
      name: 'Calamares a la Romana',
      description: 'Anillas de calamar rebozadas en su punto perfecto',
      price: '€14.00',
    },
    {
      name: 'Espeto de Sardinas',
      description: 'Sardinas asadas a la leña en espeto, tradición malagueña',
      price: '€10.00',
      highlight: true,
    },
    {
      name: 'Jureles Fritos',
      description: 'Jureles del Mediterráneo fritos en aceite de oliva virgen extra',
      price: '€13.00',
    },
    {
      name: 'Gambas Blancas de la Costa',
      description: 'Gambas blancas de Málaga, a la plancha o cocidas',
      price: '€22.00',
      highlight: true,
    },
    {
      name: 'Chopitos Fritos',
      description: 'Chipirones baby rebozados y fritos, tiernos y sabrosos',
      price: '€15.00',
    },
    {
      name: 'Pescado del Día a la Plancha',
      description: 'Pregunta por nuestra captura del día (precio según mercado)',
      price: '€18.00',
    },
    {
      name: 'Puntillitas Fritas',
      description: 'Puntillitas baby fritas al estilo malagueño',
      price: '€14.00',
    },
    {
      name: 'Acedías Fritas',
      description: 'Pequeños lenguados fritos enteros, delicados y sabrosos',
      price: '€16.00',
    },
  ]

  return (
    <CategoryLayout
      title="Pescaítos"
      icon="🐟"
      description="Nuestra especialidad: pescado fresco frito al momento"
      items={items}
      color="from-blue-500 to-cyan-500"
    />
  )
}
