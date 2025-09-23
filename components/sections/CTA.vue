<script setup lang="ts">
const { locale } = useI18n();

const { data: cta } = await useAsyncData(
  "section-cta",
  () => queryContent(`/${locale.value}/sections/cta`).findOne(),
  { watch: [locale] }
);
</script>

<template>
    <ULandingSection>
        <ULandingCTA
            :id="cta?.id"
            :title="cta?.title"
            :description="cta?.description"
            :links="cta?.links"
            class="bg-gray-100/50 dark:bg-gray-800/50"
            :ui="{
                links: 'flex flex-col sm:flex-row gap-3',
            }"
        />
    </ULandingSection>
</template>
