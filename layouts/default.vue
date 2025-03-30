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
  const navItems = navigations.value.find((navigation) => navigation._path === `/${locale.value}`)
    ?.children
  if (!navItems.length) return []

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
      label: t("dashboard"),
      to: localePath("/dashboard"),
      icon: "i-heroicons-home",
      exact: true,
    },
    {
      label: t("learning"),
      to: localePath("/dashboard/learning"),
      icon: "i-heroicons-book-open",
      exact: true,
    },
    {
      label: t("exam"),
      to: localePath("/dashboard/exam"),
      icon: "i-heroicons-computer-desktop",
      exact: true,
    },
    {
      label: t("quiz"),
      to: localePath("/dashboard/practice/quiz"),
      icon: "i-heroicons-play",
      exact: true,
    },
    {
      label: t("statistic"),
      to: localePath("/dashboard/statistic"),
      icon: "i-heroicons-arrow-trending-up",
      exact: true,
    },
  ]
})
</script>

<!-- TODO: Some translation to delete as global for nav -->
<i18n lang="json">
{
  "en": {
    "default": "Megurumi",
    "index": "Canadian Citizenship Preparation",
    "quiz": "Quiz",
    "contact": "Contact us",
    "signin": "Login",
    "signup": "Register",
    "dashboard": "Dashboard",
    "dashboard-learn": "Learn",
    "dashboard-contact-us": "Contact us",
    "dashboard-practice": "Practice",
    "dashboard-practice-result": "Practice",
    "dashboard-exam": "Practice",
    "dashboard-exam-result": "Practice",
    "practice": "Practice Center",
    "exam": "Exam simulator",
    "logout": "Logout",
    "learning": "Discover Canada",
    "statistic": "My statistics",
    "contact-us": "Contact us",
    "close-sr": "Close navigation bar"
  },
  "fr": {
    "default": "Megurumi",
    "index": "Préparation à la Citoyenneté Canadienne",
    "quiz": "Quiz",
    "contact": "Contactez-nous",
    "signin": "Se connecter",
    "signup": "S'inscrire",
    "dashboard": "Dashboard",
    "dashboard-learn": "Apprendre",
    "dashboard-contact-us": "Nous contacter",
    "dashboard-practice": "Entraînement",
    "dashboard-practice-result": "Entraînement",
    "dashboard-exam": "Examen",
    "practice": "Centre d'Entrainement",
    "dashboard-exam-result": "Examen",
    "exam": "Simulateur d'examen",
    "logout": "Se déconnecter",
    "learning": "Découvre le Canada",
    "statistic": "Mes statistiques",
    "contact-us": "Nous contacter",
    "close-sr": "Fermer la barre de navigation"
  }
}
</i18n>
