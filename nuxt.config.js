// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxtjs/proxy",
    [
      "@pinia/nuxt",
      {
        autoImports: [
          ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
  ],
  googleFonts: {
    families: {
      Poppins: true,
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.js",
    exposeConfig: false,
    config: {},
    injectPosition: 0,
    viewer: true,
  },
  runtimeConfig: {
    public: {
      magicPublishableKey: process.env.MAGIC_PUBLISHABLE_KEY,
    },
    private: {
      dbAccessKeyId: process.env.DB_ACCESS_KEY_ID,
      dbSecretAccessKey: process.env.DB_SECRET_ACCESS_KEY,
      jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
      jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    },
  },
  serverMiddleware: {
    "/api": "~/api",
  },
});
