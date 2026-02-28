export const runtime = "edge";

import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        background: "var(--color-bg, #faf7f2)",
        color: "var(--color-text, #0D0D0D)",
      }}
    >
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1 style={{ fontSize: "4rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          404
        </h1>
        <p style={{ fontSize: "1.25rem", color: "#6B6B6B", marginBottom: "2rem" }}>
          Página no encontrada
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "0.75rem 1.5rem",
            background: "var(--color-accent, #C8352A)",
            color: "#fff",
            borderRadius: "var(--radius-button, 6px)",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
