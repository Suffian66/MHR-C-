import { useEffect, useState } from "react";
import { FaFileAlt, FaLayerGroup, FaArrowRight } from "react-icons/fa";
import { fetchPages } from "../service/PageService";
import Layout from "../components/Layout";
import PageSection from "../components/PageSection";

interface PageItem {
    id: string;
    title: string;
    slug: string;
}

const Page = () => {
    const [pages, setPages] = useState<PageItem[]>([]);
    const [activeTab, setActiveTab] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const loadPages = async () => {
            try {
                setLoading(true);
                setError("");

                const fetchedPages = await fetchPages();

                if (!isMounted) return;

                setPages(fetchedPages);

                if (fetchedPages.length > 0) {
                    setActiveTab((current) =>
                        fetchedPages.some((page) => page.id === current)
                            ? current
                            : fetchedPages[0].id
                    );
                } else {
                    setActiveTab("");
                }
            } catch (err) {
                console.error("Failed to load pages:", err);

                if (isMounted) {
                    setError("We couldn't load your pages. Please try again.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadPages();

        return () => {
            isMounted = false;
        };
    }, []);

    const activePage = pages.find((page) => page.id === activeTab);

    return (
        <Layout >
            <div className="mx-auto w-full max-w-[1500px] space-y-7 pb-8">

                {/* Page heading */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="h-1 w-8 rounded-full bg-[#F46B1F]" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F46B1F]">
                                Website Management
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-[#252525] sm:text-4xl">
                            Manage Pages
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#757676] sm:text-base">
                            Manage your website pages, edit their sections, and keep your
                            content up to date.
                        </p>
                    </div>

                    <div className="flex w-fit items-center gap-3 rounded-2xl border border-black/[0.06] bg-white px-4 py-3 shadow-sm">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F46B1F]/10 text-[#F46B1F]">
                            <FaFileAlt size={19} />
                        </div>

                        <div>
                            <p className="text-2xl font-bold leading-none text-[#252525]">
                                {loading ? "—" : pages.length}
                            </p>
                            <p className="mt-1.5 text-xs font-medium text-[#757676]">
                                Website pages
                            </p>
                        </div>
                    </div>
                </div>

                {/* Error state */}
                {error && (
                    <div
                        role="alert"
                        className="flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <p className="text-sm font-medium text-red-700">{error}</p>

                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="w-fit rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                        >
                            Reload page
                        </button>
                    </div>
                )}

                {/* Main page management panel */}
                <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.035)]">

                    {/* Panel header */}
                    <div className="border-b border-black/[0.06] px-5 py-5 sm:px-7">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F46B1F]/10 text-[#F46B1F]">
                                <FaLayerGroup size={17} />
                            </div>

                            <div>
                                <h2 className="font-bold text-[#252525]">
                                    Your website content
                                </h2>
                                <p className="mt-1 text-xs text-[#757676] sm:text-sm">
                                    Select a page to manage its sections and content blocks.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Page selector */}
                    <div className="border-b border-black/[0.06] bg-[#FAFAF9] px-4 pt-4 sm:px-7">
                        {loading ? (
                            <div className="flex gap-3 overflow-hidden pb-4">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="h-12 w-32 shrink-0 animate-pulse rounded-xl bg-black/[0.05]"
                                    />
                                ))}
                            </div>
                        ) : pages.length > 0 ? (
                            <div
                                role="tablist"
                                aria-label="Website pages"
                                className="flex gap-2 overflow-x-auto pb-0"
                            >
                                {pages.map((page) => {
                                    const isActive = activeTab === page.id;

                                    return (
                                        <button
                                            key={page.id}
                                            id={`page-tab-${page.id}`}
                                            type="button"
                                            role="tab"
                                            aria-selected={isActive}
                                            aria-controls="page-content-panel"
                                            onClick={() => setActiveTab(page.id)}
                                            className={`group flex shrink-0 items-center gap-2.5 rounded-t-xl border border-b-0 px-4 py-3 text-sm font-semibold transition-all duration-200 sm:px-5 ${isActive
                                                ? "border-[#F46B1F]/20 bg-white text-[#F46B1F]"
                                                : "border-transparent bg-transparent text-[#757676] hover:bg-white/70 hover:text-[#252525]"
                                                }`}
                                        >
                                            <FaFileAlt
                                                size={14}
                                                className={
                                                    isActive
                                                        ? "text-[#F46B1F]"
                                                        : "text-[#A0A0A0] group-hover:text-[#757676]"
                                                }
                                            />

                                            <span>{page.title}</span>

                                            {isActive && (
                                                <FaArrowRight
                                                    size={11}
                                                    className="ml-1 text-[#F46B1F]"
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            !error && (
                                <div className="py-8 text-center">
                                    <p className="font-semibold text-[#252525]">
                                        No pages found
                                    </p>
                                    <p className="mt-1 text-sm text-[#757676]">
                                        Website pages will appear here once they are available in
                                        your CMS.
                                    </p>
                                </div>
                            )
                        )}
                    </div>

                    {/* Selected page content */}
                    <div
                        id="page-content-panel"
                        role="tabpanel"
                        aria-labelledby={activePage ? `page-tab-${activePage.id}` : undefined}
                        className="min-w-0 p-4 sm:p-6 lg:p-7"
                    >
                        {loading ? (
                            <div className="space-y-4 py-4">
                                <div className="h-6 w-48 animate-pulse rounded-lg bg-black/[0.06]" />
                                <div className="h-4 w-72 max-w-full animate-pulse rounded-lg bg-black/[0.04]" />
                                <div className="h-32 animate-pulse rounded-xl bg-black/[0.04]" />
                            </div>
                        ) : activeTab && activePage ? (
                            <PageSection page={activeTab} />
                        ) : (
                            !error &&
                            pages.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F46B1F]/10 text-[#F46B1F]">
                                        <FaFileAlt size={25} />
                                    </div>

                                    <h3 className="text-lg font-bold text-[#252525]">
                                        Nothing to manage yet
                                    </h3>

                                    <p className="mt-2 max-w-md text-sm leading-6 text-[#757676]">
                                        There are currently no website pages available. Once pages
                                        are added to Firestore, you can edit their content here.
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Footer hint */}
                {!loading && activePage && (
                    <div className="flex flex-col gap-1 px-1 text-xs text-[#757676] sm:flex-row sm:items-center sm:justify-between">
                        <p>
                            Currently editing:{" "}
                            <span className="font-semibold text-[#454545]">
                                {activePage.title}
                            </span>
                        </p>

                        <p>
                            Page ID: <span className="font-mono">{activePage.id}</span>
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Page;