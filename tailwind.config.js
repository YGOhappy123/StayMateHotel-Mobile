/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/app/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins-Regular', 'sans-serif'],
                'pp-light': ['Poppins-Light', 'sans-serif'],
                'pp-regular': ['Poppins-Regular', 'sans-serif'],
                'pp-medium': ['Poppins-Medium', 'sans-serif'],
                'pp-semibold': ['Poppins-SemiBold', 'sans-serif'],
                'pp-bold': ['Poppins-Bold', 'sans-serif'],
                'pp-extrabold': ['Poppins-Extrabold', 'sans-serif'],
                'pp-black': ['Poppins-Black', 'sans-serif']
            }
        }
    },
    plugins: []
}
