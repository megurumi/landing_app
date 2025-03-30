<script setup lang="ts">
const { locale } = useI18n()

const { data: page } = await useAsyncData(
  "policy",
  () => queryContent(`/${locale.value}/landing/policy`).findOne(),
  { watch: [locale] },
)
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true })
}

definePageMeta({
  layout: "landing",
})

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
})
</script>

<template>
  <UContainer class="mb-20">
    <UPageHero
      :title="page.title"
      :description="page.description"
    />

    <div
      v-for="section in page.sections"
      :key="section.title"
      class="py-8"
    >
      <h2 class="text-2xl font-bold mb-4">{{ section.title }}</h2>
      <div v-html="section.content"></div>
    </div>
  </UContainer>
</template>
