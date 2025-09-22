<script setup lang="ts">
const { t, locale } = useI18n()
const config = useRuntimeConfig();
const localePath = useLocalePath();

const { data: page } = await useAsyncData(
  "page-terms",
  () => queryContent(`/${locale.value}/pages/terms`).findOne(),
  { watch: [locale] },
)

useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description,
})

useSchemaOrg([
  defineWebPage({
    "@type": "CollectionPage",
    name: page.value?.title,
    description: page.value?.description,
    url: `${config.public.NUXT_APP_DOMAIN}${localePath('/landing/terms')}`,
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
          name: t("terms"),
          item: `${config.public.NUXT_APP_DOMAIN}${localePath('/landing/terms')}`,
        },
      ],
    },
  }),
]);
</script>

<template>
  <UContainer class="mb-20">
    <UPageHero
      :title="page?.title"
      :description="page?.description"
    />

    <div
      v-for="section in page?.sections"
      :key="section.title"
      class="py-8"
    >
      <h2 class="text-2xl font-bold mb-4">{{ section.title }}</h2>
      <div v-html="section.content"></div>
    </div>
  </UContainer>
</template>
