import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // FF0066
        LONG: "#0DCB81",
        SHORT: "#F6475D",
        Yellow: "#F6D93F",
        Primary: "#6600FF",
        DarkPrimary: "#001122",
        Secondary: "#757575",
        Modal: "#EEEEEE",
      },
    },
  },
  plugins: [],
};
export default config;
