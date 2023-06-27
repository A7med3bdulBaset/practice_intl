import { getTranslate, Locale } from "@i18n"

interface Props {
	params: {
		lang: Locale
	}
}

export default async function page({ params: { lang } }: Props) {
	const t = await getTranslate(lang)

	return (
		<h1>
			{t.hello_there} {lang}
		</h1>
	)
}
