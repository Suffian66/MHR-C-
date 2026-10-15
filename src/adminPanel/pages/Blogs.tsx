
import {
    useEffect,
    useMemo,
    useState,
    type FormEvent,
    type ReactNode,
} from "react";

import {
    FaPlus,
    FaSearch,
    FaNewspaper,
    FaEdit,
    FaTrashAlt,
    FaSave,
    FaTimes,
    FaSpinner,
    FaExternalLinkAlt,
    FaCheckCircle,
    FaRegFileAlt,
    FaCalendarAlt,
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
import RichTextEditor from "../components/TextEditor";

const ORANGE = "#F46B1F";

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

// ----------------------------------
// Format Firestore timestamp
// ----------------------------------

const formatBlogDate = (timestamp: unknown): string => {
    if (!timestamp || typeof timestamp !== "object") {
        return "Pending";
    }

    const value = timestamp as {
        toDate?: () => Date;
    };

    if (typeof value.toDate !== "function") {
        return "Pending";
    }

    const date = value.toDate();

    if (Number.isNaN(date.getTime())) {
        return "Pending";
    }

    return new Intl.DateTimeFormat("en-NZ", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
};

// ----------------------------------
// Admin Blog
// ----------------------------------

const AdminBlog = () => {
    const [blogs, setBlogs] = useState<BlogItem[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [creating, setCreating] = useState(false);

    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");

    const [form, setForm] = useState<BlogForm>(EMPTY_FORM);

    const selectedBlog = blogs.find(
        (blog) => blog.id === selectedId
    );

    const publishedCount = blogs.filter(
        (blog) => blog.status === "published"
    ).length;

    const draftCount = blogs.length - publishedCount;

    const filteredBlogs = useMemo(() => {
        const term = search.toLowerCase().trim();

        if (!term) return blogs;

        return blogs.filter(
            (blog) =>
                blog.title.toLowerCase().includes(term) ||
                blog.slug.toLowerCase().includes(term) ||
                blog.content.toLowerCase().includes(term)
        );
    }, [blogs, search]);

    // ----------------------------------
    // Load blogs
    // ----------------------------------

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

            setError(
                "Unable to load blogs. Please check your connection and try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadBlogs();
    }, []);

    // ----------------------------------
    // Populate form when selecting blog
    // ----------------------------------

    useEffect(() => {
        if (creating) return;

        if (!selectedBlog) {
            setForm(EMPTY_FORM);
            return;
        }

        setForm({
            title: selectedBlog.title,
            content: selectedBlog.content ?? "",
            featuredImage: selectedBlog.featuredImage ?? "",
            status: selectedBlog.status ?? "draft",
        });
    }, [selectedId, selectedBlog?.id, creating]);

    // ----------------------------------
    // Select an existing blog
    // ----------------------------------

    const handleSelectBlog = (blog: BlogItem) => {
        setSelectedId(blog.id);
        setCreating(false);
        setError("");
        setNotice("");
    };

    // ----------------------------------
    // Start creating a blog
    // ----------------------------------

    const handleCreateMode = () => {
        setCreating(true);
        setSelectedId(null);
        setForm(EMPTY_FORM);
        setError("");
        setNotice("");
    };

    // ----------------------------------
    // Automatically generate slug
    // ----------------------------------

    const handleTitleChange = (title: string) => {
        setForm((current) => ({
            ...current,
            title,
        }));
    };

    const generatedSlug = generateBlogSlug(form.title);

    // ----------------------------------
    // Save blog
    // ----------------------------------

    const handleSave = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!form.title.trim()) {
            setError("Please enter a blog title.");
            return;
        }

        if (!generatedSlug) {
            setError("Please enter a valid blog title for the URL.");
            return;
        }

        const plainText = form.content
            .replace(/<[^>]*>/g, " ")
            .replace(/&nbsp;/g, " ")
            .trim();

        if (!plainText) {
            setError("Please enter the main article content.");
            return;
        }

        try {
            setSaving(true);
            setError("");
            setNotice("");

            let savedBlogId: string;

            if (creating) {
                savedBlogId = await addBlog(
                    form.title,
                    form.content,
                    form.featuredImage,
                    form.status
                );

                setCreating(false);
                setSelectedId(savedBlogId);

                setNotice("Blog created successfully.");
            } else if (selectedId) {
                await updateBlog(selectedId, {
                    title: form.title,
                    content: form.content,
                    featuredImage: form.featuredImage,
                    status: form.status,
                });

                savedBlogId = selectedId;

                setNotice("Blog updated successfully.");
            } else {
                setError("Please select a blog or create a new one.");
                return;
            }

            const refreshedBlogs = await fetchBlogs();

            setBlogs(refreshedBlogs);
            setSelectedId(savedBlogId);
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

    // ----------------------------------
    // Delete blog
    // ----------------------------------

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
            setForm(EMPTY_FORM);

            setNotice("Blog deleted successfully.");
        } catch (err) {
            console.error("Failed to delete blog:", err);

            setError(
                "Unable to delete this blog. Please try again."
            );
        } finally {
            setDeleting(false);
        }
    };

    // ----------------------------------
    // UI
    // ----------------------------------

    return (
        <Layout>
            <div className="space-y-7">
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
                            Create, format, and manage your website articles
                            from one place.
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

                {/* Feedback */}

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

                <div className="grid items-start gap-6 xl:grid-cols-[minmax(300px,0.85fr)_minmax(0,1.5fr)]">
                    {/* Blog list */}

                    <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm">
                        <div className="border-b border-black/[0.06] p-5">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <h2 className="font-bold text-[#171717]">
                                        All blog posts
                                    </h2>

                                    <p className="mt-1 text-xs text-[#757676]">
                                        Select a blog to edit its content.
                                    </p>
                                </div>

                                <span className="rounded-lg bg-[#FFF0E7] px-3 py-1.5 text-xs font-bold text-[#da5010]">
                                    {blogs.length} total
                                </span>
                            </div>

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

                                    {!search && (
                                        <button
                                            type="button"
                                            onClick={handleCreateMode}
                                            className="mt-4 text-sm font-bold text-[#da5010] hover:underline"
                                        >
                                            Create your first blog
                                        </button>
                                    )}
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
                                            className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition ${active
                                                ? "border-[#F46B1F]/30 bg-[#FFF7F2]"
                                                : "border-transparent hover:border-black/[0.06] hover:bg-[#FAFAF9]"
                                                }`}
                                        >
                                            <div
                                                className={`flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl ${active
                                                    ? "bg-[#F46B1F] text-white"
                                                    : "bg-[#F3F3F2] text-[#757676]"
                                                    }`}
                                            >
                                                {blog.featuredImage ? (
                                                    <img
                                                        src={blog.featuredImage}
                                                        alt=""
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <FaNewspaper className="text-lg" />
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

                                                <p className="mt-1.5 flex items-center gap-1 text-[11px] text-[#757676]">
                                                    <FaCalendarAlt />
                                                    {formatBlogDate(
                                                        blog.createdAt
                                                    )}
                                                </p>

                                                <span
                                                    className={`mt-2 inline-flex rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${blog.status ===
                                                        "published"
                                                        ? "bg-green-50 text-green-700"
                                                        : "bg-[#F1F1F0] text-[#757676]"
                                                        }`}
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
                                            ? "Add and format your article."
                                            : "Update the selected article."}
                                    </p>
                                </div>
                            </div>

                            {creating && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCreating(false);
                                        setSelectedId(blogs[0]?.id ?? null);
                                        setForm(EMPTY_FORM);
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
                                    Or create a new blog post using the button above.
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

                                {/* Automatically generated slug */}

                                <div>
                                    <label
                                        htmlFor="blog-slug"
                                        className="mb-2 block text-sm font-semibold text-[#343536]"
                                    >
                                        URL slug
                                    </label>

                                    <div className="flex overflow-hidden rounded-xl border border-black/10">
                                        <span className="flex items-center bg-[#F7F7F6] px-3 text-xs text-[#757676]">
                                            /
                                        </span>

                                        <input
                                            id="blog-slug"
                                            value={generatedSlug}
                                            readOnly
                                            placeholder="your-blog-title"
                                            className="min-w-0 flex-1 bg-[#FAFAF9] px-3 py-3 text-sm text-[#757676] outline-none"
                                        />
                                    </div>

                                    <p className="mt-2 text-xs text-[#757676]">
                                        Automatically generated from the title.
                                    </p>
                                </div>

                                {/* Article content */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#343536]">
                                        Main article content
                                    </label>

                                    <RichTextEditor
                                        content={form.content}
                                        onChange={(content) =>
                                            setForm((current) => ({
                                                ...current,
                                                content,
                                            }))
                                        }
                                    />

                                    <p className="mt-2 text-xs leading-5 text-[#757676]">
                                        Use headings, bold text, paragraphs,
                                        blockquotes, and lists to format your article.
                                        Your formatting is saved with the content.
                                    </p>
                                </div>

                                {/* Featured image */}

                                <div>
                                    <label
                                        htmlFor="blog-image"
                                        className="mb-2 block text-sm font-semibold text-[#343536]"
                                    >
                                        Featured image URL
                                    </label>

                                    <input
                                        id="blog-image"
                                        type="url"
                                        value={form.featuredImage}
                                        onChange={(event) =>
                                            setForm((current) => ({
                                                ...current,
                                                featuredImage:
                                                    event.target.value,
                                            }))
                                        }
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition placeholder:text-[#AAA] focus:border-[#F46B1F] focus:ring-2 focus:ring-[#F46B1F]/10"
                                    />

                                    {form.featuredImage && (
                                        <div className="mt-3 overflow-hidden rounded-xl border border-black/[0.06] bg-[#F7F7F6]">
                                            <img
                                                src={form.featuredImage}
                                                alt="Featured image preview"
                                                className="max-h-64 w-full object-cover"
                                                onError={(event) => {
                                                    event.currentTarget.style.display =
                                                        "none";
                                                }}
                                                onLoad={(event) => {
                                                    event.currentTarget.style.display =
                                                        "block";
                                                }}
                                            />
                                        </div>
                                    )}
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

                                {/* Created date */}

                                {!creating && selectedBlog && (
                                    <div className="flex items-start gap-3 rounded-xl bg-[#F7F7F6] p-4">
                                        <FaCalendarAlt className="mt-0.5 text-[#F46B1F]" />

                                        <div>
                                            <p className="text-xs font-semibold text-[#343536]">
                                                Created date
                                            </p>

                                            <p className="mt-1 text-sm text-[#757676]">
                                                {formatBlogDate(
                                                    selectedBlog.createdAt
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}

                                <div className="flex flex-col-reverse gap-3 border-t border-black/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
                                    {!creating && selectedBlog ? (
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
                                    ) : (
                                        <span />
                                    )}

                                    <button
                                        type="submit"
                                        disabled={saving || deleting}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F46B1F] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#df5b16] disabled:cursor-not-allowed disabled:opacity-60"
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

                                {/* Blog ID */}

                                {!creating && selectedBlog && (
                                    <div className="flex items-start gap-2 rounded-xl bg-[#F7F7F6] p-3 text-xs leading-5 text-[#757676]">
                                        <FaExternalLinkAlt className="mt-0.5 shrink-0" />

                                        <p>
                                            Blog ID:{" "}
                                            <span className="break-all font-medium text-[#343536]">
                                                {selectedBlog.id}
                                            </span>
                                        </p>
                                    </div>
                                )}
                            </form>
                        )}
                    </section>
                </div>
            </div>
        </Layout>
    );
};

// ----------------------------------
// Summary card
// ----------------------------------

type SummaryCardProps = {
    label: string;
    value: number;
    icon: ReactNode;
};

const SummaryCard = ({
    label,
    value,
    icon,
}: SummaryCardProps) => (
    <div className="flex items-center gap-4 rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm">
        <div
            className="flex h-12 w-12 items-center justify-center rounded-xl text-lg"
            style={{
                backgroundColor: `${ORANGE}15`,
                color: ORANGE,
            }}
        >
            {icon}
        </div>

        <div>
            <p className="text-sm text-[#757676]">{label}</p>

            <p className="mt-1 text-2xl font-bold tracking-tight text-[#171717]">
                {value}
            </p>
        </div>
    </div>
);

export default AdminBlog;
