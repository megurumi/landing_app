<script setup lang="ts">
const { locale } = useI18n();

const { data: testimonials } = await useAsyncData(
  "section-testimonials",
  () => queryContent(`/${locale.value}/sections/testimonials`).findOne(),
  { watch: [locale] }
);
</script>

<template>
    <div class="flex gap-4 items-center w-full">
        <div class="w-full flex gap-4 items-center justify-end">
            <UAvatarGroup size="sm">
            <UAvatar
                v-for="item in testimonials?.items"
                :src="item.author.avatar.src"
                :alt="item.quote || item.author.name"
            />
            </UAvatarGroup>
        </div>

        <div class="w-full">
            <p class="text-left">
            {{ testimonials?.description }}
            </p>
            <p class="text-left">
            <UIcon
                v-for="star in 5"
                :key="star"
                name="i-heroicons-star-solid"
                class="text-yellow-400"
            />
            </p>
        </div>
    </div>
</template>
