<script setup lang="ts">
import { track } from '@vercel/analytics';

const { t, locale } = useI18n();
const viewport = useViewport();

const { data: socials } = await useAsyncData(
  "section-socials",
  () => queryContent(`/${locale.value}/sections/socials`).findOne(),
  { watch: [locale] }
);
</script>

<template>
  <ULandingSection 
    :id="socials?.id"
    :title="socials?.title"
    :description="socials?.description"
    :align="viewport.isGreaterThan('tablet') ? 'left' : 'center'"
  >
    <template #headline>
      <NuxtImg
        :alt="t('social_alt')"
        :src="socials?.image"
        preset="card"
        sizes="280px"
        class="w-[280px] h-auto object-cover object-center rounded-md mb-8"
        loading="eager"
        fetchpriority="high"
      />        
    </template>
  
      <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
        <ULandingCard
          v-for="social in socials?.links"
          v-bind="social"
          :aria-label="t('visit_our_social', { social: social.label })"
          @click.stop="track('click_cta_landing_social', { social: social.id })"
        />
    </div>
  </ULandingSection>
</template>

<i18n lang="json">
{
  "en": {
    "visit_our_social": "Visit our {social} social page"
  },
  "fr": {
    "visit_our_social": "Visitez notre page sociale {social}"
  }
}
</i18n>