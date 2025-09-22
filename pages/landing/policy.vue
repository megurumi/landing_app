<script setup lang="ts">
const { t, locale } = useI18n()
const config = useRuntimeConfig();
const localePath = useLocalePath();

const { data: page } = await useAsyncData(
  "page-policy",
  () => queryContent(`/${locale.value}/pages/policy`).findOne(),
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
    url: `${config.public.NUXT_APP_DOMAIN}${localePath('/landing/policy')}`,
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
          name: t("policy"),
          item: `${config.public.NUXT_APP_DOMAIN}${localePath('/landing/policy')}`,
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
