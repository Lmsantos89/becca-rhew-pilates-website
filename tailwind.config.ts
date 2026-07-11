import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        steel: { DEFAULT: '#6F9DB8', dark: '#4F7A93' },
        mint: '#DCEBE6',
        teal: '#5F9A8C',
        cream: '#F7F4EF',
        ink: '#2E3F42',
        muted: '#6B7A7C',
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
