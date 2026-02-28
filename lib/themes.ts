// lib/themes.ts
// Sistema de 10 temas visuales para el restaurant-template
// El tema se selecciona via restaurants.web_template en Supabase

export interface ThemeConfig {
  id: string;
  name: string;
  isDark: boolean;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    textMuted: string;
    border: string;
    heroFrom: string;
    heroVia: string;
    heroTo: string;
    navSolid: string;
    footerBg: string;
    footerText: string;
  };
  fonts: {
    heading: string;
    body: string;
    googleImport: string;
  };
  borderRadius: "none" | "sm" | "lg" | "full";
  heroLayout: "centered" | "editorial";
  navStyle: "scroll-fade" | "solid";
  homeSections: ("hero" | "about" | "menu-preview" | "booking" | "location")[];
}

const themes: Record<string, ThemeConfig> = {
  // ── 1. BRASA — Asadores y carnes ────────────────────────────────────
  brasa: {
    id: "brasa",
    name: "Brasa",
    isDark: true,
    colors: {
      primary: "#c0392b",
      secondary: "#e74c3c",
      accent: "#f39c12",
      background: "#0d0905",
      surface: "#1a1410",
      surfaceAlt: "#231c14",
      text: "#f5f0eb",
      textMuted: "#a89888",
      border: "#3a3028",
      heroFrom: "#0d0905",
      heroVia: "#2c1810",
      heroTo: "#1a0a05",
      navSolid: "rgba(13,9,5,0.95)",
      footerBg: "#050302",
      footerText: "rgba(245,240,235,0.35)",
    },
    fonts: {
      heading: "Playfair Display",
      body: "DM Sans",
      googleImport:
        "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap",
    },
    borderRadius: "sm",
    heroLayout: "centered",
    navStyle: "scroll-fade",
    homeSections: ["hero", "about", "menu-preview", "booking", "location"],
  },

  // ── 2. MAREA — Marisquerías y pescados (= Los Granainos) ───────────
  marea: {
    id: "marea",
    name: "Marea",
    isDark: false,
    colors: {
      primary: "#0077BE",
      secondary: "#6B8E23",
      accent: "#D4704B",
      background: "#FFFEF2",
      surface: "#F4E8D0",
      surfaceAlt: "#FFFEF2",
      text: "#2C3E50",
      textMuted: "#6B7B8D",
      border: "#E0D5C0",
      heroFrom: "#0077BE",
      heroVia: "#F4E8D0",
      heroTo: "#FFFEF2",
      navSolid: "rgba(244,232,208,0.95)",
      footerBg: "#111827",
      footerText: "rgba(255,255,255,0.35)",
    },
    fonts: {
      heading: "Playfair Display",
      body: "Lato",
      googleImport:
        "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Lato:wght@300;400;700&display=swap",
    },
    borderRadius: "full",
    heroLayout: "centered",
    navStyle: "scroll-fade",
    homeSections: ["hero", "about", "menu-preview", "booking", "location"],
  },

  // ── 3. FORNO — Pizzerías e italiana ─────────────────────────────────
  forno: {
    id: "forno",
    name: "Forno",
    isDark: false,
    colors: {
      primary: "#c8401a",
      secondary: "#5c7a3a",
      accent: "#c8401a",
      background: "#fdf6ec",
      surface: "#FFFFFF",
      surfaceAlt: "#f5ebe0",
      text: "#2d1a0e",
      textMuted: "#8a7560",
      border: "#e8d5c0",
      heroFrom: "#c8401a",
      heroVia: "#f5ebe0",
      heroTo: "#fdf6ec",
      navSolid: "rgba(253,246,236,0.95)",
      footerBg: "#2d1a0e",
      footerText: "rgba(255,255,255,0.35)",
    },
    fonts: {
      heading: "Playfair Display",
      body: "Lato",
      googleImport:
        "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Lato:wght@300;400;700&display=swap",
    },
    borderRadius: "lg",
    heroLayout: "centered",
    navStyle: "scroll-fade",
    homeSections: ["hero", "about", "menu-preview", "booking", "location"],
  },

  // ── 4. BARRA — Gastrobares y tapas ──────────────────────────────────
  barra: {
    id: "barra",
    name: "Barra",
    isDark: true,
    colors: {
      primary: "#d4a853",
      secondary: "#b8942e",
      accent: "#d4a853",
      background: "#111111",
      surface: "#1a1a1a",
      surfaceAlt: "#222222",
      text: "#f0ece4",
      textMuted: "#8a8478",
      border: "#333333",
      heroFrom: "#111111",
      heroVia: "#1a1610",
      heroTo: "#111111",
      navSolid: "rgba(17,17,17,0.95)",
      footerBg: "#0a0a0a",
      footerText: "rgba(240,236,228,0.35)",
    },
    fonts: {
      heading: "Playfair Display",
      body: "DM Sans",
      googleImport:
        "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap",
    },
    borderRadius: "none",
    heroLayout: "editorial",
    navStyle: "solid",
    homeSections: ["hero", "about", "menu-preview", "booking", "location"],
  },

  // ── 5. RAÍCES — Cocina tradicional (DEFAULT) ───────────────────────
  raices: {
    id: "raices",
    name: "Raíces",
    isDark: false,
    colors: {
      primary: "#8b4513",
      secondary: "#6b7c3a",
      accent: "#C8352A",
      background: "#faf7f2",
      surface: "#FFFFFF",
      surfaceAlt: "#f0ece4",
      text: "#0D0D0D",
      textMuted: "#6B6B6B",
      border: "#D8D4CC",
      heroFrom: "#faf7f2",
      heroVia: "#f0ece4",
      heroTo: "#faf7f2",
      navSolid: "rgba(250,247,242,0.92)",
      footerBg: "#0D0D0D",
      footerText: "rgba(255,255,255,0.35)",
    },
    fonts: {
      heading: "Playfair Display",
      body: "DM Sans",
      googleImport:
        "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap",
    },
    borderRadius: "none",
    heroLayout: "editorial",
    navStyle: "solid",
    homeSections: ["hero", "about", "menu-preview", "booking", "location"],
  },

  // ── 6. ARCO — Fine dining y alta cocina ─────────────────────────────
  arco: {
    id: "arco",
    name: "Arco",
    isDark: false,
    colors: {
      primary: "#1a1a1a",
      secondary: "#4a4a4a",
      accent: "#1a1a1a",
      background: "#fafaf8",
      surface: "#FFFFFF",
      surfaceAlt: "#f2f2f0",
      text: "#1a1a1a",
      textMuted: "#7a7a7a",
      border: "#e0e0e0",
      heroFrom: "#fafaf8",
      heroVia: "#f2f2f0",
      heroTo: "#fafaf8",
      navSolid: "rgba(250,250,248,0.95)",
      footerBg: "#1a1a1a",
      footerText: "rgba(255,255,255,0.35)",
    },
    fonts: {
      heading: "Cormorant Garamond",
      body: "Inter",
      googleImport:
        "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Inter:wght@300;400;500&display=swap",
    },
    borderRadius: "none",
    heroLayout: "editorial",
    navStyle: "solid",
    homeSections: ["hero", "about", "menu-preview", "booking", "location"],
  },

  // ── 7. NORI — Japonés y asiático ────────────────────────────────────
  nori: {
    id: "nori",
    name: "Nori",
    isDark: true,
    colors: {
      primary: "#e63946",
      secondary: "#a8dadc",
      accent: "#e63946",
      background: "#0a0a0a",
      surface: "#141414",
      surfaceAlt: "#1a1a1a",
      text: "#f1faee",
      textMuted: "#8a9a88",
      border: "#2a2a2a",
      heroFrom: "#0a0a0a",
      heroVia: "#1a0a0a",
      heroTo: "#0a0a0a",
      navSolid: "rgba(10,10,10,0.95)",
      footerBg: "#050505",
      footerText: "rgba(241,250,238,0.35)",
    },
    fonts: {
      heading: "Noto Serif JP",
      body: "Inter",
      googleImport:
        "https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600;700;900&family=Inter:wght@300;400;500&display=swap",
    },
    borderRadius: "none",
    heroLayout: "centered",
    navStyle: "scroll-fade",
    homeSections: ["hero", "about", "menu-preview", "booking", "location"],
  },

  // ── 8. VERDE — Vegetariano y saludable ──────────────────────────────
  verde: {
    id: "verde",
    name: "Verde",
    isDark: false,
    colors: {
      primary: "#2d7a4f",
      secondary: "#6aaa64",
      accent: "#2d7a4f",
      background: "#f4f9f4",
      surface: "#FFFFFF",
      surfaceAlt: "#e8f5e8",
      text: "#1a3a2a",
      textMuted: "#5a7a6a",
      border: "#c8e0c8",
      heroFrom: "#2d7a4f",
      heroVia: "#e8f5e8",
      heroTo: "#f4f9f4",
      navSolid: "rgba(244,249,244,0.95)",
      footerBg: "#1a3a2a",
      footerText: "rgba(255,255,255,0.35)",
    },
    fonts: {
      heading: "Playfair Display",
      body: "Nunito Sans",
      googleImport:
        "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Nunito+Sans:wght@300;400;600&display=swap",
    },
    borderRadius: "lg",
    heroLayout: "centered",
    navStyle: "scroll-fade",
    homeSections: ["hero", "about", "menu-preview", "booking", "location"],
  },

  // ── 9. MAÑANA — Brunch y cafeterías ─────────────────────────────────
  manana: {
    id: "manana",
    name: "Mañana",
    isDark: false,
    colors: {
      primary: "#e07b39",
      secondary: "#c4a35a",
      accent: "#e07b39",
      background: "#fdf9f5",
      surface: "#FFFFFF",
      surfaceAlt: "#f5ede2",
      text: "#3a2a1a",
      textMuted: "#8a7a6a",
      border: "#e8d8c8",
      heroFrom: "#e07b39",
      heroVia: "#f5ede2",
      heroTo: "#fdf9f5",
      navSolid: "rgba(253,249,245,0.95)",
      footerBg: "#3a2a1a",
      footerText: "rgba(255,255,255,0.35)",
    },
    fonts: {
      heading: "Playfair Display",
      body: "Nunito Sans",
      googleImport:
        "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Nunito+Sans:wght@300;400;600&display=swap",
    },
    borderRadius: "lg",
    heroLayout: "centered",
    navStyle: "scroll-fade",
    homeSections: ["hero", "about", "menu-preview", "booking", "location"],
  },

  // ── 10. LEÑA — Parrilla y asador rústico ────────────────────────────
  lena: {
    id: "lena",
    name: "Leña",
    isDark: true,
    colors: {
      primary: "#e8912b",
      secondary: "#c77520",
      accent: "#e8912b",
      background: "#1c1510",
      surface: "#2a2018",
      surfaceAlt: "#342820",
      text: "#f5e8d8",
      textMuted: "#a89880",
      border: "#4a3828",
      heroFrom: "#1c1510",
      heroVia: "#2a1810",
      heroTo: "#1c1510",
      navSolid: "rgba(28,21,16,0.95)",
      footerBg: "#100c08",
      footerText: "rgba(245,232,216,0.35)",
    },
    fonts: {
      heading: "Playfair Display",
      body: "DM Sans",
      googleImport:
        "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap",
    },
    borderRadius: "sm",
    heroLayout: "centered",
    navStyle: "scroll-fade",
    homeSections: ["hero", "about", "menu-preview", "booking", "location"],
  },
};

