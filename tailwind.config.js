/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    keyframes: {
      fadeLeft: {
        "0%": {
          transform: "translate(-300px)",
        },

        "100%": { transform: "translate(0)" },
      },
    },
    animation: {
      fade: "fadeLeft 0.8s ease-out",
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
      },
      colors: {
        color: {
          primary: "#050642",
          layer: "#EBF3FC",
        },
      },
      backgroundColor: {
        primary: "#050642",
        layer: "#EBF3FC",
        blur: 'rgba(255, 255, 255, 0.5)'
      },
    },
  },
  plugins: [],
};
