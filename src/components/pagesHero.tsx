import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';

export function PageHero({
    eyebrow = 'ABOUT MHR',
    title = 'Renovating with',
    highlight = 'heart.',
    description = 'We believe great renovations begin with understanding people, respecting spaces, and bringing thoughtful ideas to life.',
    image = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=90',
    imageAlt = 'Beautiful contemporary renovated home interior',
    breadcrumb = 'About Us',
    ctaText = '',
    ctaLink = '',
}) {
    return (
        <section className="relative isolate min-h-[420px] overflow-hidden bg-[#343536] text-white sm:min-h-[440px] lg:min-h-[460px]">
            {/* Background image */}
            <img
                src={image}
                alt={imageAlt || ""}
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover object-center"
            />

            {/* Refined overlays — dark left, bright right */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-[#171819]/95 via-[#171819]/65 to-transparent"
                aria-hidden="true"
            />

            <div
                className="absolute inset-0 bg-gradient-to-t from-[#171819]/-25 via-transparent to-transparent"
                aria-hidden="true"
            />

            {/* Subtle architectural grid */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 opacity-[0.09]"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)',
                    backgroundSize: '90px 90px',
                    maskImage:
                        'linear-gradient(to right, black, transparent 72%)',
                }}
            />

            <div className="relative z-10 mx-auto flex min-h-[420px] w-full max-w-[1600px] flex-col px-3 sm:min-h-[440px] sm:px-5 lg:min-h-[460px] lg:px-14">
                {/* Breadcrumb navigation */}
                <nav
                    aria-label="Breadcrumb"
                    className="animate-hero-in flex items-center gap-2 pt-10 text-[12px] font-medium uppercase tracking-[0.16em] text-white/50 sm:pt-12 lg:pt-14"
                >
                    <Link
                        to="/"
                        className="transition-colors duration-300 hover:text-[#f19a53]"
                    >
                        Home
                    </Link>
                    <span className="text-[#e87928]">/</span>
                    <span className="text-white/85">{breadcrumb}</span>
                </nav>

                {/* Main hero content */}
                <div className="grid flex-1 items-center pb-10 pt-4 lg:grid-cols-[1.05fr_0.95fr] lg:pb-12 lg:pt-12">

                    {/* Left: headline and CTA */}
                    <div className="relative z-10 max-w-2xl">

                        <div className="animate-hero-in mb-7 flex items-center gap-3">
                            <span className="hero-accent-line h-px w-12 bg-[#f19a53]" />
                            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#f19a53] sm:text-xs">
                                {eyebrow}
                            </p>
                        </div>

                        <h1 className="animate-hero-in hero-title font-serif text-[clamp(3.5rem,7.5vw,7rem)] leading-[0.98] tracking-[-0.045em]">
                            {title}
                            <span className="ms-5 font-normal italic text-[#f19a53]">
                                {highlight}
                            </span>
                        </h1>

                        <p
                            className="animate-hero-in mt-7 max-w-xl text-md leading-7 text-white/80 sm:text-base sm:leading-8 lg:text-lg"
                            style={{ animationDelay: '180ms' }}
                        >
                            {description}
                        </p>

                        {ctaText && ctaLink && (
                            <div
                                className="animate-hero-in mt-9 flex flex-wrap items-center gap-5"
                                style={{ animationDelay: '300ms' }}
                            >
                                <Link
                                    to={ctaLink}
                                    className="group/cta inline-flex items-center gap-4 bg-[#e87928] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#f19a53] sm:px-7"
                                >
                                    {ctaText}
                                    <span className="flex size-7 items-center justify-center rounded-full border border-white/30 transition-transform duration-300 group-hover/cta:translate-x-1">
                                        <ArrowRight size={15} />
                                    </span>
                                </Link>

                                <span className="text-[10px] uppercase tracking-[0.16em] text-white/45">
                                    Thoughtfully built. Personally considered.
                                </span>
                            </div>
                        )}
                    </div>


                    {/* Right: decorative image marker */}
                    <div className="relative hidden h-full min-h-[350px] items-end justify-end pb-12 lg:flex">

                        {/* Animated framing corners */}
                        <div className="hero-frame absolute right-2 top-10 h-32 w-32 border-r border-t border-[#f19a53]/80" />

                        <div className="animate-hero-in relative mb-2 mr-3 max-w-[235px] border-l-2 border-[#e87928] bg-[#f7f6f2]/95 px-5 py-5 text-[#343536] shadow-xl backdrop-blur-sm">
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#e87928]">
                                The MHR philosophy
                            </p>
                            <p className="mt-3 font-serif text-2xl leading-tight">
                                Made for the way you live.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom information bar */}
                <div className="flex items-center justify-between border-t border-white/15 py-5 sm:py-6">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-white/45 sm:text-[10px]">
                        MHR Renovations &amp; Contracting
                    </p>

                    <a
                        href="#"
                        className="group/scroll flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-[#f19a53] sm:text-[10px]"
                    >
                        Scroll to explore
                        <span className="flex size-8 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover/scroll:border-[#f19a53] group-hover/scroll:text-[#f19a53]">
                            <ArrowDown className="hero-arrow" size={14} />
                        </span>
                    </a>
                </div>
            </div>

            {/* Component-specific animation styles */}
            <style>{`
                .hero-image {
                    animation: hero-image-reveal 1.4s ease-out both,
                               hero-image-drift 24s ease-in-out 1.4s infinite alternate;
                    will-change: transform;
                }

                .hero-glow {
                    background:
                        radial-gradient(ellipse at 12% 45%, rgba(232,121,40,0.20), transparent 43%),
                        linear-gradient(105deg, rgba(37,38,39,0.20), transparent 65%);
                    animation: hero-glow-shift 9s ease-in-out infinite alternate;
                }

                .animate-hero-in {
                    animation: hero-content-in 850ms cubic-bezier(.2,.7,.2,1) both;
                }

                .hero-accent-line {
                    transform-origin: left;
                    animation: hero-line-grow 900ms ease-out 200ms both;
                }

                .hero-frame {
                    animation: hero-frame-in 1.2s ease-out 450ms both;
                }

                .hero-arrow {
                    animation: hero-arrow-bob 1.8s ease-in-out infinite;
                }

                @keyframes hero-content-in {
                    from {
                        opacity: 0;
                        transform: translateY(22px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes hero-image-reveal {
                    from { opacity: 0.55; }
                    to { opacity: 1; }
                }

                @keyframes hero-image-drift {
                    from { transform: scale(1); }
                    to { transform: scale(1.07); }
                }

                @keyframes hero-glow-shift {
                    from {
                        opacity: 0.65;
                        background-position: 0% 50%;
                    }
                    to {
                        opacity: 1;
                        background-position: 100% 50%;
                    }
                }

                @keyframes hero-line-grow {
                    from { transform: scaleX(0); }
                    to { transform: scaleX(1); }
                }

                @keyframes hero-frame-in {
                    from {
                        opacity: 0;
                        transform: translate(12px, -12px);
                    }
                    to {
                        opacity: 1;
                        transform: translate(0, 0);
                    }
                }

                @keyframes hero-arrow-bob {
                    0%, 100% { transform: translateY(-2px); }
                    50% { transform: translateY(3px); }
                }

                @media (prefers-reduced-motion: reduce) {
                    .hero-image,
                    .hero-glow,
                    .animate-hero-in,
                    .hero-accent-line,
                    .hero-frame,
                    .hero-arrow {
                        animation: none !important;
                        transition: none !important;
                    }
                }
            `}</style>
        </section>
    );
}