// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "@nuxtjs/proxy"],
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
    private: {
      dbAccessKeyId: process.env.DB_ACCESS_KEY_ID,
      dbSecretAccessKey: process.env.DB_SECRET_ACCESS_KEY,
    },
  },
  serverMiddleware: {
    "/api": "~/api",
  },
});
