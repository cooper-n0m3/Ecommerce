/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind"

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",flowbite.content()],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [
  require("tailwind-scrollbar"),
  flowbite.plugin(),
  ],
}

