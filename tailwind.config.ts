import type { Config } from 'tailwindcss'

const config: Config = {
  // Tailwind v4 uses CSS-first config, but we still need content scanning
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './store/**/*.{js,ts,jsx,tsx}',
    './emails/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          '2': 'var(--color-surface-2)',
          offset: 'var(--color-surface-offset)',
        },
        border: 'var(--color-border)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
        },
        secondary: 'var(--color-secondary)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        'text-base': 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        'text-faint': 'var(--color-text-faint)',
      },
      fontFamily: {
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
      },
    },
  },
  plugins: [],
}

export default config
