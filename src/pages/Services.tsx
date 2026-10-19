
import { useParams, Link, Navigate } from 'react-router-dom'
import {
    ArrowRight,
    ArrowDown,
    Check,
    MoveUpRight,
} from 'lucide-react'
import { Footer } from '../components/footer'
import { Header } from '../components/header'
import Topbar from '../components/topbar'
import { useContent } from '../adminPanel/features/contentContext'
import { useEffect, useMemo } from 'react'
import { getServiceDetails, mapSectionContent } from '../data/serviceData'


interface HeroImage {
    src: string;
    caption?: string;
}

type Feature = {
    number: string;
    title: string;
    text: string;
};

type Item = {
    image: string;
    caption: string;
};

interface Step {
    title: string;
    text: string;
    // add other properties if needed
}


export default function ServicePage() {
    const { slug } = useParams<{ slug: string }>()
    const sharedSlug = 'services';
    const {
        sectionsBySlug,
        loadSectionsBySlug,
        loading,
        media,
    } = useContent();

    const firebaseSlugByRouteSlug: Record<string, string> = {
        'kitchen-renovation': 'kitchen-renovation',
        'bathroom-renovation': 'bathroom-renovation',
        'basement-renovation': 'basement-renovation',
        'window-covering': 'window-covering',
        'drywall': 'drywall',
        'home-staging': 'home-staging',
    };

    const firebaseSlug = slug
        ? firebaseSlugByRouteSlug[slug]
        : undefined;

    useEffect(() => {
        if (firebaseSlug) {
            loadSectionsBySlug(firebaseSlug);
        }
        loadSectionsBySlug(sharedSlug);
    }, [firebaseSlug, loadSectionsBySlug]);

    // const service = services.find((item) => item.slug === slug);
    const serviceTitles: Record<string, string> = {
        'kitchen-renovation': 'Kitchen Renovations',
        'bathroom-renovation': 'Bathroom Renovations',
        'basement-renovation': 'Basement Renovations',
        'window-covering': 'Window Coverings',
        drywall: 'Drywall',
        'home-staging': 'Home Staging',
    };

    const serviceTitle = slug ? serviceTitles[slug] : undefined;
    const getUrl = (imageId?: string) =>
        media.find((item) => item.id === imageId)?.mediaUrl || null;
    // Read the individual service's Firebase sections.
    const rawSections = firebaseSlug
        ? sectionsBySlug[firebaseSlug]
        : undefined;
    // Adapt this line to the structure shown in your console.
    const sections = useMemo(() => {
        if (!rawSections) return {};

        const sectionArray = Array.isArray(rawSections)
            ? rawSections
            : Object.entries(rawSections).map(([key, value]: [string, any]) => ({
                ...value,
                title: value.title || key,
                content: value.content || value.blocks || [],
            }));

        return mapSectionContent(sectionArray);
    }, [rawSections]);

    const firebaseDetails = firebaseSlug
        ? getServiceDetails(firebaseSlug, sections, getUrl)
        : null;

    const details = firebaseDetails;

    if (firebaseSlug && loading && !rawSections) {
        return <div>Loading service...</div>;
    }

    if (!serviceTitle || !details) {
        return <Navigate to="/404" replace />;
    }

    const image = details.heroImages?.[0]?.image || '/images/kitchen.png';

    const intro = sectionsBySlug['services']?.['Intro']?.blocks;
    const detailing = sectionsBySlug['services']?.['Details ']?.blocks;
    const process = sectionsBySlug['services']?.['Process']?.blocks;
    const gallery = sectionsBySlug['services']?.['Gallery']?.blocks;
    const cta = sectionsBySlug['services']?.['CTA']?.blocks;

    return (
        <main className="min-h-screen overflow-hidden bg-[#f7f6f2] text-[#343536]">
            <Topbar />
            <Header />

            {/* Service Hero — Dark Gradient + Editorial Collage */}

            <section className="relative overflow-hidden bg-[#171717] text-white">
                <div className="grid min-h-[680px] lg:grid-cols-[0.8fr_1.2fr]">

                    {/* LEFT — Text panel */}
                    <div className="relative z-10 flex flex-col justify-center bg-gradient-to-br from-[#111111] via-[#202020] to-[#343536] px-6 py-16 sm:px-10 lg:px-14 xl:px-20">
                        {/* Subtle orange accent */}
                        <div className="absolute left-0 top-24 h-24 w-1 bg-[#e87928]" />

                        <nav className="mb-10 flex flex-wrap items-center gap-2 text-sm text-white/55">
                            <Link to="/" className="transition hover:text-[#f19a53]">
                                Home
                            </Link>
                            <span>/</span>
                            <Link to="/services" className="transition hover:text-[#f19a53]">
                                Services
                            </Link>
                            <span>/</span>
                            <span className="text-[#f19a53]">{serviceTitle}</span>
                        </nav>

                        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#f19a53]">
                            {details.eyebrow}
                        </p>

                        <h1 className="max-w-xl font-serif text-4xl leading-[1.12] tracking-tight sm:text-5xl xl:text-6xl">
                            {details.headline}{" "}
                            <span className="text-[#f19a53]">
                                {details.highlight}
                            </span>
                        </h1>

                        <p className="mt-7 max-w-lg text-base leading-8 text-white/70 sm:text-lg">
                            {details.description}
                        </p>

                        <div className="mt-9">
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-3 bg-[#e87928] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#f19a53]"
                            >
                                Discuss Your Project
                                <span aria-hidden="true">↗</span>
                            </Link>
                        </div>

                        <div className="mt-12 border-t border-white/10 pt-5">
                            <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                                MHR Renovations & Contracting
                            </span>
                        </div>
                    </div>


                    {/* RIGHT — Five-image collage */}
                    <div className="relative h-[380px] bg-[#202020] p-2.5 sm:h-[440px] sm:p-3 lg:h-[680px] lg:p-3.5">
                        <div className="grid h-full grid-cols-6 grid-rows-4 gap-2 sm:gap-2.5">

                            {details.heroImages.slice(0, 5).map((item, index) => {
                                const layouts = [
                                    "col-span-2 row-span-2",
                                    "col-span-2 row-span-2",
                                    "col-span-2 row-span-2",
                                    "col-span-3 row-span-2",
                                    "col-span-3 row-span-2",
                                ];

                                return (
                                    <div
                                        key={`${item.image}-${index}`}
                                        className={`group relative min-h-0 min-w-0 overflow-hidden rounded-sm ${layouts[index]}`}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.caption || `${serviceTitle} project`}
                                            loading={index < 3 ? "eager" : "lazy"}
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </div>
            </section>


            {/* Editorial introduction */}
            <section
                id="service-intro"
                className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 lg:py-36"
            >
                <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
                    <div>
                        <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#e87928]">
                            <span className="h-px w-8 bg-[#e87928]" />
                            {intro?.heading1?.text}
                        </p>

                        <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                            {details.introTitle}
                        </h2>

                        <p className="mt-7 max-w-xl text-base leading-8 text-[#343536]/70">
                            {details.intro}
                        </p>

                        <Link
                            to="/contact"
                            className="mt-8 inline-flex items-center gap-3 border-b border-[#e87928] pb-2 text-xs font-bold uppercase tracking-[0.13em] transition-colors hover:text-[#e87928]"
                        >
                            Let’s discuss your project
                            <ArrowRight size={15} />
                        </Link>
                    </div>

                    <div className="relative">
                        <div className="relative aspect-[4/5] overflow-hidden bg-[#e7e2d9]">
                            <img
                                src={image}
                                alt={`${serviceTitle} design inspiration`}
                                loading="lazy"
                                className="size-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                            />
                        </div>

                        <div className="absolute -bottom-5 -left-3 max-w-[270px] border-l-2 border-[#e87928] bg-[#f7f6f2] py-4 pl-5 pr-4 sm:-left-8 sm:bottom-8">
                            <p className="font-serif text-xl leading-snug sm:text-2xl">
                                {details.statement}
                            </p>
                        </div>

                        <span className="absolute -right-2 -top-4 font-serif text-7xl text-[#e87928]/20 sm:-right-5 sm:text-9xl">
                            “
                        </span>
                    </div>
                </div>
            </section>

            {/* Service-specific features */}
            <section className="bg-[#343536] px-5 py-20 text-white sm:px-8 sm:py-28">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#f19a53]">
                                {detailing?.heading1?.text}
                            </p>
                            <h2 className="mt-5 max-w-md font-serif text-4xl leading-tight sm:text-5xl">
                                {detailing?.heading2?.text}
                            </h2>
                            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
                                {detailing?.paragraph1?.text}
                            </p>
                        </div>

                        <div className="border-t border-white/15">
                            {details.features.map((feature: Feature) => (
                                <article
                                    key={feature.number}
                                    className="group grid gap-4 border-b border-white/15 py-7 sm:grid-cols-[50px_1fr] sm:gap-6 sm:py-9"
                                >
                                    <span className="font-serif text-lg text-[#f19a53]">
                                        {feature.number}
                                    </span>

                                    <div>
                                        <h3 className="flex items-center justify-between gap-4 font-serif text-2xl sm:text-3xl">
                                            {feature.title}
                                            <MoveUpRight
                                                size={20}
                                                className="shrink-0 text-[#f19a53] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                                            />
                                        </h3>
                                        <p className="mt-3 max-w-lg text-sm leading-7 text-white/60">
                                            {feature.text}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Asymmetrical visual gallery */}
            <section className="px-5 py-20 sm:px-8 sm:py-28 lg:py-36">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12 flex flex-col justify-between gap-5 sm:mb-16 sm:flex-row sm:items-end">
                        <div className="max-w-2xl">
                            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#e87928]">
                                {gallery?.heading1?.text}
                            </p>
                            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                                {details.galleryTitle}
                            </h2>
                        </div>
                        <p className="max-w-sm text-sm leading-7 text-[#343536]/60">
                            {details.galleryDescription}
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
                        {details.gallery.map((item, index) => (
                            <figure
                                key={item.image}
                                className={`group ${index === 0
                                    ? 'lg:col-span-7'
                                    : index === 1
                                        ? 'lg:col-span-5 lg:mt-20'
                                        : 'sm:col-span-2 lg:col-span-8 lg:col-start-3 lg:-mt-4'
                                    }`}
                            >
                                <div
                                    className={`relative overflow-hidden bg-[#e7e2d9] ${index === 0
                                        ? 'aspect-[5/4]'
                                        : index === 1
                                            ? 'aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]'
                                            : 'aspect-[16/9]'
                                        }`}
                                >
                                    <img
                                        src={item.image}
                                        alt={`${serviceTitle}: ${item.caption}`}
                                        loading="lazy"
                                        className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                    />

                                    <span className="absolute left-4 top-4 bg-[#f7f6f2] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#343536]">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                <figcaption className="flex items-center justify-between border-b border-[#343536]/15 py-4">
                                    <span className="font-serif text-xl">
                                        {item.caption}
                                    </span>

                                    <ArrowRight
                                        size={17}
                                        className="text-[#e87928] transition-transform group-hover:translate-x-1"
                                    />
                                </figcaption>
                            </figure>
                        ))}
                    </div>

                    {/* <p className="mt-6 text-xs leading-5 text-[#343536]/45">
                        Illustrative design inspiration. Replace these images with
                        MHR project photography when available.
                    </p> */}
                </div>
            </section>

            {/* Three-stage process */}
            <section className="bg-[#eeeae1] px-5 py-20 sm:px-8 sm:py-28">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#e87928]">
                            {process?.heading1?.text}
                        </p>
                        <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
                            {process?.heading2?.text}
                        </h2>
                        <p className="mt-5 text-sm leading-7 text-[#343536]/65">
                            {process?.paragraph1?.text}
                        </p>
                    </div>

                    <div className="relative mt-14 grid gap-8 md:grid-cols-3 md:gap-6 lg:mt-20">
                        <div className="absolute left-[16.66%] right-[16.66%] top-6 hidden h-px bg-[#343536]/15 md:block" />

                        {details.process.map((step: Step, index: number) => (
                            <article key={step.title} className="relative">
                                <div className="relative z-10 flex size-12 items-center justify-center rounded-full border border-[#e87928] bg-[#eeeae1] font-serif text-sm text-[#e87928]">
                                    0{index + 1}
                                </div>

                                <div className="mt-6 border-t border-[#343536]/15 pt-6">
                                    <h3 className="font-serif text-2xl sm:text-3xl">
                                        {step.title}
                                    </h3>
                                    <p className="mt-4 max-w-sm text-sm leading-7 text-[#343536]/65">
                                        {step.text}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Closing CTA */}
            <section className="relative isolate overflow-hidden bg-[#e87928] px-5 py-20 text-white sm:px-8 sm:py-28">
                <div
                    aria-hidden="true"
                    className="absolute -right-24 -top-28 -z-10 size-96 rounded-full border border-white/15 sm:size-[500px]"
                />
                <div
                    aria-hidden="true"
                    className="absolute -right-12 -top-16 -z-10 size-72 rounded-full border border-white/15 sm:size-[400px]"
                />

                <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
                    <div>
                        <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-white/75">
                            <span className="h-px w-8 bg-white/70" />
                            Ready when you are
                        </p>

                        <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                            {details.ctaTitle}
                        </h2>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
                            {cta?.paragraph1?.text}
                        </p>
                    </div>

                    <div>
                        <Link
                            to="/contact"
                            className="group inline-flex min-h-16 items-center gap-5 border border-white/40 bg-[#343536] px-6 py-5 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-lg transition-all duration-300 hover:border-white hover:bg-white hover:text-[#343536] sm:px-8"
                        >
                            Discuss your project
                            <span className="flex size-9 items-center justify-center rounded-full border border-white/30 transition-all duration-300 group-hover:translate-x-1">
                                <ArrowRight size={17} />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
