<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <UHeader
    :to="localePath('/')"
  >
    <template #logo>
      <AtomsBrand class="px-2" />
    </template>
  </UHeader>
</template>
