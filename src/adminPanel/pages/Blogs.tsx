import {
    useEffect,
    useMemo,
    useRef,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";

import {
    addDoc,
    collection,
    getDocs,
    serverTimestamp,
} from "firebase/firestore";

import {
    FaPlus,
    FaSearch,
    FaNewspaper,
    FaEdit,
    FaTrashAlt,
    FaSave,
    FaTimes,
    FaSpinner,
    FaImage,
    FaCloudUploadAlt,
    FaCheckCircle,
    FaRegFileAlt,
    FaCheck,
} from "react-icons/fa";

import Layout from "../components/Layout";

import {
    fetchBlogs,
    addBlog,
    updateBlog,
    deleteBlog,
    generateBlogSlug,
    type BlogItem,
    type BlogStatus,
} from "../service/BlogService";

import { db } from "../service/firebase";
import RichTextEditor from "../components/TextEditor";
import { toast } from "react-toastify";

const UPLOAD_URL =
    "https://magichammerrenovations.com/media/upload.php";

type MediaItem = {
    id: string;
    name: string;
    url: string;
    type: string;
    altText?: string;
};

type BlogForm = {
    title: string;
    content: string;
    featuredImage: string;
    status: BlogStatus;
};

const EMPTY_FORM: BlogForm = {
    title: "",
    content: "",
    featuredImage: "",
    status: "draft",
};

const AdminBlog = () => {
    const [blogs, setBlogs] = useState<BlogItem[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const [form, setForm] = useState<BlogForm>({ ...EMPTY_FORM });

    const [search, setSearch] = useState("");
    const [mediaSearch, setMediaSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [creating, setCreating] = useState(false);

    const [mediaOpen, setMediaOpen] = useState(false);
    const [mediaLoading, setMediaLoading] = useState(false);
    const [mediaUploading, setMediaUploading] = useState(false);
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [selectedMediaId, setSelectedMediaId] = useState<string | null>(
        null
    );

    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [mediaError, setMediaError] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const selectedBlog = blogs.find((blog) => blog.id === selectedId);

    const filteredBlogs = useMemo(() => {
        const term = search.toLowerCase().trim();

        if (!term) return blogs;

        return blogs.filter(
            (blog) =>
                blog.title.toLowerCase().includes(term) ||
                blog.slug.toLowerCase().includes(term)
        );
    }, [blogs, search]);

    const filteredMedia = useMemo(() => {
        const term = mediaSearch.toLowerCase().trim();

        return mediaItems.filter(
            (item) =>
                item.type.startsWith("image/") &&
                item.url &&
                `${item.name} ${item.altText ?? ""} `
                    .toLowerCase()
                    .includes(term)
        );
    }, [mediaItems, mediaSearch]);

    const publishedCount = blogs.filter(
        (blog) => blog.status === "published"
    ).length;

    const draftCount = blogs.length - publishedCount;

    const loadBlogs = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await fetchBlogs();
            setBlogs(result);

            setSelectedId((currentId) => {
                if (
                    currentId &&
                    result.some((blog) => blog.id === currentId)
                ) {
                    return currentId;
                }

                return result[0]?.id ?? null;
            });
        } catch (err) {
            console.error("Failed to load blogs:", err);
            setError("Unable to load blogs. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadBlogs();
    }, []);

    useEffect(() => {
        if (creating) return;

        if (!selectedBlog) {
            setForm({ ...EMPTY_FORM });
            return;
        }

        setForm({
            title: selectedBlog.title ?? "",
            content: selectedBlog.content ?? "",
            featuredImage: selectedBlog.featuredImage ?? "",
            status: selectedBlog.status ?? "draft",
        });
    }, [selectedId, selectedBlog?.id, creating]);

    // Load existing images from the same Firestore media collection.
    const loadMedia = async () => {
        try {
            setMediaLoading(true);
            setMediaError("");

            const snapshot = await getDocs(collection(db, "media"));

            const items: MediaItem[] = snapshot.docs
                .map((mediaDoc) => {
                    const data = mediaDoc.data();

                    return {
                        id: mediaDoc.id,
                        name: data.fileName || "Untitled image",
                        url: data.mediaUrl || "",
                        type: data.mediaType || "",
                        altText: data.altText || "",
                    };
                })
                .filter(
                    (item) =>
                        item.type.startsWith("image/") && Boolean(item.url)
                );

            setMediaItems(items);

            const currentSelection = items.find(
                (item) => item.url === form.featuredImage
            );

            setSelectedMediaId(currentSelection?.id ?? null);
        } catch (err) {
            console.error("Failed to load media library:", err);
            setMediaError(
                "Unable to load the Media Library. Please try again."
            );
        } finally {
            setMediaLoading(false);
        }
    };

    const openMediaLibrary = () => {
        setMediaSearch("");
        setMediaError("");
        setMediaOpen(true);
        void loadMedia();
    };

    const closeMediaLibrary = () => {
        if (mediaUploading) return;

        setMediaOpen(false);
        setMediaSearch("");
        setMediaError("");
    };

    // Selecting an existing image only copies its existing URL.
    // It does not upload the image or create another media record.
    const selectExistingImage = (item: MediaItem) => {
        setSelectedMediaId(item.id);

        setForm((current) => ({
            ...current,
            featuredImage: item.url,
        }));

        setMediaOpen(false);
        setNotice("");
        setError("");
    };

    // Uses the same PHP upload endpoint and Firestore media fields as Media.tsx.
    const handleImageUpload = async (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        event.target.value = "";
        setMediaError("");

        if (!file.type.startsWith("image/")) {
            setMediaError("Please select an image file.");
            return;
        }

        try {
            setMediaUploading(true);

            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch(UPLOAD_URL, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(
                    `Image upload failed with status ${response.status}.`
                );
            }

            const data = await response.json();

            if (!data.url || typeof data.url !== "string") {
                throw new Error(
                    "The upload server did not return a valid image URL."
                );
            }

            const uploadedUrl = data.url as string;

            // Match the existing Media.tsx Firestore document structure.
            const mediaRef = await addDoc(collection(db, "media"), {
                fileName: file.name,
                mediaUrl: uploadedUrl,
                mediaType: file.type,
                altText: "",
                createdAt: serverTimestamp(),
            });

            const uploadedImage: MediaItem = {
                id: mediaRef.id,
                name: file.name,
                url: uploadedUrl,
                type: file.type,
                altText: "",
            };

            setMediaItems((current) => [
                uploadedImage,
                ...current.filter((item) => item.id !== mediaRef.id),
            ]);

            // Automatically use the newly uploaded image for this blog.
            setSelectedMediaId(mediaRef.id);

            setForm((current) => ({
                ...current,
                featuredImage: uploadedUrl,
            }));

            setNotice("Image uploaded and selected successfully.");
        } catch (err) {
            console.error("Failed to upload blog image:", err);

            setMediaError(
                "Could not upload the image. Check your connection and upload server."
            );
        } finally {
            setMediaUploading(false);
        }
    };

    const handleSelectBlog = (blog: BlogItem) => {
        setSelectedId(blog.id);
        setCreating(false);
        setError("");
        setNotice("");
    };

    const handleCreateMode = () => {
        setCreating(true);
        setSelectedId(null);
        setForm({ ...EMPTY_FORM });
        setError("");
        setNotice("");
    };

    const handleTitleChange = (title: string) => {
        setForm((current) => ({
            ...current,
            title,
        }));
    };

    const handleSave = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!form.title.trim()) {
            setError("Please enter a blog title.");
            return;
        }

        if (!generateBlogSlug(form.title)) {
            setError("Please enter a valid blog title.");
            return;
        }

        if (!form.content.trim()) {
            setError("Please enter the blog content.");
            return;
        }

        if (!form.content.replace(/<[^>]*>/g, "").trim()) {
            setError("Please enter some text in the blog content.");
            return;
        }

        try {
            setSaving(true);
            setError("");
            setNotice("");

            if (creating) {
                const newId = await addBlog(
                    form.title,
                    form.content,
                    form.featuredImage,
                    form.status
                );

                const refreshedBlogs = await fetchBlogs();

                setBlogs(refreshedBlogs);
                setSelectedId(newId);
                setCreating(false);
                toast.success("Blog created successfully.");
                toast.success("")
            } else if (selectedId) {
                await updateBlog(selectedId, {
                    title: form.title,
                    content: form.content,
                    featuredImage: form.featuredImage,
                    status: form.status,
                });

                setBlogs((current) =>
                    current
                        .map((blog) =>
                            blog.id === selectedId
                                ? {
                                    ...blog,
                                    title: form.title.trim(),
                                    slug: generateBlogSlug(form.title),
                                    content: form.content,
                                    featuredImage: form.featuredImage,
                                    status: form.status,
                                }
                                : blog
                        )
                        .sort((a, b) => a.title.localeCompare(b.title))
                );

                setNotice("Blog details saved successfully.");
            }
        } catch (err) {
            console.error("Failed to save blog:", err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to save the blog. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedBlog || deleting) return;

        const confirmed = window.confirm(
            `Delete "${selectedBlog.title}" ? This action cannot be undone.`
        );

        if (!confirmed) return;

        try {
            setDeleting(true);
            setError("");
            setNotice("");

            await deleteBlog(selectedBlog.id);

            const remaining = blogs.filter(
                (blog) => blog.id !== selectedBlog.id
            );

            setBlogs(remaining);
            setSelectedId(remaining[0]?.id ?? null);
            setCreating(false);

            toast.error("Blog deleted successfully.");
        } catch (err) {
            console.error("Failed to delete blog:", err);
            setError("Unable to delete this blog. Please try again.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Layout>
            <div className="space-y-7 pb-8">
                {/* Page heading */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#F46B1F]">
                            <FaNewspaper />
                            Content workspace
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-[#171717] sm:text-3xl">
                            Blog Management
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-[#757676]">
                            Create, organize, and manage your website blog
                            posts from one place.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleCreateMode}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F46B1F] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#df5b16]"
                    >
                        <FaPlus />
                        Create new blog
                    </button>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <SummaryCard
                        label="Total blogs"
                        value={blogs.length}
                        icon={<FaNewspaper />}
                    />
                    <SummaryCard
                        label="Published"
                        value={publishedCount}
                        icon={<FaCheckCircle />}
                    />
                    <SummaryCard
                        label="Drafts"
                        value={draftCount}
                        icon={<FaRegFileAlt />}
                    />
                </div>

                {error && (
                    <div
                        role="alert"
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                        {error}
                    </div>
                )}

                {notice && (
                    <div
                        role="status"
                        className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                    >
                        {notice}
                    </div>
                )}

                {/* Main workspace */}
                <div className="grid items-start gap-6 xl:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.7fr)]">
                    {/* Blog list */}
                    <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm">
                        <div className="border-b border-black/[0.06] p-5">
                            <h2 className="font-bold text-[#171717]">
                                All blog posts
                            </h2>
                            <p className="mt-1 text-xs text-[#757676]">
                                Select a blog to edit its details.
                            </p>

                            <div className="relative mt-5">
                                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#999]" />

                                <input
                                    type="search"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Search blog posts..."
                                    className="w-full rounded-xl border border-black/10 bg-[#FAFAF9] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#F46B1F] focus:ring-2 focus:ring-[#F46B1F]/10"
                                />
                            </div>
                        </div>

                        <div className="max-h-[650px] space-y-2 overflow-y-auto p-3">
                            {loading ? (
                                <div className="flex items-center justify-center gap-3 py-12 text-sm text-[#757676]">
                                    <FaSpinner className="animate-spin text-[#F46B1F]" />
                                    Loading blogs...
                                </div>
                            ) : filteredBlogs.length === 0 ? (
                                <div className="px-5 py-12 text-center">
                                    <FaNewspaper className="mx-auto text-3xl text-[#D5D5D5]" />
                                    <p className="mt-4 text-sm font-semibold text-[#343536]">
                                        {search
                                            ? "No matching blogs found"
                                            : "No blogs yet"}
                                    </p>
                                    <p className="mt-2 text-xs leading-5 text-[#757676]">
                                        {search
                                            ? "Try a different search term."
                                            : "Create your first blog post to get started."}
                                    </p>
                                </div>
                            ) : (
                                filteredBlogs.map((blog) => {
                                    const active =
                                        !creating && selectedId === blog.id;

                                    return (
                                        <button
                                            key={blog.id}
                                            type="button"
                                            onClick={() =>
                                                handleSelectBlog(blog)
                                            }
                                            className={`flex w - full items - start gap - 3 rounded - xl border p - 3.5 text - left transition ${active
                                                ? "border-[#F46B1F]/30 bg-[#FFF7F2]"
                                                : "border-transparent hover:border-black/[0.06] hover:bg-[#FAFAF9]"
                                                } `}
                                        >
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F3F3F2] text-[#757676]">
                                                {blog.featuredImage ? (
                                                    <img
                                                        src={blog.featuredImage}
                                                        alt=""
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <FaNewspaper />
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-bold text-[#171717]">
                                                    {blog.title ||
                                                        "Untitled blog"}
                                                </p>

                                                <p className="mt-1 truncate text-xs text-[#757676]">
                                                    /{blog.slug}
                                                </p>

                                                <span
                                                    className={`mt - 2 inline - flex rounded - md px - 2 py - 1 text - [10px] font - bold uppercase tracking - wide ${blog.status ===
                                                        "published"
                                                        ? "bg-green-50 text-green-700"
                                                        : "bg-[#F1F1F0] text-[#757676]"
                                                        } `}
                                                >
                                                    {blog.status || "draft"}
                                                </span>
                                            </div>

                                            <FaEdit className="mt-1 shrink-0 text-xs text-[#999]" />
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </section>

                    {/* Blog editor */}
                    <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm">
                        <div className="flex items-center justify-between gap-3 border-b border-black/[0.06] px-5 py-5 sm:px-7">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E7] text-lg text-[#F46B1F]">
                                    {creating ? <FaPlus /> : <FaEdit />}
                                </div>

                                <div>
                                    <h2 className="font-bold text-[#171717]">
                                        {creating
                                            ? "Create a blog"
                                            : selectedBlog
                                                ? "Edit blog"
                                                : "Select a blog"}
                                    </h2>
                                    <p className="mt-1 text-xs text-[#757676]">
                                        {creating
                                            ? "Write and publish a new article."
                                            : "Update the selected post."}
                                    </p>
                                </div>
                            </div>

                            {creating && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCreating(false);
                                        setSelectedId(blogs[0]?.id ?? null);
                                        setForm({ ...EMPTY_FORM });
                                        setError("");
                                        setNotice("");
                                    }}
                                    aria-label="Cancel creating blog"
                                    className="rounded-lg p-2 text-[#757676] transition hover:bg-black/5"
                                >
                                    <FaTimes />
                                </button>
                            )}
                        </div>

                        {!creating && !selectedBlog ? (
                            <div className="px-6 py-16 text-center">
                                <FaNewspaper className="mx-auto text-4xl text-[#D5D5D5]" />
                                <p className="mt-4 font-semibold text-[#343536]">
                                    Choose a blog to get started
                                </p>
                                <p className="mt-2 text-sm text-[#757676]">
                                    Or create a new blog post using the button
                                    above.
                                </p>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSave}
                                className="space-y-6 p-5 sm:p-7"
                            >
                                {/* Title */}
                                <div>
                                    <label
                                        htmlFor="blog-title"
                                        className="mb-2 block text-sm font-semibold text-[#343536]"
                                    >
                                        Blog title
                                    </label>

                                    <input
                                        id="blog-title"
                                        required
                                        value={form.title}
                                        onChange={(event) =>
                                            handleTitleChange(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter your blog title"
                                        className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition placeholder:text-[#AAA] focus:border-[#F46B1F] focus:ring-2 focus:ring-[#F46B1F]/10"
                                    />
                                </div>

                                {/* Automatic slug */}
                                <div>
                                    <label
                                        htmlFor="blog-slug"
                                        className="mb-2 block text-sm font-semibold text-[#343536]"
                                    >
                                        Blog URL slug
                                    </label>

                                    <div className="flex items-center overflow-hidden rounded-xl border border-black/10 bg-[#FAFAF9]">
                                        <span className="shrink-0 border-r border-black/10 px-3 py-3 text-xs text-[#999]">
                                            /blog/
                                        </span>
                                        <input
                                            id="blog-slug"
                                            readOnly
                                            value={generateBlogSlug(
                                                form.title
                                            )}
                                            className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-[#757676] outline-none"
                                        />
                                    </div>
                                    <p className="mt-1.5 text-xs text-[#999]">
                                        Generated automatically from the title.
                                    </p>
                                </div>

                                {/* Featured image picker */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#343536]">
                                        Featured image
                                    </label>

                                    {form.featuredImage ? (
                                        <div className="overflow-hidden rounded-xl border border-black/10">
                                            <div className="relative h-52 bg-[#F5F5F3]">
                                                <img
                                                    src={form.featuredImage}
                                                    alt="Selected blog featured image"
                                                    className="h-full w-full object-contain"
                                                />

                                                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-green-700 shadow-sm">
                                                    <FaCheck />
                                                    Image selected
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06] p-3">
                                                <p className="text-xs text-[#757676]">
                                                    Featured image preview
                                                </p>

                                                <button
                                                    type="button"
                                                    onClick={openMediaLibrary}
                                                    className="inline-flex items-center gap-2 rounded-lg border border-[#F46B1F]/30 px-3.5 py-2.5 text-xs font-bold text-[#D85A13] transition hover:bg-[#FFF7F2]"
                                                >
                                                    <FaImage />
                                                    Change image
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={openMediaLibrary}
                                            className="flex min-h-44 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#DCDCD8] bg-[#FAFAF9] px-5 py-8 text-center transition hover:border-[#F46B1F]/50 hover:bg-[#FFF7F2]"
                                        >
                                            <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF0E7] text-xl text-[#F46B1F]">
                                                <FaImage />
                                            </span>
                                            <span className="text-sm font-bold text-[#343536]">
                                                Select featured image
                                            </span>
                                            <span className="mt-1.5 text-xs text-[#757676]">
                                                Choose from existing media or
                                                upload a new image
                                            </span>
                                        </button>
                                    )}

                                    <p className="mt-2 text-xs leading-5 text-[#999]">
                                        The selected image URL is saved to
                                        Firestore with the blog. Existing images
                                        are not uploaded again.
                                    </p>
                                </div>

                                {/* Rich text content */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#343536]">
                                        Blog content
                                    </label>

                                    <RichTextEditor
                                        content={form.content}
                                        onChange={(content: string) =>
                                            setForm((current) => ({
                                                ...current,
                                                content,
                                            }))
                                        }
                                    />
                                </div>

                                {/* Status */}
                                <div>
                                    <label
                                        htmlFor="blog-status"
                                        className="mb-2 block text-sm font-semibold text-[#343536]"
                                    >
                                        Publication status
                                    </label>

                                    <select
                                        id="blog-status"
                                        value={form.status}
                                        onChange={(event) =>
                                            setForm((current) => ({
                                                ...current,
                                                status: event.target
                                                    .value as BlogStatus,
                                            }))
                                        }
                                        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#F46B1F] focus:ring-2 focus:ring-[#F46B1F]/10"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">
                                            Published
                                        </option>
                                    </select>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-3 border-t border-black/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
                                    {!creating && selectedBlog && (
                                        <button
                                            type="button"
                                            onClick={handleDelete}
                                            disabled={deleting || saving}
                                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                                        >
                                            {deleting ? (
                                                <FaSpinner className="animate-spin" />
                                            ) : (
                                                <FaTrashAlt />
                                            )}
                                            {deleting
                                                ? "Deleting..."
                                                : "Delete blog"}
                                        </button>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={saving || deleting}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F46B1F] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#df5b16] disabled:cursor-not-allowed disabled:opacity-60 sm:ml-auto"
                                    >
                                        {saving ? (
                                            <FaSpinner className="animate-spin" />
                                        ) : (
                                            <FaSave />
                                        )}
                                        {saving
                                            ? "Saving..."
                                            : creating
                                                ? "Create blog"
                                                : "Save changes"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </section>
                </div>
            </div>

            {/* Media Library picker modal */}
            {mediaOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-6"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            closeMediaLibrary();
                        }
                    }}
                >
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="media-picker-title"
                        className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                    >
                        <div className="flex items-center justify-between gap-4 border-b border-black/[0.06] px-5 py-4 sm:px-6">
                            <div>
                                <h2
                                    id="media-picker-title"
                                    className="text-lg font-bold text-[#252525]"
                                >
                                    Select featured image
                                </h2>
                                <p className="mt-1 text-xs text-[#757676]">
                                    Choose an existing image or upload a new
                                    one.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeMediaLibrary}
                                disabled={mediaUploading}
                                aria-label="Close media library"
                                className="rounded-lg p-2 text-[#757676] transition hover:bg-black/5 disabled:opacity-40"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div className="flex flex-col gap-3 border-b border-black/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                            <div className="relative flex-1">
                                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#999]" />
                                <input
                                    type="search"
                                    value={mediaSearch}
                                    onChange={(event) =>
                                        setMediaSearch(event.target.value)
                                    }
                                    placeholder="Search existing images..."
                                    className="w-full rounded-xl border border-black/10 bg-[#FAFAF9] py-3 pl-10 pr-4 text-sm outline-none focus:border-[#F46B1F] focus:ring-2 focus:ring-[#F46B1F]/10"
                                />
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    fileInputRef.current?.click()
                                }
                                disabled={mediaUploading}
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#F46B1F] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#df5b16] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {mediaUploading ? (
                                    <FaSpinner className="animate-spin" />
                                ) : (
                                    <FaCloudUploadAlt />
                                )}
                                {mediaUploading
                                    ? "Uploading..."
                                    : "Upload new image"}
                            </button>
                        </div>

                        {mediaError && (
                            <div
                                role="alert"
                                className="mx-4 mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:mx-6"
                            >
                                {mediaError}
                            </div>
                        )}

                        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
                            {mediaLoading ? (
                                <div className="flex min-h-48 items-center justify-center gap-3 text-sm text-[#757676]">
                                    <FaSpinner className="animate-spin text-[#F46B1F]" />
                                    Loading Media Library...
                                </div>
                            ) : filteredMedia.length === 0 ? (
                                <div className="flex min-h-48 flex-col items-center justify-center text-center">
                                    <FaImage className="text-4xl text-[#D5D5D5]" />
                                    <p className="mt-4 text-sm font-bold text-[#343536]">
                                        {mediaItems.length === 0
                                            ? "No existing images found"
                                            : "No matching images"}
                                    </p>
                                    <p className="mt-2 text-xs text-[#757676]">
                                        {mediaItems.length === 0
                                            ? "Upload an image to add it to your Media Library."
                                            : "Try another search term."}
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                                    {filteredMedia.map((item) => {
                                        const isSelected =
                                            selectedMediaId === item.id ||
                                            form.featuredImage === item.url;

                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() =>
                                                    selectExistingImage(item)
                                                }
                                                className={`group overflow - hidden rounded - xl border - 2 text - left transition ${isSelected
                                                    ? "border-[#F46B1F] bg-[#FFF7F2] ring-2 ring-[#F46B1F]/10"
                                                    : "border-transparent bg-[#F5F5F3] hover:border-[#F46B1F]/40"
                                                    } `}
                                            >
                                                <div className="relative aspect-[4/3] overflow-hidden bg-[#F0F0EE]">
                                                    <img
                                                        src={item.url}
                                                        alt={
                                                            item.altText ||
                                                            item.name
                                                        }
                                                        loading="lazy"
                                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                                                    />

                                                    {isSelected && (
                                                        <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#F46B1F] text-white shadow">
                                                            <FaCheck size={12} />
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="p-3">
                                                    <p
                                                        title={item.name}
                                                        className="truncate text-xs font-bold text-[#343536]"
                                                    >
                                                        {item.name}
                                                    </p>
                                                    <p className="mt-1 text-[10px] text-[#757676]">
                                                        {isSelected
                                                            ? "Currently selected"
                                                            : "Click to select"}
                                                    </p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col-reverse gap-3 border-t border-black/[0.06] bg-[#FAFAF9] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                            <p className="text-xs text-[#757676]">
                                {filteredMedia.length} image
                                {filteredMedia.length !== 1 ? "s" : ""} available
                            </p>

                            <button
                                type="button"
                                onClick={closeMediaLibrary}
                                disabled={mediaUploading}
                                className="rounded-xl border border-black/10 px-5 py-2.5 text-sm font-semibold text-[#555] transition hover:bg-white disabled:opacity-50"
                            >
                                Close
                            </button>
                        </div>
                    </section>
                </div>
            )}
        </Layout>
    );
};

type SummaryCardProps = {
    label: string;
    value: number;
    icon: React.ReactNode;
};

function SummaryCard({ label, value, icon }: SummaryCardProps) {
    return (
        <div className="flex items-center gap-4 rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF0E7] text-lg text-[#F46B1F]">
                {icon}
            </div>

            <div>
                <p className="text-2xl font-bold text-[#171717]">{value}</p>
                <p className="mt-1 text-sm text-[#757676]">{label}</p>
            </div>
        </div>
    );
}

export default AdminBlog;