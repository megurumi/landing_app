import en from "./lang/en.json"
import fr from "./lang/fr.json"

export default defineI18nConfig(() => ({
  fallbackLocale: "en",
  fallbackWarn: false,
  legacy: false,
  locale: "en",
  messages: {
    en,
    fr,
  },
}))
