<script setup lang="ts">
import { track } from '@vercel/analytics';

const { t, locale } = useI18n();
const localePath = useLocalePath();

const { data: gallery } = await useAsyncData(
  "section-gallery",
  () => queryContent(`/${locale.value}/sections/gallery`).findOne(),
  { watch: [locale] }
);

const { data: products } = await useAsyncData(
  "section-products",
  () => queryContent(`/${locale.value}/sections/products`).findOne(),
  { watch: [locale] }
);

const latestProducts = computed(() => [...products.value?.items].reverse().slice(0, 4))
</script>

<template>
    <!-- GALLERY -->
    <ULandingSection
      :id="gallery?.id"
      :title="gallery?.title"
      :description="gallery?.description"
    >
      <template #headline>
        <NuxtImg
          :src="gallery?.image"
          :alt="`${gallery?.title} - ${t('gallery_alt')}`"
          preset="logo"
          sizes="100px"
          class="w-[150px] rounded-xl"
          loading="lazy"
        />
      </template>
      <template #header>
        <NuxtImg
          :src="gallery?.image"
          :alt="`${gallery?.title} - ${t('gallery_alt')}`"
          preset="logo"
          sizes="100px"
          class="w-[150px] rounded-xl"
          loading="lazy"
        />
      </template>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <NuxtImg
          v-for="product in latestProducts"
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
        :to="localePath(gallery?.link.to)"
        class="relative bottom-12 lg:bottom-20 ml-auto flex items-center text-lg font-semibold leading-7 text-primary-600 dark:text-primary-400 hover:underline"
        @click.stop="track('click_cta_landing_see_gallery')"
      >
        <UIcon name="i-heroicons-arrow-right-20-solid" class="h-6 w-6 mr-2" />
        <span>{{ gallery?.link.label }}</span>
      </NuxtLink>
    </ULandingSection>
</template>


<i18n lang="json">
{
  "en": {
    "gallery_alt": "Megurumi Creative Gallery",
    "gallery_caption_alt": "Gallery image for Megurumi Creative's creations"
  },
  "fr": {
    "gallery_alt": "Gallery Megurumi Creative",
    "gallery_caption_alt": "Image de gallery pour les créations de Megurumi Creative"
  }
}
</i18n>