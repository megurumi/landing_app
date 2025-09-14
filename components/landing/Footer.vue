<script setup lang="ts">
const { t } = useI18n()
const viewport = useViewport()
const localePath = useLocalePath()

const links = computed(() => [
  {
    label: "Megurumi Creative",
    children: [
      {
        label: t("creations"),
        to: localePath("/landing/creations"),
      },
      {
        label: t("policy"),
        to: localePath("/landing/policy"),
      },
      {
        label: t("terms"),
        to: localePath("/landing/terms"),
      },
    ],
  },
])

const socials = [
  {
    label: "Instagram",
    url: "https://www.instagram.com/megurumi_creative",
    icon: "i-simple-icons-instagram",
  },
  {
    label: "YouTube",
    url: "https://www.youtube.com/@Megurumi_creative",
    icon: "i-simple-icons-youtube",
  },
  {
    label: "Facebook",
    url: "https://www.facebook.com/megurumicreative",
    icon: "i-simple-icons-facebook",
  },
  {
    label: "TikTok",
    url: "https://www.tiktok.com/@megurumi_creative",
    icon: "i-simple-icons-tiktok",
  },
]
</script>

<template>
  <UFooter>
    <template #top>
      <UFooterColumns :links="links">
        <template #right>
          <div
            class="flex gap-4"
            :class="{ 'justify-end px-4': viewport.isGreaterThan('desktop') }"
          >
            <ULink
              v-for="link in socials"
              :key="link.url"
              :to="link.url"
              target="_blank"
            >
              <UIcon
                :name="link.icon"
                class="w-6 h-6 flex-shrink-0 hover:text-primary transition-colors duration-300"
              />
            </ULink>
          </div>
        </template>
      </UFooterColumns>
    </template>

    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        {{ t("copyright", { date: new Date().getFullYear() }) }}
      </p>
    </template>

    <template #right>
      <UColorModeSelect />
      <AtomsLocalePicker />
    </template>
  </UFooter>
</template>

<i18n lang="json">
{
  "en": {
    "legal": "Legal",
    "copyright": "Copyright © Megurumi Creative {date}. All rights reserved.",
    "creations": "Creations",
    "terms": "Terms and Condition",
    "policy": "Policy of use"
  },
  "fr": {
    "legal": "Mentions légales",
    "copyright": "Droits d'auteur © Megurumi Creative {date}. Tous droits réservés.",
    "creations": "Créations",
    "terms": "Terme et condition",
    "policy": "Politique d'utilisation"
  }
}
</i18n>
