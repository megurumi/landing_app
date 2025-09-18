<template>
  <UDashboardLayout>
    <UDashboardPanel
      :width="300"
      collapsible
    >
      <UDashboardNavbar class="!border-transparent">
        <template #left>
          <AtomsBrand size="lg" />
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <UDashboardSidebarLinks
          :links="links"
          :ui="{ base: 'py-2.5', label: 'ml-2 text-[16px]' }"
        />

        <template #footer>
          <div class="w-full flex-col justify-between">
            <ProfileNavDropdown />
          </div>
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />
  </UDashboardLayout>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n()
const localePath = useLocalePath()

const { data: navigations } = await useAsyncData("navigation", () => fetchContentNavigation())

const navigation = computed(() => {
  const navItems = navigations.value?.find((navigation) => navigation._path === `/${locale.value}`)
    ?.children
  if (!navItems?.length) return []

  return navItems.map((item) => {
    if (locale.value === "en") {
      return { ...item, _path: item._path.replace(/^\/?en(\/|$)/, "/") }
    }
  })
})

provide("navigation", navigation)

const links = computed(() => {
  return [
    {
      label: t("brand"),
      to: localePath("/"),
      icon: "i-heroicons-home",
      exact: true,
    }
  ]
})
</script>
