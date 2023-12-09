import { Stack } from "$panda/jsx"
import { createEffect } from "solid-js"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { registerPlainText } from "@lexical/plain-text"
import { $getRoot, createEditor, LineBreakNode, ParagraphNode, TextNode } from "lexical"
import { ListNode, ListItemNode } from "@lexical/list"

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

	const config = {}

	const editor = createEditor({
		namespace: "MyEditor",
		theme: exampleTheme,
		onError: console.error,
		editable: true,
		nodes: [HeadingNode, QuoteNode, ListNode],
	})

	createEffect(() => {
		if (ref) {
			editor.setRootElement(ref)

			registerPlainText(editor)
			editor.registerUpdateListener(({ editorState }) => {
				editorState.read(() => {
					// const toMarkdownString = $convertToMarkdownString(TRANSFORMERS)
					// console.log(toMarkdownString)
					const root = $getRoot()
					console.log("test", root.getTextContent())
				})
			})
		}
	})

	return (
		<Stack width="500px" height="600px" ref={ref} contentEditable>
			Lexical
		</Stack>
	)
}
