import { Link } from 'react-router-dom'
import { navItems } from '../data/data'
import {
    MapPin,
    Phone,
    Mail,
    ArrowUpRight,
    MoveUpRight,
} from 'lucide-react'

export function Footer() {
    return (
        <footer className="relative overflow-hidden bg-[#343536] px-6 pb-6 pt-16 text-white sm:px-8 sm:pt-20">
            {/* Subtle decorative background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full border border-white/[0.06]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full border border-[#e87928]/15"
            />

            <div className="relative mx-auto max-w-7xl">
                {/* Main footer */}
                <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.2fr_1fr] lg:gap-10">
                    {/* Brand */}
                    <div>
                        <Link to="/" aria-label="MHR home" className="inline-block">
                            <img
                                src="/mhr-light.png"
                                alt="MHR Magic Hammer Renovation & Contracting"
                                className="h-24 w-auto object-contain object-left"
                            />
                        </Link>

                        <p className="mt-5 max-w-xs text-sm leading-7 text-white/55">
                            Thoughtful renovations. Honest advice. Exceptional attention to
                            detail. Transforming houses into spaces that feel like home.
                        </p>

                        <Link
                            to="/contact"
                            className="group mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#f19a53] transition-colors hover:text-white"
                        >
                            Let's discuss your project
                            <MoveUpRight
                                size={15}
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </Link>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#f19a53]">
                            Explore
                        </h3>

                        <nav className="mt-6 flex flex-col items-start gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className="group flex items-center gap-2 text-sm text-white/65 transition-colors duration-300 hover:text-white"
                                >
                                    <span className="h-px w-0 bg-[#e87928] transition-all duration-300 group-hover:w-4" />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#f19a53]">
                            Connect with us
                        </h3>

                        <div className="mt-6 space-y-5">
                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#f19a53]">
                                    <MapPin size={18} strokeWidth={1.7} />
                                </span>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                                        Address
                                    </p>
                                    <p className="mt-1 text-sm leading-6 text-white/75">
                                        Oakville, Ontario, Canada
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4">
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#f19a53]">
                                    <Phone size={18} strokeWidth={1.7} />
                                </span>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                                        Phone
                                    </p>
                                    <p className="mt-1 text-sm text-white/75">
                                        (289) 855-5559
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#f19a53]">
                                    <Mail size={18} strokeWidth={1.7} />
                                </span>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                                        Email
                                    </p>
                                    <p className="mt-1 break-all text-sm leading-6 text-white/75">
                                        magichammerrenovations@gmail.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social media */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#f19a53]">
                            Follow along
                        </h3>

                        <p className="mt-6 max-w-xs text-sm leading-6 text-white/50">
                            Follow our journey for renovation inspiration, recent projects,
                            and ideas for your home.
                        </p>

                        <div className="mt-5 flex gap-3">
                            <button
                                type="button"
                                aria-label="Facebook"
                                className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-[#e87928] hover:bg-[#e87928] hover:text-white"
                            >
                                {/* <Facebook size={18} /> */}
                            </button>

                            <button
                                type="button"
                                aria-label="Instagram"
                                className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-[#e87928] hover:bg-[#e87928] hover:text-white"
                            >
                                {/* <Instagram size={18} /> */}
                            </button>
                        </div>

                        <div className="mt-8 border-l-2 border-[#e87928] pl-4">
                            <p className="font-serif text-lg leading-snug text-white/85">
                                Better spaces.
                                <br />
                                Better living.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col gap-4 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} MHR Renovations &amp; Contracting.
                        All rights reserved.
                    </p>

                    <button
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="group inline-flex w-fit items-center gap-2 uppercase tracking-[0.15em] transition-colors hover:text-white"
                    >
                        Back to top
                        <ArrowUpRight
                            size={14}
                            className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                        />
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer