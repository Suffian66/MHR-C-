import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { portfolioProjects } from "../data/portfolioData";
import { PageHero } from "../components/pagesHero";
import { Header } from "../components/header";
import Footer from "../components/footer";
import { Cta } from "../components/pagesCta";
import Topbar from "../components/topbar";

const categories = [
    "All Projects",
    "Kitchens",
    "Bathrooms",
    "Basements",
    "Blinds / Window Coverings",
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
            <Topbar />

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
                        <div className="mb-12 flex gap-4 overflow-x-auto pb-3">
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
                                            } `}
                                    >
                                        {category}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Project list */}
                        <div>
                            {filteredProjects.map((project, index) => {
                                const isFeatured =
                                    index === 0 &&
                                    activeCategory === "All Projects";

                                return (
                                    <article
                                        key={project.id}
                                        className="group"
                                    >
                                        {/* Project information ABOVE images */}
                                        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                                            <div className="min-w-0">
                                                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e87928]">
                                                    Project{" "}
                                                    {String(project.id).padStart(2, "0")}
                                                    <span className="mx-2 text-[#343536]/30">
                                                        /
                                                    </span>
                                                    {project.location}
                                                </p>

                                                <h3 className="font-serif text-2xl leading-snug sm:text-3xl lg:text-4xl">
                                                    {project.title}
                                                </h3>

                                                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#343536]/65">
                                                    {project.description}
                                                </p>
                                            </div>

                                            <span className="flex w-fit shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#343536]/60 transition-colors group-hover:text-[#e87928]">
                                                {project.category}
                                                <ArrowUpRight size={17} />
                                            </span>
                                        </div>


                                        {/* Project images — editorial gallery */}
                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-12 sm:gap-4 lg:gap-5">

                                            {/* Main large image */}
                                            <div className="group/main relative overflow-hidden bg-[#e9e6df] sm:col-span-7">
                                                <div className="aspect-[4/3] h-full min-h-[280px] sm:min-h-[420px]">
                                                    <img
                                                        src={project.cover}
                                                        alt={project.title}
                                                        loading={index === 0 ? "eager" : "lazy"}
                                                        className="h-full w-full object-cover transition-transform duration-700 group-hover/main:scale-[1.035]"
                                                    />
                                                </div>

                                                <span className="absolute left-4 top-4 bg-[#171717]/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                                                    {project.category}
                                                </span>
                                            </div>

                                            {/* Smaller supporting images */}
                                            <div className="grid grid-cols-2 gap-3 sm:col-span-5 sm:grid-cols-2 sm:grid-rows-2 sm:gap-4 lg:gap-5">
                                                {project.images.slice(0, 4).map((image, imageIndex) => (
                                                    <div
                                                        key={image}
                                                        className="group/detail relative aspect-[4/3] overflow-hidden bg-[#e9e6df] sm:aspect-auto sm:min-h-0"
                                                    >
                                                        <img
                                                            src={image}
                                                            alt={`${project.title} — detail ${imageIndex + 1}`}
                                                            loading="lazy"
                                                            className="h-full w-full object-cover transition-transform duration-700 group-hover/detail:scale-[1.045]"
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                        </div>

                                        {/* Separator after every project */}
                                        <div className="my-12 border-b border-[#343536]/20 sm:my-16" />
                                    </article>
                                );
                            })}
                        </div>

                        {/* Empty state */}
                        {filteredProjects.length === 0 && (
                            <p className="py-16 text-center text-[#343536]/60">
                                No projects in this category yet. Please explore
                                another category.
                            </p>
                        )}
                    </div>
                </section>

                {/* Shared CTA */}
                <Cta
                    eyebrow="Your home could be next"
                    title="Have a project in mind?"
                    description="Tell us what you envision. Let's explore how to make your space work beautifully for you."
                    buttonText="Start Your Project"
                    buttonLink="/contact"
                />
            </main>

            <Footer />
        </>
    );
}