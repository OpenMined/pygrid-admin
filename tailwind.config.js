const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: {
    content: ['./src/**/*.{ts,tsx}']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        rubik: 'Rubik, sans-serif'
      },
      lineHeight: {
        12: '3rem'
      },
      maxWidth: {
        112: '28rem'
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
      }
    }
  },
  variants: {
    extend: {
      animation: ['responsive', 'focus', 'hover', 'active'],
      transitionProperty: ['hover'],
      backgroundColor: ['active', 'disabled'],
      cursor: ['disabled'],
      textColor: ['active']
    },
    textColor: ({after}) => after(['invalid'])
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),

    plugin(function ({addVariant, e}) {
      addVariant('invalid', ({modifySelectors, separator}) => {
        modifySelectors(({className}) => {
          return `.${e(`invalid${separator}${className}`)}:invalid`
        })
      })
    })
  ]
}
