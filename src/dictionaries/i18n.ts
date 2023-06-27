
try {
	if (window) throw new Error("Cannot use in client side")
} catch {

}

export const i18n = {
	locales: ["en", "ar", "fr"],
	default: "en",
} as const

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
	en: () => import("./en.json").then((module) => module.default),
	ar: () => import("./ar.json").then((module) => module.default),
	fr: () => import("./fr.json").then((module) => module.default),
}

export const getTranslate = async (locale: Locale) => dictionaries[locale]()

export type Locale = (typeof i18n.locales)[number]
