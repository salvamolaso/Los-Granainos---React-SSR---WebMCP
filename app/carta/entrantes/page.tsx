import CategoryLayout from '@/components/CategoryLayout'

export default function EntrantesPage() {
  const items = [
    {
      name: 'Gazpacho Andaluz',
      description: 'Sopa fría de tomate, pepino y pimiento. Refrescante y tradicional',
      price: '€6.50',
      highlight: true,
    },
    {
      name: 'Ensalada Malagueña',
      description: 'Tomate, pepino, cebolla, aceitunas, bacalao y naranja',
      price: '€8.50',
    },
    {
      name: 'Aceitunas Aliñadas',
      description: 'Aceitunas de la tierra con ajo, tomillo y orégano',
      price: '€4.00',
    },
    {
      name: 'Jamón Ibérico de Bellota',
      description: 'Lonchas de jamón ibérico de bellota 100% pata negra',
      price: '€18.00',
      highlight: true,
    },
    {
      name: 'Pimientos de Padrón',
      description: 'Pimientos de Padrón fritos con sal gorda',
      price: '€7.00',
    },
    {
      name: 'Croquetas de la Abuela',
      description: 'Croquetas caseras de jamón, bacalao o espinacas (6 unidades)',
      price: '€9.00',
    },
    {
      name: 'Boquerones en Vinagre',
      description: 'Boquerones frescos marinados en vinagre con ajo y perejil',
      price: '€7.50',
    },
    {
      name: 'Pan con Tomate y Aceite',
      description: 'Pan rústico con tomate rallado y aceite de oliva virgen extra',
      price: '€3.50',
    },
    {
      name: 'Tabla de Quesos Andaluces',
      description: 'Selección de quesos artesanales de Málaga y Cádiz',
      price: '€12.00',
    },
    {
      name: 'Pulpo a la Gallega',
      description: 'Pulpo cocido con cachelos, pimentón dulce y aceite de oliva',
      price: '€16.00',
    },
  ]

  return (
    <CategoryLayout
      title="Entrantes"
      icon="🥗"
      description="Para empezar el festín con sabores auténticos"
      items={items}
      color="from-green-500 to-emerald-500"
    />
  )
}
