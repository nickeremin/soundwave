import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xs: "440px",
        xxs: "380px",
      },
      colors: {
        // System Colors
        red: "rgb(var(--red-color))",
        orange: "rgb(var(--orange-color))",
        yellow: "rgb(var(--yellow-color))",
        green: "rgb(var(--green-color))",
        mint: "rgb(var(--mint-color))",
        blue: "rgb(var(--blue-color))",
        purple: "rgb(var(--purple-color))",
        pink: "rgb(var(--pink-color))",

        // System Gray Colors
        gray: {
          100: "rgb(var(--gray-color-100))",
          200: "rgb(var(--gray-color-200))",
          300: "rgb(var(--gray-color-300))",
          400: "rgb(var(--gray-color-400))",
          500: "rgb(var(--gray-color-500))",
          600: "rgb(var(--gray-color-600))",
          light: "rgb(var(--gray-light))",
          dark: "rgb(var(--gray-dark))",
        },

        // Custom Colors
        link: "rgb(var(--link-color))",

        // Components Colors
        background: {
          DEFAULT: "rgb(var(--background))",
          100: "rgb(var(--ds-background-100))",
          200: "rgb(var(--ds-background-200))",
        },

        primary: {
          DEFAULT: "rgb(var(--primary))",
          foreground: "rgb(var(--primary-foreground))",
        },
        secondary: "rgb(var(--secondary))",
        tertiary: "rgb(var(--tertiary))",

        muted: {
          DEFAULT: "rgb(var(--muted))",
          foreground: "rgb(var(--muted-foreground))",
        },

        accent: {
          DEFAULT: "rgb(var(--accent))",
          foreground: "rgb(var(--accent-foreground))",
        },

        destructive: {
          DEFAULT: "rgb(var(--destructive))",
          foreground: "rgb(var(--destructive-foreground))",
        },

        themed: {
          border: "var(--themed-border)",
          "border-hover": "var(--themed-border-hover)",
        },

        border: "rgb(var(--border))",
        ring: "rgb(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        "border-nav": "0 1px 0 0 rgb(var(--border))",
        "border-t": "inset 0 1px 0 0 rgb(var(--border))",
        "border-b": "inset 0 -1px 0 0 rgb(var(--border))",
        "border-r": "inset -1px 0 0 0 rgb(var(--border))",
        "border-l": "inset 1px 0 0 0 rgb(var(--border))",
        popover:
          "0 0 0 1px hsl(var(--border)), 0px 1px 1px rgba(0,0,0,.02), 0px 4px 8px -4px rgba(0,0,0,.04), 0px 16px 24px -8px rgba(0,0,0,.06)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
