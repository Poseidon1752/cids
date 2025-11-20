import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-secondary': 'var(--gradient-secondary)',
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-card': 'var(--gradient-card)',
      },
      boxShadow: {
        'glow': 'var(--shadow-glow)',
        'card': 'var(--shadow-card)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 20px hsl(var(--primary) / 0.3), 0 0 40px hsl(var(--primary) / 0.2)",
            filter: "brightness(1)"
          },
          "50%": { 
            boxShadow: "0 0 40px hsl(var(--primary) / 0.6), 0 0 80px hsl(var(--primary) / 0.4)",
            filter: "brightness(1.2)"
          },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "ripple": {
          "0%": { 
            transform: "scale(0.8)",
            opacity: "1"
          },
          "100%": { 
            transform: "scale(2.5)",
            opacity: "0"
          },
        },
        "particle-float": {
          "0%": { 
            transform: "translateY(0) translateX(0) rotate(0deg)",
            opacity: "1"
          },
          "100%": { 
            transform: "translateY(-100px) translateX(30px) rotate(360deg)",
            opacity: "0"
          },
        },
        "trail": {
          "0%": { 
            opacity: "1",
            transform: "scale(1)"
          },
          "100%": { 
            opacity: "0",
            transform: "scale(0.5)"
          },
        },
        "code-highlight": {
          "0%": { 
            backgroundColor: "hsl(var(--primary) / 0)",
            transform: "translateX(-10px)",
          },
          "50%": { 
            backgroundColor: "hsl(var(--primary) / 0.3)",
            transform: "translateX(0)",
          },
          "100%": { 
            backgroundColor: "hsl(var(--primary) / 0.1)",
            transform: "translateX(0)",
          },
        },
        "morph": {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
        "slide-up-fade": {
          "0%": { 
            opacity: "0",
            transform: "translateY(20px)"
          },
          "100%": { 
            opacity: "1",
            transform: "translateY(0)"
          },
        },
        "scale-bounce": {
          "0%": { 
            transform: "scale(0)"
          },
          "50%": { 
            transform: "scale(1.1)"
          },
          "100%": { 
            transform: "scale(1)"
          },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "ripple": "ripple 1s ease-out forwards",
        "particle-float": "particle-float 2s ease-out forwards",
        "trail": "trail 0.8s ease-out forwards",
        "code-highlight": "code-highlight 0.6s ease-out forwards",
        "morph": "morph 8s ease-in-out infinite",
        "slide-up-fade": "slide-up-fade 0.5s ease-out forwards",
        "scale-bounce": "scale-bounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards",
        "wiggle": "wiggle 0.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
