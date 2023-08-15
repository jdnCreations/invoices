import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      spartan: "League Spartan",
    },
    colors: {
      white: "rgb(255, 255, 255)",
      light: "rgb(248,248,251)",
      "blue-500": "rgb(30, 33, 57)",
      "blue-400": "rgb(37,41,69)",
      "purple-200": "rgb(146, 119, 255)",
      "purple-300": "rgb(124, 93, 250)",
      "neutral-100": "rgb(223,227,250)",
      "neutral-200": "rgb(136,142,176)",
      "neutral-300": "rgb(126,136,195)",
    },
  },
  plugins: [],
} satisfies Config;
