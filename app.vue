<script lang="ts" setup>
import { Analytics } from "@vercel/analytics/nuxt";
import { SpeedInsights } from '@vercel/speed-insights/vue';

const { t, locale } = useI18n();
const config = useRuntimeConfig();
const localePath = useLocalePath()

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
  author: t("brand"),
  publisher: t("brand"),
  titleTemplate: "%s | Megurumi",
  description: t("description"),
  ogLocale: locale.value,
  ogDescription: t("description"),
  ogImage: `${config.public.NUXT_APP_DOMAIN}/img/landing/hero.png`,
  ogImageAlt: t("brand_short"),
  ogSiteName: t("brand"),
  ogTitle: t("title"),
  ogUrl: `${config.public.NUXT_APP_DOMAIN}${localePath('/')}`,
  ogType: "website",
  ogImageWidth: "1792",
  ogImageHeight: "1024",
  ogImageType: "image/png",
  twitterTitle: t("title"),
  twitterDescription: t("description"),
  twitterImage: `${config.public.NUXT_APP_DOMAIN}/img/landing/hero.png`,
  twitterCard: "summary_large_image",
  themeColor: "#6366f1",
  msapplicationTileColor: "#6366f1",
  msapplicationConfig: "/browserconfig.xml",
  keywords: t("keywords"),
});

