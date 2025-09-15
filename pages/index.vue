<script setup lang="ts">
const { locale } = useI18n();
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
          src="/img/landing/hero.png"
          format="webp"
          alt="Your Creative Partner"
          class="neon mx-auto w-250px] md:w-[400px] xl:w-[450px] rounded-3xl"
        />
      </template>
    </ULandingHero>

    <ULandingSection
      :id="page.gallery.id"
      :title="page.gallery.title"
      :description="page.gallery.description"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <UCard
          v-for="product in [...creations?.products].reverse().slice(0, 4)"
          :key="product.key"
          class="overflow-hidden hover:shadow-lg transition-shadow"
        >
          <NuxtImg
            :src="product.image"
            :alt="product.caption"
            format="webp"
            class="w-full h-80 object-cover object-center rounded-md"
          />
        </UCard>
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
      :align="page.social.align"
      class="relative"
    >
      <template #headline>
        <NuxtImg
          :src="page.social.image"
          :alt="page.social.title"
          format="webp"
          fit="cover"
          class="w-[150px]"
        />
      </template>

      <div class="flex flex-col gap-4 items-center justify-end">
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
