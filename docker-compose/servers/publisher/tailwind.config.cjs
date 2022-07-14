/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/views/*.ejs"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Cambria", "Cochin", "Georgia", "Times", "Times New Roman", "serif"]
      }
    },
  },
  plugins: [],
}
