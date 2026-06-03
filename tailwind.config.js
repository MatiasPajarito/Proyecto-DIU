/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores oficiales USM adaptados para una UI moderna
        'usm-blue': '#002447',  // Azul profundo institucional
        'usm-gold': '#3d85c6',  // Azul de acento / azul claro
        'usm-accent': '#cbd5e1', // Gris sutil para bordes
        'usm-bg': '#f8fafc',    // Fondo limpio para dashboards
      },
      fontFamily: {
        // Tipografía Sans-Serif limpia recomendada para interfaces digitales
        sans: ['Arial', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}