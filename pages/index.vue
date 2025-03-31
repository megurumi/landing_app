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

const socials = [
  {
    label: "YouTube",
    url: "https://www.youtube.com/@Megurumi_creative",
    icon: "i-simple-icons-youtube",
  },
  {
    label: "TikTok",
    url: "https://www.tiktok.com/@megurumi_creative",
    icon: "i-simple-icons-tiktok",
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/megurumi_creative",
    icon: "i-simple-icons-instagram",
  },
  {
    label: "Facebook",
    url: "https://www.facebook.com/megurumicreative",
    icon: "i-simple-icons-facebook",
  },
]
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
            @click="router.push(localePath(`/#${page.social.id}`))"
          />
        </div>
      </template>

      <template #headline>
        <NuxtImg
          src="/img/landing/hero.png"
          alt="Your Creative Partner"
          class="neon mx-auto w-250px] md:w-[400px] xl:w-[450px] rounded-3xl"
        />
      </template>
    </ULandingHero>

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
          fit="cover"
          class="w-[150px]"
        />
      </template>

      <div class="flex flex-col gap-4 items-center justify-end">
        <UButton
          v-for="social in page.social.links"
          :key="social.label"
          v-bind="social"
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
