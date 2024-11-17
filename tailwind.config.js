/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "@/assets/**/*.{vue,js,css}",
    "@/components/**/*.{vue,js,css}",
    "@/layouts/**/*.{vue,js,css}",
    "@/pages/**/*.{vue,js,css}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-primeui")],
};
