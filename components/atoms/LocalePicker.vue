<template>
  <USelect
    v-model="selectedLocale"
    id="select-locale"
    :sizes="size"
    :options="locales"
    option-attribute="name"
    value-attribute="code"
  />
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: "sm",
  },
})

const { locale, locales, setLocale } = useI18n()

const selectedLocale = ref(locale)

watch(selectedLocale, () => setLocale(selectedLocale.value))
</script>
