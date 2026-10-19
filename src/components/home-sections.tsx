import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Mail, MapPin, MoveUpRight, Phone, Quote, Star } from 'lucide-react';
import { ServiceSlider } from './service-slider';
import { projects } from '../data/data';
import { useEffect, useState } from 'react';
import { useContent } from '../adminPanel/features/contentContext';
export function ServicesSection() {
    const slug = "home";
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

    const services = sectionsBySlug[slug]?.["Services"]?.blocks;

    return (
        <section
            id="services"
            className="bg-[#343536] px-6 py-24 text-white sm:py-32"
        >
            <div className="mx-auto max-w-7xl">
                <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#f19a53]">
                            {services?.heading1?.text}
                        </p>
                        <h2 className="font-serif text-4xl sm:text-6xl">
                            {services?.heading2?.text}{' '}
                            <em className="font-normal text-[#f19a53]">{services?.heading9?.text}</em>
                        </h2>
                    </div>

                    <p className="max-w-xs text-sm leading-6 text-white/60">
                        {services?.paragraph1?.text}
                    </p>
                </div>
                <ServiceSlider />
            </div>
        </section>
    );
}



export function FeaturedProjects() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [previousIndex, setPreviousIndex] = useState<number | null>(null)

    useEffect(() => {
        if (projects.length < 2) return

        const interval = window.setInterval(() => {
            setActiveIndex((current) => {
                setPreviousIndex(current)
                return (current + 1) % projects.length
            })
        }, 7000)

        return () => window.clearInterval(interval)
    }, [])

    useEffect(() => {
        if (previousIndex === null) return

        const timeout = window.setTimeout(() => {
            setPreviousIndex(null)
        }, 1600)

        return () => window.clearTimeout(timeout)
    }, [activeIndex, previousIndex])

    const changeProject = (index: number) => {
        if (index === activeIndex) return

        setPreviousIndex(activeIndex)
        setActiveIndex(index)
    }

    const project = projects[activeIndex]

    return (

        <section
            id="projects"
            className="relative isolate overflow-hidden bg-[#e87928] px-5 py-20 text-[#343536] sm:px-8 sm:py-28"
        >
            {/* Layered editorial background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                {/* Soft amber glow */}
                <div className="absolute -right-32 -top-40 h-[560px] w-[560px] rounded-full bg-[#ffbd79]/30 blur-[100px]" />

                {/* Warm lower glow */}
                <div className="absolute -bottom-48 -left-32 h-[500px] w-[500px] rounded-full bg-[#c9571d]/30 blur-[100px]" />

                {/* Oversized editorial circle */}
                <div className="absolute -right-24 top-20 h-[440px] w-[440px] rounded-full border border-white/50 sm:h-[600px] sm:w-[600px]" />

                <div className="absolute -right-10 top-36 h-[340px] w-[340px] rounded-full border border-white/50 sm:h-[480px] sm:w-[480px]" />

                {/* Fine diagonal texture */}
                <div
                    className="absolute inset-0 opacity-[0.25]"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(135deg, transparent 0px, transparent 42px, rgba(255,255,255,0.5) 43px, transparent 44px)",
                    }}
                />

                {/* Subtle bottom edge */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-white/90" />
            </div>


            {/* Decorative background details */}

            <div className="relative mx-auto max-w-7xl">
                {/* Section heading */}
                <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em]">
                            <span className="h-px w-10 bg-[#343536]/60" />
                            A selection of our work
                        </p>

                        <h2 className="max-w-4xl font-serif text-4xl leading-[1.08] sm:text-6xl lg:text-6xl">
                            Spaces made
                            {/* <br /> */}
                            <span className="font-normal text-white lg:text-7xl ps-2">to tell a story.</span>
                        </h2>
                    </div>

                    <Link
                        to="/portfolio"
                        className="group inline-flex w-fit items-center gap-3 border-b border-[#343536]/40 pb-2 text-xs font-bold uppercase tracking-widest transition-colors hover:border-white hover:text-white"
                    >
                        View all projects
                        <MoveUpRight
                            size={17}
                            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    </Link>
                </div>

                <div
                    className={`grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-14 transition-all duration-700 ease-in-out`}
                >

                    {/* Project information */}
                    <div className="flex flex-col">
                        <div className="mb-8 flex items-center gap-4">
                            <span className="font-serif text-5xl text-white/80 sm:text-6xl">
                                {String(activeIndex + 1).padStart(2, '0')}
                            </span>
                            <span className="h-px w-12 bg-[#343536]/50" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em]">
                                {project.category}
                            </span>
                        </div>

                        <h3 className="max-w-xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                            {project.title}
                        </h3>

                        <p className="mt-6 max-w-md text-sm leading-7 text-[#343536]/85 sm:text-base sm:leading-8">
                            {project.description}
                        </p>

                        <div className="mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em]">
                            <ArrowDownRight size={19} />
                            Thoughtful design. Considered details.
                        </div>

                        {/* Project selectors */}
                        <div className="mt-10 border-t border-[#343536]/25 pt-5">
                            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#343536]/65">
                                Explore our projects
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {projects.map((item, index) => (
                                    <button
                                        key={item.title}
                                        type="button"
                                        onClick={() => changeProject(index)}
                                        aria-pressed={activeIndex === index}
                                        className={`border px-4 py-3 text-xs transition-all duration-300 ${activeIndex === index
                                            ? 'border-[#343536] bg-[#343536] text-white'
                                            : 'border-[#343536]/25 bg-transparent hover:border-[#343536] hover:bg-white/20'
                                            }`}
                                    >
                                        {String(index + 1).padStart(2, '0')} / {item.title}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-7 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        changeProject(
                                            (activeIndex - 1 + projects.length) % projects.length,
                                        )
                                    }
                                    aria-label="Previous project"
                                    className="flex size-11 items-center justify-center rounded-full border border-[#343536]/40 transition-colors hover:bg-[#343536] hover:text-white"
                                >
                                    <ArrowLeft size={18} />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        changeProject((activeIndex + 1) % projects.length)
                                    }
                                    aria-label="Next project"
                                    className="flex size-11 items-center justify-center rounded-full border border-[#343536]/40 transition-colors hover:bg-[#343536] hover:text-white"
                                >
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>



                    {/* Editorial Gallery — Larger Images with Tilted Frames */}
                    <div className="relative h-[540px] sm:h-[690px] lg:h-[660px] xl:h-[720px]">
                        {[previousIndex, activeIndex]
                            .filter((index) => index !== null)
                            .filter((index, position, indexes) => indexes.indexOf(index) === position)
                            .map((index) => {
                                const item = projects[index];
                                const isActive = index === activeIndex;

                                const positions = [
                                    // Top left
                                    "left-[0%] top-[5%] h-[35%] w-[45%] sm:left-[1%] sm:top-[4%] sm:h-[36%] sm:w-[43%]",

                                    // Top right
                                    "right-[0%] top-[3%] h-[34%] w-[43%] sm:right-[1%] sm:top-[3%] sm:h-[35%] sm:w-[42%]",

                                    // Large center image
                                    "left-[19%] top-[22%] z-30 h-[53%] w-[62%] sm:left-[20%] sm:top-[21%] sm:h-[56%] sm:w-[60%]",

                                    // Bottom left
                                    "bottom-[3%] left-[1%] h-[34%] w-[44%] sm:bottom-[3%] sm:left-[1%] sm:h-[35%] sm:w-[43%]",

                                    // Bottom right
                                    "bottom-[3%] right-[0%] h-[33%] w-[43%] sm:bottom-[3%] sm:right-[1%] sm:h-[34%] sm:w-[42%]",
                                ];

                                const tilts = [
                                    "-rotate-3 hover:rotate-0",
                                    "rotate-3 hover:rotate-0",
                                    "rotate-0",
                                    "rotate-2 hover:rotate-0",
                                    "-rotate-2 hover:rotate-0",
                                ];

                                return (
                                    <div
                                        key={item.title}
                                        aria-hidden={!isActive}
                                        className={`absolute inset-0 ${isActive
                                            ? `z-10 ${previousIndex !== null
                                                ? "project-gallery-enter"
                                                : ""
                                            }`
                                            : "pointer-events-none z-0 project-gallery-exit"
                                            }`}
                                    >
                                        {item.images.slice(0, 5).map((image, imageIndex) => (
                                            <figure
                                                key={`${item.title}-${imageIndex}`}
                                                className={`
                                absolute
                                ${positions[imageIndex]}
                                ${tilts[imageIndex]}
                                overflow-hidden
                                border-[7px] border-white
                                bg-white
                                p-1
                                shadow-[0_16px_34px_rgba(52,53,54,0.28)]
                                transition-all duration-500 ease-out
                                sm:border-[10px] sm:p-1.5
                                sm:shadow-[0_22px_44px_rgba(52,53,54,0.30)]
                                ${imageIndex === 2
                                                        ? "z-30"
                                                        : "z-10"
                                                    }
                                ${isActive
                                                        ? "cursor-pointer hover:z-50 hover:scale-[1.07] hover:-translate-y-1 hover:shadow-[0_30px_65px_rgba(52,53,54,0.42)]"
                                                        : ""
                                                    }
                            `}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${item.title} — project image ${imageIndex + 1}`}
                                                    loading="eager"
                                                    className="h-full w-full object-cover"
                                                />

                                                <div className="pointer-events-none absolute inset-1 ring-1 ring-inset ring-white/30 sm:inset-1.5" />
                                            </figure>
                                        ))}
                                    </div>
                                );
                            })}
                    </div>





                </div>

                {/* Bottom statement */}
                <div className="mt-12 flex flex-col gap-4 border-t border-[#343536]/25 pt-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-xl font-serif text-xl sm:text-2xl">
                        Every detail matters. Every space has potential.
                    </p>

                    <Link
                        to="/contact"
                        className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] transition-colors hover:text-white"
                    >
                        Start your renovation
                        <MoveUpRight
                            size={17}
                            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    </Link>
                </div>
            </div >
        </section >
    )
}


export function AboutPreview() {
    const slug = "home";
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

    const about = sectionsBySlug[slug]?.["About Us"]?.blocks;

    const getUrl = (imageId?: string) =>
        media.find((m) => m.id === imageId)?.mediaUrl || null;

    return (
        <section className="overflow-hidden bg-[#eeeae1] px-6 py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-20">

                {/* Left: Content */}
                <div className="relative z-10">
                    <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#e87928]">
                        <span className="h-px w-10 bg-[#e87928]" />
                        {about?.heading1?.text}
                    </p>

                    <h2 className="max-w-xl font-serif text-4xl leading-[1.12] text-[#343536] sm:text-6xl">
                        {about?.heading2?.text}{' '}
                        <em className="font-normal text-[#e87928]">{about?.heading3?.text}</em>
                        <br />
                        {about?.heading4?.text}
                    </h2>

                    <p className="mt-7 max-w-xl text-base leading-8 text-[#343536]/70 sm:text-lg">
                        {about?.paragraph1?.text}
                    </p>

                    <Link
                        to="/about"
                        className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#343536] px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#e87928]"
                    >
                        Discover our story
                        <ArrowRight
                            size={17}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>

                    <div className="mt-12 flex items-center gap-5 border-t border-[#343536]/15 pt-6">
                        <div>
                            <p className="font-serif text-3xl text-[#343536]">{about?.heading5?.text}</p>
                            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#343536]/60">
                                {about?.heading6?.text}
                            </p>
                        </div>

                        <div className="h-10 w-px bg-[#343536]/20" />

                        <div>
                            <p className="font-serif text-3xl text-[#343536]">{about?.heading7?.text}</p>
                            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#343536]/60">
                                {about?.heading8?.text}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: Layered image collage */}
                <div className="relative mx-auto w-full max-w-[560px]">
                    {/* Decorative background shape */}
                    <div className="absolute -right-5 -top-5 h-40 w-40 rounded-full border border-[#e87928]/40 sm:-right-8 sm:-top-8" />

                    <div className="relative h-[440px] sm:h-[540px]">

                        {/* Main image */}
                        <div className="absolute left-[8%] top-[5%] h-[65%] w-[78%] overflow-hidden rounded-sm shadow-xl transition-transform duration-500 hover:scale-[1.02]">
                            <img
                                src={getUrl(about?.image1?.imageId) || '/images/project-aa/hall.jpg'}
                                alt="Beautifully designed modern living room"
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </div>

                        {/* Overlapping kitchen image */}
                        <div className="absolute bottom-[5%] left-0 z-10 h-[38%] w-[52%] rotate-[-4deg] overflow-hidden border-[6px] border-[#eeeae1] shadow-xl transition-transform duration-500 hover:rotate-0">
                            <img
                                src={getUrl(about?.image2.imageId) || "/images/bathroom-1/3.jpg"}
                                alt="Contemporary kitchen renovation"
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </div>

                        {/* Smaller detail image */}
                        <div className="absolute bottom-[13%] right-0 z-20 h-[30%] w-[43%] rotate-[4deg] overflow-hidden border-[6px] border-[#eeeae1] shadow-xl transition-transform duration-500 hover:rotate-0">
                            <img
                                src={getUrl(about?.image3.imageId) || "/images/bathroom-1/2.jpg"}
                                alt="Refined interior finishes and furnishings"
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </div>

                        {/* Orange caption card */}
                        <div className="absolute right-[3%] top-[1%] z-30 flex h-[94px] w-[94px] flex-col items-center justify-center rounded-full bg-[#e87928] text-center text-white shadow-lg sm:right-[2%] sm:h-[112px] sm:w-[112px]">
                            <MoveUpRight size={20} strokeWidth={1.5} />
                            <span className="mt-1 text-[9px] font-bold uppercase leading-4 tracking-[0.15em]">
                                {about?.heading9?.text}
                            </span>
                        </div>

                        {/* Small decorative accent */}
                        <div className="absolute bottom-[2%] right-[4%] h-3 w-3 rounded-full bg-[#e87928]" />
                    </div>

                    <p className="mt-1 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-[#343536]/50">
                        {about?.heading10?.text}
                    </p>
                </div>

            </div>
        </section>
    )
}

export default AboutPreview


export function Testimonials() {
    const testimonials = [
        'The whole process felt calm and considered. We love how our home works now.',
        'MHR brought ideas we had not thought of and delivered every detail beautifully.',
        'Clear communication, excellent workmanship, and a team we would recommend to anyone.',
    ];

    const names = ['Sarah & James', 'Mia Thompson', 'The Wilson family'];

    return (
        <section className="bg-[#eeeae1] px-5 py-16 text-[#343536] sm:px-8 sm:py-20">
            <div className="mx-auto max-w-7xl">
                <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#e87928]">
                            <span className="h-px w-6 bg-[#e87928]" />
                            Client experiences
                        </p>

                        <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
                            Trusted by homeowners.
                            <span className="text-[#e87928]"> Proven by our work.</span>
                        </h2>
                    </div>

                    <p className="max-w-sm text-sm leading-6 text-[#343536]/60">
                        Great renovations start with trust. Here's what our
                        clients say about working with MHR.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {testimonials.map((quote, index) => (
                        <article
                            key={names[index]}
                            className={`group relative flex min-h-[245px] flex-col justify-between overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7 ${index === 0
                                ? 'border-[#343536] bg-[#343536] text-white'
                                : 'border-[#343536]/10 bg-white text-[#343536] hover:border-[#e87928]/40'
                                }`}
                        >
                            <div
                                className={`absolute left-0 top-0 h-1 w-12 transition-all duration-300 group-hover:w-20 ${index === 0
                                    ? 'bg-[#f19a53]'
                                    : 'bg-[#e87928]'
                                    }`}
                            />

                            <div>
                                <div className="mb-5 flex items-center justify-between">
                                    <div className="flex gap-1 text-[#e87928]">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                size={14}
                                                fill="currentColor"
                                                strokeWidth={1.5}
                                            />
                                        ))}
                                    </div>

                                    <Quote
                                        size={23}
                                        strokeWidth={1.5}
                                        className={
                                            index === 0
                                                ? 'text-[#f19a53]'
                                                : 'text-[#e87928]/50'
                                        }
                                    />
                                </div>

                                <p className="text-[15px] leading-7">
                                    “{quote}”
                                </p>
                            </div>

                            <div
                                className={`mt-7 flex items-center justify-between border-t pt-4 ${index === 0
                                    ? 'border-white/15'
                                    : 'border-[#343536]/10'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`flex size-9 items-center justify-center rounded-full text-sm font-semibold ${index === 0
                                            ? 'bg-[#e87928] text-white'
                                            : 'bg-[#e87928]/10 text-[#e87928]'
                                            }`}
                                    >
                                        {names[index].charAt(0)}
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold">
                                            {names[index]}
                                        </p>

                                        {/* <p
                                            className={`mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em] ${index === 0
                                                ? 'text-white/45'
                                                : 'text-[#343536]/45'
                                                }`}
                                        >
                                            MHR Client
                                        </p> */}
                                    </div>
                                </div>

                                <ArrowUpRight
                                    size={17}
                                    className={`transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${index === 0
                                        ? 'text-[#f19a53]'
                                        : 'text-[#343536]/35 group-hover:text-[#e87928]'
                                        }`}
                                />
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-6 flex flex-col gap-2 border-t border-[#343536]/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-medium">
                        Your vision. Our craftsmanship.
                    </p>

                    <p className="text-xs text-[#343536]/50">
                        Every detail matters. Every client matters.
                    </p>
                </div>
            </div>
        </section>
    );
}
export function ContactCta() {
    return (
        <section className="relative isolate overflow-hidden bg-[#e87928] px-6 py-24 text-white sm:py-32">

            {/* Background image */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('/images/comparison/before-bathroom.png')",
                }}
            />

            {/* Orange overlay to soften the image */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-[#e87928]/80"
            />

            <div className="relative z-10 mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_.8fr] lg:items-end">
                <div>
                    <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-white/70">
                        Let&apos;s talk
                    </p>

                    <h2 className="max-w-2xl font-serif text-5xl leading-none sm:text-7xl">
                        Ready to make a change?
                    </h2>

                    <p className="mt-8 max-w-md text-lg leading-8 text-white/80">
                        Tell us a little about your project and we&apos;ll be in touch for
                        a relaxed, no-obligation chat.
                    </p>
                </div>

                <div className="space-y-5 text-sm">
                    <p
                        className="flex items-center gap-4 border-b border-white/30 pb-5"
                    >
                        <Phone /> (289) 855-5559
                    </p>

                    <p
                        className="flex items-center gap-4 border-b border-white/30 pb-5"
                    >
                        <Mail /> magichammerrenovations@gmail.com
                    </p>

                    <p className="flex items-center gap-4">
                        <MapPin /> Oakville, ON
                    </p>

                    <Link
                        to="/contact"
                        className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#343536] px-7 py-4 text-xs font-bold uppercase tracking-widest"
                    >
                        Request a consultation <ArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
}