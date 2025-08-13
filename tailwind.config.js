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
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        lightBase: '#FFFFFF',
        darkBase: '#00332D',
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        hover: '#24A77B',
        textLight: '#1A1A1A',
        textDark: '#00332D',
        warning: '#F4A259',
        deepGreen: '#14532D',
        midGreen: '#3CB371',
        softGreen: '#8ACB8A',
        lightMint: '#CBDDD1',
        ghostWhite: '#F8FFFA',

        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },

        // ✅ Centralized UI palette for AppShell & LeftNavigationBar
        ui: {
          navigationLight: '#ffffff',
          navigationDark: '#272727',
          activeLight: '#ffffff',
          activeDark: '#333333',
          pageLight: '#ffffff',
          pageDark: '#303030',
          appBgLight: '#f3f4f6',
          appBgDark: '#4A4A4A',
          borderLight: '#ffffff',
          borderDark: '#374151',
          textLight: '#ffffff',
          textDark: '#f3f4f6'
        }
      },
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif']
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: 'var(--radius)',
        xl: '1.5rem',
        '2xl': '2rem',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};