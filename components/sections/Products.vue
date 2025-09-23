<script setup lang="ts">
import { track } from '@vercel/analytics';

const { t, locale } = useI18n();
const config = useRuntimeConfig();
const localePath = useLocalePath();

const { data: products } = await useAsyncData(
  "section-products",
  () => queryContent(`/${locale.value}/sections/products`).findOne(),
  { watch: [locale] }
);

const productSchemas = computed(() => {
  if (!products.value) return [];

  return products.value.items.map((product: any) =>
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

useSchemaOrg([
  defineWebPage({
    "@type": "CollectionPage",
    name: products.value?.title,
    description: products.value?.description,
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
          name: t('creations'),
          item: `${config.public.NUXT_APP_DOMAIN}${localePath('/landing/creations')}`,
        },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.value?.items.length || 0,
      itemListElement:
        products.value?.items.map((product: any, index: number) => ({
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

const latestProducts = computed(() => [...products.value?.items].reverse());
</script>

<template>
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
    "language_value": "English"
  },
  "fr": {
    "pattern": "Patron de Crochet",
    "category": "Arts et Artisanat",
    "skill_level": "Niveau de Compétence",
    "skill_level_value": "Débutant à Expert",
    "craft_type": "Type d'Artisanat",
    "craft_type_value": "Patron de Crochet Amigurumi",
    "language": "Langue",
    "language_value": "Français"
  }
}
</i18n>