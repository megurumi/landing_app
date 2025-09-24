<script setup lang="ts">
import { track } from '@vercel/analytics';

const { t, locale } = useI18n();
const config = useRuntimeConfig();
const localePath = useLocalePath();

definePageMeta({
  layout: "landing",
});

const { data: page } = await useAsyncData(
  "about",
  () => queryContent(`/${locale.value}/about`).findOne(),
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

useSchemaOrg([
  defineWebPage({
    "@type": "AboutPage",
    name: page.value.title,
    description: page.value.description,
    url: `${config.public.NUXT_APP_DOMAIN}${localePath('/landing/about')}`,
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
          name: t('about'),
          item: `${config.public.NUXT_APP_DOMAIN}${localePath('/landing/about')}`,
        },
      ],
    },
  }),
  defineOrganization({
    name: 'Megurumi Creative',
    description: page.value.description,
    url: `${config.public.NUXT_APP_DOMAIN}`,
    logo: `${config.public.NUXT_APP_DOMAIN}/img/brand/logo.png`,
    founder: {
      "@type": "Person",
      name: "Megurumi Creative"
    },
    foundingDate: "2024",
    numberOfEmployees: "1"
  })
]);
</script>

<template>
  <div v-if="page">
    <!-- HERO SECTION -->
    <ULandingHero
      :title="page.hero.title"
      :description="page.hero.description"
      orientation="vertical"
    >
      <div
        class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      />

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
    </ULandingHero>

    <!-- PROCESS SECTION -->
    <ULandingSection
      :title="page.process.title"
      :description="page.process.description"
      align="center"
    >
      <template #headline>
        <UIcon
          name="i-heroicons-sparkles"
          class="w-12 h-12 text-primary-500 mx-auto mb-4"
        />
      </template>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <ULandingCard
          v-for="(step, index) in page.process.steps"
          :key="index"
          :title="step.title"
          :description="step.description"
          :icon="step.icon"
          orientation="vertical"
          class="text-center"
        />
      </div>
    </ULandingSection>

    <!-- ACHIEVEMENTS SECTION -->
    <ULandingSection
      :title="page.achievements.title"
      align="center"
      class="bg-gray-50 dark:bg-gray-800/50"
    >
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div
          v-for="stat in page.achievements.stats"
          :key="stat.label"
          class="text-center"
        >
          <div class="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400">
            {{ stat.number }}
          </div>
          <div class="text-lg font-medium text-gray-900 dark:text-white mt-2">
            {{ stat.label }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {{ stat.description }}
          </div>
        </div>
      </div>
    </ULandingSection>

    <!-- FAQ SECTION -->
    <ULandingSection
      :title="page.faq.title"
      :description="page.faq.description"
      align="center"
    >
      <ULandingFAQ
        :items="page.faq.items"
        :ui="{
          wrapper: 'max-w-4xl mx-auto',
          item: {
            padding: 'p-6'
          }
        }"
      >
        <template #item="{ item }">
          <MDC :value="item.content" class="prose prose-primary dark:prose-invert max-w-none text-gray-500 dark:text-gray-400" />
        </template>
      </ULandingFAQ>
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

<style scoped>
.landing-grid {
  background-size: 100px 100px;
  background-image: linear-gradient(
      to right,
      rgb(var(--color-gray-200)) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgb(var(--color-gray-200)) 1px, transparent 1px);
}
.dark {
  .landing-grid {
    background-image: linear-gradient(
        to right,
        rgb(var(--color-gray-800)) 1px,
        transparent 1px
      ),
      linear-gradient(
        to bottom,
        rgb(var(--color-gray-800)) 1px,
        transparent 1px
      );
  }
}
</style>
