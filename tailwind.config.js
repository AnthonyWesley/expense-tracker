/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        appPrimaryColor: "#1f2937",
        appSecondaryColor: "#111827",
      },
    },
  },
  plugins: [],
};
