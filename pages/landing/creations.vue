<script setup lang="ts">
const { locale } = useI18n();

const { data: page } = await useAsyncData(
  "creations",
  () => queryContent(`/${locale.value}/landing/creations`).findOne(),
  { watch: [locale] },
);
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

definePageMeta({
  layout: "landing",
});

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
});

const { hero, posts } = useInstagram();
</script>

<template>
  <UContainer class="mb-20">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.links"
      headline="My official releases!"
      orientation="horizontal"
    >
      <NuxtImg
        :src="hero.image"
        class="w-[16rem] h-[16rem] object-fit mx-auto rounded-full"
      />
    </UPageHero>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard
        v-for="post in posts.reverse()"
        :key="post.key"
        class="overflow-hidden hover:shadow-lg transition-shadow"
      >
        <template #header>
          <NuxtImg
            :src="post.image"
            :alt="post.caption"
            class="w-full h-80 object-cover object-center rounded-md"
          />
        </template>

        <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {{ post.caption }}
        </p>

        <template #footer>
          <div class="flex justify-end w-full">
            <UButton
              v-if="post.instaLink"
              :to="post.instaLink"
              target="_blank"
              color="gray"
              variant="ghost"
              size="sm"
              icon="i-simple-icons-instagram"
            >
              View on Instagram
            </UButton>
            <UButton
              v-if="post.etsyLink"
              :to="post.etsyLink"
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
