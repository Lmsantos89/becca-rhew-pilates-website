import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0D2B45',
        steel: { DEFAULT: '#5A7D9A', dark: '#3E5A73' },
        teal: '#8DBFB7',
        sand: '#DCC7AA',
        mint: '#E7F0ED',
        cream: '#F4F6F6',
        muted: '#6E7F8E',
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      maxWidth: {
        container: '1100px',
      },
    },
  },
  plugins: [],
};

export default config;
