export default defineNuxtConfig({
  app: {
    layoutTransition: {
      name: "layout",
    },
  },
  colorMode: {
    preference: "system",
  },
  compatibilityDate: "2024-09-07",
  devtools: {
    enabled: process.env.NODE_ENV !== "production",
  },
  extends: ["@nuxt/ui-pro"],
  i18n: {
    baseUrl: process.env.NUXT_APP_DOMAIN,
    defaultLocale: "en",
    detectBrowserLanguage: false,
    locales: [
      {
        code: "en",
        file: "en.json",
        name: "English",
      },
      {
        code: "fr",
        file: "fr.json",
        name: "Français",
      },
    ],
    langDir: "lang/",
    lazy: true,
    strategy: "prefix_except_default",
  },
  image: {
    provider: process.env.NODE_ENV === "production" ? "vercel" : "ipx",
  },
  modules: [
    "@nuxt/content",
    "@nuxt/devtools",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@nuxtjs/sitemap",
    "@nuxtjs/device",
    "@pinia/nuxt",
    "@vite-pwa/nuxt",
    "@vueuse/nuxt",
    "nuxt-viewport",
  ],
  nitro: {
    experimental: {
      openAPI: true,
    },
    future: {
      nativeSWR: true,
    },
    preset: "vercel",
    prerender: {
      crawlLinks: true,
      routes: [
        "/",
        "/fr",
        "/landing/terms",
        "/fr/landing/terms",
        "/landing/policy",
        "/fr/landing/policy",
      ],
    },
  },
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Megurumi Creative",
      short_name: "Megurumi",
      description:
        "Explore a collection of unique crochet creations, from adorable amigurumi to stylish accessories, all crafted with love and creativity.",
      theme_color: "#6366f1",
      icons: [
        {
          src: "/img/pwa/16.png",
          sizes: "16x16",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/20.png",
          sizes: "20x20",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/29.png",
          sizes: "29x29",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/32.png",
          sizes: "32x32",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/40.png",
          sizes: "40x40",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/48.png",
          sizes: "48x48",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/50.png",
          sizes: "50x50",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/57.png",
          sizes: "57x57",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/58.png",
          sizes: "58x58",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/60.png",
          sizes: "60x60",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/64.png",
          sizes: "64x64",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/72.png",
          sizes: "72x72",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/76.png",
          sizes: "76x76",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/80.png",
          sizes: "80x80",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/87.png",
          sizes: "87x87",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/96.png",
          sizes: "96x96",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/100.png",
          sizes: "100x100",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/114.png",
          sizes: "114x114",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/120.png",
          sizes: "120x120",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/128.png",
          sizes: "128x128",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/144.png",
          sizes: "144x144",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/152.png",
          sizes: "152x152",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/167.png",
          sizes: "167x167",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/180.png",
          sizes: "180x180",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/256.png",
          sizes: "256x256",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/img/pwa/1024.png",
          sizes: "1024x1024",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.*"],
      maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
      runtimeCaching: [
        {
          urlPattern: /\.(?:pdf)$/,
          handler: "NetworkOnly",
        },
      ],
    },
    client: {
      installPrompt: false,
      periodicSyncForUpdates: 86400,
    },
  },
  runtimeConfig: {
    public: {
      NUXT_APP_DOMAIN: process.env.NUXT_APP_DOMAIN,
    },
  },
  site: {
    url: process.env.NUXT_APP_DOMAIN,
    name: "Megurumi Creative",
  },
  tailwindcss: {
    viewer: false,
  },
  typescript: {
    strict: true,
  },
});
