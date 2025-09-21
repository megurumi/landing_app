<script setup lang="ts">
import { socials } from '@/utils/socials';
import { track } from '@vercel/analytics';

const { t, locale } = useI18n();

definePageMeta({
  layout: "landing",
});

const { data: page } = await useAsyncData(
  "basics",
  () => queryContent(`/${locale.value}/basics`).findOne(),
  { watch: [locale] }
);
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
});

const latestVideos = computed(() => [...page.value?.videos].reverse());

const youtube = computed(() => socials.find((social) => social.id === "youtube"));

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
          <!-- YouTube basics playlist CTA -->
          <UButton
            :to="youtube?.url + '/playlist?list=PL8tgm60WDRRQPT6TYJV_KgHCGoQjDbDP8'"
            target="_blank"
            color="primary"
            variant="solid"
            size="xl"
            @click.stop="track('click_cta_basics_playlist')"
          >
            {{ t("cta_youtube_basics_playlist") }}
            <template #trailing>
              <UIcon v-if="youtube?.icon" :name="youtube?.icon" :size="20" />
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
    "cta_youtube_basics_playlist": "Free Basics Playlist"
  },
  "fr": {
    "cta_youtube_basics_playlist": "Free Playlist des Basiques"
  }
}
</i18n>
