import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Ensure all relevant file extensions are included
  ],
  plugins: [require('daisyui')],
};

export default config;
