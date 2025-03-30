<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <UHeader
    :to="localePath('/')"
  >
    <template #logo>
      <AtomsBrand />
    </template>
  </UHeader>
</template>
