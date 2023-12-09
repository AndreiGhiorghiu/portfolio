import { defineConfig } from "vite"
import tsConfigPaths from "vite-tsconfig-paths"
import solid from "vite-plugin-solid"

const cwd = process.cwd()

export default defineConfig({
	root: `${cwd}/source`,
	plugins: [tsConfigPaths(), solid()],
})
