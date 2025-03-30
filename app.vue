<script lang="ts" setup>
import { SpeedInsights } from "@vercel/speed-insights/vue";
import { Analytics } from "@vercel/analytics/nuxt";

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
    { rel: "icon", type: "image/png", href: "/favicon.ico" },
    { rel: "canonical", href: config.public.NUXT_APP_DOMAIN },
  ],
  htmlAttrs: {
    lang: () => locale.value,
  },
});

useSeoMeta({
  titleTemplate: "%s | Megurumi",
  description: t("description"),
  ogLocale: () => locale.value,
  ogDescription: () => t("description"),
  ogImage: "",
  ogImageAlt: "Megurumi",
  ogTitle: () => t("title"),
  ogUrl: "https://megurumi.ca",
  twitterTitle: () => t("title"),
  twitterDescription: () => t("description"),
  twitterImage: "",
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
    "title": "Canadian Citizenship Preparation: Tests, Study Materials & Quizzes",
    "description": "Prepare for Canadian Citizenship with our interactive web application. Access a comprehensive set of practice tests, study materials, and quizzes to help you ace Megurumi exam. Get ready for a successful Canadian citizenship journey with us."
  },
  "fr": {
    "title": "Préparation à la Citoyenneté Canadienne: Tests, Matériel d'Étude & Quiz",
    "description": "Préparez-vous à la citoyenneté canadienne avec notre application web interactive. Accédez à une série complète de tests de pratique, de matériel d'étude et de quiz pour vous aider à réussir votre examen de citoyenneté. Préparez-vous pour un parcours réussi vers la citoyenneté canadienne avec nous."
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
