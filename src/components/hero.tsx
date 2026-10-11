import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const heroSlides = [
    {
        image:
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=90',
        alt: 'Elegant modern home interior',
    },
    {
        image:
            'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2000&q=90',
        alt: 'Premium contemporary home design',
    },
    {
        image:
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=90',
        alt: 'Beautifully renovated living space',
    },
    {
        image:
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90',
        alt: 'Sophisticated modern living room',
    },
]

export default function HeroSection() {
    const [activeSlide, setActiveSlide] = useState(0)

    useEffect(() => {
        const interval = window.setInterval(() => {
            setActiveSlide((current) => (current + 1) % heroSlides.length)
        }, 5000)

        return () => window.clearInterval(interval)
    }, [])

    return (
        <section
            id="top"
            className="relative flex min-h-[680px] items-center overflow-hidden bg-[#343536] text-white sm:min-h-[760px]"
        >
            {/* Background image slider */}
            <div className="absolute inset-0">
                {heroSlides.map((slide, index) => (
                    <div
                        key={slide.image}
                        role="img"
                        aria-label={index === activeSlide ? slide.alt : undefined}
                        aria-hidden={index !== activeSlide}

                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out ${index === activeSlide
                                ? 'animate-hero-zoom opacity-100'
                                : 'scale-[1.2] opacity-0'
                            }`}

                        style={{ backgroundImage: `url("${slide.image}")` }}
                    />
                ))}
            </div>

            {/* Dark overlays for readability */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-[#171819]/95 via-[#171819]/70 to-[#171819]/20"
                aria-hidden="true"
            />
            <div
                className="absolute inset-0 bg-gradient-to-t from-[#171819]/50 via-transparent to-[#171819]/10"
                aria-hidden="true"
            />

            {/* Hero content */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 sm:py-32">
                <div className="max-w-4xl">
                    <p className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#f19a53]">
                        <span className="h-px w-12 bg-[#e87928]" />
                        Quality. Care. Craft.
                    </p>

                    <h1 className="max-w-4xl font-serif text-5xl leading-[1.05] sm:text-7xl lg:text-8xl">
                        Make space for{' '}
                        <em className="font-normal text-[#f19a53]">better</em>
                        <br />
                        living.
                    </h1>

                    <p className="mt-8 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
                        Renovation specialists creating homes that feel as good as they
                        look. Personal service, considered design, and craftsmanship you
                        can trust.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <Link
                            to="/contact"
                            className="group inline-flex items-center gap-3 rounded-full bg-[#e87928] px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition duration-300 hover:bg-[#d76519]"
                        >
                            Start your project
                            <ArrowRight
                                size={18}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>

                        <Link
                            to="/our-work"
                            className="inline-flex items-center gap-3 rounded-full border border-white/50 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition duration-300 hover:border-white hover:bg-white/15"
                        >
                            Explore our work
                        </Link>
                    </div>

                    {/* Slide indicators */}
                    {/* <div className="mt-14 flex items-center gap-3">
                        {heroSlides.map((slide, index) => (
                            <button
                                key={slide.image}
                                type="button"
                                aria-label={`Show slide ${index + 1}`}
                                aria-pressed={index === activeSlide}
                                onClick={() => setActiveSlide(index)}
                                className={`h-1 rounded-full transition-all duration-500 ${index === activeSlide
                                        ? 'w-12 bg-[#e87928]'
                                        : 'w-5 bg-white/50 hover:bg-white'
                                    }`}
                            />
                        ))}

                        <span className="ml-2 text-[10px] font-bold tracking-[0.2em] text-white/70">
                            0{activeSlide + 1} / 0{heroSlides.length}
                        </span>
                    </div> */}
                </div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 h-1 w-full bg-white/10">
                <div
                    className="h-full bg-[#e87928] transition-[width] duration-500"
                    style={{ width: `${((activeSlide + 1) / heroSlides.length) * 100}%` }}
                />
            </div>
        </section>
    )
}