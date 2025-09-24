<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const links = [
  {
    label: t('home'),
    to: localePath('/'),
    icon: 'i-heroicons-home',
  },
  {
    label: t("about"),
    to: localePath("/landing/about"),
    icon: 'i-heroicons-user',
  },
  {
    label: t('creations'),
    to: localePath('/landing/creations'),
    icon: 'i-heroicons-sparkles',
  },
  {
    label: t('basics'),
    to: localePath('/landing/basics'),
    icon: 'i-heroicons-academic-cap',
  }
]
</script>

<template>
  <UHeader
    :to="localePath('/')"
    :links="links"
  >
    <template #logo>
      <AtomsBrand class="px-2" />
    </template>

    <template #right>
      <UColorModeToggle size="lg" />
    </template>
  </UHeader>
</template>
