import { Stack } from "$panda/jsx"
import DraggableItem from "~/components/Drag-and-Drop/DraggableItem"

export default function Main() {
	return (
		<Stack flex="1" justify="center" align="center">
			<h1>Playground</h1>
			<div style={styles.root}>
				<DraggableItem id={1} />
				<DraggableItem id={2} />
				<DraggableItem id={3} />
				<DraggableItem id={4} />
				<DraggableItem id={5} />
			</div>
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
