import { useEffect, useState } from "react";
import {
    collection,
    doc,
    getDocs,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import {
    FaCheck,
    FaChevronRight,
    FaImage,
    FaLayerGroup,
    FaListUl,
    FaParagraph,
    FaSave,
    FaSpinner,
    FaTimes,
    FaHeading,
} from "react-icons/fa";
import { fetchSections } from "../service/PageService";
import { db } from "../service/firebase";

interface MediaItem {
    id: string;
    name: string;
    url: string;
    type: string;
    altText?: string;
}

interface ContentBlock {
    id: string;
    type: string;
    order: number;
    text?: string | string[];
    imageId?: string;
    [key: string]: unknown;
}

interface SectionItem {
    id: string;
    title: string;
    order?: number;
    type?: string;
    content: ContentBlock[];
}

interface PageSectionProps {
    page: string;
}

const PageSection = ({ page }: PageSectionProps) => {
    const [sections, setSections] = useState<SectionItem[]>([]);
    const [activeTab, setActiveTab] = useState("");
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        let isMounted = true;

        const loadSections = async () => {
            setLoading(true);
            setError("");
            setSuccess("");

            try {
                const fetchedSections = (await fetchSections(page)) as SectionItem[];

                if (!isMounted) return;

                setSections(fetchedSections);
                setActiveTab((current) =>
                    fetchedSections.some((section) => section.id === current)
                        ? current
                        : fetchedSections[0]?.id ?? ""
                );
            } catch (err) {
                console.error("Failed to load sections:", err);

                if (isMounted) {
                    setError("Unable to load this page's sections. Please try again.");
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadSections();

        return () => {
            isMounted = false;
        };
    }, [page]);

    useEffect(() => {
        let isMounted = true;

        const loadMedia = async () => {
            try {
                const snapshot = await getDocs(collection(db, "media"));

                if (!isMounted) return;

                const mediaItems: MediaItem[] = snapshot.docs.map((mediaDoc) => {
                    const data = mediaDoc.data();

                    return {
                        id: mediaDoc.id,
                        name: data.fileName || "",
                        url: data.mediaUrl || "",
                        type: data.mediaType || "",
                        altText: data.altText || "",
                    };
                });

                setMedia(mediaItems);
            } catch (err) {
                console.error("Failed to load media:", err);
            }
        };

        loadMedia();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleContentChange = (
        sectionId: string,
        blockId: string,
        newValue: string | string[],
        field: string = "text"
    ) => {
        setSuccess("");
        setSections((previous) =>
            previous.map((section) =>
                section.id !== sectionId
                    ? section
                    : {
                        ...section,
                        content: section.content.map((block) =>
                            block.id === blockId
                                ? { ...block, [field]: newValue }
                                : block
                        ),
                    }
            )
        );
    };

    const saveSection = async (sectionId: string) => {
        const section = sections.find((item) => item.id === sectionId);
        if (!section || saving) return;

        setSaving(true);
        setError("");
        setSuccess("");

        try {
            await updateDoc(doc(db, "pages", page, "sections", sectionId), {
                content: section.content,
                updatedAt: serverTimestamp(),
            });

            setSuccess(`"${section.title}" has been saved successfully.`);
        } catch (err) {
            console.error("Failed to save section:", err);
            setError("Your changes could not be saved. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const getBlockIcon = (type: string) => {
        switch (type) {
            case "heading":
                return <FaHeading />;
            case "paragraph":
                return <FaParagraph />;
            case "image":
                return <FaImage />;
            case "bulletList":
                return <FaListUl />;
            default:
                return <FaLayerGroup />;
        }
    };

    const renderBlockEditor = (
        section: SectionItem,
        item: ContentBlock
    ) => {
        const fieldClass =
            "w-full rounded-xl border border-[#E5E5E3] bg-[#FAFAF9] px-4 py-3 text-sm text-[#292929] outline-none transition placeholder:text-[#A0A0A0] focus:border-[#F46B1F] focus:bg-white focus:ring-4 focus:ring-[#F46B1F]/10";

        if (item.type === "heading") {
            return (
                <div className="space-y-2">
                    <label
                        htmlFor={`heading-${item.id}`}
                        className="text-xs font-semibold uppercase tracking-wider text-[#757676]"
                    >
                        Heading text
                    </label>
                    <input
                        id={`heading-${item.id}`}
                        type="text"
                        value={typeof item.text === "string" ? item.text : ""}
                        onChange={(event) =>
                            handleContentChange(
                                section.id,
                                item.id,
                                event.target.value
                            )
                        }
                        placeholder="Enter heading text..."
                        className={fieldClass}
                    />
                </div>
            );
        }

        if (item.type === "paragraph") {
            return (
                <div className="space-y-2">
                    <label
                        htmlFor={`paragraph-${item.id}`}
                        className="text-xs font-semibold uppercase tracking-wider text-[#757676]"
                    >
                        Paragraph text
                    </label>
                    <textarea
                        id={`paragraph-${item.id}`}
                        rows={5}
                        value={typeof item.text === "string" ? item.text : ""}
                        onChange={(event) =>
                            handleContentChange(
                                section.id,
                                item.id,
                                event.target.value
                            )
                        }
                        placeholder="Write your paragraph here..."
                        className={`${fieldClass} resize-y leading-7`}
                    />
                </div>
            );
        }

        if (item.type === "bulletList") {
            return (
                <div className="space-y-2">
                    <label
                        htmlFor={`bullets-${item.id}`}
                        className="text-xs font-semibold uppercase tracking-wider text-[#757676]"
                    >
                        List items
                    </label>
                    <p className="text-xs text-[#909090]">
                        Enter one bullet point per line.
                    </p>
                    <textarea
                        id={`bullets-${item.id}`}
                        rows={5}
                        value={
                            Array.isArray(item.text)
                                ? item.text.join("\n")
                                : typeof item.text === "string"
                                    ? item.text
                                    : ""
                        }
                        onChange={(event) =>
                            handleContentChange(
                                section.id,
                                item.id,
                                event.target.value.split("\n"),
                                "text"
                            )
                        }
                        placeholder={"First item\nSecond item\nThird item"}
                        className={`${fieldClass} resize-y leading-7`}
                    />
                </div>
            );
        }

        if (item.type === "image") {
            const selectedMedia = media.find(
                (mediaItem) => mediaItem.id === item.imageId
            );

            const previewUrl = selectedMedia?.url ||
                (typeof item.imageId === "string" &&
                    /^https?:\/\//i.test(item.imageId)
                    ? item.imageId
                    : "");

            return (
                <div className="space-y-4">
                    <label
                        htmlFor={`image-${item.id}`}
                        className="text-xs font-semibold uppercase tracking-wider text-[#757676]"
                    >
                        Select image
                    </label>

                    <div className="grid gap-4 sm:grid-cols-[160px_minmax(0,1fr)]">
                        <div className="flex min-h-[140px] items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#DADAD7] bg-[#F7F7F5]">
                            {previewUrl ? (
                                <img
                                    src={previewUrl}
                                    alt={
                                        selectedMedia?.altText ||
                                        selectedMedia?.name ||
                                        "Selected content image"
                                    }
                                    className="h-full max-h-[180px] w-full object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-2 p-4 text-center text-[#A0A0A0]">
                                    <FaImage size={27} />
                                    <span className="text-xs">Image preview</span>
                                </div>
                            )}
                        </div>

                        <div className="flex min-w-0 flex-col justify-center gap-3">
                            <select
                                id={`image-${item.id}`}
                                value={
                                    media.some((mediaItem) => mediaItem.id === item.imageId)
                                        ? item.imageId
                                        : ""
                                }
                                onChange={(event) =>
                                    handleContentChange(
                                        section.id,
                                        item.id,
                                        event.target.value,
                                        "imageId"
                                    )
                                }
                                className={fieldClass}
                            >
                                <option value="">-- Select an image --</option>
                                {media.map((mediaItem) => (
                                    <option key={mediaItem.id} value={mediaItem.id}>
                                        {mediaItem.altText ||
                                            mediaItem.name ||
                                            mediaItem.id}
                                    </option>
                                ))}
                            </select>

                            <p className="text-xs leading-5 text-[#909090]">
                                Choose an image from your existing media library. The
                                selected media ID will be saved to this content block.
                            </p>

                            {item.imageId && !selectedMedia && !previewUrl && (
                                <p className="text-xs text-amber-700">
                                    The saved image reference is not present in the media
                                    library. Select a replacement if needed.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                The content type "{item.type}" does not have an editor yet.
            </p>
        );
    };

    const activeSection = sections.find(
        (section) => section.id === activeTab
    );

    return (
        <div className="min-w-0 space-y-6">
            {/* Section navigation */}
            {!loading && sections.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <h2 className="text-sm font-bold text-[#292929]">
                                Page sections
                            </h2>
                            <p className="mt-1 text-xs text-[#858585]">
                                Choose a section to edit its content.
                            </p>
                        </div>

                        <span className="shrink-0 rounded-full bg-[#F46B1F]/10 px-3 py-1.5 text-xs font-bold text-[#F46B1F]">
                            {sections.length}{" "}
                            {sections.length === 1 ? "section" : "sections"}
                        </span>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {sections.map((section, index) => {
                            const isActive = activeTab === section.id;

                            return (
                                <button
                                    key={section.id}
                                    type="button"
                                    onClick={() => {
                                        setActiveTab(section.id);
                                        setError("");
                                        setSuccess("");
                                    }}
                                    className={`flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${isActive
                                        ? "border-[#F46B1F]/30 bg-[#F46B1F]/[0.07] shadow-sm"
                                        : "border-[#EAEAE8] bg-white hover:border-[#F46B1F]/30 hover:bg-[#FAFAF9]"
                                        }`}
                                >
                                    <span
                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${isActive
                                            ? "bg-[#F46B1F] text-white"
                                            : "bg-[#F1F1EF] text-[#757676]"
                                            }`}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span className="max-w-[180px] truncate text-sm font-semibold">
                                        <span
                                            className={
                                                isActive ? "text-[#D85A13]" : "text-[#555555]"
                                            }
                                        >
                                            {section.title || `Section ${index + 1}`}
                                        </span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Feedback */}
            {error && (
                <div
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                    <FaTimes className="mt-0.5 shrink-0" />
                    <p>{error}</p>
                </div>
            )}

            {success && (
                <div
                    role="status"
                    className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
                >
                    <FaCheck className="mt-0.5 shrink-0" />
                    <p>{success}</p>
                </div>
            )}

            {/* Loading state */}
            {loading && (
                <div className="space-y-4">
                    <div className="h-6 w-48 animate-pulse rounded-lg bg-black/[0.06]" />
                    <div className="h-28 animate-pulse rounded-xl bg-black/[0.04]" />
                    <div className="h-28 animate-pulse rounded-xl bg-black/[0.04]" />
                </div>
            )}

            {/* No sections */}
            {!loading && sections.length === 0 && !error && (
                <div className="rounded-2xl border border-dashed border-[#DCDCD8] bg-[#FAFAF9] px-5 py-12 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F46B1F]/10 text-[#F46B1F]">
                        <FaLayerGroup size={22} />
                    </div>
                    <h3 className="font-bold text-[#292929]">
                        No sections available
                    </h3>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#757676]">
                        This page does not contain any sections yet.
                    </p>
                </div>
            )}

            {/* Active section editor */}
            {!loading && activeSection && (
                <div className="overflow-hidden rounded-2xl border border-[#EAEAE8] bg-white">
                    <div className="flex flex-col gap-4 border-b border-[#EEEEEC] bg-[#FAFAF9] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div className="flex min-w-0 items-start gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F46B1F]/10 text-[#F46B1F]">
                                <FaLayerGroup size={18} />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#F46B1F]">
                                    Editing section
                                </p>
                                <h2 className="mt-1 break-words text-lg font-bold text-[#292929]">
                                    {activeSection.title}
                                </h2>
                                <p className="mt-1 text-xs text-[#858585]">
                                    {activeSection.content.length}{" "}
                                    {activeSection.content.length === 1
                                        ? "content block"
                                        : "content blocks"}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => saveSection(activeSection.id)}
                            disabled={saving}
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#F46B1F] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#DE5F16] focus:outline-none focus:ring-4 focus:ring-[#F46B1F]/20 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saving ? (
                                <FaSpinner className="animate-spin" />
                            ) : (
                                <FaSave />
                            )}
                            {saving ? "Saving changes..." : "Save changes"}
                        </button>
                    </div>

                    <div className="space-y-5 p-4 sm:p-6">
                        {activeSection.content.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-[#E1E1DE] px-4 py-8 text-center text-sm text-[#757676]">
                                This section has no content blocks to edit.
                            </div>
                        ) : (
                            [...activeSection.content]
                                .sort((a, b) => a.order - b.order)
                                .map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="overflow-hidden rounded-xl border border-[#EAEAE8] bg-white transition hover:border-[#D9D9D5]"
                                    >
                                        <div className="flex items-center justify-between gap-3 border-b border-[#F0F0EE] bg-[#FCFCFB] px-4 py-3 sm:px-5">
                                            <div className="flex min-w-0 items-center gap-3">
                                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F46B1F]/10 text-[#F46B1F]">
                                                    {getBlockIcon(item.type)}
                                                </span>

                                                <div className="min-w-0">
                                                    <h3 className="truncate text-sm font-bold capitalize text-[#303030]">
                                                        {item.type === "bulletList"
                                                            ? "Bullet list"
                                                            : item.type}
                                                    </h3>
                                                    <p className="mt-0.5 text-xs text-[#929292]">
                                                        Content block {index + 1}
                                                    </p>
                                                </div>
                                            </div>

                                            <span className="shrink-0 rounded-md bg-[#F0F0EE] px-2.5 py-1 text-xs font-semibold text-[#757676]">
                                                #{item.order}
                                            </span>
                                        </div>

                                        <div className="p-4 sm:p-5">
                                            {renderBlockEditor(activeSection, item)}
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>

                    {/* Bottom save action */}
                    {activeSection.content.length > 0 && (
                        <div className="flex flex-col gap-3 border-t border-[#EEEEEC] bg-[#FAFAF9] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                            <p className="text-xs leading-5 text-[#858585]">
                                Remember to save your changes before switching pages or
                                leaving this screen.
                            </p>

                            <button
                                type="button"
                                onClick={() => saveSection(activeSection.id)}
                                disabled={saving}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F46B1F] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#DE5F16] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saving ? (
                                    <FaSpinner className="animate-spin" />
                                ) : (
                                    <FaSave />
                                )}
                                {saving ? "Saving..." : "Save changes"}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* No active section */}
            {!loading && sections.length > 0 && !activeSection && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
                    Select a section above to start editing.
                </div>
            )}

            <div className="flex items-center gap-2 px-1 text-xs text-[#929292]">
                <FaChevronRight size={9} className="text-[#F46B1F]" />
                <span>
                    Changes are saved to the selected page's section in Firestore.
                </span>
            </div>
        </div>
    );
};

export default PageSection;