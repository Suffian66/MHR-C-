
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
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

type MediaItem = {
    id: string;
    name: string;
    url: string;
    type: string;
    altText?: string;
};

type BlogForm = {
    title: string;
    category: string;
    content: string;
    featuredImage: string;
    status: BlogStatus;
};

const EMPTY_FORM: BlogForm = {
    title: "",
    category: "",
    content: "",
    featuredImage: "",
    status: "draft",
};

const AdminBlogPage = () => {
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
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);

    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");

    const selectedBlog = blogs.find((blog) => blog.id === selectedId);

    const filteredBlogs = useMemo(() => {
        const term = search.toLowerCase().trim();

        if (!term) return blogs;

        return blogs.filter(
            (blog) =>
                blog.title.toLowerCase().includes(term) ||
                blog.slug.toLowerCase().includes(term) ||
                (blog.category ?? "").toLowerCase().includes(term)
        );
    }, [blogs, search]);

    const filteredMedia = useMemo(() => {
        const term = mediaSearch.toLowerCase().trim();

        return mediaItems.filter(
            (item) =>
                item.type.startsWith("image/") &&
                item.url &&
                `${item.name} ${item.altText ?? ""}`
                    .toLowerCase()
                    .includes(term)
        );
    }, [mediaItems, mediaSearch]);

    const publishedCount = blogs.filter(
        (blog) => blog.status === "published"
    ).length;

    const draftCount = blogs.length - publishedCount;

    const loadBlogs = useCallback(async () => {
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
    }, []);

    useEffect(() => {
        void loadBlogs();
    }, [loadBlogs]);

    useEffect(() => {
        if (creating) return;

        if (!selectedBlog) {
            setForm({ ...EMPTY_FORM });
            setSelectedMediaId(null);
            return;
        }

        setForm({
            title: selectedBlog.title ?? "",
            category: selectedBlog.category ?? "",
            content: selectedBlog.content ?? "",
            featuredImage: selectedBlog.featuredImage ?? "",
            status: selectedBlog.status ?? "draft",
        });

        setSelectedMediaId(
            mediaItems.find(
                (item) => item.url === selectedBlog.featuredImage
            )?.id ?? null
        );
    }, [selectedBlog, creating, mediaItems]);

    const loadMedia = async () => {
        try {
            setMediaLoading(true);
            setError("");

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
            setError("Unable to load the media library. Please try again.");
        } finally {
            setMediaLoading(false);
        }
    };

    const openMediaLibrary = () => {
        setMediaSearch("");
        setMediaOpen(true);
        void loadMedia();
    };

    const closeMediaLibrary = () => {
        setMediaOpen(false);
        setMediaSearch("");
    };

    const selectExistingImage = (item: MediaItem) => {
        setSelectedMediaId(item.id);

        setForm((current) => ({
            ...current,
            featuredImage: item.url,
        }));

        setMediaOpen(false);
        setNotice("Featured image selected.");
        setError("");
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
        setSelectedMediaId(null);
        setError("");
        setNotice("");
    };

    const handleCancelCreate = () => {
        setCreating(false);
        setError("");
        setNotice("");

        if (blogs.length > 0) {
            setSelectedId(blogs[0].id);
        } else {
            setSelectedId(null);
            setForm({ ...EMPTY_FORM });
        }
    };

    const handleFieldChange = (
        field: keyof BlogForm,
        value: string
    ) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const handleSave = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!form.title.trim()) {
            setError("Please enter a blog title.");
            return;
        }

        if (!generateBlogSlug(form.title)) {
            setError("Please enter a valid blog title.");
            return;
        }

        if (!form.category.trim()) {
            setError("Please enter a blog category.");
            return;
        }

        if (!form.content.trim()) {
            setError("Please enter the blog content.");
            return;
        }

        // if (!form.featuredImage.trim()) {
        //     setError("Please select a featured image from your media library.");
        //     return;
        // }

        try {
            setSaving(true);
            setError("");
            setNotice("");

            if (creating) {
                const newId = await addBlog(
                    form.title.trim(),
                    form.category.trim(),
                    form.content,
                    form.featuredImage || "",
                    form.status
                );

                const refreshedBlogs = await fetchBlogs();

                setBlogs(refreshedBlogs);
                setSelectedId(newId);
                setCreating(false);

                toast.success("Blog created successfully.");
                setNotice("Your blog has been saved successfully.");
            } else if (selectedId) {
                await updateBlog(selectedId, {
                    title: form.title.trim(),
                    category: form.category.trim(),
                    content: form.content,
                    featuredImage: form.featuredImage,
                    status: form.status,
                });

                const refreshedBlogs = await fetchBlogs();
                setBlogs(refreshedBlogs);

                setNotice("Blog details saved successfully.");
                toast.success("Blog updated successfully.");
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
            `Delete "${selectedBlog.title}"? This action cannot be undone.`
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

            toast.success("Blog deleted successfully.");
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
                        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#e87928]">
                            <FaNewspaper />
                            Content workspace
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-[#343536] sm:text-3xl">
                            Blog Management
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-[#757676]">
                            Create, organize, and manage your website blog posts
                            from one place.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={creating ? handleCancelCreate : handleCreateMode}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#e87928] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d66a1d]"
                    >
                        {creating ? <FaTimes /> : <FaPlus />}
                        {creating ? "Cancel New Blog" : "Create Blog"}
                    </button>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">Total Articles</p>
                            <FaRegFileAlt className="text-lg text-[#e87928]" />
                        </div>
                        <p className="mt-3 text-3xl font-bold text-[#343536]">
                            {blogs.length}
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">Published</p>
                            <FaCheckCircle className="text-lg text-green-600" />
                        </div>
                        <p className="mt-3 text-3xl font-bold text-[#343536]">
                            {publishedCount}
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">Drafts</p>
                            <FaRegFileAlt className="text-lg text-gray-400" />
                        </div>
                        <p className="mt-3 text-3xl font-bold text-[#343536]">
                            {draftCount}
                        </p>
                    </div>
                </div>

                {/* Messages */}
                {error && (
                    <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        <FaTimes className="mt-0.5 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {notice && !error && (
                    <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                        <FaCheck className="mt-0.5 shrink-0" />
                        <span>{notice}</span>
                    </div>
                )}

                {/* Main workspace */}
                <div className="grid items-start gap-6 xl:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.65fr)]">
                    {/* Article list */}
                    <section className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white">
                        <div className="border-b border-gray-100 p-5">
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <h2 className="font-bold text-[#343536]">
                                    Your Articles
                                </h2>
                                <span className="rounded-full bg-[#e87928]/10 px-3 py-1 text-xs font-semibold text-[#e87928]">
                                    {blogs.length}
                                </span>
                            </div>

                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search articles..."
                                    className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#e87928]"
                                />
                            </div>
                        </div>

                        <div className="max-h-[720px] space-y-2 overflow-y-auto p-3">
                            {loading ? (
                                <div className="flex items-center justify-center gap-2 py-12 text-sm text-gray-500">
                                    <FaSpinner className="animate-spin text-[#e87928]" />
                                    Loading articles...
                                </div>
                            ) : filteredBlogs.length === 0 ? (
                                <div className="px-4 py-12 text-center">
                                    <FaNewspaper className="mx-auto text-3xl text-gray-300" />
                                    <p className="mt-3 text-sm font-medium text-gray-600">
                                        {search ? "No matching articles" : "No articles yet"}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-400">
                                        {search
                                            ? "Try another search term."
                                            : "Create your first blog to get started."}
                                    </p>
                                </div>
                            ) : (
                                filteredBlogs.map((blog) => (
                                    <button
                                        key={blog.id}
                                        type="button"
                                        onClick={() => handleSelectBlog(blog)}
                                        className={`w-full rounded-lg border p-4 text-left transition ${!creating && selectedId === blog.id
                                            ? "border-[#e87928]/50 bg-[#e87928]/5"
                                            : "border-transparent hover:border-gray-200 hover:bg-gray-50"
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            {blog.featuredImage ? (
                                                <img
                                                    src={blog.featuredImage}
                                                    alt=""
                                                    className="h-16 w-16 shrink-0 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#f7f6f2] text-gray-400">
                                                    <FaImage className="text-xl" />
                                                </div>
                                            )}

                                            <div className="min-w-0 flex-1">
                                                <h3 className="line-clamp-2 break-words text-sm font-semibold text-[#343536]">
                                                    {blog.title}
                                                </h3>

                                                <p className="mt-1 truncate text-xs text-gray-500">
                                                    {blog.category || "Uncategorized"}
                                                </p>

                                                <span
                                                    className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${blog.status === "published"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-600"
                                                        }`}
                                                >
                                                    {blog.status}
                                                </span>
                                            </div>

                                            {selectedId === blog.id && !creating && (
                                                <FaCheckCircle className="mt-1 shrink-0 text-[#e87928]" />
                                            )}
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    </section>

                    {/* Editor */}
                    <section className="min-w-0 rounded-xl border border-gray-200 bg-white">
                        <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-[#e87928]">
                                    {creating ? "New article" : "Article editor"}
                                </p>
                                <h2 className="mt-1 text-lg font-bold text-[#343536]">
                                    {creating
                                        ? "Create a Blog"
                                        : selectedBlog?.title || "Select an Article"}
                                </h2>
                            </div>

                            {!creating && selectedBlog && (
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={handleCreateMode}
                                        className="inline-flex items-center gap-2 rounded-lg border border-[#e87928]/40 px-3 py-2 text-sm font-semibold text-[#e87928] transition hover:bg-[#e87928]/5"
                                    >
                                        <FaPlus />
                                        New
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        disabled={deleting}
                                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                                    >
                                        {deleting ? (
                                            <FaSpinner className="animate-spin" />
                                        ) : (
                                            <FaTrashAlt />
                                        )}
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>

                        {creating || selectedBlog ? (
                            <form onSubmit={handleSave} className="space-y-6 p-5 sm:p-7">
                                {/* Title */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Blog Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        value={form.title}
                                        onChange={(event) =>
                                            handleFieldChange("title", event.target.value)
                                        }
                                        placeholder="Enter your article title"
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#e87928] focus:ring-1 focus:ring-[#e87928]"
                                    />
                                    <p className="mt-2 text-xs text-gray-400">
                                        URL slug: {generateBlogSlug(form.title) || "your-blog-title"}
                                    </p>
                                </div>

                                {/* Category and status */}
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Category <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            value={form.category}
                                            onChange={(event) =>
                                                handleFieldChange("category", event.target.value)
                                            }
                                            placeholder="e.g. Kitchen Renovations"
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#e87928] focus:ring-1 focus:ring-[#e87928]"
                                        />
                                        <p className="mt-1 text-xs text-gray-400">
                                            Enter any category. No predefined list is required.
                                        </p>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Publishing Status
                                        </label>
                                        <select
                                            value={form.status}
                                            onChange={(event) =>
                                                handleFieldChange(
                                                    "status",
                                                    event.target.value as BlogStatus
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#e87928] focus:ring-1 focus:ring-[#e87928]"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Featured image selector */}
                                <div>
                                    <div className="mb-2 flex items-center justify-between gap-3">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Featured Image <span className="text-red-500">*</span>
                                        </label>

                                        <button
                                            type="button"
                                            onClick={openMediaLibrary}
                                            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#e87928] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#d66a1d] sm:text-sm"
                                        >
                                            <FaImage />
                                            Choose from Media
                                        </button>
                                    </div>

                                    {form.featuredImage ? (
                                        <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-[#f7f6f2] p-3 sm:flex-row sm:items-center">
                                            <img
                                                src={form.featuredImage}
                                                alt="Selected blog featured image"
                                                className="h-40 w-full rounded-lg object-cover sm:h-28 sm:w-40"
                                            />

                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-semibold text-[#343536]">
                                                    Featured image selected
                                                </p>
                                                <p className="mt-1 break-all text-xs text-gray-500">
                                                    {mediaItems.find(
                                                        (item) => item.url === form.featuredImage
                                                    )?.name || "Selected media image"}
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setForm((prev) => ({
                                                            ...prev,
                                                            featuredImage: "",
                                                        }));
                                                        setSelectedMediaId(null);
                                                    }}
                                                    className="mt-3 text-xs font-semibold text-red-600 hover:underline"
                                                >
                                                    Remove image
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        // <button
                                        //     type="button"
                                        //     onClick={openMediaLibrary}
                                        //     className="flex min-h-36 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center transition hover:border-[#e87928] hover:bg-[#e87928]/5"
                                        // >
                                        //     <FaImage className="text-3xl text-[#e87928]" />
                                        //     <span className="mt-3 text-sm font-semibold text-gray-700">
                                        //         Select a featured image
                                        //     </span>
                                        //     <span className="mt-1 text-xs text-gray-500">
                                        //         Choose an image already in your Media Library
                                        //     </span>
                                        // </button>
                                        <p className="text-sm text-gray-500">
                                            No featured image selected. You can publish without an image.
                                        </p>
                                    )}
                                </div>

                                {/* Content editor */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Article Content <span className="text-red-500">*</span>
                                    </label>

                                    <div className="overflow-hidden rounded-lg border border-gray-200">
                                        <RichTextEditor
                                            content={form.content}
                                            onChange={(value: string) =>
                                                handleFieldChange("content", value)
                                            }
                                        />
                                    </div>

                                    <p className="mt-2 text-xs text-gray-400">
                                        Write and format the complete blog article here.
                                    </p>
                                </div>

                                {/* Save actions */}
                                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-5">
                                    <p className="text-xs text-gray-500">
                                        <span className="text-red-500">*</span> Required fields
                                    </p>

                                    <div className="flex flex-wrap gap-3">
                                        {creating && (
                                            <button
                                                type="button"
                                                onClick={handleCancelCreate}
                                                disabled={saving}
                                                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
                                            >
                                                Cancel
                                            </button>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#e87928] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d66a1d] disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {saving ? (
                                                <>
                                                    <FaSpinner className="animate-spin" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <FaSave />
                                                    {creating ? "Create Blog" : "Save Changes"}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="px-6 py-16 text-center">
                                <FaNewspaper className="mx-auto text-4xl text-gray-300" />
                                <h3 className="mt-4 font-semibold text-[#343536]">
                                    Select an article to edit
                                </h3>
                                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                                    Choose an existing blog from the list or create a new one.
                                </p>
                                <button
                                    type="button"
                                    onClick={handleCreateMode}
                                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#e87928] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#d66a1d]"
                                >
                                    <FaPlus />
                                    Create Blog
                                </button>
                            </div>
                        )}
                    </section>
                </div>

                {/* Media library picker */}
                {mediaOpen && (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3 sm:p-6"
                        onClick={(event) => {
                            if (event.target === event.currentTarget) {
                                closeMediaLibrary();
                            }
                        }}
                    >
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="blog-media-title"
                            className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                        >
                            <div className="flex items-center justify-between gap-4 border-b border-gray-100 p-5 sm:px-6">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-[#e87928]">
                                        MHR Media Library
                                    </p>
                                    <h2
                                        id="blog-media-title"
                                        className="mt-1 text-xl font-bold text-[#343536]"
                                    >
                                        Choose Featured Image
                                    </h2>
                                </div>

                                <button
                                    type="button"
                                    onClick={closeMediaLibrary}
                                    aria-label="Close media library"
                                    className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="border-b border-gray-100 p-4 sm:px-6">
                                <div className="relative">
                                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        value={mediaSearch}
                                        onChange={(event) => setMediaSearch(event.target.value)}
                                        placeholder="Search images by filename or alt text..."
                                        className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#e87928]"
                                    />
                                </div>
                            </div>

                            <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
                                {mediaLoading ? (
                                    <div className="flex items-center justify-center gap-3 py-16 text-sm text-gray-500">
                                        <FaSpinner className="animate-spin text-[#e87928]" />
                                        Loading your media library...
                                    </div>
                                ) : filteredMedia.length === 0 ? (
                                    <div className="py-16 text-center">
                                        <FaImage className="mx-auto text-4xl text-gray-300" />
                                        <h3 className="mt-4 font-semibold text-[#343536]">
                                            No images found
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Upload images from the Media section of your admin panel
                                            or try another search.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                        {filteredMedia.map((item) => {
                                            const isSelected =
                                                selectedMediaId === item.id ||
                                                form.featuredImage === item.url;

                                            return (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={() => selectExistingImage(item)}
                                                    className={`group relative overflow-hidden rounded-xl border-2 text-left transition ${isSelected
                                                        ? "border-[#e87928] ring-2 ring-[#e87928]/20"
                                                        : "border-transparent hover:border-gray-300"
                                                        }`}
                                                >
                                                    <div className="aspect-square overflow-hidden bg-gray-100">
                                                        <img
                                                            src={item.url}
                                                            alt={item.altText || item.name}
                                                            loading="lazy"
                                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                        />
                                                    </div>

                                                    {isSelected && (
                                                        <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#e87928] text-white shadow">
                                                            <FaCheck />
                                                        </span>
                                                    )}

                                                    <div className="bg-white p-2.5">
                                                        <p className="truncate text-xs font-semibold text-[#343536]">
                                                            {item.name}
                                                        </p>
                                                        <p className="mt-1 text-[10px] text-gray-500">
                                                            {isSelected ? "Selected" : "Choose image"}
                                                        </p>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between gap-3 border-t border-gray-100 p-4 sm:px-6">
                                <p className="text-xs text-gray-500">
                                    {filteredMedia.length}{" "}
                                    {filteredMedia.length === 1 ? "image" : "images"} available
                                </p>

                                <button
                                    type="button"
                                    onClick={closeMediaLibrary}
                                    className="rounded-lg bg-[#343536] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default AdminBlogPage;
