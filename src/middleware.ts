import { NextMiddleware, NextRequest, NextResponse } from "next/server"
import { i18n } from "@i18n"
import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

function getLocale(request: NextRequest): string | undefined {
	// Negotiator expects plain object so we need to transform headers
	const negotiatorHeaders: Record<string, string> = {}
	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

	// Use negotiator and intl-localematcher to get best locale
	let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
	const locales: string[] = i18n.locales.map((i) => i)
	try {
		return matchLocale(languages, locales, i18n.default)
	} catch (_e) {
		return i18n.default
	}
}

export const middleware: NextMiddleware = (req, event) => {
	const pathname = req.nextUrl.pathname

	// // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
	// // If you have one
	if (["/favicon.ico"].includes(pathname)) return

	// Check if there is any supported locale in the pathname
	const pathnameIsMissingLocale = i18n.locales.every(
		(locale) =>
			!pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
	)

	// Redirect if there is no locale
	if (pathnameIsMissingLocale) {
		const locale = getLocale(req)

		// e.g. incoming request is /products
		// The new URL is now /en-US/products
		return NextResponse.redirect(
			new URL(
				`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
				req.url
			)
		)
	}
}

export const config = {
	// Matcher ignoring `/_next/` and `/api/`
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
