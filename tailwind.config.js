/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        espresso: '#1a0f00',
        roast:    '#2d1a00',
        mahogany: '#4a2800',
        caramel:  '#8B5E3C',
        cream:    '#F5EDD9',
        parchment:'#EDE0C4',
        mist:     '#F9F4EC',
        gold:     '#C8923A',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
}
