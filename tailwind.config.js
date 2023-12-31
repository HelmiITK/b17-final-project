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
      fadeIn: {
        "0%": {
          opacity: 0,
        },
        "35%": {
          opacity: 50,
        },
        "50%": {
          opacity: 100,
        },
        "85%": {
          opacity: 50,
        },
        "100%": {
          opacity: 0,
        },
      },
      pulse: {
        "0%, 100%": {
          transform: "scale(1)",
        },
        "50%": {
          transform: "scale(1.05)",
        },
      },
      bounce: {
        "0%, 100%": {
          transform: "translateY(-25%)",
          animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
        },
        "50%": {
          transform: "translateY(0)",
          animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
        },
      },
    },
    animation: {
      fade: "fadeLeft 0.8s ease-out",
      fadeIn: "fadeIn 2.5s ease-in infinite",
      pulse: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      bounce: "bounce 1s infinite",
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
      },
      colors: {
        color: {
          primary: "#003E9C",
          secondary: "#0065FF",
          test2: "#DBF227",
          layer: "#EBF3FC",
          layer2: "D6D58E",
          warn: "#ff0000",
        },
      },
      backgroundColor: {
        primary: "#003E9C",
        secondary: "#0065FF",
        layer: "#EBF3FC",
        layer2: "#F3F7FB",
        blur: "rgba(255, 255, 255, 0.5)",
      },
    },
  },
  plugins: [],
};