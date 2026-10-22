import { useEffect, useRef, useState } from "react";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import {
    FaCloudUploadAlt,
    FaSearch,
    FaImage,
    FaVideo,
    FaMusic,
    FaFileAlt,
    FaTrashAlt,
    FaCheck,
    FaTimes,
    FaSpinner,
    FaImages,
    FaFilter,
    FaExternalLinkAlt,
    FaSave,
} from "react-icons/fa";
import { db } from "../service/firebase";
import Layout from "../components/Layout";

type MediaItem = {
    id: string;
    name: string;
    url: string;
    type: string;
    altText?: string;
};

type MediaFilter = "all" | "image" | "video" | "audio" | "other";

const UPLOAD_URL = "https://www.magichammerrenovations.com/media/upload.php";
const DELETE_URL = "https://www.magichammerrenovations.com/media/delete.php";

const getMediaCategory = (type: string): MediaFilter => {
    if (type.startsWith("image/")) return "image";
    if (type.startsWith("video/")) return "video";
    if (type.startsWith("audio/")) return "audio";
    return "other";
};

const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const Media = () => {
    const [mediaList, setMediaList] = useState<MediaItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState<MediaFilter>("all");
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [deletingId, setDeletingId] = useState("");
    const [savingAltId, setSavingAltId] = useState("");
    const [altDrafts, setAltDrafts] = useState<Record<string, string>>({});
    const [pendingFile, setPendingFile] = useState("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadMedia = async () => {
            setIsLoading(true);
            setError("");

            try {
                const snapshot = await getDocs(collection(db, "media"));

                if (!isMounted) return;

                const items: MediaItem[] = snapshot.docs.map((mediaDoc) => {
                    const data = mediaDoc.data();

                    return {
                        id: mediaDoc.id,
                        name: data.fileName || "Untitled media",
                        url: data.mediaUrl || "",
                        type: data.mediaType || "",
                        altText: data.altText || "",
                    };
                });

                setMediaList(items);
                setAltDrafts(
                    Object.fromEntries(items.map((item) => [item.id, item.altText || ""]))
                );
            } catch (err) {
                console.error("Error loading media:", err);
                if (isMounted) {
                    setError("Unable to load your media library. Please try again.");
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadMedia();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setError("");
        setNotice("");

        if (
            !file.type.startsWith("image/") &&
            !file.type.startsWith("video/") &&
            !file.type.startsWith("audio/")
        ) {
            setError("Please select an image, video, or audio file.");
            event.target.value = "";
            return;
        }

        const tempId = `temp-${Date.now()}`;
        const previewUrl = URL.createObjectURL(file);
        setPendingFile(file.name);
        setUploading(true);

        setMediaList((previous) => [
            {
                id: tempId,
                name: file.name,
                url: previewUrl,
                type: file.type,
                altText: "",
            },
            ...previous,
        ]);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch(UPLOAD_URL, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Upload failed with status ${response.status}`);
            }

            const data = await response.json();

            if (!data.url || typeof data.url !== "string") {
                throw new Error("The upload server did not return a valid file URL.");
            }

            const uploadedUrl = data.url as string;

            const docRef = await addDoc(collection(db, "media"), {
                fileName: file.name,
                mediaUrl: uploadedUrl,
                mediaType: file.type,
                altText: file.type.startsWith("image/") ? "" : "",
                createdAt: serverTimestamp(),
            });

            setMediaList((previous) =>
                previous.map((item) =>
                    item.id === tempId
                        ? {
                            id: docRef.id,
                            name: file.name,
                            url: uploadedUrl,
                            type: file.type,
                            altText: "",
                        }
                        : item
                )
            );

            setAltDrafts((previous) => ({ ...previous, [docRef.id]: "" }));
            setNotice(`${file.name} uploaded successfully.`);
        } catch (err) {
            console.error("Error uploading media:", err);
            setMediaList((previous) =>
                previous.filter((item) => item.id !== tempId)
            );
            setError(
                `Could not upload "${file.name}". Check your connection and upload server.`
            );
        } finally {
            URL.revokeObjectURL(previewUrl);
            setUploading(false);
            setPendingFile("");
            event.target.value = "";
        }
    };

    const saveAltText = async (item: MediaItem) => {
        const value = altDrafts[item.id] ?? "";

        if (item.id.startsWith("temp-")) return;

        setSavingAltId(item.id);
        setError("");
        setNotice("");

        try {
            await updateDoc(doc(db, "media", item.id), { altText: value });

            setMediaList((previous) =>
                previous.map((mediaItem) =>
                    mediaItem.id === item.id
                        ? { ...mediaItem, altText: value }
                        : mediaItem
                )
            );

            setNotice(`Accessibility text saved for ${item.name}.`);
        } catch (err) {
            console.error("Error updating alt text:", err);
            setError(`Could not save the alt text for "${item.name}".`);
        } finally {
            setSavingAltId("");
        }
    };

    const handleDelete = async (item: MediaItem) => {
        if (item.id.startsWith("temp-")) return;

        const confirmed = window.confirm(
            `Delete "${item.name}" from the media library?\n\nIf this file is used on a website page, that page may no longer display it.`
        );

        if (!confirmed) return;

        setDeletingId(item.id);
        setError("");
        setNotice("");

        try {
            const filename = item.url.split("/").pop();

            if (filename) {
                const deleteUrl = new URL(DELETE_URL);
                deleteUrl.searchParams.set("file", filename);

                const response = await fetch(deleteUrl.toString(), {
                    method: "POST",
                });

                if (!response.ok) {
                    throw new Error("The media server could not delete the file.");
                }
            }

            await deleteDoc(doc(db, "media", item.id));

            setMediaList((previous) =>
                previous.filter((mediaItem) => mediaItem.id !== item.id)
            );

            setAltDrafts((previous) => {
                const next = { ...previous };
                delete next[item.id];
                return next;
            });

            setNotice(`${item.name} deleted successfully.`);
        } catch (err) {
            console.error("Error deleting media:", err);
            setError(
                `Could not completely delete "${item.name}". Check the media server and Firestore before trying again.`
            );
        } finally {
            setDeletingId("");
        }
    };

    const counts = {
        all: mediaList.filter((item) => !item.id.startsWith("temp-")).length,
        image: mediaList.filter(
            (item) =>
                !item.id.startsWith("temp-") &&
                getMediaCategory(item.type) === "image"
        ).length,
        video: mediaList.filter(
            (item) =>
                !item.id.startsWith("temp-") &&
                getMediaCategory(item.type) === "video"
        ).length,
        audio: mediaList.filter(
            (item) =>
                !item.id.startsWith("temp-") &&
                getMediaCategory(item.type) === "audio"
        ).length,
        other: mediaList.filter(
            (item) =>
                !item.id.startsWith("temp-") &&
                getMediaCategory(item.type) === "other"
        ).length,
    };

    const filteredMedia = mediaList.filter((item) => {
        const matchesSearch = `${item.name} ${item.altText || ""}`
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesFilter =
            activeFilter === "all" ||
            getMediaCategory(item.type) === activeFilter;

        return matchesSearch && matchesFilter;
    });

    const filterOptions: {
        id: MediaFilter;
        label: string;
        count: number;
    }[] = [
            { id: "all", label: "All media", count: counts.all },
            { id: "image", label: "Images", count: counts.image },
            { id: "video", label: "Videos", count: counts.video },
            { id: "audio", label: "Audio", count: counts.audio },
            { id: "other", label: "Other", count: counts.other },
        ];

    const handleUploadClick = () => fileInputRef.current?.click();

    return (
        <Layout>
            <div className="mx-auto w-full max-w-[1600px] space-y-7 pb-8">
                {/* Header */}
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="h-1 w-8 rounded-full bg-[#F46B1F]" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F46B1F]">
                                Content Management
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-[#252525] sm:text-4xl">
                            Media Library
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#757676] sm:text-base">
                            Organize your website's images, videos, and audio files in one
                            place.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleUploadClick}
                        disabled={uploading}
                        className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#F46B1F] px-5 py-3.5 text-sm font-bold text-white shadow-[0_5px_15px_rgba(244,107,31,0.18)] transition hover:bg-[#DE5F16] focus:outline-none focus:ring-4 focus:ring-[#F46B1F]/20 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {uploading ? (
                            <FaSpinner className="animate-spin" />
                        ) : (
                            <FaCloudUploadAlt size={17} />
                        )}
                        {uploading ? "Uploading..." : "Upload media"}
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*,audio/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>

                {/* Upload progress */}
                {uploading && (
                    <div className="flex items-center gap-3 rounded-xl border border-[#F46B1F]/20 bg-[#F46B1F]/[0.06] px-4 py-3 text-sm text-[#A94A12]">
                        <FaSpinner className="shrink-0 animate-spin" />
                        <span className="min-w-0 truncate">
                            Uploading <strong>{pendingFile}</strong>...
                        </span>
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
                        <button
                            type="button"
                            aria-label="Dismiss error"
                            onClick={() => setError("")}
                            className="ml-auto shrink-0 rounded-md p-1 hover:bg-red-100"
                        >
                            <FaTimes />
                        </button>
                    </div>
                )}

                {notice && (
                    <div
                        role="status"
                        className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
                    >
                        <FaCheck className="mt-0.5 shrink-0" />
                        <p>{notice}</p>
                        <button
                            type="button"
                            aria-label="Dismiss notification"
                            onClick={() => setNotice("")}
                            className="ml-auto shrink-0 rounded-md p-1 hover:bg-emerald-100"
                        >
                            <FaTimes />
                        </button>
                    </div>
                )}

                {/* Summary cards */}
                <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                    {[
                        {
                            label: "Total files",
                            value: counts.all,
                            icon: <FaImages size={19} />,
                        },
                        {
                            label: "Images",
                            value: counts.image,
                            icon: <FaImage size={19} />,
                        },
                        {
                            label: "Videos",
                            value: counts.video,
                            icon: <FaVideo size={19} />,
                        },
                        {
                            label: "Audio files",
                            value: counts.audio,
                            icon: <FaMusic size={19} />,
                        },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_3px_18px_rgba(0,0,0,0.025)] sm:gap-4 sm:p-5"
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F46B1F]/10 text-[#F46B1F]">
                                {stat.icon}
                            </div>
                            <div className="min-w-0">
                                <p className="text-2xl font-bold leading-none text-[#252525]">
                                    {isLoading ? "—" : stat.value}
                                </p>
                                <p className="mt-2 truncate text-xs font-medium text-[#757676] sm:text-sm">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Media library panel */}
                <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.035)]">
                    {/* Search and filter */}
                    <div className="space-y-4 border-b border-black/[0.06] px-4 py-5 sm:px-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-[#252525]">
                                    All uploaded media
                                </h2>
                                <p className="mt-1 text-sm text-[#757676]">
                                    Search files or filter by file type.
                                </p>
                            </div>

                            <div className="relative w-full lg:max-w-sm">
                                <FaSearch
                                    size={14}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999]"
                                />
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search files..."
                                    className="w-full rounded-xl border border-[#E5E5E3] bg-[#FAFAF9] py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-[#A0A0A0] focus:border-[#F46B1F] focus:bg-white focus:ring-4 focus:ring-[#F46B1F]/10"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto pb-1">
                            <FaFilter className="mr-1 shrink-0 text-[#A0A0A0]" size={13} />
                            {filterOptions.map((option) => {
                                const selected = activeFilter === option.id;

                                return (
                                    <button
                                        key={option.id}
                                        type="button"
                                        onClick={() => setActiveFilter(option.id)}
                                        className={`inline-flex shrink-0 items-center gap-2 rounded-lg border px-3.5 py-2.5 text-xs font-semibold transition ${selected
                                            ? "border-[#F46B1F]/20 bg-[#F46B1F]/10 text-[#D85A13]"
                                            : "border-[#EAEAE8] bg-white text-[#757676] hover:border-[#F46B1F]/30 hover:text-[#252525]"
                                            }`}
                                    >
                                        {option.label}
                                        <span
                                            className={`rounded-md px-1.5 py-0.5 text-[10px] ${selected
                                                ? "bg-[#F46B1F]/15 text-[#D85A13]"
                                                : "bg-[#F0F0EE] text-[#777777]"
                                                }`}
                                        >
                                            {option.count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Media grid */}
                    <div className="p-4 sm:p-6">
                        {isLoading ? (
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                                {[1, 2, 3, 4].map((item) => (
                                    <div
                                        key={item}
                                        className="overflow-hidden rounded-xl border border-[#EAEAE8]"
                                    >
                                        <div className="aspect-[4/3] animate-pulse bg-[#F0F0EE]" />
                                        <div className="space-y-3 p-4">
                                            <div className="h-4 w-3/4 animate-pulse rounded bg-[#F0F0EE]" />
                                            <div className="h-9 animate-pulse rounded-lg bg-[#F0F0EE]" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredMedia.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#DCDCD8] bg-[#FAFAF9] px-5 py-16 text-center">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F46B1F]/10 text-[#F46B1F]">
                                    {search || activeFilter !== "all" ? (
                                        <FaSearch size={23} />
                                    ) : (
                                        <FaCloudUploadAlt size={27} />
                                    )}
                                </div>

                                <h3 className="text-lg font-bold text-[#252525]">
                                    {search || activeFilter !== "all"
                                        ? "No matching files"
                                        : "Your media library is empty"}
                                </h3>

                                <p className="mt-2 max-w-md text-sm leading-6 text-[#757676]">
                                    {search || activeFilter !== "all"
                                        ? "Try a different search term or choose another file type."
                                        : "Upload your first image, video, or audio file to start building your media library."}
                                </p>

                                {!search && activeFilter === "all" && (
                                    <button
                                        type="button"
                                        onClick={handleUploadClick}
                                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#F46B1F] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#DE5F16]"
                                    >
                                        <FaCloudUploadAlt />
                                        Upload your first file
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                                {filteredMedia.map((item) => {
                                    const category = getMediaCategory(item.type);
                                    const isTemporary = item.id.startsWith("temp-");
                                    const isDeleting = deletingId === item.id;
                                    const isSaving = savingAltId === item.id;

                                    return (
                                        <article
                                            key={item.id}
                                            className="group min-w-0 overflow-hidden rounded-xl border border-[#EAEAE8] bg-white transition duration-200 hover:-translate-y-0.5 hover:border-[#F46B1F]/30 hover:shadow-[0_10px_28px_rgba(0,0,0,0.06)]"
                                        >
                                            {/* Preview */}
                                            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#F5F5F3]">
                                                {category === "image" ? (
                                                    <img
                                                        src={item.url}
                                                        alt={item.altText || item.name}
                                                        className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.02]"
                                                        loading="lazy"
                                                    />
                                                ) : category === "video" ? (
                                                    <video
                                                        src={item.url}
                                                        controls
                                                        preload="metadata"
                                                        className="h-full w-full object-contain"
                                                    />
                                                ) : category === "audio" ? (
                                                    <div className="flex w-full flex-col items-center gap-4 p-5">
                                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F46B1F]/10 text-[#F46B1F]">
                                                            <FaMusic size={26} />
                                                        </div>
                                                        <audio controls preload="metadata" className="w-full">
                                                            <source src={item.url} type={item.type} />
                                                        </audio>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center gap-3 text-[#929292]">
                                                        <FaFileAlt size={38} />
                                                        <span className="text-xs">File preview unavailable</span>
                                                    </div>
                                                )}

                                                <span className="absolute left-3 top-3 rounded-md border border-white/70 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#555555] backdrop-blur-sm">
                                                    {category}
                                                </span>

                                                {isTemporary && (
                                                    <span className="absolute right-3 top-3 rounded-md bg-[#F46B1F] px-2.5 py-1 text-[10px] font-bold text-white">
                                                        Uploading
                                                    </span>
                                                )}
                                            </div>

                                            {/* Details */}
                                            <div className="space-y-4 p-4">
                                                <div className="min-w-0">
                                                    <h3
                                                        title={item.name}
                                                        className="truncate text-sm font-bold text-[#292929]"
                                                    >
                                                        {item.name}
                                                    </h3>
                                                    <p className="mt-1 truncate text-xs text-[#929292]">
                                                        {item.type || "Unknown file type"}
                                                    </p>
                                                </div>

                                                <div className="space-y-2">
                                                    <label
                                                        htmlFor={`alt-${item.id}`}
                                                        className="text-xs font-semibold text-[#555555]"
                                                    >
                                                        Alt text / description
                                                    </label>

                                                    <input
                                                        id={`alt-${item.id}`}
                                                        type="text"
                                                        value={altDrafts[item.id] ?? item.altText ?? ""}
                                                        onChange={(event) =>
                                                            setAltDrafts((previous) => ({
                                                                ...previous,
                                                                [item.id]: event.target.value,
                                                            }))
                                                        }
                                                        disabled={isTemporary || isDeleting}
                                                        placeholder="Describe this media..."
                                                        className="w-full rounded-lg border border-[#E5E5E3] bg-[#FAFAF9] px-3 py-2.5 text-xs text-[#292929] outline-none transition placeholder:text-[#A0A0A0] focus:border-[#F46B1F] focus:bg-white focus:ring-4 focus:ring-[#F46B1F]/10 disabled:opacity-60"
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={() => saveAltText(item)}
                                                        disabled={
                                                            isTemporary ||
                                                            isSaving ||
                                                            isDeleting ||
                                                            (altDrafts[item.id] ?? "") ===
                                                            (item.altText ?? "")
                                                        }
                                                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#E5E5E3] px-3 py-2.5 text-xs font-semibold text-[#555555] transition hover:border-[#F46B1F]/30 hover:bg-[#F46B1F]/[0.05] hover:text-[#D85A13] disabled:cursor-not-allowed disabled:opacity-40"
                                                    >
                                                        {isSaving ? (
                                                            <FaSpinner className="animate-spin" />
                                                        ) : (
                                                            <FaSave />
                                                        )}
                                                        {isSaving ? "Saving..." : "Save description"}
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between gap-3 border-t border-[#F0F0EE] pt-3">
                                                    <a
                                                        href={item.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex min-w-0 items-center gap-1.5 truncate text-xs font-semibold text-[#757676] transition hover:text-[#F46B1F]"
                                                    >
                                                        <FaExternalLinkAlt size={10} />
                                                        Open file
                                                    </a>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(item)}
                                                        disabled={isTemporary || isDeleting || uploading}
                                                        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                                                    >
                                                        {isDeleting ? (
                                                            <FaSpinner className="animate-spin" />
                                                        ) : (
                                                            <FaTrashAlt size={11} />
                                                        )}
                                                        {isDeleting ? "Deleting..." : "Delete"}
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {!isLoading && mediaList.length > 0 && (
                        <div className="flex flex-col gap-1 border-t border-black/[0.06] bg-[#FAFAF9] px-5 py-4 text-xs text-[#757676] sm:flex-row sm:items-center sm:justify-between sm:px-6">
                            <p>
                                Showing{" "}
                                <span className="font-bold text-[#292929]">
                                    {filteredMedia.length}
                                </span>{" "}
                                of{" "}
                                <span className="font-bold text-[#292929]">
                                    {mediaList.length}
                                </span>{" "}
                                files
                            </p>
                            <p>Media metadata is managed through Firestore.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Media;