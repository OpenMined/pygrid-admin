module.exports = {
  purge: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        rubik: 'Rubik, sans-serif'
      },
      lineHeight: {
        12: '3rem'
      },
      container: theme => ({
        padding: theme('padding.4')
      }),
      keyframes: {
        punch: {
          '0%, 100%': {transform: 'rotate(-38deg)'},
          '50%': {transform: 'rotate(71deg)'}
        }
      },
      animation: {
        punch: 'punch 250ms ease-in-out'
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontWeight: 'normal'
            }
          }
        }
      }
    }
  },
  variants: {
    extend: {
      animation: ['hover', 'focus', 'active'],
      transitionProperty: ['hover']
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography')
  ]
}
