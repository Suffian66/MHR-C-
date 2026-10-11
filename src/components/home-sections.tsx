import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Mail, MapPin, MoveUpRight, Phone, Quote, Star } from 'lucide-react';
import { ServiceSlider } from './service-slider';
import { projects } from './data';
import { useEffect, useState } from 'react';

export function ServicesSection() {
    return (
        <section
            id="services"
            className="bg-[#343536] px-6 py-24 text-white sm:py-32"
        >
            <div className="mx-auto max-w-7xl">
                <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#f19a53]">
                            What we do
                        </p>
                        <h2 className="font-serif text-4xl sm:text-6xl">
                            Expertise with{' '}
                            <em className="font-normal text-[#f19a53]">intention.</em>
                        </h2>
                    </div>

                    <p className="max-w-xs text-sm leading-6 text-white/60">
                        From the first conversation to the final walkthrough, every detail
                        is considered.
                    </p>
                </div>

                <ServiceSlider />
            </div>
        </section>
    );
}



export function FeaturedProjects() {

    const [activeIndex, setActiveIndex] = useState(0)
    const [isFading, setIsFading] = useState(false)

    const project = projects[activeIndex]

    useEffect(() => {
        if (projects.length < 2) return

        let fadeOutTimer: number
        let interval: number

        const startTransition = () => {
            setIsFading(true)

            fadeOutTimer = window.setTimeout(() => {
                setActiveIndex((current) => (current + 1) % projects.length)

                window.requestAnimationFrame(() => {
                    window.requestAnimationFrame(() => {
                        setIsFading(false)
                    })
                })
            }, 700)
        }

        interval = window.setInterval(startTransition, 7000)

        return () => {
            window.clearInterval(interval)
            window.clearTimeout(fadeOutTimer)
        }
    }, [])

    const changeProject = (index: number) => {
        if (index === activeIndex || isFading) return

        setIsFading(true)

        window.setTimeout(() => {
            setActiveIndex(index)

            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    setIsFading(false)
                })
            })
        }, 700)
    }



    return (
        <section
            id="projects"
            className="relative overflow-hidden bg-[#e87928] px-5 py-20 text-[#343536] sm:px-8 sm:py-28"
        >
            {/* Background image */}
            {/* <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85')",
                }}
            />

            {/* Orange overlay to soften the image */}
            {/* <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-[#e87928]/97" */}
            {/* />  */}

            {/* Decorative background details */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 top-10 size-96 rounded-full border border-white/20"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 top-26 size-64 rounded-full border border-white/15"
            />

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
                    className={`grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-14 transition-all duration-700 ease-in-out ${isFading
                        ? 'translate-y-1 opacity-0'
                        : 'translate-y-0 opacity-100'
                        }`}
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

                    {/* Artistic 7-image gallery */}
                    <div className="grid grid-cols-6 grid-rows-[115px_100px_100px] gap-2 sm:grid-rows-[190px_145px_145px] sm:gap-3 lg:grid-rows-[180px_145px_145px]">
                        {project.images.slice(0, 7).map((image, index) => {
                            const positions = [
                                'col-span-4 row-span-2',
                                'col-span-2 row-span-1',
                                'col-span-2 row-span-1',
                                'col-span-2 row-span-1',
                                'col-span-2 row-span-1',
                                'col-span-1 row-span-1',
                                'col-span-1 row-span-1',
                            ]

                            return (
                                <div
                                    key={`${project.title}-${index}`}
                                    className={`group relative min-h-0 overflow-hidden bg-[#343536]/10 ${positions[index]}`}
                                >
                                    <img
                                        src={image}
                                        alt={`${project.title} — gallery image ${index + 1}`}
                                        loading={index === 0 ? 'eager' : 'lazy'}
                                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />

                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-60 transition-opacity group-hover:opacity-100" />

                                    {index === 0 && (
                                        <span className="absolute bottom-3 left-3 bg-[#eeeae1] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.18em] sm:bottom-5 sm:left-5 sm:text-[10px]">
                                            Featured project
                                        </span>
                                    )}
                                </div>
                            )
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
            </div>
        </section>
    )
}


export function AboutPreview() {
    return (
        <section className="overflow-hidden bg-[#eeeae1] px-6 py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-20">

                {/* Left: Content */}
                <div className="relative z-10">
                    <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#e87928]">
                        <span className="h-px w-10 bg-[#e87928]" />
                        A little about us
                    </p>

                    <h2 className="max-w-xl font-serif text-4xl leading-[1.12] text-[#343536] sm:text-6xl">
                        Renovating with{' '}
                        <em className="font-normal text-[#e87928]">heart.</em>
                        <br />
                        Building with purpose.
                    </h2>

                    <p className="mt-7 max-w-xl text-base leading-8 text-[#343536]/70 sm:text-lg">
                        MHR began with a simple belief: renovation should feel exciting,
                        not overwhelming. Today, our team combines practical experience,
                        thoughtful design, and genuine care to create homes made for living.
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
                            <p className="font-serif text-3xl text-[#343536]">15+</p>
                            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#343536]/60">
                                Years of craft
                            </p>
                        </div>

                        <div className="h-10 w-px bg-[#343536]/20" />

                        <div>
                            <p className="font-serif text-3xl text-[#343536]">Every</p>
                            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#343536]/60">
                                Detail matters
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
                                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
                                alt="Beautifully designed modern living room"
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </div>

                        {/* Overlapping kitchen image */}
                        <div className="absolute bottom-[5%] left-0 z-10 h-[38%] w-[52%] rotate-[-4deg] overflow-hidden border-[6px] border-[#eeeae1] shadow-xl transition-transform duration-500 hover:rotate-0">
                            <img
                                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85"
                                alt="Contemporary kitchen renovation"
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </div>

                        {/* Smaller detail image */}
                        <div className="absolute bottom-[13%] right-0 z-20 h-[30%] w-[43%] rotate-[4deg] overflow-hidden border-[6px] border-[#eeeae1] shadow-xl transition-transform duration-500 hover:rotate-0">
                            <img
                                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85"
                                alt="Refined interior finishes and furnishings"
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </div>

                        {/* Orange caption card */}
                        <div className="absolute right-[3%] top-[1%] z-30 flex h-[94px] w-[94px] flex-col items-center justify-center rounded-full bg-[#e87928] text-center text-white shadow-lg sm:right-[2%] sm:h-[112px] sm:w-[112px]">
                            <MoveUpRight size={20} strokeWidth={1.5} />
                            <span className="mt-1 text-[9px] font-bold uppercase leading-4 tracking-[0.15em]">
                                Made with
                                <br />
                                intention
                            </span>
                        </div>

                        {/* Small decorative accent */}
                        <div className="absolute bottom-[2%] right-[4%] h-3 w-3 rounded-full bg-[#e87928]" />
                    </div>

                    <p className="mt-1 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-[#343536]/50">
                        Thoughtful spaces. Lasting impressions.
                    </p>
                </div>

            </div>
        </section>
    )
}

export default AboutPreview

const testimonials = [
    'The whole process felt calm and considered. We love how our home works now.',
    'MHR brought ideas we had not thought of and delivered every detail beautifully.',
    'Clear communication, excellent workmanship, and a team we would recommend to anyone.',
];

const names = ['Sarah & James', 'Mia Thompson', 'The Wilson family'];



export function Testimonials() {
    return (
        <section className="relative overflow-hidden bg-[#f7f6f2] px-6 py-24 text-[#343536] sm:py-32">
            {/* Decorative background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 top-0 size-96 rounded-full border border-[#e87928]/10"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 top-20 size-56 rounded-full border border-[#343536]/[0.06]"
            />

            <div className="relative mx-auto max-w-7xl">
                {/* Heading */}
                <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#e87928]">
                            <span className="h-px w-10 bg-[#e87928]" />
                            Words that matter
                        </p>

                        <h2 className="max-w-3xl font-serif text-4xl leading-[1.1] sm:text-6xl">
                            Good work speaks.
                            <br />
                            <em className="font-normal text-[#e87928]">
                                Our clients do too.
                            </em>
                        </h2>
                    </div>

                    <div className="max-w-sm lg:pb-2">
                        <p className="text-sm leading-7 text-[#343536]/65 sm:text-base">
                            A renovation is personal. It is about trust, communication,
                            and creating a space that feels right. Here is what our
                            clients have to say about their experience.
                        </p>
                    </div>
                </div>

                {/* Testimonials layout */}
                <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
                    {/* Featured testimonial */}
                    {testimonials.length > 0 && (
                        <article className="group relative flex min-h-[390px] flex-col justify-between overflow-hidden bg-[#343536] p-8 text-white sm:min-h-[440px] sm:p-12">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -right-8 -top-12 font-serif text-[280px] leading-none text-white/[0.035]"
                            >
                                ”
                            </div>

                            <div className="relative">
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-1 text-[#f19a53]">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                size={15}
                                                fill="currentColor"
                                                strokeWidth={1.5}
                                            />
                                        ))}
                                    </div>

                                    <Quote
                                        size={34}
                                        strokeWidth={1.2}
                                        className="text-[#f19a53]"
                                    />
                                </div>

                                <p className="mt-10 max-w-2xl font-serif text-2xl leading-snug sm:text-3xl lg:text-4xl">
                                    “{testimonials[0]}”
                                </p>
                            </div>

                            <div className="relative mt-12 flex items-end justify-between gap-4 border-t border-white/15 pt-6">
                                <div>
                                    <p className="font-medium text-white">
                                        {names[0]}
                                    </p>
                                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                                        MHR Client
                                    </p>
                                </div>

                                <div className="flex size-11 items-center justify-center rounded-full border border-white/20 text-[#f19a53] transition-all duration-300 group-hover:border-[#f19a53] group-hover:bg-[#f19a53] group-hover:text-[#343536]">
                                    <ArrowUpRight size={19} />
                                </div>
                            </div>
                        </article>
                    )}

                    {/* Remaining testimonials */}
                    <div className="flex flex-col gap-5">
                        {testimonials.slice(1, 3).map((quote, index) => {
                            const actualIndex = index + 1

                            return (
                                <article
                                    key={`${names[actualIndex]}-${actualIndex}`}
                                    className="group flex flex-1 flex-col justify-between border border-[#343536]/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#e87928]/40 hover:shadow-[0_18px_45px_rgba(52,53,54,0.06)] sm:p-9"
                                >
                                    <div>
                                        <div className="mb-6 flex items-center justify-between">
                                            <div className="flex gap-1 text-[#e87928]">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        size={13}
                                                        fill="currentColor"
                                                        strokeWidth={1.5}
                                                    />
                                                ))}
                                            </div>

                                            <span className="font-serif text-4xl leading-none text-[#e87928]/30">
                                                “
                                            </span>
                                        </div>

                                        <p className="font-serif text-xl leading-relaxed sm:text-2xl">
                                            “{quote}”
                                        </p>
                                    </div>

                                    <div className="mt-8 flex items-center gap-4 border-t border-[#343536]/10 pt-5">
                                        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#e87928]/10 font-serif text-lg text-[#e87928]">
                                            {names[actualIndex]?.charAt(0) ?? 'C'}
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold">
                                                {names[actualIndex]}
                                            </p>
                                            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.17em] text-[#343536]/45">
                                                MHR Client
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                </div>

                {/* Closing statement */}
                <div className="mt-10 flex flex-col gap-3 border-t border-[#343536]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-serif text-xl sm:text-2xl">
                        Your home. Your vision. Our commitment.
                    </p>

                    <p className="text-xs font-medium tracking-wide text-[#343536]/55">
                        Every project deserves the same care.
                    </p>
                </div>
            </div>
        </section>
    )
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
                        "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85')",
                }}
            />

            {/* Orange overlay to soften the image */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-[#e87928]/90"
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
                    <a
                        href="tel:+6495550123"
                        className="flex items-center gap-4 border-b border-white/30 pb-5"
                    >
                        <Phone /> +64 9 555 0123
                    </a>

                    <a
                        href="mailto:hello@mhrrenovations.co.nz"
                        className="flex items-center gap-4 border-b border-white/30 pb-5"
                    >
                        <Mail /> hello@mhrrenovations.co.nz
                    </a>

                    <p className="flex items-center gap-4">
                        <MapPin /> Auckland, New Zealand
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