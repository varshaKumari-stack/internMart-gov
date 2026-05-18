// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      animation: {
        float:
          "float 6s ease-in-out infinite",

        glow:
          "glow 3s ease-in-out infinite alternate",

        shakeSlow:
          "shakeSlow 7s infinite",
      },

      keyframes: {
        float: {
          "0%,100%": {
            transform: "translateY(0px)",
          },

          "50%": {
            transform:
              "translateY(-12px)",
          },
        },

        glow: {
          from: {
            boxShadow:
              "0 0 20px rgba(168,85,247,.2)",
          },

          to: {
            boxShadow:
              "0 0 60px rgba(34,211,238,.35)",
          },
        },

        shakeSlow: {
          "0%,100%": {
            transform: "translateX(0)",
          },

          "25%": {
            transform: "translateX(2px)",
          },

          "75%": {
            transform:
              "translateX(-2px)",
          },
        },
      },
    },
  },

  plugins: [],
};