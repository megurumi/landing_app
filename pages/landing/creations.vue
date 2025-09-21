<script setup lang="ts">
import { socials } from '@/utils/socials';
import { track } from '@vercel/analytics';

const { t, locale } = useI18n();
const config = useRuntimeConfig();
const localePath = useLocalePath();

definePageMeta({
  layout: "landing",
});

const { data: page } = await useAsyncData(
  "creations",
  () => queryContent(`/${locale.value}/creations`).findOne(),
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
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: "5.00",
          maxPrice: "8.00",
          priceCurrency: "CAD"
        },
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: t("brand"),
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "4",
        bestRating: "5",
        worstRating: "1"
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

const latestProducts = computed(() => [...page.value?.products].reverse());

const youtube = computed(() => socials.find((social) => social.id === "youtube"));
const etsy = computed(() => socials.find((social) => social.id === "etsy"));
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
        <div class="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <!-- YouTube playlists CTA -->
          <UButton
            :to="youtube?.url + '/playlists'"
            target="_blank"
            color="red"
            variant="solid"
            size="xl"
            @click.stop="track('click_cta_creations_youtube')"
          >
            {{ t("cta_youtube") }}
            <template #trailing>
              <UIcon v-if="youtube?.icon" :name="youtube?.icon" :size="20" />
            </template>
          </UButton>

          <!-- Etsy CTA -->
          <UButton
            :to="etsy?.url"
            target="_blank"
            color="primary"
            variant="solid"
            size="xl"
            @click.stop="track('click_cta_creations_etsy')"
          >
            {{ t("cta_etsy") }}
            <template #trailing>
              <UIcon v-if="etsy?.icon" :name="etsy?.icon" :size="20" />
            </template>
          </UButton>
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
        class="overflow-hidden hover:shadow-xl transition-shadow"
        :ui="{
          header: { padding: 'p-0 sm:p-0' },
          body: { padding: 'px-2 py-4 sm:p-4' },
          footer: { padding: 'px-2 sm:px-2 py-1' },
        }"
      >
        <template #header>
          <NuxtImg
            :src="product.image"
            :alt="product.caption"
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
            <UTooltip
              v-for="link in product.links"
              :key="link.id"
              :text="link.label"
            >
              <UButton  
                :to="link.url"
                :aria-label="link.label"
                target="_blank"
                color="primary"
                variant="ghost"
                size="lg"
                @click.stop="track('click_cta_creations_product', { product: product.id })"
              >
                <template #trailing>
                <UIcon v-if="link?.icon" :name="link?.icon" :size="20" />
              </template>
            </UButton>
            </UTooltip>
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
    "cta_youtube": "Follow Free Tutorials Pattern!",
    "cta_etsy": "Buy Community-Tested Pattern."
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
    "cta_youtube": "Suivez des Tutoriels Pattern Gratuits !",
    "cta_etsy": "Achète des Patrons Testés."
  }
}
</i18n>