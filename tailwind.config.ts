import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'ig-red': "var(--red)",
        'ig-orange': "var(--orange)",
        'ig-blue': '#046FC2',
        'ig-lightblue': '#4FC3F7'
      },
    },
  },
  plugins: [],
} satisfies Config;
