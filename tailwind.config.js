module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "white-8": "rgba(255, 255, 255, 0.8)",
      },
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
      },
    },
    screens: {
      xsm: "550px",
      // => @media (min-width: 550px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
      poppins: ["Poppins", "sans-serif"],
      oxygen: ["Oxygen", "sans-serif"],
    },
  },
  variants: {
    extend: {
      borderWidth: ["focus", "hover"],
      borderStyle: ["hover"],
    },
  },
  plugins: [],
};
