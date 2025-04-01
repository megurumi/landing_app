<script setup lang="ts">
const { locale } = useI18n();

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

definePageMeta({
  layout: "landing",
});

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
});

useHead({
  script: [
    {
      src: "//www.instagram.com/embed.js",
      async: true,
      defer: true,
    },
  ],
});

if (window.instgrm) {
  window.instgrm.Embeds.process();
}
</script>

<template>
  <UContainer class="mb-20">
    <UPageHero :title="page.title" :description="page.description" />

    <UPageGrid class="relative grid grid-cols-1 gap-8">
      <blockquote
        v-for="post in page.posts"
        class="instagram-media instagram-card"
        :data-instgrm-permalink="`https://www.instagram.com/reel/${post.permalink_id}/?utm_source=ig_embed&amp;utm_campaign=loading`"
        data-instgrm-version="14"
        style="
          background: #fff;
          border: 0;
          border-radius: 3px;
          box-shadow:
            0 0 1px 0 rgba(0, 0, 0, 0.5),
            0 1px 10px 0 rgba(0, 0, 0, 0.15);
          margin: 1px;
          max-width: 540px;
          min-width: 326px;
          padding: 0;
          width: 99.375%;
          width: -webkit-calc(100% - 2px);
          width: calc(100% - 2px);
        "
      />
    </UPageGrid>
  </UContainer>
</template>

<style scoped>
.instagram-card {
}
</style>
