<script setup lang="ts">
const { t, locale } = useI18n();
const config = useRuntimeConfig();
const router = useRouter();
const localePath = useLocalePath();
const viewport = useViewport();

const scrollY = ref(0);

const { data: page } = await useAsyncData(
  "index",
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

const { data: creations } = await useAsyncData(
  "creations",
  () => queryContent(`/${locale.value}/landing/creations`).findOne(),
  { watch: [locale] }
);

definePageMeta({
  layout: "landing",
});

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
          name: 'Home',
          item: `${config.public.NUXT_APP_DOMAIN}${localePath('/')}`
        }
      ]
    },
  })
]);

function onScroll() {
  scrollY.value = window.scrollY;
}

onMounted(() => window.addEventListener("scroll", onScroll));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <div v-if="page">
    <!-- HERO -->
    <ULandingHero
      :title="page.hero.title"
      :description="page.hero.description"
      orientation="vertical"
    >
      <div
        class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      />

      <template #links>
        <div class="flex flex-col gap-4 items-center justify-end">
          <UButton v-for="link in page.hero.links" v-bind="link" />
          <UIcon
            name="i-heroicons-chevron-down"
            class="h-6 w-6 relative -bottom-20 transition-opacity duration-1000 cursor-pointer"
            :class="{ 'opacity-0': scrollY > 50 }"
            @click="router.push(localePath('/') + `#${page.gallery.id}`)"
          />
        </div>
      </template>

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
    </ULandingHero>

    <!-- GALLERY -->
    <ULandingSection
      :id="page.gallery.id"
      :title="page.gallery.title"
      :description="page.gallery.description"
    >
      <template #headline>
        <NuxtImg
          :src="page.gallery.image"
          :alt="`${page.gallery.title} - ${t('gallery_alt')}`"
          preset="logo"
          sizes="100px"
          class="w-[150px] rounded-xl"
          loading="lazy"
        />
      </template>
      <template #header>
        <NuxtImg
          :src="page.gallery.image"
          :alt="`${page.gallery.title} - ${t('gallery_alt')}`"
          preset="logo"
          sizes="100px"
          class="w-[150px] rounded-xl"
          loading="lazy"
        />
      </template>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <NuxtImg
          v-for="product in [...creations?.products].reverse().slice(0, 4)"
          :key="product.id"
          :src="product.image"
          :alt="`${product.caption} - ${t('gallery_caption_alt')}`"
          preset="card"
          sizes="180px sm:280px"
          class="w-full h-auto max-h-80 object-cover object-center rounded-md"
          loading="lazy"
        />
      </div>
      <NuxtLink
        :to="localePath(page.gallery.link.to)"
        class="relative bottom-12 lg:bottom-20 ml-auto flex items-center text-lg font-semibold leading-7 text-primary-600 dark:text-primary-400 hover:underline"
      >
        <UIcon name="i-heroicons-arrow-right-20-solid" class="h-6 w-6 mr-2" />
        <span>{{ page.gallery.link.label }}</span>
      </NuxtLink>
    </ULandingSection>

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
           v-for="social in page.social.links"
           :aria-label="t('visit_our_social', { social: social.label })"
           v-bind="social"
         />
      </div>
    </ULandingSection>

    <!-- CTA -->
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

<i18n lang="json">
{
  "en": {
    "hero_alt": "Creative Partner - Megurumi Creative showcases handcrafted crochet amigurumi and accessories",
    "gallery_alt": "Megurumi Creative Gallery",
    "gallery_caption_alt": "Gallery image for Megurumi Creative's creations",
    "social_alt": "Your Creative Partner - Megurumi Creative showcases handcrafted crochet amigurumi and accessories",
    "visit_our_social": "Visit our {social} social page"
  },
  "fr": {
    "hero_alt": "Partenaire créatif - Megurumi Creative présente des amigurumis et accessoires en crochet faits à la main",
    "gallery_alt": "Gallery Megurumi Creative",
    "gallery_caption_alt": "Image de gallery pour les créations de Megurumi Creative",
    "social_alt": "Ton partenaire créatif - Megurumi Creative présente des amigurumis et accessoires en crochet faits à la main",
    "visit_our_social": "Visitez notre page sociale {social}"
  }
}
</i18n>