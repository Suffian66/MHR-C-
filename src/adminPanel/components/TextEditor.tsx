
import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
    FaBold,
    FaItalic,
    FaStrikethrough,
    FaListUl,
    FaListOl,
    FaQuoteLeft,
    FaUndo,
    FaRedo,
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
        extensions: [StarterKit],
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

    const toolbarButton = (
        label: string,
        icon: React.ReactNode,
        action: () => void,
        active = false
    ) => (
        <button
            key={label}
            type="button"
            title={label}
            aria-label={label}
            onClick={action}
            className={`rounded-lg p-2.5 transition ${active
                ? "bg-[#F46B1F] text-white"
                : "text-[#555] hover:bg-[#FFF0E7] hover:text-[#F46B1F]"
                }`}
        >
            {icon}
        </button>
    );

    return (
        <div className="overflow-hidden rounded-xl border border-black/10 focus-within:border-[#F46B1F] focus-within:ring-2 focus-within:ring-[#F46B1F]/10">
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

                {toolbarButton("Undo", <FaUndo />, () =>
                    editor.chain().focus().undo().run()
                )}

                {toolbarButton("Redo", <FaRedo />, () =>
                    editor.chain().focus().redo().run()
                )}
            </div>

            <EditorContent editor={editor} />

            <div className="border-t border-black/[0.06] bg-[#FAFAF9] px-4 py-2 text-xs text-[#757676]">
                Format your article using headings, bold text, paragraphs, and lists.
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
            `}</style>
        </div>
    );
}
