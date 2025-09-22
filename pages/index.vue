<script setup lang="ts">
const { t, locale } = useI18n();
const config = useRuntimeConfig();
const localePath = useLocalePath();

const { data: page } = await useAsyncData(
  "page-landing",
  () => queryContent(`/${locale.value}/pages/landing`).findOne(),
  { watch: [locale] }
);

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
});

useSchemaOrg([
  defineWebPage({
    '@type': 'WebPage',
    name: page.value.title,
    description: page.value.description,
    url: `${config.public.NUXT_APP_DOMAIN}${localePath('/')}`,
    inLanguage: locale.value,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: t('home'),
          item: `${config.public.NUXT_APP_DOMAIN}${localePath('/')}`
        }
      ]
    },
  })
]);
</script>

<template>
  <ULandingHero
    :title="page?.hero.title"
    :description="page?.hero.description"
    orientation="vertical"
  >
    <div
      class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
    />

    <template #headline>
      <NuxtImg
        :alt="t('hero_alt')"
        preset="hero" 
        src="/img/landing/hero.png"
        sizes="225px md:280px xl:440px"
        class="w-[225px] md:w-[280px] xl:w-[400px] neon mx-auto rounded-3xl"
        loading="eager"
        fetchpriority="high"
      />
    </template>

    <template #links>
      <div class="flex flex-col gap-4 items-center justify-end w-full">
        <AtomsTestimonial />
        <AtomsScroller target="section-gallery" />
      </div>
    </template>
  </ULandingHero>

  <!-- GALLERY -->
  <SectionsGallery />

  <!-- SOCIALS -->
  <SectionsSocials />

  <!-- TESTIMONIALS -->
  <SectionsTestimonials />

  <!-- FINAL CTA -->
  <SectionsCTA />
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

<i18n lang="json">
{
  "en": {
    "hero_alt": "Creative Partner - Megurumi Creative showcases handcrafted crochet amigurumi and accessories",
  },
  "fr": {
    "hero_alt": "Partenaire créatif - Megurumi Creative présente des amigurumis et accessoires en crochet faits à la main",
  }
}
</i18n>