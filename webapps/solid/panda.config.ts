import { defineConfig } from "@pandacss/dev"

export default defineConfig({
	include: ["./source/**/*.{js,jsx,ts,tsx}"],
	exclude: ["./source/**/*.test.{js,jsx,ts,tsx}"],
	outdir: ".local/panda",

	hash: { className: true, cssVar: false },

	jsxFramework: "solid",
	presets: ["@pandacss/preset-panda"],

	studio: {
		outdir: "./.local/studio",
		logo: "./favicon.svg",
		inject: { head: "", body: "" },
	},
})
