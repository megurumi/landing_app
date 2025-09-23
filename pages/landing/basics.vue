<script setup lang="ts">
import { track } from '@vercel/analytics';

const { t, locale } = useI18n();
const config = useRuntimeConfig();
const localePath = useLocalePath()

const { data: page } = await useAsyncData(
  "page-basics",
  () => queryContent(`/${locale.value}/pages/basics`).findOne(),
  { watch: [locale] }
);
const { data: basics } = await useAsyncData(
  "section-basics",
  () => queryContent(`/${locale.value}/sections/basics`).findOne(),
  { watch: [locale] }
);

useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description,
});

useSchemaOrg([
  defineWebPage({
    "@type": "CollectionPage",
    name: page.value?.title,
    description: page.value?.description,
    url: `${config.public.NUXT_APP_DOMAIN}${localePath('/landing/basics')}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: t("home"),
          item: `${config.public.NUXT_APP_DOMAIN}${localePath('/')}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: t('basics'),
          item: `${config.public.NUXT_APP_DOMAIN}${localePath('/landing/basics')}`,
        },
      ],
    },
  }),
  {
    "@type": "VideoObject",
    name: page.value?.title,
    description:page.value?.description,
    thumbnailUrl: `${config.public.NUXT_APP_DOMAIN}/img/landing/hero.png`,
    uploadDate: "2025-01-01",
    duration: "PT10M",
    contentUrl: page.value?.paylist_url,
    embedUrl: page.value?.paylist_url,
    publisher: {
      "@type": "Organization",
      name: t("brand"),
      logo: {
        "@type": "ImageObject",
        url: `${config.public.NUXT_APP_DOMAIN}/img/brand/filled.png`
      }
    },
    isAccessibleForFree: true,
    educationalLevel: t("free_videos_level"),
    learningResourceType: t("free_video_tutorial"),
    teaches: t("free_videos_teaches"),
    inLanguage: ["en", "fr"]
  },
]);

const latestVideos = computed(() => [...basics.value?.items].reverse());

const handleClick = (video: { id: string, to: string}) => {
  track('click_cta_basics_video', { basic: video.id })
  window.open(video.to, '_blank')
}
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
          <UButton
            :to="page?.playist_url"
            target="_blank"
            color="primary"
            variant="solid"
            size="xl"
            @click.stop="track('click_cta_basics_playlist')"
          >
            {{ t("cta_youtube_basics_playlist") }}
            <template #trailing>
              <UIcon name="i-simple-icons-youtube" :size="20" />
            </template>
          </UButton>
        </div>
      </template>
    </ULandingHero>

    <div
      id="basics"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-20"
    >
      <UTooltip
        v-for="video in latestVideos"
        :key="video.id"
        :text="video.tooltip"
      >
        <UCard
          :id="video.id"
          :ui="{
            header: { padding: 'p-0 sm:p-0' },
            body: { padding: 'px-2 py-4 sm:p-4' },
            footer: { padding: 'px-2 sm:px-2 py-1' },
          }"
          class="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          @click.stop="() => handleClick(video)"
        >
          <template #header>
            <NuxtImg
              :src="video.image"
              :alt="video.caption"
              preset="card"
              sizes="180px sm:286px"
              class="w-full h-auto max-h-80 object-cover object-center"
              loading="lazy"
            />
          </template>

          <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {{ video.caption }}
          </p>
        </UCard>
      </UTooltip>
    </div>
  </UContainer>
</template>

<i18n lang="json">
{
  "en": {
    "cta_youtube_basics_playlist": "Free Basics Playlist",
    "free_videos_teaches": "crochet basics, foundation stitches, reading patterns, basic techniques",
    "free_videos_level": "Beginner to Advanced",
    "free_video_tutorial": "Tutorial"
  },
  "fr": {
    "cta_youtube_basics_playlist": "Free Playlist des Basiques",
    "free_videos_teaches": "bases du crochet, points de base, lecture de patrons, techniques de base",
    "free_videos_level": "Débutant à Avancé",
    "free_video_tutorial": "Tutoriel"
  }
}
</i18n>
