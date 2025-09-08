<script setup lang="ts">
const { posts } = useInstagram();

const last3Items = computed(() => {
  return posts.reverse().slice(0, 3);
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <UCard
      v-for="post in last3Items"
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
</template>
