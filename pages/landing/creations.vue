<script setup lang="ts">
const { locale } = useI18n();

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
useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
});
</script>

<template>
  <UContainer class="mb-20">
    <UPageHero
      :title="page?.title"
      :description="page?.description"
      :links="page?.links"
      orientation="horizontal"
    >
      <NuxtImg
        :src="page?.hero.image"
        :alt="page?.hero.caption"
        format="webp"
        class="w-[16rem] h-[16rem] object-fit mx-auto rounded-full"
      />
    </UPageHero>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard
        v-for="product in [...page?.products].reverse()"
        :key="product.key"
        class="overflow-hidden hover:shadow-lg transition-shadow"
      >
        <template #header>
          <NuxtImg
            :src="product.image"
            :alt="product.caption"
            format="webp"
            class="w-full h-80 object-cover object-center rounded-md"
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
              target="_blank"
              color="gray"
              variant="ghost"
              size="sm"
              icon="i-simple-icons-instagram"
            >
              View on Instagram
            </UButton>
            <UButton
              v-if="product.etsy"
              :to="product.etsy"
              target="_blank"
              color="gray"
              variant="ghost"
              size="sm"
              icon="i-simple-icons-etsy"
            >
              Shop on Etsy
            </UButton>
          </div>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>
