<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: "sm",
  },
});

const { t, locale, locales, setLocale } = useI18n();

const selectedLocale = ref(locale);

watch(selectedLocale, () => setLocale(selectedLocale.value));
</script>

<template>
  <USelect
    v-model="selectedLocale"
    id="select-locale"
    :sizes="size"
    :options="locales"
    option-attribute="name"
    value-attribute="code"
    :aria-label="t('label')"
  />
</template>

<i18n lang="json">
{
  "en": {
    "label": "Select language"
  },
  "fr": {
    "label": "Selectionner une langue"
  }
}
</i18n>
