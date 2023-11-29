import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontFamily: {
      sarala: ["var(--sarala-font)"],
      staatliches: ["var(--staatliches-font)"],
    },
    colors: {
      blue: {
        100: "#7CACF3",
        300: "#4488EE",
        500: "#1565DF",
        600: "#114AA1", // interpolated
        700: "#0C1027",
        900: "#090C1D",
      },
      teal: {
        100: "#9AFBF5",
        300: "#5DF9FE",
        500: "#1CF6FE",
        700: "#01D8DF",
        900: "#019DA2",
      },
      pink: {
        100: "#FE9AC7",
        300: "#FE5DA5",
        500: "#FE298A",
        700: "#FE0B78",
        900: "#CB015C",
      },
      alert: {
        red: "#CA3D5A",
        green: "#B1E873",
      },
      neutral: {
        100: "#F0F0F0",
        300: "#DDEAFE",
        500: "#C4D8FD",
        700: "#4C76A1",
        900: "#385472",
      },
      shade: {
        100: "#2C3036",
        300: "#23252C",
        500: "#23252C",
      },
      white: "#FFFFFF",
      transparent: "rgba(0,0,0,0)",
    },
  },
  plugins: [],
};
export default config;
