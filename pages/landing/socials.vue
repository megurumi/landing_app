<script setup lang="ts">
const { locale } = useI18n();

const { data: socials } = await useAsyncData(
  "section-socials",
  () => queryContent(`/${locale.value}/sections/socials`).findOne(),
  { watch: [locale] }
);

useSeoMeta({
  title: socials.value?.title,
  ogTitle: socials.value?.title,
  description: socials.value?.description,
  ogDescription: socials.value?.description,
});
</script>

<template>
  <!-- SOCIALS -->
  <SectionsSocials />

  <!-- FINAL CTA -->
  <SectionsTestimonials />

  <!-- FINAL CTA -->
  <SectionsCTA />
</template>
