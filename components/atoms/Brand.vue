<template>
  <NuxtLink
    class="flex items-center space-x-2 hover:text-primary-600 ml-1"
    :to="localePath('/')"
  >
    <NuxtImg
      src="/img/brand/outlined.png"
      class="w-[30px] lg:w-[40px]"
      format="webp"
      quality="90"
      sizes="sm:30px lg:40px"
      alt="Megurumi Creative Brand Icon"
    />
    <p class="font-bold" :class="`text-${size}`">Megurumi Creative</p>
  </NuxtLink>
</template>

<script lang="ts" setup>
const localePath = useLocalePath();

defineProps({
  size: {
    type: String,
    default: "2xl",
  },
});
</script>
