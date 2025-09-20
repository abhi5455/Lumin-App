/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#178671',
      },
      fontFamily: {
        'poppins': ['Poppins-Regular'],
        'poppinsMedium': ['Poppins-Medium'],
        'poppinsSemiBold': ['Poppins-SemiBold'],
        'poppinsBold': ['Poppins-Bold'],
        'poppinsLight': ['Poppins-Light'],
      },
    },
  },
  plugins: [],
}
