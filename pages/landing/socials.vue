<script setup lang="ts">
import { track } from '@vercel/analytics';

const { t, locale } = useI18n();
const viewport = useViewport();

const { data: page } = await useAsyncData(
  "landing",
  () => queryContent(`/${locale.value}/landing`).findOne(),
  { watch: [locale] }
);
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

definePageMeta({
  layout: "landing",
});

useSeoMeta({
  title: page.value.social.title,
  ogTitle: page.value.social.title,
  description: page.value.social.description,
  ogDescription: page.value.social.description,
});
</script>

<template>
  <div v-if="page">
    <!-- SOCIALS -->
    <ULandingSection 
      :id="page.social.id"
      :title="page.social.title"
      :description="page.social.description"
      :align="viewport.isGreaterThan('tablet') ? 'left' : 'center'"
    >
      <template #headline>
        <NuxtImg
          :alt="t('social_alt')"
          :src="page.social.image"
          preset="card"
          sizes="280px"
          class="w-[280px] h-auto object-cover object-center rounded-md mb-8"
          loading="eager"
          fetchpriority="high"
        />        
      </template>
    
       <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
         <ULandingCard
           v-for="link in page.social.links"
           v-bind="link"
           :aria-label="t('visit_our_social', { social: link.label })"
           @click.stop="track('click_cta_landing_social', { social: link.id })"
         />
      </div>
    </ULandingSection>

    <!-- FINAL CTA -->
    <ULandingSection>
      <ULandingCTA
        v-bind="page.cta"
        class="bg-gray-100/50 dark:bg-gray-800/50"
        :ui="{
          links: 'flex flex-col sm:flex-row gap-3',
        }"
      />
    </ULandingSection>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "social_alt": "Your Creative Partner - Megurumi Creative showcases handcrafted crochet amigurumi and accessories",
    "visit_our_social": "Visit our {social} social page"
  },
  "fr": {
    "social_alt": "Ton partenaire créatif - Megurumi Creative présente des amigurumis et accessoires en crochet faits à la main",
    "visit_our_social": "Visitez notre page sociale {social}"
  }
}
</i18n>