
import { useParams, Link, Navigate } from 'react-router-dom'
import {
    ArrowRight,
    ArrowDown,
    Check,
    MoveUpRight,
} from 'lucide-react'
import { Footer } from '../components/footer'
import { Header } from '../components/header'
import { services } from '../data/data'
import { serviceDetails } from '../data/serviceData'

export default function ServicePage() {
    const { slug } = useParams()
    const service = services.find((item) => item.slug === slug)
    const details = slug ? serviceDetails[slug] : undefined
    const heroImages = details.heroImages;

    if (!service || !details) {
        return <Navigate to="/404" replace />
    }

    const image = service.image

    return (
        <main className="min-h-screen overflow-hidden bg-[#f7f6f2] text-[#343536]">
            <Header />



            {/* Service Hero — Dark Gradient + Editorial Collage */}
            <section className="relative isolate overflow-hidden bg-[#171717] text-white">
                {/* Left-side black gradient and subtle brand glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-black via-[#171717] via-55% to-[#343536]"
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-[#e87928]/10 blur-[120px]"
                />

                <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:min-h-[680px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-12 lg:py-24">

                    {/* LEFT — Service Content */}
                    <div className="relative z-10 max-w-xl">
                        {/* Breadcrumb */}
                        <nav
                            aria-label="Breadcrumb"
                            className="mb-10 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.14em] text-white/50"
                        >
                            <Link to="/" className="transition-colors hover:text-[#f19a53]">
                                Home
                            </Link>

                            <span>/</span>

                            <Link
                                to="/services"
                                className="transition-colors hover:text-[#f19a53]"
                            >
                                Services
                            </Link>

                            <span>/</span>

                            <span className="text-[#f19a53]">
                                {service.title}
                            </span>
                        </nav>

                        {/* Eyebrow */}
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-10 bg-[#e87928]" />

                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f19a53]">
                                {details.eyebrow}
                            </span>
                        </div>

                        {/* Dynamic Heading */}
                        <h1 className="max-w-xl font-serif text-5xl font-medium leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
                            {details.headline}{" "}
                            <span className="text-[#f19a53]">
                                {details.highlight}
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mt-7 max-w-lg text-base leading-8 text-white/65 sm:text-lg">
                            {details.description}
                        </p>

                        {/* CTA */}
                        <div className="mt-9 flex flex-wrap items-center gap-5">
                            <Link
                                to="/contact"
                                className="group inline-flex items-center gap-4 bg-[#e87928] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#343536]"
                            >
                                Discuss Your Project

                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                    ↗
                                </span>
                            </Link>

                            <span className="text-sm text-white/50">
                                Thoughtful work. Lasting results.
                            </span>
                        </div>

                        {/* Service Number */}
                        <div className="mt-12 flex items-center gap-4 border-t border-white/10 pt-6">
                            <span className="font-serif text-3xl text-[#f19a53]">
                                {service.number}
                            </span>

                            <span className="max-w-[200px] text-xs uppercase leading-5 tracking-[0.15em] text-white/45">
                                Renovation with purpose and attention to detail
                            </span>
                        </div>
                    </div>

                    {/* RIGHT — Staggered Image Collage */}
                    {/* <div className="relative mx-auto w-full max-w-2xl lg:ml-auto">
                        <div
                            aria-hidden="true"
                            className="absolute -right-3 -top-5 h-28 w-28 rounded-full border border-[#e87928]/40 sm:-right-5 sm:-top-7"
                        />

                        <div className="relative grid grid-cols-2 items-center gap-3 sm:gap-5">

                            <div className="mt-8 overflow-hidden rounded-tl-[5rem] rounded-br-2xl rounded-tr-2xl rounded-bl-2xl">
                                <img
                                    src={details.gallery[0].image}
                                    alt={details.gallery[0].caption}
                                    className="h-64 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-80 lg:h-[390px]"
                                />
                            </div>

                            <div className="flex flex-col gap-3 sm:gap-5">

                                <div className="overflow-hidden rounded-2xl rounded-tr-[4rem]">
                                    <img
                                        src={details.gallery[1].image}
                                        alt={details.gallery[1].caption}
                                        className="h-36 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-48"
                                    />
                                </div>

                                <div className="overflow-hidden rounded-2xl rounded-bl-[4rem]">
                                    <img
                                        src={details.gallery[2].image}
                                        alt={details.gallery[2].caption}
                                        className="h-40 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-56"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-5 left-0 max-w-[205px] rounded-xl border border-white/10 bg-[#252525]/95 p-4 shadow-2xl backdrop-blur-md sm:bottom-7 sm:-left-5">
                            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f19a53]">
                                The MHR approach
                            </span>

                            <p className="font-serif text-lg leading-snug text-white">
                                Every detail has a purpose.
                            </p>
                        </div>

                        <div
                            aria-hidden="true"
                            className="absolute -bottom-6 -right-3 -z-10 h-28 w-28 rounded-full bg-[#e87928]/15 blur-3xl"
                        />
                    </div> */}

                    {/* RIGHT — Seven-Image Editorial Collage */}
                    <div className="relative mx-auto w-full max-w-2xl lg:ml-auto">
                        {/* Subtle orange frame */}
                        <div
                            aria-hidden="true"
                            className="absolute -right-3 -top-4 h-24 w-24 rounded-full border border-[#e87928]/30 sm:-right-4 sm:-top-5"
                        />

                        <div className="relative grid grid-cols-3 grid-rows-[115px_100px_115px] gap-2.5 sm:grid-rows-[155px_130px_155px] sm:gap-3.5 lg:grid-rows-[175px_145px_175px]">

                            {heroImages.map((item, index) => {
                                const tileClasses = [
                                    "col-span-1 row-span-2 rounded-tl-[3.5rem]",
                                    "col-span-1 row-span-1 rounded-tr-[2rem]",
                                    "col-span-1 row-span-1 rounded-tr-md",
                                    "col-span-1 row-span-1 rounded-bl-[2rem]",
                                    "col-span-1 row-span-1 rounded-br-[2rem]",
                                    "col-span-2 row-span-1 rounded-bl-[2.5rem]",
                                    "col-span-1 row-span-1 rounded-br-[2.5rem]",
                                ];

                                return (
                                    <div
                                        key={`${item.image}-${index}`}
                                        className={`group relative min-h-0 overflow-hidden bg-[#292929] ${tileClasses[index]}`}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.caption || `${service.title} inspiration`}
                                            loading={index > 2 ? "lazy" : "eager"}
                                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                        />

                                        {/* Gentle image shading */}
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Floating label */}
                        <div className="absolute -bottom-5 left-3 max-w-[205px] rounded-xl border border-white/10 bg-[#252525]/95 p-4 shadow-xl backdrop-blur-md sm:-left-5">
                            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f19a53]">
                                The MHR approach
                            </span>

                            <p className="font-serif text-lg leading-snug text-white">
                                Every detail has a purpose.
                            </p>
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
                            {service.number} / A considered approach
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
                                alt={`${service.title} design inspiration`}
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
                                The details matter
                            </p>
                            <h2 className="mt-5 max-w-md font-serif text-4xl leading-tight sm:text-5xl">
                                Thoughtful choices. A more considered result.
                            </h2>
                            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
                                Every project is different. We focus on the details
                                that make your space more functional, cohesive, and
                                suited to the way you live.
                            </p>
                        </div>

                        <div className="border-t border-white/15">
                            {details.features.map((feature) => (
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
                                Materials / Form / Feeling
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
                                        alt={`${service.title}: ${item.caption}`}
                                        loading="lazy"
                                        className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                    />
                                    <span className="absolute left-4 top-4 bg-[#f7f6f2] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#343536]">
                                        0{index + 1}
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

                    <p className="mt-6 text-xs leading-5 text-[#343536]/45">
                        Illustrative design inspiration. Replace these images with
                        MHR project photography when available.
                    </p>
                </div>
            </section>

            {/* Three-stage process */}
            <section className="bg-[#eeeae1] px-5 py-20 sm:px-8 sm:py-28">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#e87928]">
                            A clearer way forward
                        </p>
                        <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
                            From first conversation to final details.
                        </h2>
                        <p className="mt-5 text-sm leading-7 text-[#343536]/65">
                            Good work starts with understanding what matters to you
                            and planning the details before the work begins.
                        </p>
                    </div>

                    <div className="relative mt-14 grid gap-8 md:grid-cols-3 md:gap-6 lg:mt-20">
                        <div className="absolute left-[16.66%] right-[16.66%] top-6 hidden h-px bg-[#343536]/15 md:block" />

                        {details.process.map((step, index) => (
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
                            Tell us what you have in mind. We’d love to learn
                            about your project and help you explore the next step.
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
