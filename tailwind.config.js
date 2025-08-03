/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode via 'class'
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base Branding
        primary: "#009966", // Cyan-Lime Green
        lightBase: "#FFFFFF", // Milky White
        darkBase: "#00332D", // Dark mode background

        // Accents
        accent: "#00A870", // Emerald Green
        hover: "#24A77B",  // Mint

        // Text Colors
        textLight: "#1A1A1A", // Charcoal
        textDark: "#00332D",  // Off White

        // Alerts
        warning: "#F4A259", // Mango Yellow

        // Additional Palette Options
        deepGreen: "#14532D",
        midGreen: "#3CB371",
        softGreen: "#8ACB8A",
        lightMint: "#CBDDD1",
        ghostWhite: "#F8FFFA",


        extend: {
  colors: {
    primary: "#009966",           // Cyan-Lime Green
    lightBase: "#FFFFFF",         // Milky White
    darkBase: "#00332D",          // Deep background
    accent: "#00A870",            // Emerald Green
    hoverAccent: "#24A77B",       // Mint
    textDark: "#F1F5F4",          // Off White
    textLight: "#1A1A1A",         // Charcoal
    warning: "#F4A259",           // Mango Yellow
  },
}

      },
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
      },
    },
  },
  plugins: [],
};
