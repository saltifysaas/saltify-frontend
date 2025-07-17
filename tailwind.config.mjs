/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // ✅ App Router coverage
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Ubuntu", "sans-serif"],
      },
      colors: {
        background: "#111827",
        foreground: "#F9FAFB",
        primary: "#272727",
        accent: "#1f5014",
        shade: {
          green: "#457d58",
          soft: "#7d9b76",
        },
        light: "#cbddd1",
        highlight: "#f6f6e9",
      },
    },
  },
  plugins: [],
}
