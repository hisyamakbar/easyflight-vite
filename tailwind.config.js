/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js}, ./node_modules/flowbite/**/*.js"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
        },
    },
    plugins: [
        require("flowbite/plugin")({
            charts: true,
        }),
    ],
};
