import { Link } from 'react-router-dom';
import { navItems } from './data';

export function Footer() {
    return (
        <footer className="bg-[#343536] px-6 py-14 text-white">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 border-b border-white/15 pb-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
                    {/* Brand */}
                    <div>
                        <img
                            src="/mhr-light.png"
                            alt="MHR Magic Hammer Renovation & Contracting"
                            className="h-28 w-auto object-contain"
                        />

                        <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">
                            Thoughtful renovations, honest advice, and quality craftsmanship
                            across Auckland.
                        </p>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#f19a53]">
                            Explore
                        </h3>

                        <nav className="mt-5 flex flex-col gap-3 text-sm text-white/70">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className="hover:text-white"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#f19a53]">
                            Connect
                        </h3>

                        <nav className="mt-5 flex flex-col gap-3 text-sm text-white/70">
                            <Link to="/contact" className="hover:text-white">
                                Request a quote
                            </Link>

                            <a
                                href="mailto:hello@mhrrenovations.co.nz"
                                className="hover:text-white"
                            >
                                Email us
                            </a>

                            <a href="tel:+6495550123" className="hover:text-white">
                                Call +64 9 555 0123
                            </a>
                        </nav>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#f19a53]">
                            Follow along
                        </h3>

                        <div className="mt-5 flex gap-3">
                            <a
                                href="#top"
                                className="rounded-full border border-white/25 px-4 py-2 text-xs font-bold uppercase tracking-widest hover:border-[#e87928]"
                            >
                                Facebook
                            </a>

                            <a
                                href="#top"
                                className="rounded-full border border-white/25 px-4 py-2 text-xs font-bold uppercase tracking-widest hover:border-[#e87928]"
                            >
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="flex flex-col gap-3 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © 2026 MHR Renovations &amp; Contractors. All rights reserved.
                    </p>

                    <p>Auckland, New Zealand</p>
                </div>
            </div>
        </footer>
    );
}