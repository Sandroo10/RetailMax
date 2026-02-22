/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        pill: "var(--radius-pill)",
      },
      colors: {
        bg: "hsl(var(--bg))",
        "surface-1": "hsl(var(--surface-1))",
        "surface-2": "hsl(var(--surface-2))",
        "surface-3": "hsl(var(--surface-3))",
        border: "hsl(var(--border))",
        "text-1": "hsl(var(--text-1))",
        "text-2": "hsl(var(--text-2))",
        muted: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--muted))",
        },
        brand: "hsl(var(--brand))",
        "brand-2": "hsl(var(--brand-2))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))",
        focus: "hsl(var(--focus))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        main: "hsl(var(--brand))",
        "main-foreground": "hsl(var(--primary-foreground))",
        surface: "hsl(var(--surface-2))",
        "surface-foreground": "hsl(var(--text-1))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      boxShadow: {
        soft: "0 1px 2px hsl(var(--text-1) / 0.05), 0 8px 24px hsl(var(--text-1) / 0.04)",
        lift: "0 2px 8px hsl(var(--text-1) / 0.07), 0 18px 34px hsl(var(--text-1) / 0.09)",
        glow: "0 0 0 4px hsl(var(--brand) / 0.16)",
      },
      transitionDuration: {
        180: "180ms",
      },
      fontFamily: {
        heading: ['"Space Grotesk"', '"Trebuchet MS"', "sans-serif"],
        body: ['"Manrope"', '"Segoe UI"', '"Helvetica Neue"', "sans-serif"],
      },
      maxWidth: {
        app: "76rem",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "toast-in": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "toast-out": {
          from: { opacity: "1", transform: "translateY(0)" },
          to: { opacity: "0", transform: "translateY(8px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "toast-in": "toast-in 0.2s ease-out",
        "toast-out": "toast-out 0.2s ease-in",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
