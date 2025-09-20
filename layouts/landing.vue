<script setup lang="ts">
// const { locale } = useI18n();

// const { data: navigations } = await useAsyncData("navigation", () =>
//   fetchContentNavigation()
// );

// const navigation = computed(() => {
//   const navItems = navigations.value?.find(
//     (navigation) => navigation._path === `/${locale.value}`
//   )?.children;
//   if (!navItems?.length) return [];

//   return navItems.map((item) => {
//     if (locale.value === "en") {
//       return { ...item, _path: item._path.replace(/^\/?en(\/|$)/, "/") };
//     }
//   });
// });

// provide("navigation", navigation);
</script>

<template>
  <div>
    <LandingHeader />

    <UMain>
      <slot />
    </UMain>

    <LandingFooter />
  </div>
</template>
