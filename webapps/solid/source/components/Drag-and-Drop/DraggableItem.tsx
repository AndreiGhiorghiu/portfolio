import {
	draggable,
	dropTargetForElements,
	monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/adapter/element"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/util/set-custom-native-drag-preview"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/util/combine"
import { createEffect, createSignal, onCleanup } from "solid-js"
import { Portal } from "solid-js/web"
import {
	attachClosestEdge,
	extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/addon/closest-edge"

export default function DraggableItem({ id }: { id: any }) {
	const [state, setState] = createSignal<{
		type: string
		container?: HTMLElement | undefined
	}>({ type: "idle", container: undefined })
	const [dragElement, setDragElement] = createSignal<HTMLElement | null>(null)
	const [closureEdge, setClosureEdge] = createSignal<string | null>("")
	const [hoverItem, setHoverItem] = createSignal<Element | null>(null)
	let ref: HTMLElement | HTMLDivElement | undefined

	createEffect(() => {
		if (ref) {
			combine(
				draggable({
					element: ref,

					onDragStart(event) {
						// event.source.element.style.display = "none"
						// setDragElement(event.source.element)
					},
					onDrop(event) {
						// setDragElement(null)
						event.source.element.style.display = ""
					},
					onGenerateDragPreview({ nativeSetDragImage }) {
						setCustomNativeDragPreview({
							render({ container, ...rest }) {
								console.log("rest", rest)
								// Cause a `react` re-render to create your portal synchronously
								setState({ type: "preview", container })

								return () => setState({ type: "idle" })
							},
							nativeSetDragImage,
						})
					},
				}),

				dropTargetForElements({
					element: ref,
					getIsSticky: () => true,
					onDropTargetChange: args => {
						const cloneNode = args.source.element.cloneNode(true) as HTMLElement

						setDragElement(cloneNode)
					},
					getData({ input, element }) {
						const data = {
							type: "item",
							id: id,
						}

						setHoverItem(element)

						return attachClosestEdge(data, {
							input,
							element,
							allowedEdges: ["left", "right"],
						})
					},
					onDragEnter: args => setClosureEdge(extractClosestEdge(args.self.data)),
					onDrag: args => setClosureEdge(extractClosestEdge(args.self.data)),
					onDragLeave: () => {
						setClosureEdge(null)
						setHoverItem(null)
					},
					onDrop: () => {
						setDragElement(null)
						setClosureEdge(null)
						setHoverItem(null)
					},
				})
			)
		}
	})

	const items = ["100px", "200px", "150px", "300px"]
	const width = items[Math.floor(Math.random() * items.length)]
	const height = items[Math.floor(Math.random() * items.length)]

	const styles = {
		element: {
			width,
			height,
			background: "red",
		},
	}

	return (
		<>
			{closureEdge() === "left" && <div innerHTML={dragElement()?.outerHTML}>aici</div>}

			<div ref={ref as HTMLDivElement} style={styles.element} id={`dnd-element-${id}`}>
				Draggable Item {id}
			</div>

			{state().type === "preview" && state()?.container && (
				<Portal mount={state()?.container}>
					<div
						style={{
							...styles.element,
							opacity: 0.5,
						}}
					>
						Draggable Item Dragged
					</div>
				</Portal>
			)}
			{closureEdge() === "right" && (
				<div innerHTML={dragElement()?.outerHTML}>aici</div>
			)}
		</>
	)
}
