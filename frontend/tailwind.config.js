/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Light mode colors
        light: {
          bg: '#ffffff',
          surface: '#f8fafc',
          text: '#1e293b',
          'text-muted': '#64748b',
          border: '#e2e8f0',
          'border-accent': '#cbd5e1',
        },
        // Dark mode colors
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          text: '#f1f5f9',
          'text-muted': '#94a3b8',
          border: '#334155',
          'border-accent': '#475569',
        },
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}