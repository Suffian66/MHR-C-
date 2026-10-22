
import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import {
    FaHome,
    FaFileAlt,
    FaFolder,
    FaBars,
    FaTimes,
    FaGlobe,
    FaBell,
    FaPlus,
    FaChevronRight,
    FaLayerGroup,
    FaSignOutAlt,
    FaNewspaper,
} from "react-icons/fa";
import { auth } from "../service/firebase";

type NavItem = {
    label: string;
    to: string;
    icon: React.ComponentType<{ className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
    { label: "Dashboard", to: "/admin/dashboard", icon: FaHome },
    { label: "Pages", to: "/admin/pages", icon: FaFileAlt },
    { label: "Blog Management", to: "/admin/blogs", icon: FaNewspaper },
    { label: "Media Library", to: "/admin/media", icon: FaFolder },
    // { label: "Add Content", to: "/admin/add-content", icon: FaPlus },
];

type SidebarProps = {
    open: boolean;
    onClose: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
    return (
        <>
            {open && (
                <button
                    type="button"
                    aria-label="Close navigation"
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col overflow-hidden bg-[#da5010] text-white transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0`}
            >
                {/* Decorative background */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 top-28 h-56 w-56 rounded-full border-[35px] border-white/[0.07]"
                />

                {/* Brand */}
                <div className="relative flex h-[82px] shrink-0 items-center justify-between border-b border-white/20 px-6">
                    <Link
                        to="/admin/dashboard"
                        onClick={onClose}
                        className="flex min-w-0 items-center gap-3"
                    >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#da5010] shadow-md">
                            <FaLayerGroup className="text-lg" />
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-[15px] font-extrabold tracking-wide text-white">
                                ADMIN PANEL
                            </p>
                            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75">
                                Content workspace
                            </p>
                        </div>
                    </Link>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close sidebar"
                        className="rounded-lg p-2 text-white transition hover:bg-black/10 md:hidden"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Navigation */}
                <div className="relative px-6 pb-3 pt-8">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/65">
                        Main menu
                    </p>
                </div>

                <nav className="relative flex-1 space-y-2 overflow-y-auto px-4 pb-6">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `group relative flex items-center gap-3.5 rounded-xl px-4 py-3.5 text-[13px] font-semibold transition-all duration-200 ${isActive
                                        ? "bg-white text-[#da5010] shadow-lg shadow-black/10"
                                        : "text-white/90 hover:bg-white/15 hover:text-white"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <Icon className="shrink-0 text-[16px]" />

                                        <span>{item.label}</span>

                                        {isActive && (
                                            <FaChevronRight className="ml-auto text-[10px]" />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Sidebar footer */}
                <div className="relative shrink-0 border-t border-white/20 p-4">
                    <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-white" />
                            <span className="text-[11px] font-bold text-white">
                                Your workspace
                            </span>
                        </div>

                        <p className="mt-2 text-[11px] leading-5 text-white/75">
                            Manage your website content from one place.
                        </p>
                    </div>

                    <p className="mt-4 text-center text-[10px] font-medium text-white/60">
                        Content Management System
                    </p>
                </div>
            </aside>
        </>
    );
};

type TopbarProps = {
    onToggleSidebar: () => void;
};

const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);

    const currentPage =
        NAV_ITEMS.find((item) => item.to === location.pathname)?.label ??
        "Workspace";

    const handleLogout = async () => {
        if (loggingOut) return;

        setLoggingOut(true);

        try {
            await signOut(auth);
            toast.success("You have been logged out successfully.");
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Unable to log out. Please try again.");
        } finally {
            setLoggingOut(false);
        }
    };

    return (
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-black/[0.06] bg-white/95 px-4 backdrop-blur-xl sm:px-6 lg:px-9">
            <div className="flex min-w-0 items-center gap-4">
                <button
                    type="button"
                    onClick={onToggleSidebar}
                    aria-label="Toggle navigation"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/[0.07] text-[#757676] transition hover:border-[#F46B1F]/30 hover:bg-[#F46B1F]/5 hover:text-[#da5010] md:hidden"
                >
                    <FaBars />
                </button>

                <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[13px] font-medium ">
                        <span className="hidden sm:inline">Workspace</span>
                        <FaChevronRight className="hidden text-[8px] sm:inline" />
                        <span className="truncate font-semibold text-[#171717]">
                            {currentPage}
                        </span>
                    </div>

                    <p className="mt-1 truncate text-xs text-[#757676]">
                        Manage your website with ease
                    </p>
                </div>
            </div>

            <div className="ml-3 flex shrink-0 items-center gap-2 sm:gap-3">
                <Link
                    to="/"
                    target="_blank"
                    rel="noreferrer"
                    className="hidden h-10 items-center gap-2 rounded-xl border border-black/[0.07] px-4 text-xs font-semibold text-[#343536] transition hover:border-[#F46B1F]/40 hover:bg-[#F46B1F]/5 hover:text-[#da5010] sm:inline-flex"
                >
                    <FaGlobe />
                    View website
                </Link>

                <div className="mx-1 hidden h-8 w-px bg-black/[0.08] sm:block" />

                <div
                    title="Administrator"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#F46B1F]/20 bg-[#FFF0E7] text-sm font-bold text-[#da5010]"
                >
                    A
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#da5010] px-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#df5b16] disabled:cursor-not-allowed disabled:opacity-60 sm:px-4 sm:text-sm"
                >
                    <FaSignOutAlt />
                    <span>{loggingOut ? "Logging out..." : "Logout"}</span>
                </button>
            </div>
        </header>
    );
};

type LayoutProps = {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
};

const Layout: React.FC<LayoutProps> = ({
    children,
    title,
    subtitle,
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F7F7F6] text-[#171717]">
            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="min-h-screen md:pl-[270px]">
                <Topbar
                    onToggleSidebar={() =>
                        setSidebarOpen((previous) => !previous)
                    }
                />

                <main className="mx-auto w-full max-w-[1700px] px-4 py-6 sm:px-6 sm:py-8 lg:px-9 lg:py-9">
                    {(title || subtitle) && (
                        <div className="mb-8">
                            {title && (
                                <h1 className="text-2xl font-bold tracking-tight text-[#171717] sm:text-[30px]">
                                    {title}
                                </h1>
                            )}

                            {subtitle && (
                                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#757676]">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    )}

                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
