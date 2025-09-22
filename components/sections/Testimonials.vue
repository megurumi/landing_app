<script setup lang="ts">
const { locale } = useI18n();

const { data: testimonials } = await useAsyncData(
  "section-testimonials",
  () => queryContent(`/${locale.value}/sections/testimonials`).findOne(),
  { watch: [locale] }
);

const latestTestimonials = computed(() => [...testimonials.value?.items].reverse().slice(0, 3));
</script>

<template>
    <ULandingSection
    :id="testimonials?.id"
    :title="testimonials?.title"
    :description="testimonials?.description_short"
>
    <UPageColumns>
    <div
        v-for="(testimonial, index) in latestTestimonials"
        :key="index"
        class="break-inside-avoid"
    >
        <ULandingTestimonial v-bind="testimonial" :card="false" />
    </div>
    </UPageColumns>
</ULandingSection>
</template>
