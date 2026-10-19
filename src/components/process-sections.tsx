import { Link } from 'react-router-dom'
import {
    ArrowRight,
    ArrowUpRight,
    ClipboardList,
    Hammer,
    KeyRound,
    Sparkles,
} from 'lucide-react'
import { useContent } from '../adminPanel/features/contentContext';
import { useEffect } from 'react';



export function ProcessSection() {
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

    const process = sectionsBySlug[slug]?.["How we work"]?.blocks;

    const getUrl = (imageId?: string) =>
        media.find((m) => m.id === imageId)?.mediaUrl || null;

    const steps = [
        {
            number: '01',
            title: process?.heading5?.text,
            text: process?.paragraph2?.text,
            icon: ClipboardList,
            label: process?.heading4?.text,
        },
        {
            number: '02',
            title: process?.heading7?.text,
            text: process?.paragraph3?.text,
            icon: Sparkles,
            label: process?.heading6?.text,
        },
        {
            number: '03',
            title: process?.heading9?.text,
            text: process?.paragraph4?.text,
            icon: Hammer,
            label: process?.heading8?.text,
        },
        {
            number: '04',
            title: process?.heading11?.text,
            text: process?.paragraph5?.text,
            icon: KeyRound,
            label: process?.heading10?.text,
        },
    ]
    return (
        <section
            id="process"
            className="relative isolate overflow-hidden bg-[#eeeae1] px-6 py-24 text-[#343536] sm:py-32"
        >

            {/* Subtle background image */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85')",
                }}
            />

            {/* Cream overlay: keeps the image subtle */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[#eeeae1]/90"
            />

            {/* Decorative background elements */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 top-10 size-80 rounded-full border border-[#343536]/[0.06]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 top-28 size-48 rounded-full border border-[#e87928]/20"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 bottom-0 size-64 rounded-full bg-white/30 blur-3xl"
            />

            <div className="relative mx-auto max-w-7xl">
                {/* Section heading */}
                <div className="mb-16 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-16">
                    <div>
                        <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#e87928]">
                            <span className="h-px w-10 bg-[#e87928]" />
                            How we work
                        </p>

                        <h2 className="max-w-3xl font-serif text-4xl leading-[1.12] sm:text-6xl">
                            {process?.heading1?.text}
                            <br />
                            <em className="font-normal text-[#e87928]">
                                {process?.heading2?.text}
                            </em>
                        </h2>
                    </div>

                    <div className="lg:pb-2">
                        <p className="max-w-md text-base leading-8 text-[#343536]/65">
                            {process?.paragraph1?.text}
                        </p>

                        <div className="mt-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-[#343536]/70">
                            <span className="flex size-8 items-center justify-center rounded-full bg-[#e87928]/10 text-[#e87928]">
                                <Sparkles size={15} />
                            </span>
                            {process?.heading3?.text}
                        </div>
                    </div>
                </div>

                {/* Process timeline */}
                <div className="relative">
                    {/* Connecting line on desktop */}
                    <div
                        aria-hidden="true"
                        className="absolute left-[12.5%] right-[12.5%] top-[31px] hidden h-px bg-[#343536]/15 lg:block"
                    >
                        <div className="h-full w-full origin-left bg-[#e87928]/60" />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {steps.map(({ number, title, text, icon: Icon, label }, index) => (
                            <article
                                key={number}
                                className="group relative flex flex-col border border-[#343536]/10 bg-white/75 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#e87928]/40 hover:bg-white hover:shadow-[0_20px_50px_rgba(52,53,54,0.08)] sm:p-7 lg:min-h-[355px]"
                            >
                                {/* Number and icon */}
                                <div className="relative z-10 flex items-center justify-between">
                                    <span className="font-serif text-5xl tracking-tight text-[#343536]/15 transition-colors duration-500 group-hover:text-[#e87928]/35">
                                        {number}
                                    </span>

                                    <div className="flex size-[62px] items-center justify-center rounded-full border border-[#343536]/10 bg-[#eeeae1] text-[#e87928] transition-all duration-500 group-hover:rotate-[-8deg] group-hover:border-[#e87928] group-hover:bg-[#e87928] group-hover:text-white">
                                        <Icon size={23} strokeWidth={1.5} />
                                    </div>
                                </div>

                                {/* Step label */}
                                <div className="mt-9 flex items-center gap-2">
                                    <span className="h-1 w-5 bg-[#e87928] transition-all duration-500 group-hover:w-9" />
                                    <span className="text-[10px] font-bold tracking-[0.22em] text-[#343536]/50">
                                        {label}
                                    </span>
                                </div>

                                {/* Content */}
                                <h3 className="mt-4 max-w-[240px] font-serif text-2xl leading-tight text-[#343536]">
                                    {title}
                                </h3>

                                <p className="mt-4 text-sm leading-7 text-[#343536]/65">
                                    {text}
                                </p>

                                {/* Bottom accent */}
                                <div className="mt-auto flex items-center justify-between pt-8">
                                    <span className="text-[10px] font-bold tracking-[0.16em] text-[#343536]/35">
                                        STEP {number}
                                    </span>

                                    <ArrowUpRight
                                        size={18}
                                        className="text-[#e87928] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                    />
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 flex flex-col gap-6 border-t border-[#343536]/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="font-serif text-2xl text-[#343536]">
                            {process?.paragraph6?.text}
                        </p>
                        <p className="mt-2 text-sm text-[#343536]/60">
                            {process?.paragraph7?.text}
                        </p>
                    </div>

                    <Link
                        to="/contact"
                        className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#343536] px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#e87928]"
                    >
                        Let’s talk about your project
                        <ArrowRight
                            size={17}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default ProcessSection