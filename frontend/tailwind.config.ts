import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
      },
      fontFamily: {
        cardo: ['Cardo', 'serif'],
        hanken: ['Hanken Grotesk', 'sans-serif'],
        inter: ['Inter Variable', 'sans-serif'],
        unbounded: ['Unbounded', 'sans-serif'],
        xstore: ['Xstore Icons', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;