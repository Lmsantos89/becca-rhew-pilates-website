import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        beige: '#F5F0EB',
        accent: '#7A9E7E',
        'text-primary': '#2C2C2C',
        muted: '#9A9A8A',
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
