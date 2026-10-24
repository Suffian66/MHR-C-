import { Link } from 'react-router-dom';
import {
    ArrowRight,
    ArrowUpRight,
    HeartHandshake,
    Lightbulb,
    Ruler,
    Check,
} from 'lucide-react';

import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { PageHero } from '../components/pagesHero';
import { Cta } from '../components/pagesCta';
import Topbar from '../components/topbar';
import { useContent } from '../adminPanel/features/contentContext';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export default function AboutUs() {
    const slug = "about";
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
    const story = sectionsBySlug[slug]?.["Our Story"]?.blocks;
    const mission = sectionsBySlug[slug]?.["Mission"]?.blocks;
    const valuesData = sectionsBySlug[slug]?.["Values"]?.blocks;
    const process = sectionsBySlug[slug]?.["How we work"]?.blocks;
    const cta = sectionsBySlug[slug]?.["CTA"]?.blocks;
    const meta = sectionsBySlug[slug]?.["Meta"]?.blocks;

    const keywords =
        (typeof meta?.paragraph2?.text === "string"
            ? [meta.paragraph2.text]
            : Array.isArray(meta?.paragraph2?.text) ? meta.paragraph2.text : []
        ).join(", ");

    const getUrl = (imageId?: string) =>
        media.find((m) => m.id === imageId)?.mediaUrl || null;

    const values = [
        {
            number: '01',
            icon: HeartHandshake,
            title: valuesData?.heading4?.text,
            description: valuesData?.paragraph2?.text,
        },
        {
            number: '02',
            icon: Ruler,
            title: valuesData?.heading5?.text,
            description: valuesData?.paragraph3?.text,
        },
        {
            number: '03',
            icon: Lightbulb,
            title: valuesData?.heading6?.text,
            description: valuesData?.paragraph4?.text,
        },
    ];

    const steps = [
        {
            number: '01',
            title: process?.heading3?.text,
            description: process?.paragraph2?.text,
        },
        {
            number: '02',
            title: process?.heading4?.text,
            description: process?.paragraph3?.text,
        },
        {
            number: '03',
            title: process?.heading5?.text,
            description: process?.paragraph4?.text,
        },
    ];

    return (
        <>
            <Helmet>
                {meta?.heading1?.text && (
                    <title>{meta.heading1.text}</title>
                )}

                {meta?.paragraph1?.text && (
                    <meta
                        name="description"
                        content={meta.paragraph1.text}
                    />
                )}

                {keywords && (
                    <meta name="keywords" content={keywords} />
                )}

                {meta?.paragraph3?.text && (
                    <link
                        rel="canonical"
                        href={meta.paragraph3.text}
                    />
                )}
            </Helmet>
            <main className="overflow-hidden bg-[#f7f6f2] text-[#343536]">
                <Topbar />
                <Header />

                {/* Universal inner-page hero */}
                <PageHero
                    eyebrow={banner?.heading1?.text}
                    title={banner?.heading2?.text}
                    highlight={banner?.heading3?.text}
                    description={banner?.paragraph1?.text}
                    image={getUrl(banner?.image1?.imageId) || "/images/about.jpg"}
                    imageAlt="Warm, contemporary living room with carefully considered interior details"
                    breadcrumb="About Us"
                    ctaText="Discover our story"
                    ctaLink="/contact"
                />

                {/* Our story */}
                <section
                    id="our-story"
                    className="px-5 py-20 sm:px-8 sm:py-28"
                >
                    <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
                        {/* Image composition */}
                        <div className="relative pb-8 pr-7 sm:pb-10 sm:pr-10">
                            <div className="absolute bottom-0 left-0 h-2/3 w-2/3 bg-[#eeeae1]" />

                            <div className="relative aspect-[4/4.5] overflow-hidden">
                                <img
                                    src={getUrl(story?.image1?.imageId) || "/images/project-rsc/sitting-area.png"}
                                    alt="Bright renovated interior with warm materials and natural light"
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                                />
                            </div>

                            <div className="absolute -bottom-1 right-0 max-w-[220px] bg-[#e87928] p-5 text-white sm:max-w-[260px] sm:p-7">
                                <p className="font-serif text-2xl leading-tight sm:text-3xl">
                                    {story?.heading7?.text}
                                    <br />
                                    {story?.heading8?.text}
                                </p>
                                <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-white/75">
                                    {story?.heading9?.text}
                                </p>
                            </div>
                        </div>

                        {/* Story content */}
                        <div className="lg:py-8">
                            <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e87928] sm:text-xs">
                                <span className="h-px w-7 bg-[#e87928]" />
                                {story?.heading1?.text}
                            </p>

                            <h2 className="max-w-xl font-serif text-4xl leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
                                {story?.heading2?.text}
                                <span className="mt-1 block font-normal italic text-[#e87928]">
                                    {story?.heading3?.text}
                                </span>
                            </h2>

                            <p className="mt-7 text-base leading-8 text-[#343536]/70">
                                {story?.paragraph1?.text}
                            </p>

                            <p className="mt-5 text-sm leading-7 text-[#343536]/60">
                                {story?.paragraph2?.text}
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    story?.heading4?.text,
                                    story?.heading5?.text,
                                    story?.heading6?.text,
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3"
                                    >
                                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#e87928]/10 text-[#e87928]">
                                            <Check size={13} strokeWidth={2.5} />
                                        </span>
                                        <p className="text-sm font-medium">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission and vision */}
                <section className="relative isolate overflow-hidden bg-[#343536] px-5 py-20 text-white sm:px-8 sm:py-28">

                    {/* Architectural background image */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                getUrl(mission?.image1?.imageId) || "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=85')",
                        }}
                    />

                    {/* Dark overlay for readable text */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -z-10 bg-[#252627]/70"
                    />

                    {/* Subtle orange atmospheric glow */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -left-32 top-1/3 -z-10 size-96 rounded-full bg-[#e87928]/10 blur-3xl"
                    />

                    <div className="mx-auto max-w-7xl">

                        {/* Section heading */}
                        <div className="mb-12 max-w-2xl">
                            <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#f19a53] sm:text-xs">
                                <span className="h-px w-7 bg-[#f19a53]" />
                                {mission?.heading1?.text}
                            </p>

                            <h2 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                                {mission?.heading2?.text}
                                <span className="text-[#f19a53]">
                                    {" "}{mission?.heading3?.text}
                                </span>
                            </h2>
                        </div>

                        {/* Mission and vision cards */}
                        <div className="grid gap-4 md:grid-cols-2">

                            {/* Mission */}
                            <div className="relative overflow-hidden border border-white/15 bg-[#343536]/80 p-7 backdrop-blur-sm sm:p-11 lg:p-14">
                                <div
                                    aria-hidden="true"
                                    className="absolute right-0 top-0 h-1 w-24 bg-[#f19a53]"
                                />

                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f19a53]">
                                    {mission?.heading4?.text}
                                </span>

                                <h3 className="mt-7 max-w-md font-serif text-3xl leading-snug sm:text-4xl">
                                    {mission?.paragraph1?.text}
                                </h3>

                                <p className="mt-6 max-w-md text-sm leading-7 text-white/70">
                                    {mission?.paragraph2?.text}
                                </p>

                                <span
                                    aria-hidden="true"
                                    className="mt-10 block h-px w-full bg-white/15"
                                />
                            </div>

                            {/* Vision */}
                            <div className="relative isolate overflow-hidden border border-white/10 bg-[#e87928] p-7 sm:p-11 lg:p-14">

                                {/* Decorative circles */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -right-16 -top-16 -z-10 size-64 rounded-full border border-white/20"
                                />
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -right-7 -top-7 -z-10 size-44 rounded-full border border-white/20"
                                />

                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                                    {mission?.heading5?.text}
                                </span>

                                <h3 className="mt-7 max-w-md font-serif text-3xl leading-snug sm:text-4xl">
                                    {mission?.paragraph3?.text}
                                </h3>

                                <p className="mt-6 max-w-md text-sm leading-7 text-white/90">
                                    {mission?.paragraph4?.text}
                                </p>

                                <span
                                    aria-hidden="true"
                                    className="mt-10 block h-px w-full bg-white/30"
                                />
                            </div>

                        </div>
                    </div>
                </section>

                {/* Core values */}
                <section className="px-5 py-20 sm:px-8 sm:py-28">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                            <div>
                                <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e87928] sm:text-xs">
                                    <span className="h-px w-7 bg-[#e87928]" />
                                    {valuesData?.heading1?.text}
                                </p>

                                <h2 className="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                                    {valuesData?.heading2?.text}
                                    <span className="text-[#e87928]">
                                        {' '} {valuesData?.heading3?.text}
                                    </span>
                                </h2>
                            </div>

                            <p className="max-w-sm text-sm leading-7 text-[#343536]/60">
                                {valuesData?.paragraph1?.text}
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            {values.map((value) => {
                                const Icon = value.icon;

                                return (
                                    <article
                                        key={value.number}
                                        className="group relative overflow-hidden border border-[#343536]/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#e87928]/40 hover:shadow-lg sm:p-9"
                                    >
                                        <div className="flex items-start justify-between">
                                            <span className="font-serif text-4xl text-[#e87928]/35">
                                                {value.number}
                                            </span>

                                            <span className="flex size-12 items-center justify-center bg-[#f7f6f2] text-[#e87928] transition-colors duration-300 group-hover:bg-[#e87928] group-hover:text-white">
                                                <Icon size={22} strokeWidth={1.5} />
                                            </span>
                                        </div>

                                        <h3 className="mt-10 font-serif text-2xl">
                                            {value.title}
                                        </h3>

                                        <p className="mt-4 text-sm leading-7 text-[#343536]/60">
                                            {value.description}
                                        </p>

                                        <div className="mt-8 h-px w-10 bg-[#e87928] transition-all duration-300 group-hover:w-full" />
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Our approach */}
                <section className="bg-[#eeeae1] px-5 py-20 sm:px-8 sm:py-28">
                    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                        <div>
                            <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e87928] sm:text-xs">
                                <span className="h-px w-7 bg-[#e87928]" />
                                How we work
                            </p>

                            <h2 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                                {process?.heading1?.text}
                                <span className="text-[#e87928]">
                                    {' '}{process?.heading2?.text}
                                </span>
                            </h2>

                            <p className="mt-6 max-w-md text-sm leading-7 text-[#343536]/65">
                                {process?.paragraph1?.text}
                            </p>

                            <Link
                                to="/contact"
                                className="mt-8 inline-flex items-center gap-3 border-b border-[#e87928] pb-2 text-xs font-bold uppercase tracking-[0.15em] transition-colors hover:text-[#e87928]"
                            >
                                Let's discuss your project
                                <ArrowUpRight size={16} />
                            </Link>
                        </div>

                        <div className="border-t border-[#343536]/15">
                            {steps.map((step) => (
                                <article
                                    key={step.number}
                                    className="grid gap-4 border-b border-[#343536]/15 py-7 sm:grid-cols-[65px_1fr] sm:gap-6 sm:py-9"
                                >
                                    <span className="font-serif text-2xl text-[#e87928]">
                                        {step.number}
                                    </span>

                                    <div>
                                        <h3 className="font-serif text-2xl sm:text-3xl">
                                            {step.title}
                                        </h3>

                                        <p className="mt-3 max-w-xl text-sm leading-7 text-[#343536]/65">
                                            {step.description}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <Cta
                    eyebrow={cta?.heading1?.text}
                    title={cta?.heading2?.text}
                    description={cta?.paragraph1?.text}
                    buttonText="Start your project"
                    buttonLink='/contact'
                />

                <Footer />
            </main>
        </>
    );
}