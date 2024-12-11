/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/app/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                primary: '#588157',
                secondary: '#A3B18A',
                accent: '#344E41',
                tertiary: '#3A5A40',
                ivory: '#F3ECDC'
            }
        }
    },
    plugins: []
}
