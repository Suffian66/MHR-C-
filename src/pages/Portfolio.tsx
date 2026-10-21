import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "../components/pagesHero";
import { Header } from "../components/header";
import Footer from "../components/footer";
import { Cta } from "../components/pagesCta";
import Topbar from "../components/topbar";
import { useContent } from "../adminPanel/features/contentContext";



export default function PortfolioPage() {
    const slug = "portfolio";
    const [activeCategory, setActiveCategory] = useState("All Projects");
    const { sectionsBySlug, loadSectionsBySlug, loading, media } = useContent();

    useEffect(() => {
        loadSectionsBySlug(slug);
    }, [slug]);

    if (loading && !sectionsBySlug[slug]) {
        return (
            <div className="flex items-center justify-center h-screen w-full">
                <p className="text-xl font-bold">Loading...</p>
            </div>
        );
    }

    const banner = sectionsBySlug[slug]?.["Banner"]?.blocks;
    const projects = sectionsBySlug[slug]?.["Projects"]?.blocks;
    const projectSection = sectionsBySlug[slug]?.["Project Section "]?.blocks;

    const categories = [
        "All Projects",
        projectSection?.heading3?.text,
        projectSection?.heading4?.text,
        projectSection?.heading5?.text,
        projectSection?.heading6?.text,
        projectSection?.heading7?.text,
        projectSection?.heading8?.text,
    ].filter((category): category is string => Boolean(category?.trim()));

    const getUrl = (imageId?: string) =>
        media.find((m) => m.id === imageId)?.mediaUrl || null;

    const portfolioProjects = [
        {
            id: 1,
            title: projects?.heading2?.text,
            category: projects?.heading1?.text,
            location: projects?.heading3?.text,
            description: projects?.paragraph1?.text,
            cover: getUrl(projects?.image1?.imageId) || "/images/project-aa/kitchen.jpg",
            images: [
                getUrl(projects?.image2?.imageId) || "/images/project-aa/hall-2.jpg",
                getUrl(projects?.image3?.imageId) || "/images/kitchen.png",
            ],
        },
        {
            id: 2,
            title: projects?.heading5?.text,
            category: projects?.heading4?.text,
            location: projects?.heading6?.text,
            description: projects?.paragraph2?.text,
            cover: getUrl(projects?.image4?.imageId) || "/images/project-aa/bathroom.jpg",
            images: [
                getUrl(projects?.image5?.imageId) || "/images/project-aa/bathroom-4.jpg",
                getUrl(projects?.image6?.imageId) || "/images/project-aa/bathroom-3.jpg",
            ],
        },
        {
            id: 3,
            title: projects?.heading8?.text,
            category: projects?.heading7?.text,
            location: projects?.heading9?.text,
            description: projects?.paragraph3?.text,
            cover: getUrl(projects?.image7?.imageId) || "/images/project-bhc/bathroom.JPG",
            images: [
                getUrl(projects?.image8?.imageId) || "/images/project-bhc/bathroom-2.JPG",
                getUrl(projects?.image9?.imageId) || "/images/project-bhc/shower.JPG",
            ],
        },
    ];


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
                    eyebrow={banner?.heading1?.text}
                    title={banner?.heading2?.text}
                    highlight={banner?.heading3?.text}
                    description={banner?.paragraph1?.text}
                    image={getUrl(banner?.image1?.imageId) || "/images/portfolio.jpg"}
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
                                    {projectSection?.heading1?.text}
                                </p>

                                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl">
                                    {projectSection?.heading2?.text}
                                </h2>
                            </div>

                            <p className="max-w-md text-sm leading-7 text-[#343536]/65">
                                {projectSection?.paragraph1?.text}
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