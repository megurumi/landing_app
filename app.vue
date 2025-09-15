<script lang="ts" setup>
import { Analytics } from "@vercel/analytics/nuxt";
import { SpeedInsights } from "@vercel/speed-insights/nuxt";

const { t, locale } = useI18n();
const config = useRuntimeConfig();

useHead({
  title: "App",
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "author", content: "Megurumi" },
  ],
  link: [
    { rel: "icon", type: "image/png", href: "/favicon.png" },
    { rel: "canonical", href: config.public.NUXT_APP_DOMAIN },
  ],
  htmlAttrs: {
    lang: () => locale.value,
  },
});

useSeoMeta({
  titleTemplate: "%s | Megurumi",
  description: t("description"),
  ogLocale: locale.value,
  ogDescription: t("description"),
  ogImage: "https://megurumi.com/img/landing/hero.png",
  ogImageAlt: "Megurumi",
  ogSiteName: "Megurumi Creative",
  ogTitle: t("title"),
  ogUrl: "https://megurumi.com",
  twitterTitle: t("title"),
  twitterDescription: t("description"),
  twitterImage: "https://megurumi.com/img/landing/hero.png",
  twitterCard: "summary_large_image",
  themeColor: "#6366f1",
});
</script>

<template>
  <VitePwaManifest />
  <SpeedInsights />
  <Analytics />
  <UNotifications />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Enjoy the art of crochet with Megurumi Creative",
    "description": "Explore unique handmade creations, get inspired, and connect with crochet enthusiasts."
  },
  "fr": {
    "title": "Profitez de l'art du crochet avec Megurumi Creative. ",
    "description": "Explorez des créations uniques faites à la main, inspirez-vous et connectez-vous avec des passionnés de crochet."
  }
}
</i18n>

<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
