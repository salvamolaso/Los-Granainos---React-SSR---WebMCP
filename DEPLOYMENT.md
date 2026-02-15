# Guía de Despliegue en Cloudflare Pages

## Pre-requisitos

- Cuenta de Cloudflare
- Repositorio Git (GitHub, GitLab, etc.)
- Node.js instalado localmente

## Método 1: Despliegue Automático desde Git

### Paso 1: Preparar el Repositorio

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <tu-repositorio>
git push -u origin main
```

### Paso 2: Configurar Cloudflare Pages

1. Inicia sesión en [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Ve a **Pages** > **Create a project**
3. Conecta tu cuenta de Git (GitHub/GitLab)
4. Selecciona el repositorio `los-granainos`

### Paso 3: Configuración de Build

En la configuración del proyecto, establece:

```
Framework preset: Next.js
Build command: npx @cloudflare/next-on-pages
Build output directory: .vercel/output/static
Root directory: /
```

### Paso 4: Variables de Entorno (Opcional)

Si necesitas variables de entorno:

1. Ve a **Settings** > **Environment variables**
2. Añade las variables necesarias

### Paso 5: Desplegar

Cloudflare Pages desplegará automáticamente en cada push a la rama `main`.

## Método 2: Despliegue Manual con Wrangler

### Instalación de Wrangler

```bash
npm install -g wrangler
```

### Autenticación

```bash
wrangler login
```

Esto abrirá tu navegador para autorizar la CLI.

### Construir el Proyecto

```bash
npm install
npm run pages:build
```

### Desplegar

```bash
wrangler pages deploy .vercel/output/static --project-name=los-granainos
```

O usa el script npm:

```bash
npm run deploy
```

## Dominios Personalizados

### Añadir un Dominio

1. Ve a tu proyecto en Cloudflare Pages
2. **Custom domains** > **Set up a custom domain**
3. Añade tu dominio (ej: `losgranainos.com`)
4. Sigue las instrucciones para configurar DNS

### Configuración DNS

Si tu dominio ya está en Cloudflare:
- Se configurará automáticamente

Si tu dominio está en otro registrador:
- Añade un registro CNAME apuntando a: `<tu-proyecto>.pages.dev`

## Optimizaciones Post-Despliegue

### 1. Habilitar Cloudflare Analytics

```bash
# En Settings > Analytics
Activa Cloudflare Web Analytics
```

### 2. Configurar Cache

Cloudflare Pages optimiza automáticamente el cache, pero puedes personalizar:

```bash
# Añadir _headers file en /public
/*
  Cache-Control: public, max-age=31536000, immutable
```

### 3. Configurar Redirects

Crea un archivo `_redirects` en `/public`:

```
# Ejemplo: redireccionar www a no-www
https://www.losgranainos.com/* https://losgranainos.com/:splat 301!
```

## Troubleshooting

### Error: "Build failed"

- Verifica que `@cloudflare/next-on-pages` esté en las dependencias
- Asegúrate de que el comando de build sea correcto
- Revisa los logs del build en Cloudflare Dashboard

### Error: "Runtime error"

- Verifica que `next.config.js` tenga `images.unoptimized = true`
- Revisa que no uses APIs no soportadas por Cloudflare Workers

### Imágenes no se cargan

- Asegúrate de usar rutas relativas
- Verifica que las imágenes estén en `/public`

## Monitoreo

### Ver Logs

```bash
wrangler pages deployment tail --project-name=los-granainos
```

### Analytics

Accede a las métricas en:
- Cloudflare Dashboard > Pages > [tu-proyecto] > Analytics

## Rollback

Si necesitas volver a una versión anterior:

1. Ve a **Deployments** en tu proyecto
2. Encuentra el deployment anterior
3. Click en **...** > **Rollback to this deployment**

## Recursos Adicionales

- [Documentación de Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
