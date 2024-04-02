import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        "primLight":"#1B4BB0",
        "secLight":"#e6eeff",
        "borderLight":"#99b9ff",
        "accentLight":"#ffaa00",
        "accentBorderLight":"#ffdd99",
        "accentTextLight":"#fff",
        "textLight":"#FFFFFF",
        "primDark":"#1a4ab0",
        "secDark":"#03091a",
        "borderDark":"#081d4d",
        "accentDark":"#cc8800",
        "accentBorderDark":"#ccb87a",
        "accentTextDark":"#000",
        "textDark":"#000000",
      },
    },
  },
  plugins: [],
};
export default config;
