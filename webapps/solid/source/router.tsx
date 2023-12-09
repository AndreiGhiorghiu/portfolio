import { Router, Route } from "@solidjs/router"
import { lazy, For } from "solid-js"

const routes = [{ path: "/", load: () => import("./views/Home") }]

export default () => (
	<Router>
		<For each={routes}>
			{({ path, load }) => <Route path={path} component={lazy(load)} />}
		</For>
	</Router>
)
