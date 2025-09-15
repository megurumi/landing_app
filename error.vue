<template>
  <div
    class="h-full grid min-h-full grid-cols-1 grid-rows-[1fr,auto,1fr] bg-white dark:bg-gray-900 lg:grid-cols-[max(50%,36rem),1fr]"
  >
    <header
      class="mx-auto w-full max-w-7xl px-6 pt-6 sm:pt-10 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:px-8"
    >
      <AtomsBrand />
    </header>
    <main
      class="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8"
    >
      <div class="max-w-lg">
        <p
          class="text-base font-semibold leading-8 text-primary-600 dark:text-primary-400"
        >
          {{ t("head") }}
        </p>
        <h1
          class="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl"
        >
          {{ t("title") }}
        </h1>
        <p class="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
          {{ t("description") }}
        </p>
        <div class="mt-10">
          <nuxt-link
            :to="localePath('/')"
            class="text-sm font-semibold leading-7 text-primary-600 dark:text-primary-400"
          >
            <span aria-hidden="true">&larr;</span> {{ t("button") }}
          </nuxt-link>
        </div>
      </div>
    </main>
    <footer class="self-end lg:col-span-2 lg:col-start-1 lg:row-start-3">
      <div
        class="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 py-10"
      >
        <nav
          class="mx-auto flex w-full max-w-7xl items-center gap-x-4 px-6 text-sm leading-7 text-gray-600 dark:text-gray-400 lg:px-8"
        >
          <a href="mailto:dev@megurumi">{{ t("support") }}</a>
        </nav>
      </div>
    </footer>
    <div
      class="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:flex lg:justify-center lg:items-center"
    >
      <NuxtImg
        src="/img/brand/error.png"
        format="webp"
        class="w-[250px]"
        alt="Megurumi Creative Error Icon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

useSeoMeta({
  title: t("title"),
  description: t("description"),
});
</script>

<i18n lang="json">
{
  "en": {
    "head": "Sorry!",
    "title": "Oops, page not found!",
    "description": "Get back to home.",
    "button": "Back to home",
    "support": "Contact Support"
  },
  "fr": {
    "head": "Désolé !",
    "title": "Oups, page non trouvée !",
    "description": "Retourne sur la page d'acceuil.",
    "button": "Page d'acceuil",
    "support": "Contacte Support"
  }
}
</i18n>
