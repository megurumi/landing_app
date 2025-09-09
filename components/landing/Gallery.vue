<script setup lang="ts">
const { posts } = useInstagram();
const { t } = useI18n()
const localePath = useLocalePath()

const latestPost = computed(() => {
  return posts.reverse().slice(0, 4);
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <UCard
      v-for="post in latestPost"
      :key="post.key"
      class="overflow-hidden hover:shadow-lg transition-shadow"
    >
      <NuxtImg
        :src="post.image"
        :alt="post.caption"
        class="w-full h-80 object-cover object-center rounded-md"
      />
    </UCard>
  </div>
  <NuxtLink
    :to="localePath('/landing/creations')"
    class="ml-auto flex items-center text-sm font-semibold leading-7 text-primary-600 dark:text-primary-400"
    >
    <UIcon
      name="i-heroicons-arrow-right-20-solid"
      class="h-6 w-6 mr-2"
    />
      <span>{{ t("creations_path") }}</span>
  </NuxtLink>
</template>

<i18n lang="json">
{
  "en": {
    "creations_path": "See my latest creations!"
  },
  "fr": {
    "creations_path": "Voir mes dernières créations !"
  }
}
</i18n>
