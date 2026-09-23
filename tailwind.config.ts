import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#080808',
          2: '#0e0e0e',
          3: '#141414',
        },
        fg: {
          DEFAULT: '#f0ede8',
          dim: '#5a5a5a',
          mid: '#999999',
        },
        accent: {
          DEFAULT: '#c8f135',
          2: '#ff4d00',
          green: '#3C9952',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      keyframes: {
        telemetryPulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.85)' },
        },
        flowerFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'telemetry-pulse': 'telemetryPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flower-float': 'flowerFloat 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
