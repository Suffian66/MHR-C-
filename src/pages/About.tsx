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

export default function AboutUs() {
    const values = [
        {
            number: '01',
            icon: HeartHandshake,
            title: 'People come first',
            description:
                'Every home has a story. We listen carefully, understand your priorities, and shape our work around the way you want to live.',
        },
        {
            number: '02',
            icon: Ruler,
            title: 'Craft in every detail',
            description:
                'Thoughtful planning, considered materials, and attention to the finishing touches help turn good spaces into exceptional ones.',
        },
        {
            number: '03',
            icon: Lightbulb,
            title: 'Ideas with purpose',
            description:
                'We look beyond appearances to create spaces that feel beautiful, function better, and make everyday living easier.',
        },
    ];

    const steps = [
        {
            number: '01',
            title: 'Listen & understand',
            description:
                'We start with your vision, your needs, your space, and the details that matter most to you.',
        },
        {
            number: '02',
            title: 'Plan with purpose',
            description:
                'We bring the ideas together into a considered approach, with clear priorities and thoughtful decisions.',
        },
        {
            number: '03',
            title: 'Bring it to life',
            description:
                'We focus on workmanship, attention to detail, and delivering a finished space you can feel proud of.',
        },
    ];

    return (
        <main className="overflow-hidden bg-[#f7f6f2] text-[#343536]">
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

            {/* Universal inner-page hero */}
            <PageHero
                eyebrow="A little about MHR"
                title="Renovating with"
                highlight="heart."
                description="We believe a great renovation is about more than changing a space. It is about understanding the people who live in it and creating something that feels right for them."
                image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85"
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
                                src="/images/project-rsc/sitting-area.png"
                                alt="Bright renovated interior with warm materials and natural light"
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                            />
                        </div>

                        <div className="absolute -bottom-1 right-0 max-w-[220px] bg-[#e87928] p-5 text-white sm:max-w-[260px] sm:p-7">
                            <p className="font-serif text-2xl leading-tight sm:text-3xl">
                                Better spaces.
                                <br />
                                Better living.
                            </p>
                            <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-white/75">
                                The reason behind our work
                            </p>
                        </div>
                    </div>

                    {/* Story content */}
                    <div className="lg:py-8">
                        <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e87928] sm:text-xs">
                            <span className="h-px w-7 bg-[#e87928]" />
                            Our story
                        </p>

                        <h2 className="max-w-xl font-serif text-4xl leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
                            More than a renovation.
                            <span className="mt-1 block font-normal italic text-[#e87928]">
                                A better way to live.
                            </span>
                        </h2>

                        <p className="mt-7 text-base leading-8 text-[#343536]/70">
                            At MHR Renovations &amp; Contractors, we see every
                            project as an opportunity to make everyday life
                            better. A home should reflect the people who live
                            in it, support their routines, and feel right long
                            after the work is complete.
                        </p>

                        <p className="mt-5 text-sm leading-7 text-[#343536]/60">
                            That is why we believe the best results begin with
                            listening. Understanding your ideas, respecting
                            your space, and paying attention to the details
                            help us approach each renovation with care and
                            purpose.
                        </p>

                        <div className="mt-8 space-y-4">
                            {[
                                'Thoughtful planning from the start',
                                'A personal approach to every space',
                                'Quality and care in the details',
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
                            "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=85')",
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
                            What guides us
                        </p>

                        <h2 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                            A clear purpose.
                            <span className="text-[#f19a53]">
                                {" "}A lasting impact.
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
                                Our mission
                            </span>

                            <h3 className="mt-7 max-w-md font-serif text-3xl leading-snug sm:text-4xl">
                                To make renovation a more thoughtful, collaborative, and rewarding experience.
                            </h3>

                            <p className="mt-6 max-w-md text-sm leading-7 text-white/70">
                                We aim to bring clarity to the process, understand what matters to each client, and approach every detail with care.
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
                                Our vision
                            </span>

                            <h3 className="mt-7 max-w-md font-serif text-3xl leading-snug sm:text-4xl">
                                Spaces that feel better today and serve people well into the future.
                            </h3>

                            <p className="mt-6 max-w-md text-sm leading-7 text-white/90">
                                We want to help create homes that balance lasting appeal, everyday functionality, and the individual character of the people who live in them.
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
                                What matters to us
                            </p>

                            <h2 className="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                                The values behind
                                <span className="text-[#e87928]">
                                    {' '}every detail.
                                </span>
                            </h2>
                        </div>

                        <p className="max-w-sm text-sm leading-7 text-[#343536]/60">
                            Our approach is built around people, purposeful
                            design, and the belief that the smallest details
                            can make a meaningful difference.
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
                            Good work starts with
                            <span className="text-[#e87928]">
                                {' '}good understanding.
                            </span>
                        </h2>

                        <p className="mt-6 max-w-md text-sm leading-7 text-[#343536]/65">
                            A considered process helps bring your ideas,
                            practical needs, and design ambitions together.
                            We believe every successful transformation begins
                            with a conversation.
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
                eyebrow="YOUR NEXT PROJECT"
                title="Let's build something exceptional."
                description="From thoughtful updates to complete renovations, let's discuss your ideas."
                buttonText="Start your project"
                buttonLink='/contact'
            />

            <Footer />
        </main>
    );
}