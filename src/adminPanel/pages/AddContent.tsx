import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import type { MediaItem } from "../features/contentContext";
import { addPage, addSection, getPages } from "../service/PageService";
import { db } from "../service/firebase";
import Layout from "../components/Layout";


const AddContent: React.FC = () => {
    const [pageSlug, setPageSlug] = useState("");
    const [pageTitle, setPageTitle] = useState("");
    const [pageId, setPageId] = useState<string | null>(null);

    const [allPages, setAllPages] = useState<{ id: string; slug: string; title: string }[]>([]);

    const [sections, setSections] = useState<
        { id: string; title: string; type: string; order: number; content: { id: string; type: string; text?: string | string[]; order: number; imageId?: string }[] }[]
    >([]);

    const [existingSections, setExistingSections] = useState<Section[]>([]);

    const [mediaOptions, setMediaOptions] = useState<MediaItem[]>([]);

    useEffect(() => {
        const fetchPages = async () => {
            const pages = await getPages();
            setAllPages(pages);
        };
        fetchPages();
    }, []);

    useEffect(() => {
        const loadMedia = async () => {
            const snapshot = await getDocs(collection(db, "media"));
            const items: MediaItem[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                fileName: doc.data().fileName,
                mediaUrl: doc.data().mediaUrl,
                mediaType: doc.data().mediaType,
                altText: doc.data().altText || ""
            }));
            setMediaOptions(items);
        };
        loadMedia();
    }, []);

    // Add Page
    const handleAddPage = async () => {
        if (!pageSlug || !pageTitle) return alert("Please enter slug and title");

        try {
            const id = await addPage(pageSlug, pageTitle);
            setPageId(id);
            alert("Page created!");
            const pages = await getPages();
            setAllPages(pages);
        } catch (err) {
            console.error(err);
            alert("Error creating page");
        }
    };

    // First define types somewhere in your file
    type HeadingBlock = {
        id: string;
        type: "heading";
        text: string;
        order: number;
    };

    type ParagraphBlock = {
        id: string;
        type: "paragraph";
        text: string;
        order: number;
    };

    type ImageBlock = {
        id: string;
        type: "image";
        imageId: string;
        order: number;
    };

    type BulletListBlock = {
        id: string;
        type: "bulletList";
        text: string[];
        order: number;
    };

    type ContentBlock = HeadingBlock | ParagraphBlock | ImageBlock | BulletListBlock;

    type Section = {
        id: string;
        title: string;
        type: string;
        order: number;
        content: ContentBlock[];
    };

    const addContentBlockUI = (
        sectionIndex: number,
        type: "heading" | "paragraph" | "image" | "bulletList"
    ) => {
        const updated = [...sections];

        // const existingCount = updated[sectionIndex].content.filter(
        //   (c: { id: string; type: string; text?: string; order: number; imageId?: string }) => c.type === type
        // ).length;
        const existingCount = updated[sectionIndex].content.filter(
            (c) => c.type === type
        ).length;

        let newBlock: ContentBlock;

        //   if (type === "image") {
        //     newBlock = {
        //       id: `${type}${existingCount + 1}`,
        //       type,
        //       imageId: "", // ✅ only image block has this
        //       order: updated[sectionIndex].content.length + 1,
        //     };
        //   } else {
        //     newBlock = {
        //       id: `${type}${existingCount + 1}`,
        //       type,
        //       text: "", // ✅ only heading/paragraph blocks have this
        //       order: updated[sectionIndex].content.length + 1,
        //     };
        //   }

        //   updated[sectionIndex].content.push(newBlock);
        //   setSections(updated);
        // };
        if (type === "image") {
            newBlock = {
                id: `${type}${existingCount + 1}`,
                type,
                imageId: "",
                order: updated[sectionIndex].content.length + 1,
            };
        } else if (type === "bulletList") {
            newBlock = {
                id: `${type}${existingCount + 1}`,
                type,
                text: [], // ✅ array of bullet strings
                order: updated[sectionIndex].content.length + 1,
            };
        } else {
            newBlock = {
                id: `${type}${existingCount + 1}`,
                type,
                text: "",
                order: updated[sectionIndex].content.length + 1,
            };
        }

        updated[sectionIndex].content.push(newBlock);
        setSections(updated);
    };



    const addSectionUI = () => {
        setSections([
            ...sections,
            {
                id: "",
                title: "",
                type: "",
                order: sections.length + 1,
                content: [],
            },
        ]);
    };
    const handleSaveSections = async () => {
        if (!pageId) return alert("Please create/select a page first!");

        try {
            for (const sec of sections) {
                if (sec.id) {
                    await setDoc(doc(db, "pages", pageId, "sections", sec.id), sec);
                } else {
                    await addSection(pageId, sec.title, sec.type, sec.order, sec.content);
                }
            }
            alert("Sections saved!");
            setSections([]);
            const snapshot = await getDocs(collection(db, "pages", pageId, "sections"));
            setExistingSections(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Section[]);
        } catch (err) {
            console.error(err);
            alert("Error saving sections");
        }
    };

    return (
        <Layout >
            <div className="p-6 space-y-6">
                <h2 className="text-2xl font-bold">Add Page & Sections</h2>


                {/* Page Selection */}
                <div className="shadow rounded p-4 space-y-3">
                    <h3 className="font-semibold text-lg">Select or Create Page</h3>

                    {/* Dropdown for existing pages */}
                    <select
                        className="border rounded px-3 py-2 w-full"
                        value={pageId ?? ""}
                        onChange={async (e) => {
                            const selected = allPages.find((p) => p.id === e.target.value);
                            if (selected) {
                                setPageId(selected.id);
                                setPageSlug(selected.slug);
                                setPageTitle(selected.title);

                                const snapshot = await getDocs(collection(db, "pages", selected.id, "sections"));
                                const secs: Section[] = snapshot.docs.map((doc) => ({
                                    id: doc.id,
                                    ...doc.data(),
                                })) as Section[];

                                setExistingSections(secs);
                                setSections([]); // clear current until a section is chosen

                            }
                        }}
                    >
                        <option value="">-- Select a Page --</option>
                        {allPages.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.title} ({p.slug})
                            </option>
                        ))}
                    </select>

                    <div className="text-gray-500 text-sm">OR create a new page</div>

                    {/* Add Page Form */}
                    <input
                        type="text"
                        placeholder="Page Slug"
                        className="border rounded px-3 py-2 w-full"
                        value={pageSlug}
                        onChange={(e) => setPageSlug(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Page Title"
                        className="border rounded px-3 py-2 w-full"
                        value={pageTitle}
                        onChange={(e) => setPageTitle(e.target.value)}
                    />
                    <button
                        onClick={handleAddPage}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Create Page
                    </button>
                </div>

                {/* Add Sections */}
                {pageId && (
                    <div className="bg-white shadow rounded p-4 space-y-4">
                        <h3 className="font-semibold text-lg">Sections</h3>

                        {/* Section Selection */}
                        {existingSections.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium">Select Existing Section</label>
                                <select
                                    className="border rounded px-3 py-2 w-full mt-1"
                                    value={sections[0]?.id ?? ""}
                                    onChange={(e) => {
                                        const selected = existingSections.find((s) => s.id === e.target.value);
                                        if (selected) {
                                            // Load existing section into editor
                                            setSections([selected]);
                                        } else {
                                            setSections([]);
                                        }
                                    }}
                                >
                                    <option value="">-- Select Section --</option>
                                    {existingSections.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}


                        {sections.map((section, sIndex) => (
                            <div key={sIndex} className="border rounded p-3 space-y-2">
                                <input
                                    type="text"
                                    placeholder="Section Title"
                                    className="border rounded px-3 py-2 w-full"
                                    value={section.title}
                                    onChange={(e) => {
                                        const updated = [...sections];
                                        updated[sIndex].title = e.target.value;
                                        updated[sIndex].type = e.target.value;
                                        setSections(updated);
                                    }}
                                />

                                {section.content.map((block, bIndex) => (
                                    <div key={block.id} className="flex gap-2 items-center">
                                        <span className="w-24 capitalize">{block.type}</span>

                                        {/* If block is image → show dropdown */}
                                        {block.type === "image" ? (
                                            <div className="flex gap-2 items-center flex-1">
                                                <select
                                                    className="border rounded px-3 py-2 flex-1"
                                                    value={block.imageId || ""} // block.text will hold media doc id
                                                    onChange={(e) => {
                                                        const updated = [...sections];
                                                        updated[sIndex].content[bIndex].imageId = e.target.value; // save doc.id
                                                        setSections(updated);
                                                    }}
                                                >
                                                    <option value="">-- Select Image --</option>
                                                    {mediaOptions.map((media) => (
                                                        <option key={media.id} value={media.id}>
                                                            {media.altText || media.fileName}
                                                        </option>
                                                    ))}
                                                </select>

                                                {/* Preview */}
                                                {block.imageId && (
                                                    <img
                                                        src={mediaOptions.find((m) => m.id === block.imageId)?.mediaUrl}
                                                        alt="preview"
                                                        className="w-26 h-26 object-cover rounded"
                                                    />
                                                )}
                                            </div>
                                        ) : block.type === "paragraph" ? (
                                            <textarea
                                                placeholder={`Enter ${block.type}`}
                                                className="border rounded px-3 py-2 flex-1"
                                                rows={3}
                                                value={block.text}
                                                onChange={(e) => {
                                                    const updated = [...sections];
                                                    updated[sIndex].content[bIndex].text = e.target.value;
                                                    setSections(updated);
                                                }}
                                            />
                                        ) : block.type === "bulletList" ? (
                                            <textarea
                                                placeholder="Enter bullet points, one per line"
                                                className="border rounded px-3 py-2 flex-1"
                                                value={Array.isArray(block.text) ? block.text.join("\n") : block.text || ""}
                                                onChange={(e) => {
                                                    const updated = [...sections];
                                                    updated[sIndex].content[bIndex].text = e.target.value
                                                        .split("\n")
                                                        .filter(Boolean); // store as array
                                                    setSections(updated);
                                                }}
                                                rows={4}
                                            />
                                        ) : (
                                            // Default input for heading / paragraph
                                            <input
                                                type="text"
                                                placeholder={`Enter ${block.type}`}
                                                className="border rounded px-3 py-2 flex-1"
                                                value={block.text}
                                                onChange={(e) => {
                                                    const updated = [...sections];
                                                    updated[sIndex].content[bIndex].text = e.target.value;
                                                    setSections(updated);
                                                }}
                                            />
                                        )}
                                    </div>
                                ))}


                                <div className="flex gap-2">
                                    <button
                                        onClick={() => addContentBlockUI(sIndex, "heading")}
                                        className="bg-gray-200 px-3 py-1 rounded"
                                    >
                                        + Heading
                                    </button>
                                    <button
                                        onClick={() => addContentBlockUI(sIndex, "paragraph")}
                                        className="bg-gray-200 px-3 py-1 rounded"
                                    >
                                        + Paragraph
                                    </button>
                                    <button
                                        onClick={() => addContentBlockUI(sIndex, "image")}
                                        className="bg-gray-200 px-3 py-1 rounded"
                                    >
                                        + Image
                                    </button>
                                    <button
                                        onClick={() => addContentBlockUI(sIndex, "bulletList")}
                                        className="bg-gray-200 px-3 py-1 rounded"
                                    >
                                        + Bullet List
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={addSectionUI}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            + Add Section
                        </button>

                        <div>
                            <button
                                onClick={handleSaveSections}
                                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Save Sections
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>

    );
};

export default AddContent;
