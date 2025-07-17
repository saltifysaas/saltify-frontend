/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // ✅ Ensures App Router files are scanned
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
      },
    },
  },
  plugins: [],
}
