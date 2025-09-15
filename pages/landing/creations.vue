<script setup lang="ts">
const { locale } = useI18n();
const router = useRouter();
const localePath = useLocalePath();

const scrollY = ref(0);

definePageMeta({
  layout: "landing",
});

const { data: page } = await useAsyncData(
  "creations",
  () => queryContent(`/${locale.value}/landing/creations`).findOne(),
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

function onScroll() {
  scrollY.value = window.scrollY;
}

onMounted(() => window.addEventListener("scroll", onScroll));
onUnmounted(() => window.removeEventListener("scroll", onScroll));

const latestProducts = computed(() => [...page.value?.products].reverse());
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
          format="webp"
          quality="80"
          sizes="200px"
          class="object-fit mx-auto rounded-full"
        />
      </template>
      <div
        class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      />

      <template #links>
        <div class="flex flex-col gap-4 items-center justify-end">
          <UButton v-for="link in page?.links" v-bind="link" />
          <UIcon
            name="i-heroicons-chevron-down"
            class="h-6 w-6 relative -bottom-20 transition-opacity duration-1000 cursor-pointer"
            :class="{ 'opacity-0': scrollY > 50 }"
            @click="router.push(localePath(`/landing/creations#products`))"
          />
        </div>
      </template>
    </ULandingHero>

    <div
      id="products"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-20"
    >
      <UCard
        v-for="product in latestProducts"
        :key="product.key"
        class="overflow-hidden hover:shadow-lg transition-shadow"
      >
        <template #header>
          <NuxtImg
            :src="product.image"
            :alt="product.caption"
            format="webp"
            quality="80"
            sizes="240px lg:348px"
            class="w-full h-80 object-cover object-center rounded-md"
          />
        </template>

        <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {{ product.caption }}
        </p>

        <template #footer>
          <div class="flex justify-end w-full">
            <UButton
              v-if="product.instagram"
              :to="product.instagram"
              target="_blank"
              color="gray"
              variant="ghost"
              size="sm"
              icon="i-simple-icons-instagram"
            >
              View on Instagram
            </UButton>
            <UButton
              v-if="product.etsy"
              :to="product.etsy"
              target="_blank"
              color="gray"
              variant="ghost"
              size="sm"
              icon="i-simple-icons-etsy"
            >
              Shop on Etsy
            </UButton>
          </div>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>
