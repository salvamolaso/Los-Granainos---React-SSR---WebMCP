# Guía de Desarrollo Local

## Requisitos Previos

- Node.js 18.x o superior
- npm o yarn
- Git

## Instalación Inicial

```bash
# Clonar el repositorio
git clone <tu-repositorio>
cd los-granainos

# Instalar dependencias
npm install
```

## Desarrollo Local

```bash
# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### Hot Reload

Next.js recargará automáticamente la página cuando realices cambios en:
- Archivos `.tsx` y `.ts`
- Archivos CSS
- Configuración de Tailwind

## Estructura del Proyecto

```
los-granainos/
├── app/                    # App Router de Next.js
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página de inicio
├── components/            # Componentes reutilizables
│   ├── Button.tsx
│   └── StructuredData.tsx
├── public/               # Assets estáticos
│   ├── robots.txt
│   ├── sitemap.xml
│   └── manifest.json
├── next.config.js        # Configuración Next.js
├── tailwind.config.js    # Configuración Tailwind
├── tsconfig.json         # Configuración TypeScript
└── package.json          # Dependencias
```

## Personalización

### Modificar Colores

Edita `tailwind.config.js`:

```js
colors: {
  mediterranean: {
    blue: '#0077BE',      // Azul mar
    sand: '#F4E8D0',      // Arena
    terracotta: '#D4704B', // Terracota
    olive: '#6B8E23',     // Oliva
    cream: '#FFFEF2',     // Crema
  },
}
```

### Cambiar Fuentes

En `app/globals.css`, modifica la importación:

```css
@import url('https://fonts.googleapis.com/css2?family=TuFuente:wght@400;700&display=swap');
```

Y actualiza `tailwind.config.js`:

```js
fontFamily: {
  display: ['TuFuente', 'serif'],
  sans: ['OtraFuente', 'sans-serif'],
}
```

### Añadir Nuevas Secciones

Crea una nueva sección en `app/page.tsx`:

```tsx
<section id="nueva-seccion" className="py-32 px-6">
  <div className="max-w-6xl mx-auto">
    {/* Tu contenido */}
  </div>
</section>
```

Añade el enlace en la navegación:

```tsx
<a href="#nueva-seccion">Nueva Sección</a>
```

## Crear Nuevos Componentes

```bash
# Crear un nuevo componente
touch components/MiComponente.tsx
```

```tsx
// components/MiComponente.tsx
interface MiComponenteProps {
  titulo: string
}

export default function MiComponente({ titulo }: MiComponenteProps) {
  return (
    <div>
      <h2>{titulo}</h2>
    </div>
  )
}
```

Importar en tu página:

```tsx
import MiComponente from '@/components/MiComponente'

// Usar en JSX
<MiComponente titulo="Hola" />
```

## Testing

### Construir para Producción

```bash
npm run build
```

### Iniciar en Modo Producción

```bash
npm start
```

### Previsualizar Build de Cloudflare

```bash
npm run preview
```

## Debugging

### Ver errores de TypeScript

```bash
npx tsc --noEmit
```

### Ver errores de Lint

```bash
npx next lint
```

## Tips de Desarrollo

### Usar React DevTools

Instala la extensión de React Developer Tools para Chrome/Firefox

### Ver el tamaño del bundle

```bash
npm run build
```

El output mostrará el tamaño de cada página.

### Optimizar imágenes

Las imágenes en `/public` deben estar optimizadas. Usa herramientas como:
- [TinyPNG](https://tinypng.com/)
- [ImageOptim](https://imageoptim.com/)

### Usar variables CSS

Define variables en `app/globals.css`:

```css
:root {
  --mi-color: #FFFFFF;
}
```

Úsalas en tus componentes:

```tsx
<div style={{ color: 'var(--mi-color)' }}>
  Contenido
</div>
```

## Solución de Problemas

### Error: "Module not found"

```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Puerto 3000 en uso

```bash
# Usar otro puerto
npm run dev -- -p 3001
```

### Cambios no se reflejan

1. Detén el servidor (Ctrl+C)
2. Elimina `.next/`
3. Reinicia: `npm run dev`

## Recursos Útiles

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs/)
- [React Docs](https://react.dev/)
