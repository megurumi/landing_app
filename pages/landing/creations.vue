<script setup lang="ts">
const { t, locale } = useI18n();
const config = useRuntimeConfig();
const router = useRouter();
const localePath = useLocalePath();

const scrollY = ref(0);

definePageMeta({
  layout: "landing",
});

const { data: page } = await useAsyncData(
  "creations",
  () => queryContent(`/${locale.value}/landing/creations`).findOne(),
  { watch: [locale] }
);
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const productSchemas = computed(() => {
  if (!page.value?.products) return [];

  return page.value.products.map((product: any) =>
    defineProduct({
      name: `${product.name} - ${t("pattern")}`,
      description: product.caption
        .replace(/[🐋💙✨🐢💚🐥🎉😍🦊🐘💜🐭🐷💕🐉🦇🥰🎃🧟]/g, "")
        .trim(),
      image: `${config.public.NUXT_APP_DOMAIN}/${product.image}`,
      brand: true,
      category: t("category"),
      offers: {
        "@type": "Offer",
        url: product.etsy,
        availability: "https://schema.org/InStock",
        priceCurrency: "CAD",
        seller: {
          "@type": "Organization",
          name: t("seller_name"),
        },
      },
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: t("skill_level"),
          value: t("skill_level_value"),
        },
        {
          "@type": "PropertyValue",
          name: t("craft_type"),
          value: t("craft_type_value"),
        },
        {
          "@type": "PropertyValue",
          name: t("language"),
          value: t("language_value"),
        },
      ],
    })
  );
});

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
});

useSchemaOrg([
  defineWebPage({
    "@type": "CollectionPage",
    name: page.value.title,
    description: page.value.description,
    url: `${config.public.NUXT_APP_DOMAIN}${localePath('/landing/creations')}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: t("home"),
          item: `${config.public.NUXT_APP_DOMAIN}${localePath('/')}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Creations",
          item: `${config.public.NUXT_APP_DOMAIN}${localePath('/landing/creations')}`,
        },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: page.value?.products?.length || 0,
      itemListElement:
        page.value?.products?.map((product: any, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            "@id": `${config.public.NUXT_APP_DOMAIN}${localePath('/landing/creations')}#${product.id}`,
          },
        })),
    },
  }),
  ...productSchemas.value,
]);

function onScroll() {
  scrollY.value = window.scrollY;
}

onMounted(() => window.addEventListener("scroll", onScroll));
onUnmounted(() => window.removeEventListener("scroll", onScroll));

const latestProducts = computed(() => [...page.value?.products].reverse());
</script>

<template>
  <UContainer class="mb-20">
    <ULandingHero
      :title="page?.title"
      :description="page?.description"
      orientation="vertical"
    >
      <template #headline>
        <NuxtImg
          :src="page?.hero.image"
          :alt="`${page?.hero.caption} - ${t('profile_alt')}`"
          preset="logo"
          sizes="200px"
          class="object-fit mx-auto rounded-full"
          loading="eager"
          fetchpriority="high"
        />
      </template>
      <div
        class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      />

      <template #links>
        <div class="flex flex-col gap-4 items-center justify-end">
          <UButton v-for="link in page?.links" v-bind="link" />
          <UIcon
            name="i-heroicons-chevron-down"
            class="h-6 w-6 relative -bottom-20 transition-opacity duration-1000 cursor-pointer"
            :class="{ 'opacity-0': scrollY > 50 }"
            @click="router.push(localePath(`/landing/creations#products`))"
          />
        </div>
      </template>
    </ULandingHero>

    <div
      id="products"
      class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pt-20"
    >
      <UCard
        v-for="product in latestProducts"
        :key="product.id"
        :id="product.id"
        class="overflow-hidden hover:shadow-lg transition-shadow"
        :ui="{
          header: { padding: 'p-0 sm:p-0' },
          body: { padding: 'px-2 py-4 sm:p-4' },
          footer: { padding: 'px-2 sm:px-2 py-1' },
        }"
      >
        <template #header>
          <NuxtImg
            :src="product.image"
            :alt="`${product.caption} -  ${t('product_alt')}`"
            preset="card"
            sizes="180px sm:286px"
            class="w-full h-auto max-h-80 object-cover object-center"
            loading="lazy"
          />
        </template>

        <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {{ product.caption }}
        </p>

        <template #footer>
          <div class="flex justify-end w-full">
            <UButton
              v-if="product.instagram"
              :to="product.instagram"
              :aria-label="t('aria_label_instagram')"
              target="_blank"
              color="primary"
              variant="ghost"
              size="lg"
              icon="i-simple-icons-instagram"
            />
            <UButton
              v-if="product.etsy"
              :to="product.etsy"
              :aria-label="t('aria_label_etsy')"
              target="_blank"
              color="primary"
              variant="ghost"
              size="lg"
              icon="i-heroicons-shopping-bag"
            />
          </div>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>

<i18n lang="json">
{
  "en": {
    "pattern": "Crochet Pattern",
    "category": "Arts & Crafts",
    "skill_level": "Skill Level",
    "skill_level_value": "Beginner to Expert",
    "craft_type": "Craft Type",
    "craft_type_value": "Amigurumi Crochet Pattern",
    "language": "Language",
    "language_value": "English",
    "seller_name": "Megurumi Creative",
    "profile_alt": "Crochet Artist & Designer",
    "product_alt": "Handcrafted crochet creation by Megurumi Creative",
    "aria_label_instagram": "View on Instagram",
    "aria_label_etsy": "Shop on Etsy"
  },
  "fr": {
    "pattern": "Patron de Crochet",
    "category": "Arts et Artisanat",
    "skill_level": "Niveau de Compétence",
    "skill_level_value": "Débutant à Expert",
    "craft_type": "Type d'Artisanat",
    "craft_type_value": "Patron de Crochet Amigurumi",
    "language": "Langue",
    "language_value": "Français",
    "seller_name": "Megurumi Creative",
    "profile_alt": "Artiste et Designer de Crochet",
    "product_alt": "Création de crochet faite à la main par Megurumi Creative",
    "aria_label_instagram": "Voir sur Instagram",
    "aria_label_etsy": "Acheter sur Etsy"
  }
}
</i18n>