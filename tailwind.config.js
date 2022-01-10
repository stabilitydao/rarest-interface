const colors = require('tailwindcss/colors')

module.exports = {
    darkMode: 'class',
    content: [
        './src/components/**/*.{ts,tsx,js,jsx}',
        './src/pages/**/*.{ts,tsx,js,jsx}'
    ],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.gray,
            pink: colors.pink,
            indigo: colors.indigo,
            purple: colors.purple,
            orange: colors.orange,
            cyan: colors.cyan,
            violet: colors.violet,
            sky: colors.sky,
            green: colors.green,
            red: colors.red,
            slate: colors.slate,
        },
        extend: {
            fontFamily: {
                Roboto: ['Roboto']
            },
        },
    },
    variants: {},
    plugins: [],
}
