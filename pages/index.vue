<script setup lang="ts">
const { locale } = useI18n();
const router = useRouter();
const localePath = useLocalePath();

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

function onScroll() {
  scrollY.value = window.scrollY;
}

onMounted(() => window.addEventListener("scroll", onScroll));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <div v-if="page">
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
            @click="router.push(localePath(`/#${page.gallery.id}`))"
          />
        </div>
      </template>

      <template #headline>
        <NuxtImg
          preset="hero" 
          src="/img/landing/hero.png"
          alt="Your Creative Partner - Megurumi Creative showcasing handcrafted crochet amigurumi and accessories"
          sizes="225px md:280px xl:440px"
          class="w-[225px] md:w-[280px] xl:w-[400px] neon mx-auto rounded-3xl"
          loading="eager"
          fetchpriority="high"
        />
      </template>
    </ULandingHero>

    <ULandingSection
      :id="page.gallery.id"
      :title="page.gallery.title"
      :description="page.gallery.description"
    >
      <template #headline>
        <NuxtImg
          :src="page.social.image"
          :alt="`${page.social.title} - Profile image for Megurumi Creative social media`"
          preset="logo"
          sizes="100px"
          class="w-[150px] rounded-xl"
          loading="lazy"
        />
      </template>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <NuxtImg
          v-for="product in [...creations?.products].reverse().slice(0, 4)"
          :key="product.key"
          :src="product.image"
          :alt="`${product.caption} - Handcrafted crochet creation by Megurumi Creative`"
          preset="card"
          sizes="180px sm:280px"
          class="w-full h-auto max-h-80 object-cover object-center rounded-md"
          loading="lazy"
        />
      </div>
      <NuxtLink
        :to="page.gallery.link.to"
        class="ml-auto flex items-center text-sm font-semibold leading-7 text-primary-600 dark:text-primary-400"
      >
        <UIcon name="i-heroicons-arrow-right-20-solid" class="h-6 w-6 mr-2" />
        <span>{{ page.gallery.link.label }}</span>
      </NuxtLink>
    </ULandingSection>

    <ULandingSection
      :id="page.social.id"
      :title="page.social.title"
      :description="page.social.description"
      class="relative"
    >
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <UButton
          v-for="social in page.social.links"
          v-bind="social"
          :key="social.label"
          :aria-label="`Visit us on ${social.label}`"
          target="_blank"
          color="white"
          variant="solid"
          class="flex items-center justify-start w-full max-w-sm rounded-full px-8 py-6 shadow-lg"
        />
      </div>
    </ULandingSection>

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

<style>
.neon {
  animation: neonPulse 3s infinite;
}

@keyframes neonPulse {
  0%,
  100% {
    filter: saturate(2);
  }
  50% {
    filter: saturate(1);
  }
}
</style>
