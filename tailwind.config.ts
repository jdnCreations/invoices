import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "item-list": "214px 46px 100px 1fr 1fr",
      },
    },
    fontFamily: {
      spartan: "League Spartan",
    },
    colors: {
      white: "rgb(255, 255, 255)",
      light: "rgb(248,248,251)",
      "01": "rgb(124,93,250)",
      "02": "rgb(146,119,255)",
      "03": "rgb(30,33,57)",
      "04": "rgb(37,41,69)",
      "05": "rgb(223,227, 250)",
      "06": "rgb(136,142,176)",
      "07": "rgb(126,136,195)",
      "08": "rgb(12,14,22)",
      "09": "rgb(236,87,87)",
      "10": "rgb(255,151,151)",
      "11": "rgb(248,248,251)",
      "12": "rgb(20,22,37)",
      "accent-green": "#33D69F",
      "accent-orange": "#FF8F00",
      "accent-gray": "#373B53",
    },
    fontSize: {
      "heading-l": "2.25rem",
      "heading-m": "1.5rem",
      "heading-s": "0.9375rem",
      body: "0.8125rem",
    },
    lineHeight: {
      "heading-l": "2.0625rem",
      "heading-m": "1.375rem",
      "heading-s": "1.5rem",
      "heading-s-var": "0.9375rem",
      body: "1.125rem",
      "body-var": "0.9375rem",
    },
    letterSpacing: {
      "heading-l": "-0.07031rem",
      "heading-m": "-0.04688rem",
      "heading-s": "-0.01563rem",
    },
  },
  plugins: [],
} satisfies Config;
