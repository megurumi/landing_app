<script setup lang="ts">
import { socials } from '@/utils/socials';
import { track } from '@vercel/analytics';

const { t, locale } = useI18n();
const { data: page } = await useAsyncData(
  "page-creations",
  () => queryContent(`/${locale.value}/pages/creations`).findOne(),
  { watch: [locale] }
);

useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description,
});

const youtube = computed(() => socials.find((social) => social.id === "youtube"));
const etsy = computed(() => socials.find((social) => social.id === "etsy"));
</script>

<template>
  <UContainer class="mb-20">
    <ULandingHero
      :title="page?.title"
      :description="page?.description"
      orientation="vertical"
    >
      <template #headline>
        <NuxtImg
          :src="page?.hero.image"
          :alt="page?.hero.caption"
          preset="logo"
          sizes="200px"
          class="object-fit mx-auto rounded-full"
          loading="eager"
          fetchpriority="high"
        />
      </template>
      <div
        class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      />

      <template #links>
        <div class="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <!-- YouTube playlists CTA -->
          <UButton
            :to="youtube?.url + '/playlists'"
            target="_blank"
            color="red"
            variant="solid"
            size="xl"
            @click.stop="track('click_cta_creations_youtube')"
          >
            {{ t("cta_youtube") }}
            <template #trailing>
              <UIcon v-if="youtube?.icon" :name="youtube?.icon" :size="20" />
            </template>
          </UButton>

          <!-- Etsy CTA -->
          <UButton
            :to="etsy?.url"
            target="_blank"
            color="primary"
            variant="solid"
            size="xl"
            @click.stop="track('click_cta_creations_etsy')"
          >
            {{ t("cta_etsy") }}
            <template #trailing>
              <UIcon v-if="etsy?.icon" :name="etsy?.icon" :size="20" />
            </template>
          </UButton>
        </div>
      </template>
    </ULandingHero>

    <SectionsProducts />
  </UContainer>
</template>

<i18n lang="json">
{
  "en": {
    "cta_youtube": "Follow Free Tutorials Pattern!",
    "cta_etsy": "Buy Community-Tested Pattern."
  },
  "fr": {
    "cta_youtube": "Suivez des Tutoriels Pattern Gratuits !",
    "cta_etsy": "Achète des Patrons Testés."
  }
}
</i18n>