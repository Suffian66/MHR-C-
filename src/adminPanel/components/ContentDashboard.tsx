
import { Link } from "react-router-dom";
import {
    FaFileAlt,
    FaImages,
    FaArrowRight,
    FaPlus,
    FaFolderOpen,
    FaGlobe,
    FaLayerGroup,
    FaCheckCircle,
    FaChevronRight,
    FaPenNib,
    FaExternalLinkAlt,
} from "react-icons/fa";

import Layout from "./Layout";

const workspaceItems = [
    {
        title: "Manage Pages",
        description:
            "Edit page sections, update headings, refine text, and organize your website content.",
        to: "/admin/pages",
        icon: FaFileAlt,
        label: "CONTENT MANAGEMENT",
        number: "01",
    },
    {
        title: "Media Library",
        description:
            "Access your uploaded images and manage the media used throughout your website.",
        to: "/admin/media",
        icon: FaImages,
        label: "IMAGE MANAGEMENT",
        number: "02",
    },
    {
        title: "Blog Management",
        description:
            "Create and manage blogs using your existing content workflow.",
        to: "/admin/add-blog",
        icon: FaPlus,
        label: "MANAGE BLOG",
        number: "03",
    },
];

const ContentDashboard = () => {
    return (
        <Layout
        // title="Dashboard"
        // subtitle="Your website, your content, all in one place."
        >
            <div className="space-y-8">
                {/* Orange welcome hero */}
                {/* <section className="relative isolate overflow-hidden rounded-[26px] bg-gradient-to-br from-[#F46B1F] via-[#F46B1F] to-[#df5311] px-6 py-9 shadow-xl shadow-[#F46B1F]/15 sm:px-9 sm:py-11 lg:px-11">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full border-[40px] border-white/[0.10]"
                    />

                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-32 right-[15%] -z-10 h-64 w-64 rounded-full bg-[#ffb17d]/30 blur-3xl"
                    />

                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute right-[18%] top-1/2 hidden -translate-y-1/2 text-white/[0.10] lg:block"
                    >
                        <FaLayerGroup className="text-[170px]" />
                    </div>

                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3.5 py-2 backdrop-blur-sm">
                            <span className="h-2 w-2 rounded-full bg-white" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-white">
                                Your content workspace
                            </span>
                        </div>

                        <h2 className="mt-6 max-w-xl text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[42px]">
                            Good content.
                            <br />
                            Better experiences.
                        </h2>

                        <p className="mt-4 max-w-lg text-sm leading-7 text-white/90 sm:text-[15px]">
                            Keep your website up to date, manage your media,
                            and make every page count from one simple workspace.
                        </p>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <Link
                                to="/admin/add-content"
                                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#E85E16] shadow-lg shadow-black/[0.06] transition duration-200 hover:-translate-y-0.5 hover:bg-[#171717] hover:text-white"
                            >
                                <FaPlus className="text-xs" />
                                Create content
                                <FaArrowRight className="ml-1 text-xs" />
                            </Link>

                            <Link
                                to="/"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                            >
                                <FaGlobe className="text-sm" />
                                Visit website
                                <FaExternalLinkAlt className="text-[10px]" />
                            </Link>
                        </div>
                    </div>
                </section> */}

                {/* Content workspace */}
                <section>
                    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="h-5 w-1 rounded-full bg-[#F46B1F]" />
                                <h2 className="text-xl font-bold tracking-tight text-[#171717]">
                                    Content workspace
                                </h2>
                            </div>

                            <p className="mt-2 text-sm leading-6 text-[#757676]">
                                Everything you need to keep your website organized.
                            </p>
                        </div>

                        <span className="text-xs font-medium text-[#757676]">
                            Choose an action
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                        {workspaceItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className="group relative flex min-h-[255px] flex-col overflow-hidden rounded-[22px] border border-black/[0.06] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#F46B1F]/40 hover:shadow-xl hover:shadow-[#F46B1F]/[0.07] sm:p-7"
                                >
                                    {/* Decorative corner */}
                                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#F46B1F]/[0.04] transition-transform duration-500 group-hover:scale-150 group-hover:bg-[#F46B1F]/[0.08]" />

                                    <div className="relative flex items-center justify-between">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F46B1F]/10 text-[#F46B1F] transition-all duration-300 group-hover:bg-[#F46B1F] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#F46B1F]/20">
                                            <Icon className="text-xl" />
                                        </div>

                                        <span className="text-3xl font-bold tracking-tight text-black/[0.07] transition-colors group-hover:text-[#F46B1F]/25">
                                            {item.number}
                                        </span>
                                    </div>

                                    <div className="relative mt-7">
                                        <p className="text-[9px] font-bold tracking-[0.17em] text-[#F46B1F]">
                                            {item.label}
                                        </p>

                                        <h3 className="mt-2 text-lg font-bold tracking-tight text-[#171717]">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-[13px] leading-6 text-[#757676]">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="relative mt-auto flex items-center justify-between border-t border-black/[0.06] pt-5">
                                        <span className="text-xs font-bold text-[#171717] transition-colors group-hover:text-[#F46B1F]">
                                            Open workspace
                                        </span>

                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F46B1F]/10 text-[#F46B1F] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#F46B1F] group-hover:text-white">
                                            <FaArrowRight className="text-[11px]" />
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* Getting started */}
                <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_1fr]">
                    {/* <div className="rounded-[22px] border border-black/[0.06] bg-white p-6 shadow-sm sm:p-8">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F46B1F] text-white shadow-lg shadow-[#F46B1F]/20">
                                <FaPenNib className="text-lg" />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-[#171717]">
                                    Getting started
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-[#757676]">
                                    A simple workflow for keeping your website fresh.
                                </p>
                            </div>
                        </div>

                        <div className="mt-7 space-y-5">
                            <Link
                                to="/admin/pages"
                                className="group flex items-start gap-4"
                            >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F46B1F]/10 text-xs font-bold text-[#F46B1F] transition group-hover:bg-[#F46B1F] group-hover:text-white">
                                    1
                                </span>

                                <span className="flex-1 border-b border-black/[0.06] pb-5">
                                    <span className="block text-sm font-bold text-[#171717] transition group-hover:text-[#F46B1F]">
                                        Review your pages
                                    </span>

                                    <span className="mt-1 block text-xs leading-5 text-[#757676]">
                                        Check your existing pages and update their content.
                                    </span>
                                </span>

                                <FaChevronRight className="mt-2 text-xs text-[#757676]/60 transition group-hover:translate-x-1 group-hover:text-[#F46B1F]" />
                            </Link>

                            <Link
                                to="/admin/media"
                                className="group flex items-start gap-4"
                            >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F46B1F]/10 text-xs font-bold text-[#F46B1F] transition group-hover:bg-[#F46B1F] group-hover:text-white">
                                    2
                                </span>

                                <span className="flex-1 border-b border-black/[0.06] pb-5">
                                    <span className="block text-sm font-bold text-[#171717] transition group-hover:text-[#F46B1F]">
                                        Organize your media
                                    </span>

                                    <span className="mt-1 block text-xs leading-5 text-[#757676]">
                                        Find and manage the images used on your website.
                                    </span>
                                </span>

                                <FaChevronRight className="mt-2 text-xs text-[#757676]/60 transition group-hover:translate-x-1 group-hover:text-[#F46B1F]" />
                            </Link>

                            <Link
                                to="/admin/add-content"
                                className="group flex items-start gap-4"
                            >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F46B1F]/10 text-xs font-bold text-[#F46B1F] transition group-hover:bg-[#F46B1F] group-hover:text-white">
                                    3
                                </span>

                                <span className="flex-1">
                                    <span className="block text-sm font-bold text-[#171717] transition group-hover:text-[#F46B1F]">
                                        Create new content
                                    </span>

                                    <span className="mt-1 block text-xs leading-5 text-[#757676]">
                                        Add content using your existing admin workflow.
                                    </span>
                                </span>

                                <FaChevronRight className="mt-2 text-xs text-[#757676]/60 transition group-hover:translate-x-1 group-hover:text-[#F46B1F]" />
                            </Link>
                        </div>
                    </div> */}

                    {/* Website shortcut */}
                    <div className="relative flex flex-col justify-between overflow-hidden rounded-[22px] bg-[#171717] p-6 shadow-sm sm:p-8">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border-[30px] border-[#F46B1F]/15"
                        />

                        <div className="relative">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F46B1F] text-white">
                                <FaGlobe className="text-lg" />
                            </div>

                            <h3 className="mt-6 text-xl font-bold tracking-tight text-white">
                                Your website.
                                <br />
                                Your control.
                            </h3>

                            <p className="mt-3 max-w-sm text-sm leading-7 text-white/55">
                                Review the public website and see how your
                                visitors experience your content.
                            </p>
                        </div>

                        <Link
                            to="/"
                            target="_blank"
                            rel="noreferrer"
                            className="relative mt-8 inline-flex min-h-12 w-fit items-center gap-3 rounded-xl bg-[#F46B1F] px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#171717]"
                        >
                            <FaGlobe />
                            Open live website
                            <FaExternalLinkAlt className="text-[10px]" />
                        </Link>

                        <FaCheckCircle className="pointer-events-none absolute bottom-8 right-7 text-5xl text-white/[0.04]" />
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default ContentDashboard;
