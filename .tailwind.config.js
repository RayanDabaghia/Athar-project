/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/*.{js,ts,jsx,tsx}",
        "./App.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0A3A45',
                primary2: '#FFC107',
                primary3: '#F4C542',
                primary4: '#FFD95A',
            },
            fontFamily: {
                inter: ["Inter", "sans-serif"],
                adlam: ["ADLaM Display", "cursive"],
                outfit: ['Outfit', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
            },



        },
    },
    plugins: [],
}