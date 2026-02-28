/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts}',
    './data/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-heading)', 'serif'],
        sans: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        // Semantic theme colors (driven by buildThemeCSS vars)
        theme: {
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          accent: 'var(--color-accent)',
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          'surface-alt': 'var(--color-surface-alt)',
          text: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
          border: 'var(--color-border)',
          'hero-from': 'var(--color-hero-from)',
          'hero-via': 'var(--color-hero-via)',
          'hero-to': 'var(--color-hero-to)',
          'nav-solid': 'var(--color-nav-solid)',
          'footer-bg': 'var(--color-footer-bg)',
          'footer-text': 'var(--color-footer-text)',
        },
        // Legacy aliases → theme CSS vars
        mediterranean: {
          blue: 'var(--color-primary)',
          sand: 'var(--color-surface)',
          terracotta: 'var(--color-accent)',
          olive: 'var(--color-secondary)',
          cream: 'var(--color-bg)',
        },
      },
      borderRadius: {
        card: 'var(--radius-card)',
        button: 'var(--radius-button)',
        input: 'var(--radius-input)',
      },
    },
  },
  plugins: [],
}