export function getTheme(templateId?: string): ThemeConfig {
  return themes[templateId ?? "raices"] ?? themes.raices;
}

export const RADIUS_MAP: Record<ThemeConfig["borderRadius"], string> = {
  none: "2px",
  sm: "8px",
  lg: "16px",
  full: "9999px",
};

export function buildThemeCSS(theme: ThemeConfig): string {
  const r = RADIUS_MAP[theme.borderRadius];
  return `:root {
  --color-primary: ${theme.colors.primary};
  --color-secondary: ${theme.colors.secondary};
  --color-accent: ${theme.colors.accent};
  --color-bg: ${theme.colors.background};
  --color-surface: ${theme.colors.surface};
  --color-surface-alt: ${theme.colors.surfaceAlt};
  --color-text: ${theme.colors.text};
  --color-text-muted: ${theme.colors.textMuted};
  --color-border: ${theme.colors.border};
  --color-hero-from: ${theme.colors.heroFrom};
  --color-hero-via: ${theme.colors.heroVia};
  --color-hero-to: ${theme.colors.heroTo};
  --color-nav-solid: ${theme.colors.navSolid};
  --color-footer-bg: ${theme.colors.footerBg};
  --color-footer-text: ${theme.colors.footerText};
  --font-heading: '${theme.fonts.heading}', serif;
  --font-body: '${theme.fonts.body}', sans-serif;
  --radius: ${r};
  --radius-card: ${theme.borderRadius === "full" ? "24px" : theme.borderRadius === "lg" ? "16px" : theme.borderRadius === "sm" ? "8px" : "2px"};
  --radius-button: ${theme.borderRadius === "full" ? "9999px" : theme.borderRadius === "lg" ? "12px" : theme.borderRadius === "sm" ? "6px" : "2px"};
  --radius-input: ${theme.borderRadius === "full" ? "12px" : theme.borderRadius === "lg" ? "10px" : theme.borderRadius === "sm" ? "6px" : "2px"};
}`;
}
