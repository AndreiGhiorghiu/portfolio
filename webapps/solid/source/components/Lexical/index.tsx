import { Stack } from "$panda/jsx"
import { createEffect } from "solid-js"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { registerPlainText } from "@lexical/plain-text"
import {
	$createParagraphNode,
	$createTextNode,
	$getRoot,
	$getSelection,
	CAN_UNDO_COMMAND,
	createEditor,
	FORMAT_TEXT_COMMAND,
	LineBreakNode,
	ParagraphNode,
	TextNode,
	UNDO_COMMAND,
	type INTERNAL_PointSelection,
	$isRangeSelection,
} from "lexical"
import { ListNode, ListItemNode } from "@lexical/list"
import { CodeHighlightNode, CodeNode } from "@lexical/code"
import {
	registerMarkdownShortcuts,
	TRANSFORMERS,
	$convertToMarkdownString,
} from "@lexical/markdown"
import { LinkNode } from "@lexical/link"
import { mergeRegister } from "@lexical/utils"
import { $wrapNodes } from "@lexical/selection"

const exampleTheme = {
	ltr: "ltr",
	rtl: "rtl",
	paragraph: "editor-paragraph",
	quote: "editor-quote",
	heading: {
		h1: "editor-heading-h1",
		h2: "editor-heading-h2",
		h3: "editor-heading-h3",
		h4: "editor-heading-h4",
		h5: "editor-heading-h5",
		h6: "editor-heading-h6",
	},
	list: {
		nested: {
			listitem: "editor-nested-listitem",
		},
		ol: "editor-list-ol",
		ul: "editor-list-ul",
		listitem: "editor-listItem",
		listitemChecked: "editor-listItemChecked",
		listitemUnchecked: "editor-listItemUnchecked",
	},
	hashtag: "editor-hashtag",
	image: "editor-image",
	link: "editor-link",
	text: {
		bold: "editor-textBold",
		code: "editor-textCode",
		italic: "editor-textItalic",
		strikethrough: "editor-textStrikethrough",
		subscript: "editor-textSubscript",
		superscript: "editor-textSuperscript",
		underline: "editor-textUnderline",
		underlineStrikethrough: "editor-textUnderlineStrikethrough",
	},
	code: "editor-code",
	codeHighlight: {
		atrule: "editor-tokenAttr",
		attr: "editor-tokenAttr",
		boolean: "editor-tokenProperty",
		builtin: "editor-tokenSelector",
		cdata: "editor-tokenComment",
		char: "editor-tokenSelector",
		class: "editor-tokenFunction",
		"class-name": "editor-tokenFunction",
		comment: "editor-tokenComment",
		constant: "editor-tokenProperty",
		deleted: "editor-tokenProperty",
		doctype: "editor-tokenComment",
		entity: "editor-tokenOperator",
		function: "editor-tokenFunction",
		important: "editor-tokenVariable",
		inserted: "editor-tokenSelector",
		keyword: "editor-tokenAttr",
		namespace: "editor-tokenVariable",
		number: "editor-tokenProperty",
		operator: "editor-tokenOperator",
		prolog: "editor-tokenComment",
		property: "editor-tokenProperty",
		punctuation: "editor-tokenPunctuation",
		regex: "editor-tokenVariable",
		selector: "editor-tokenSelector",
		string: "editor-tokenSelector",
		symbol: "editor-tokenProperty",
		tag: "editor-tokenProperty",
		url: "editor-tokenOperator",
		variable: "editor-tokenVariable",
	},
}

export default function Lexical() {
	let ref: HTMLDivElement | undefined

	const editor = createEditor({
		onError: e => console.log("error", e),
		// theme: exampleTheme,
		nodes: [
			HeadingNode,
			CodeHighlightNode,
			QuoteNode,
			CodeNode,
			ListItemNode,
			ListNode,
			LineBreakNode,
			ParagraphNode,
			TextNode,
			LinkNode,
		],
	})

	createEffect(() => {
		if (ref) {
			console.log("ref", ref)
			editor.setRootElement(ref)

			registerPlainText(editor)
			registerMarkdownShortcuts(editor, TRANSFORMERS)

			setTimeout(() => {
				editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")

				editor.update(() => {
					const selection = $getSelection()

					const test = $isRangeSelection(selection)
					if (selection) {
					}
					console.log("test123", test)
				})
			}, 5000)

			console.log([ref])

			mergeRegister(
				editor.registerUpdateListener(({ editorState }) => {
					editorState.read(() => {
						const toMarkdownString = $convertToMarkdownString(TRANSFORMERS)
						console.log("asd", toMarkdownString)
						const root = $getRoot()

						console.log("root", root.exportJSON())
						console.log("test", root.getTextContent())
					})
				}),
				editor.registerCommand(
					FORMAT_TEXT_COMMAND,
					payoload => {
						console.log("payoload", payoload)
						return false
					},
					1
				)
			)
		}
	})

	return (
		<>
			<Stack
				paddingX={5}
				width="500px"
				height="600px"
				ref={ref}
				contentEditable
			></Stack>
		</>
	)
}
