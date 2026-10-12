import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowUpRight, Plus } from "lucide-react";
import { portfolioProjects } from "../data/portfolioData";
import { PageHero } from "../components/pagesHero";
import { Header } from "../components/header";
import Footer from "../components/footer";

const categories = [
    "All Projects",
    "Kitchens",
    "Bathrooms",
    "Basements",
    "Window Coverings",
    "Drywall",
    "Home Staging",
];

export default function PortfolioPage() {
    const [activeCategory, setActiveCategory] = useState("All Projects");

    const filteredProjects =
        activeCategory === "All Projects"
            ? portfolioProjects
            : portfolioProjects.filter(
                (project) => project.category === activeCategory
            );

    return (
        <>
            {/* Top announcement bar */}
            <div className="bg-[#343536] px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.24em] text-white/80">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <span>Renovations built around you</span>
                    <span className="hidden sm:block">
                        Serving Oakville &amp; surrounds
                    </span>
                </div>
            </div>
            <Header />

            <main>
                {/* HERO */}

                <PageHero
                    eyebrow="Our Selected Work"
                    title="Spaces transformed."
                    highlight="Living reimagined."
                    description="Explore our renovation projects, thoughtful details, and craftsmanship. From kitchens and bathrooms to complete interior transformations, every space reflects our commitment to quality and functionality."
                    image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85"
                    imageAlt="Beautifully renovated contemporary interior with elegant finishes"
                    breadcrumb="Portfolio"
                    ctaText="Explore our projects"
                    ctaLink="#projects"
                />

                {/* PROJECTS */}
                <section
                    id="projects"
                    className="bg-[#f7f6f2] px-6 py-16 text-[#343536] sm:px-10 sm:py-20 lg:px-12 lg:py-24"
                >
                    <div className="mx-auto max-w-7xl">
                        {/* Section heading */}
                        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                            <div>
                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#e87928]">
                                    A Closer Look
                                </p>
                                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl">
                                    Work worth exploring.
                                </h2>
                            </div>

                            <p className="max-w-md text-sm leading-7 text-[#343536]/65">
                                Discover the spaces, finishes, and ideas that bring each
                                project together.
                            </p>
                        </div>

                        {/* Category filters */}
                        <div className="mb-12 flex gap-2 overflow-x-auto pb-3">
                            {categories.map((category) => {
                                const isActive = activeCategory === category;

                                return (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => setActiveCategory(category)}
                                        className={`shrink-0 border px-4 py-2.5 text-sm transition duration-200 ${isActive
                                                ? "border-[#343536] bg-[#343536] text-white"
                                                : "border-[#343536]/15 bg-transparent text-[#343536]/70 hover:border-[#e87928] hover:text-[#e87928]"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Editorial project grid */}
                        <div className="grid gap-x-7 gap-y-14 md:grid-cols-2 lg:gap-x-10 lg:gap-y-16">
                            {filteredProjects.map((project, index) => (
                                <article
                                    key={project.id}
                                    className={`group ${index === 0 && activeCategory === "All Projects"
                                            ? "md:col-span-2"
                                            : ""
                                        }`}
                                >
                                    {/* Main image */}
                                    <div
                                        className={`grid gap-2 ${index === 0 && activeCategory === "All Projects"
                                                ? "grid-cols-3"
                                                : "grid-cols-2"
                                            }`}
                                    >
                                        <div
                                            className={`relative overflow-hidden bg-[#e9e6df] ${index === 0 && activeCategory === "All Projects"
                                                    ? "col-span-2 aspect-[1.35/1] sm:aspect-[1.8/1]"
                                                    : "col-span-2 aspect-[1.55/1]"
                                                }`}
                                        >
                                            <img
                                                src={project.cover}
                                                alt={project.title}
                                                loading={index < 2 ? "eager" : "lazy"}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                                            />

                                            <span className="absolute left-4 top-4 bg-[#171717]/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                                                {project.category}
                                            </span>
                                        </div>

                                        {/* Supporting images */}
                                        <div
                                            className={`col-span-1 grid min-h-0 grid-rows-2 gap-2 ${index === 0 && activeCategory === "All Projects"
                                                    ? "hidden sm:grid"
                                                    : ""
                                                }`}
                                        >
                                            {project.images.slice(0, 2).map((image, imageIndex) => (
                                                <div
                                                    key={image}
                                                    className="relative min-h-0 overflow-hidden bg-[#e9e6df]"
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`${project.title} — detail ${imageIndex + 1}`}
                                                        loading="lazy"
                                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Project information */}
                                    <div className="flex items-start justify-between gap-4 border-b border-[#343536]/15 pb-5 pt-6">
                                        <div className="min-w-0">
                                            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e87928]">
                                                Project {String(project.id).padStart(2, "0")}
                                                <span className="mx-2 text-[#343536]/30">/</span>
                                                {project.location}
                                            </p>

                                            <h3 className="font-serif text-2xl leading-snug sm:text-3xl">
                                                {project.title}
                                            </h3>

                                            <p className="mt-3 max-w-xl text-sm leading-7 text-[#343536]/65">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div
                                            aria-hidden="true"
                                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#343536]/20 transition duration-300 group-hover:border-[#e87928] group-hover:bg-[#e87928] group-hover:text-white"
                                        >
                                            <ArrowUpRight size={19} />
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {filteredProjects.length === 0 && (
                            <p className="py-16 text-center text-[#343536]/60">
                                No projects in this category yet. Please explore another
                                category.
                            </p>
                        )}
                    </div>
                </section>

                {/* CLOSING CTA */}
                <section className="relative overflow-hidden bg-[#202020] px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-12">
                    <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
                        <div>
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#f19a53]">
                                Have a Project in Mind?
                            </p>

                            <h2 className="max-w-3xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                                Your home could be next.
                            </h2>

                            <p className="mt-5 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                                Tell us what you envision. Let's explore how to make your
                                space work beautifully for you.
                            </p>
                        </div>

                        <Link
                            to="/contact"
                            className="inline-flex w-fit shrink-0 items-center gap-3 bg-[#e87928] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#f19a53]"
                        >
                            Start Your Project
                            <Plus size={18} />
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}