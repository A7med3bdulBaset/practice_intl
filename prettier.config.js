/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
	endOfLine: "lf",
	useTabs: true,
	semi: false,
	singleQuote: false,
	tabWidth: 3,
	trailingComma: "es5",
	importOrder: [
		"^(react/(.*)$)|^(react$)",
		"^(next/(.*)$)|^(next$)",
		"<THIRD_PARTY_MODULES>",
		"",
		"^types$",
		"^@/types/(.*)$",
		"^@/config/(.*)$",
		"^@/lib/(.*)$",
		"^@/hooks/(.*)$",
		"^@shadcn/(.*)$",
		"^@/components/(.*)$",
		"^@/styles/(.*)$",
		"^@/app/(.*)$",
		"",
		"^[./]",
	],
	importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
	plugins: ["@ianvs/prettier-plugin-sort-imports"],
}