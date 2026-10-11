
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navItems } from './data'

export function Header() {
    const [open, setOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 border-b border-[#343536]/10 bg-white/95 px-6 shadow-sm backdrop-blur-sm">
            <div className="mx-auto flex h-24 max-w-7xl items-center justify-between">
                {/* Logo */}
                <Link to="/" aria-label="MHR home">
                    <img
                        src="/mhr-dark.png"
                        alt="MHR Renovations & Contractors"
                        className="h-20 w-auto object-contain mix-blend-multiply"
                    />
                </Link>

                {/* Desktop navigation */}
                <nav className="hidden items-center gap-9 text-xs font-bold uppercase tracking-[0.18em] lg:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className="transition-colors hover:text-[#e87928]"
                        >
                            {item.label}
                        </Link>
                    ))}

                    <Link
                        to="/contact"
                        className="rounded-full bg-[#e87928] px-5 py-3 text-white transition hover:bg-[#d76519]"
                    >
                        Get a quote
                    </Link>
                </nav>

                {/* Mobile menu button */}
                <button
                    type="button"
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                    onClick={() => setOpen(!open)}
                    className="lg:hidden"
                >
                    {open ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile navigation */}
            {open && (
                <nav className="flex flex-col gap-5 border-t border-[#343536]/10 pb-6 pt-5 text-sm font-bold uppercase tracking-widest lg:hidden">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <Link
                        to="/contact"
                        onClick={() => setOpen(false)}
                        className="text-[#e87928]"
                    >
                        Get a quote
                    </Link>
                </nav>
            )}
        </header>
    )
}
