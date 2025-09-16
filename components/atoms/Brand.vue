<script lang="ts" setup>
defineProps({
  size: {
    type: String,
    default: "2xl",
  },
});
</script>

<template>
  <div class="flex items-center space-x-2 hover:text-primary-600">
    <NuxtImg
      src="/img/brand/outlined.png"
      class="w-[30px] lg:w-[40px]"
      preset="logo"
      sizes="30px lg:40px"
      alt="Megurumi Creative - Handcrafted Crochet Brand Logo"
      loading="eager"
      fetchpriority="high"
    />
    <p class="font-bold" :class="`text-${size}`">Megurumi Creative</p>
  </div>
</template>
