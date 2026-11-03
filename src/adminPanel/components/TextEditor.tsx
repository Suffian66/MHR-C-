
import { useEffect } from "react";
import type { ReactNode } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

import {
    FaBold,
    FaItalic,
    FaStrikethrough,
    FaListUl,
    FaListOl,
    FaQuoteLeft,
    FaUndo,
    FaRedo,
    FaLink,
    FaUnlink,
} from "react-icons/fa";

type RichTextEditorProps = {
    content: string;
    onChange: (content: string) => void;
};

export default function RichTextEditor({
    content,
    onChange,
}: RichTextEditorProps) {

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                autolink: true,
                linkOnPaste: true,
                HTMLAttributes: {
                    target: "_blank",
                    rel: "noopener noreferrer",
                    class: "text-[#F46B1F] underline cursor-pointer",
                },
            }),
        ],

        content: content || "<p></p>",
        immediatelyRender: false,

        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },

        editorProps: {
            attributes: {
                class: "min-h-[280px] px-4 py-4 text-sm leading-7 text-[#343536] outline-none",
            },
        },
    });

    useEffect(() => {
        if (editor && editor.getHTML() !== (content || "<p></p>")) {
            editor.commands.setContent(content || "<p></p>");
        }
    }, [content, editor]);

    if (!editor) return null;

    // Add or edit a hyperlink
    const handleAddLink = () => {

        const { from, to, empty } = editor.state.selection;

        if (empty) {
            alert("Please select the text you want to turn into a link first.");
            return;
        }

        const previousUrl = editor.getAttributes("link").href || "";

        const url = window.prompt(
            "Enter the link URL:",
            previousUrl
        );

        if (url === null) return;

        const trimmedUrl = url.trim();

        if (!trimmedUrl) {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        // Allow HTTP, HTTPS and internal relative URLs.
        const validUrl =
            /^https?:\/\//i.test(trimmedUrl) ||
            (trimmedUrl.startsWith("/") && !trimmedUrl.startsWith("//"));

        if (!validUrl) {
            alert("Please enter a valid HTTP, HTTPS, or internal page URL.");
            return;
        }

        editor
            .chain()
            .focus()
            .setTextSelection({ from, to })
            .setLink({ href: trimmedUrl })
            .run();
    };

    // Remove an existing hyperlink
    const handleRemoveLink = () => {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
    };

    const toolbarButton = (
        label: string,
        icon: ReactNode,
        action: () => void,
        active = false,
        disabled = false
    ) => (
        <button
            key={label}
            type="button"
            title={label}
            aria-label={label}
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={action}
            className={`rounded-lg p-2.5 transition disabled:opacity-30 disabled:cursor-not-allowed ${active
                ? "bg-[#F46B1F] text-white"
                : "text-[#555] hover:bg-[#FFF0E7] hover:text-[#F46B1F]"
                }`}
        >
            {icon}
        </button>
    );

    return (
        <div className="overflow-hidden rounded-xl border border-black/10 focus-within:border-[#F46B1F] focus-within:ring-2 focus-within:ring-[#F46B1F]/10">

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 border-b border-black/10 bg-[#FAFAF9] p-2">

                <select
                    aria-label="Text style"
                    value={
                        editor.isActive("heading", { level: 2 })
                            ? "h2"
                            : editor.isActive("heading", { level: 3 })
                                ? "h3"
                                : "paragraph"
                    }
                    onMouseDown={(event) => {
                        event.stopPropagation();
                    }}
                    onChange={(event) => {
                        if (event.target.value === "h2") {
                            editor.chain().focus().toggleHeading({ level: 2 }).run();
                        } else if (event.target.value === "h3") {
                            editor.chain().focus().toggleHeading({ level: 3 }).run();
                        } else {
                            editor.chain().focus().setParagraph().run();
                        }
                    }}
                    className="rounded-lg border border-black/10 bg-white px-2 py-2 text-xs outline-none"
                >
                    <option value="paragraph">Paragraph</option>
                    <option value="h2">Heading</option>
                    <option value="h3">Subheading</option>
                </select>

                <div className="mx-1 h-6 w-px bg-black/10" />

                {toolbarButton("Bold", <FaBold />, () =>
                    editor.chain().focus().toggleBold().run(),
                    editor.isActive("bold")
                )}

                {toolbarButton("Italic", <FaItalic />, () =>
                    editor.chain().focus().toggleItalic().run(),
                    editor.isActive("italic")
                )}

                {toolbarButton("Strikethrough", <FaStrikethrough />, () =>
                    editor.chain().focus().toggleStrike().run(),
                    editor.isActive("strike")
                )}

                <div className="mx-1 h-6 w-px bg-black/10" />

                {toolbarButton("Bullet list", <FaListUl />, () =>
                    editor.chain().focus().toggleBulletList().run(),
                    editor.isActive("bulletList")
                )}

                {toolbarButton("Numbered list", <FaListOl />, () =>
                    editor.chain().focus().toggleOrderedList().run(),
                    editor.isActive("orderedList")
                )}

                {toolbarButton("Blockquote", <FaQuoteLeft />, () =>
                    editor.chain().focus().toggleBlockquote().run(),
                    editor.isActive("blockquote")
                )}

                <div className="mx-1 h-6 w-px bg-black/10" />

                {/* Insert / Edit Link */}
                {toolbarButton(
                    "Insert or edit link",
                    <FaLink />,
                    handleAddLink,
                    editor.isActive("link")
                )}

                {/* Remove Link */}
                {toolbarButton(
                    "Remove link",
                    <FaUnlink />,
                    handleRemoveLink,
                    false,
                    !editor.isActive("link")
                )}

                <div className="mx-1 h-6 w-px bg-black/10" />

                {toolbarButton("Undo", <FaUndo />, () =>
                    editor.chain().focus().undo().run()
                )}

                {toolbarButton("Redo", <FaRedo />, () =>
                    editor.chain().focus().redo().run()
                )}

            </div>

            {/* Editor */}
            <EditorContent editor={editor} />

            <div className="border-t border-black/[0.06] bg-[#FAFAF9] px-4 py-2 text-xs text-[#757676]">
                Format your article using headings, bold text, paragraphs,
                lists, and hyperlinks.
            </div>

            <style>{`
                .tiptap {
                    min-height: 280px;
                    outline: none;
                }

                .tiptap p {
                    margin: 0 0 1rem;
                }

                .tiptap h2 {
                    margin: 1.75rem 0 0.75rem;
                    font-size: 1.5rem;
                    line-height: 1.35;
                    font-weight: 700;
                    color: #171717;
                }

                .tiptap h3 {
                    margin: 1.5rem 0 0.5rem;
                    font-size: 1.2rem;
                    line-height: 1.4;
                    font-weight: 700;
                    color: #171717;
                }

                .tiptap ul {
                    list-style: disc;
                    padding-left: 1.5rem;
                    margin: 0 0 1rem;
                }

                .tiptap ol {
                    list-style: decimal;
                    padding-left: 1.5rem;
                    margin: 0 0 1rem;
                }

                .tiptap li {
                    padding-left: 0.25rem;
                    margin: 0.25rem 0;
                }

                .tiptap blockquote {
                    border-left: 3px solid #F46B1F;
                    margin: 1rem 0;
                    padding-left: 1rem;
                    color: #757676;
                }

                .tiptap a {
                    color: #F46B1F;
                    text-decoration: underline;
                    cursor: pointer;
                }
            `}</style>

        </div>
    );
}
