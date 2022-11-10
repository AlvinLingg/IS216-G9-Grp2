/** @type {import('tailwindcss').Config} */
const { screens } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
    `./nuxt.config.{js,ts}`,
  ],
  theme: {
    screens: {
      xs: "520px",
      ...screens,
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#FFD67E",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
