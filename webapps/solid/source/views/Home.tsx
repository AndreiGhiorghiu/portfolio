import { Stack } from "$panda/jsx"
import DraggableItem from "~/components/Drag-and-Drop/DraggableItem"
import Lexical from "~/components/Lexical"

export default function Main() {
	return (
		<Stack flex="1" justify="center" align="center">
			<h1>Playground</h1>
			<Stack>
				<Lexical />
			</Stack>
		</Stack>
	)
}

const styles = {
	root: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		gap: "20px",
		transition: "all 0.2s ease-in-out",
	},
}