useSchemaOrg([
  defineOrganization({
    name: t("brand"),
    alternateName: t("brand_short"),
    url: `${config.public.NUXT_APP_DOMAIN}${localePath('/')}`,
    logo: `${config.public.NUXT_APP_DOMAIN}/img/brand/filled.png`,
    image: `${config.public.NUXT_APP_DOMAIN}/img/landing/hero.png`,
    description: t("description"),
    foundingDate: '2025-01-03',
    founder: {
      '@type': 'Person',
      name: 'Mélanie Dubois',
      sameAs: [
        'https://www.youtube.com/@megurumi_creative',
        'https://www.instagram.com/megurumi_creative',
        'https://www.tiktok.com/@megurumi_creative',
        'https://www.facebook.com/megurumicreative',
        'https://www.etsy.com/ca/shop/MegurumiCreative'
      ]
    },
    keywords: t("keywords"),
    slogan: t("title"),
    brand: {
      '@type': 'Brand',
      name: t("brand")
    },
    sameAs: [
      'https://www.youtube.com/@megurumi_creative',
      'https://www.facebook.com/megurumicreative',
      'https://www.instagram.com/megurumi_creative',
      'https://www.tiktok.com/@megurumi_creative',
      'https://www.etsy.com/ca/shop/MegurumiCreative'
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        availableLanguage: ['English', 'French'],
        url: 'https://www.etsy.com/ca/shop/MegurumiCreative'
      }
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CA',
      addressRegion: 'QC',
      addressLocality: 'Montreal',
      postalCode: 'H2J 4G1',
    },
    areaServed: ['CA', 'US', 'worldwide'],
    knowsAbout: t("knowsAbout").split(', '),
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: t("productsOffer.name"),
          description: t("productsOffer.description"),
          category: 'Digital Downloads',
          brand: t("brand")
        },
        price: 'varies',
        priceCurrency: 'CAD',
        availability: 'InStock',
        validFrom: '2025-01-01',
        seller: {
          '@type': 'Organization',
          name: t("brand")
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: t("learningOffer.name"),
          description: t("learningOffer.description"),
          serviceType: 'Educational Content'
        },
        price: '0',
        priceCurrency: 'CAD',
        availability: 'InStock'
      },
    ]
  }),
  defineWebSite({
    name: t("brand"),
    alternateName: t("brand_short"),
    url: `${config.public.NUXT_APP_DOMAIN}${localePath('/')}`,
    description: t("description"),
    inLanguage: ['en', 'fr'],
    publisher: {
      '@type': 'Organization',
      '@id': `${config.public.NUXT_APP_DOMAIN}${localePath('/landing/policy')}`
    },
    copyrightHolder: {
      '@type': 'Organization',
      '@id': `${config.public.NUXT_APP_DOMAIN}${localePath('/landing/policy')}`
    },
    copyrightYear: '2025',
    genre: t("genre").split(', '),
    keywords: t("keywords"),
    audience: {
      '@type': 'Audience',
      audienceType: t("audience"),
      geographicArea: ['CA', 'US', 'FR', 'worldwide'],
      suggestedMinAge: 12,
      suggestedMaxAge: 99
    },
    mainEntity: {
      '@type': 'Organization',
      '@id': `${config.public.NUXT_APP_DOMAIN}${localePath('/')}`,
    },
  }),
  defineLocalBusiness({
    name: t("brand"),
    description: t("description"),
    url: `${config.public.NUXT_APP_DOMAIN}${localePath('/')}`,
    priceRange: '$',
    paymentAccepted: 'Credit Card, PayPal, Etsy Payments',
    currenciesAccepted: 'CAD, USD, EUR',
    openingHours: 'Mo-Su 00:00-23:59',
    areaServed: ['CA', 'US', 'worldwide'],
    serviceType: 'Digital Products'
  })
]);
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
    "keywords": "crochet patterns, amigurumi patterns, handmade crochet, crochet tutorials, amigurumi animals,crochet creations, handmade toys, crochet whale, crochet turtle, crochet chick, crochet owl, crochet octopus, crochet red panda, crochet elephant, crochet mouse, crochet pig, crochet dragon, crochet bat, crochet monster, DIY crochet, beginner crochet, intermediate crochet, crochet community, yarn crafts, fiber arts, cute amigurumi, kawaii crochet, safety eyes crochet, stuffed animals crochet, crochet gifts, handmade gifts, craft patterns, digital patterns, instant download patterns, crochet inspiration, creative crochet, unique crochet designs, modern amigurumi, trendy crochet, crochet for beginners, step by step crochet, video tutorials crochet, YouTube crochet, free crochet tutorials, premium crochet patterns, Etsy crochet patterns, Canadian crochet designer, Megurumi Creative, crochet artist, independent pattern designer",
    "audience": "crochet enthusiasts, amigurumi lovers, DIY crafters, handmade toy creators, pattern designers, yarn artists, creative hobbyists",
    "genre": "Crochet Patterns, Amigurumi Tutorials, Handmade Crafts, Digital Downloads, Arts & Crafts Education",
    "knowsAbout": "crochet techniques, amigurumi construction, yarn selection, hook sizes, stitch patterns, pattern reading, safety eyes placement, stuffing techniques, color theory, fiber arts, handmade toy safety, digital pattern creation, video tutorials, beginner instruction, advanced techniques, kawaii design, modern amigurumi, traditional crochet, sustainable crafting, online teaching",
    "productsOffer": {
      "name": "Premium Crochet Patterns & Amigurumi Tutorials",
      "description": "High-quality digital patterns with step-by-step instructions and video tutorials"
    },
    "learningOffer": {
      "name": "Free Crochet Learning Resources",
      "description": "Complimentary tutorials, guides, and community support"
    }
  },
  "fr": {
    "title": "Profitez de l'art du crochet avec Megurumi Creative. ",
    "description": "Explorez des créations uniques faites à la main, inspirez-vous et connectez-vous avec des passionnés de crochet.",
    "keywords": "patrons de crochet, patrons amigurumi, crochet fait main, tutoriels crochet, animaux amigurumi, créations crochet, jouets faits main, baleine crochet, tortue crochet, poussin crochet, hibou crochet, pieuvre crochet, panda roux crochet, éléphant crochet, souris crochet, cochon crochet, dragon crochet, chauve-souris crochet, monstre crochet, crochet DIY, crochet débutant, crochet intermédiaire, communauté crochet, artisanat laine, arts textiles, amigurumi mignon, crochet kawaii, yeux de sécurité crochet, peluches crochet, cadeaux crochet, cadeaux faits main, patrons d'artisanat, patrons numériques, patrons téléchargement instantané, inspiration crochet, crochet créatif, designs crochet uniques, amigurumi moderne, crochet tendance, crochet pour débutants, crochet étape par étape, tutoriels vidéo crochet, YouTube crochet, tutoriels crochet gratuits, patrons crochet premium, patrons crochet Etsy, créatrice crochet canadienne, Megurumi Creative, artiste crochet, créatrice de patrons indépendante",
    "audience": "passionnés de crochet, amateurs d'amigurumi, artisans DIY, créateurs de jouets faits main, créateurs de patrons, artistes du fil, passionnés créatifs",
    "genre": "Patrons de Crochet, Tutoriels Amigurumi, Artisanat Fait Main, Téléchargements Numériques, Éducation Arts et Artisanat",
    "knowsAbout": "techniques de crochet, construction amigurumi, sélection de fils, tailles de crochets, motifs de points, lecture de patrons, placement d'yeux de sécurité, techniques de rembourrage, théorie des couleurs, arts textiles, sécurité des jouets faits main, création de patrons numériques, tutoriels vidéo, instruction débutant, techniques avancées, design kawaii, amigurumi moderne, crochet traditionnel, artisanat durable, enseignement en ligne",
    "productsOffer": {
      "name": "Patrons de Crochet Premium et Tutoriels Amigurumi",
      "description": "Patrons numériques de haute qualité avec instructions détaillées et tutoriels vidéo"
    },
    "learningOffer": {
      "name": "Ressources d'Apprentissage Crochet Gratuites",
      "description": "Tutoriels gratuits, guides et soutien communautaire"
    }
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
