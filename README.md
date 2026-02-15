# Los Granainos - Restaurante en Cala de Mijas

Sitio web para el restaurante familiar Los Granainos, ubicado en la Cala de Mijas, Costa del Sol, Málaga.

## 🌊 Características

- **Next.js 14** con App Router para server-side rendering
- **TypeScript** para seguridad de tipos
- **Tailwind CSS** para estilos personalizados
- **Optimizado para Cloudflare Pages** con soporte SSR
- Diseño responsive y moderno inspirado en la costa mediterránea
- Animaciones y transiciones fluidas
- SEO optimizado

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Compilar para Cloudflare Pages
npm run pages:build
```

## 📦 Despliegue en Cloudflare Pages

### Opción 1: Desde el Dashboard de Cloudflare

1. Conecta tu repositorio de Git a Cloudflare Pages
2. Configura los siguientes ajustes:
   - **Framework preset**: Next.js
   - **Build command**: `npm run pages:build`
   - **Build output directory**: `.vercel/output/static`

### Opción 2: Usando Wrangler CLI

```bash
# Instalar Wrangler globalmente
npm install -g wrangler

# Autenticarse con Cloudflare
wrangler login

# Desplegar
npm run deploy
```

## 🎨 Personalización

### Colores del tema

Los colores se definen en `tailwind.config.js` y `app/globals.css`:

- **Mediterranean Blue**: #0077BE (azul mar)
- **Sand**: #F4E8D0 (arena)
- **Terracotta**: #D4704B (terracota)
- **Olive**: #6B8E23 (oliva)
- **Cream**: #FFFEF2 (crema)

### Fuentes

- **Display**: Playfair Display (títulos)
- **Sans**: Lato (texto)

## 📱 Estructura del Proyecto

```
los-granainos/
├── app/
│   ├── globals.css      # Estilos globales
│   ├── layout.tsx       # Layout raíz
│   └── page.tsx         # Página principal
├── public/              # Recursos estáticos
├── next.config.js       # Configuración de Next.js
├── tailwind.config.js   # Configuración de Tailwind
└── package.json         # Dependencias
```

## 🌐 Secciones de la Web

1. **Hero** - Presentación principal con animaciones
2. **Nosotros** - Historia del restaurante familiar
3. **Menú** - Carta de platos destacados
4. **Contacto** - Ubicación y horarios

## 🔧 Tecnologías Utilizadas

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Cloudflare Pages
- @cloudflare/next-on-pages

## 📄 Licencia

© 2024 Los Granainos. Todos los derechos reservados.
