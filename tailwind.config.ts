import type { Config } from "tailwindcss";

/**
 * MedicoreERP — Tailwind config.
 * Colors reference CSS variables (see globals.css) so light/dark & white-label
 * are data, not forks. Derived from the Flutter MedicalErpTheme.
 */
const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Brand
        teal: {
          DEFAULT: "var(--brand-teal)",
          dark: "var(--brand-teal-dark)",
          deep: "var(--brand-teal-deep)",
        },
        clinical: "var(--brand-clinical-blue)",
        ink: "var(--brand-ink)",
        mist: "var(--brand-mist)",
        sage: "var(--brand-sage)",
        forest: "var(--brand-forest)",
        // Semantic status
        success: "var(--status-success)",
        warning: "var(--status-warning)",
        danger: "var(--status-danger)",
        info: "var(--status-info)",
        critical: "var(--status-critical)",
        // Surfaces / text (semantic)
        surface: "var(--surface)",
        card: "var(--card)",
        border: "var(--border)",
        heading: "var(--text-heading)",
        body: "var(--text-body)",
        muted: "var(--text-muted)",
      },
      fontFamily: {
        heading: ["var(--font-manrope)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        control: "14px",
        card: "16px",
        pill: "30px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16,48,56,0.04), 0 4px 16px rgba(16,48,56,0.06)",
        card: "0 1px 3px rgba(16,48,56,0.05), 0 8px 30px rgba(16,48,56,0.07)",
        pop: "0 12px 40px rgba(16,48,56,0.14)",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.2,0,0,1)",
      },
      transitionDuration: {
        micro: "120ms",
        standard: "200ms",
        entrance: "280ms",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(192,54,44,0.4)" },
          "70%": { boxShadow: "0 0 0 8px rgba(192,54,44,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(192,54,44,0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 280ms cubic-bezier(0.2,0,0,1)",
        "slide-in-right": "slide-in-right 280ms cubic-bezier(0.2,0,0,1)",
        "scale-in": "scale-in 200ms cubic-bezier(0.2,0,0,1)",
        "pulse-ring": "pulse-ring 2s infinite",
        float: "float 5s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
