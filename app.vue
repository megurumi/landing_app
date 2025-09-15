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
  ],
  link: [
    { rel: "icon", type: "image/png", href: "/favicon.png" },
    { rel: "canonical", href: config.public.NUXT_APP_DOMAIN },
  ],
  htmlAttrs: {
    lang: locale.value,
  },
});

useSeoMeta({
  author: "Megurumi Creative",
  publisher: "Megurumi Creative",
  titleTemplate: "%s | Megurumi",
  description: t("description"),
  ogLocale: locale.value,
  ogDescription: t("description"),
  ogImage: "https://megurumi.com/img/landing/hero.png",
  ogImageAlt: "Megurumi",
  ogSiteName: "Megurumi Creative",
  ogTitle: t("title"),
  ogUrl: "https://megurumi.com",
  ogType: "website",
  ogImageWidth: "1792",
  ogImageHeight: "1024",
  ogImageType: "image/png",
  twitterTitle: t("title"),
  twitterDescription: t("description"),
  twitterImage: "https://megurumi.com/img/landing/hero.png",
  twitterCard: "summary_large_image",
  themeColor: "#6366f1",
  msapplicationTileColor: "#6366f1",
  msapplicationConfig: "/browserconfig.xml",
  keywords: t("keywords"),
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
    "description": "Explore unique handmade creations, get inspired, and connect with crochet enthusiasts.",
    "keywords": "crochet patterns, amigurumi patterns, handmade crochet, crochet tutorials, amigurumi animals,crochet creations, handmade toys, crochet whale, crochet turtle, crochet chick, crochet owl, crochet octopus, crochet red panda, crochet elephant, crochet mouse, crochet pig, crochet dragon, crochet bat, crochet monster, DIY crochet, beginner crochet, intermediate crochet, crochet community, yarn crafts, fiber arts, cute amigurumi, kawaii crochet, safety eyes crochet, stuffed animals crochet, crochet gifts, handmade gifts, craft patterns, digital patterns, instant download patterns, crochet inspiration, creative crochet, unique crochet designs, modern amigurumi, trendy crochet, crochet for beginners, step by step crochet, video tutorials crochet, YouTube crochet, free crochet tutorials, premium crochet patterns, Etsy crochet patterns, Canadian crochet designer, Megurumi Creative, crochet artist, independent pattern designer"
  },
  "fr": {
    "title": "Profitez de l'art du crochet avec Megurumi Creative. ",
    "description": "Explorez des créations uniques faites à la main, inspirez-vous et connectez-vous avec des passionnés de crochet.",
    "keywords": "patrons de crochet, patrons amigurumi, crochet fait main, tutoriels crochet, animaux amigurumi, créations crochet, jouets faits main, baleine crochet, tortue crochet, poussin crochet, hibou crochet, pieuvre crochet, panda roux crochet, éléphant crochet, souris crochet, cochon crochet, dragon crochet, chauve-souris crochet, monstre crochet, crochet DIY, crochet débutant, crochet intermédiaire, communauté crochet, artisanat laine, arts textiles, amigurumi mignon, crochet kawaii, yeux de sécurité crochet, peluches crochet, cadeaux crochet, cadeaux faits main, patrons d'artisanat, patrons numériques, patrons téléchargement instantané, inspiration crochet, crochet créatif, designs crochet uniques, amigurumi moderne, crochet tendance, crochet pour débutants, crochet étape par étape, tutoriels vidéo crochet, YouTube crochet, tutoriels crochet gratuits, patrons crochet premium, patrons crochet Etsy, créatrice crochet canadienne, Megurumi Creative, artiste crochet, créatrice de patrons indépendante"
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
