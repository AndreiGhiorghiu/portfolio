/* @refresh reload */
import { render } from "solid-js/web"
import router from "~/router"

async function main() {
	const main = document.querySelector("main")

	if (!main) throw Error(`Root element not found`)

	render(router, main)
}

Promise.resolve(main()).catch(error => {
	console.error("Application error:", error)
})
