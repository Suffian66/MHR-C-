
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Menu,
    X,
    ChevronDown,
    ArrowUpRight,
} from 'lucide-react'
import { navItems, services } from '../data/data'

export function Header() {
    const [open, setOpen] = useState(false)
    const [servicesOpen, setServicesOpen] = useState(false)

    const closeMenus = () => {
        setOpen(false)
        setServicesOpen(false)
    }

    return (
        <header className="sticky top-0 z-50 border-b border-[#343536]/10 bg-white/95 px-5 shadow-sm backdrop-blur-xl sm:px-5 lg:px-20">
            <div className="mx-auto flex h-20 max-w-none items-center justify-between sm:h-24">

                {/* Logo */}
                <Link to="/" aria-label="MHR home" onClick={closeMenus}>
                    <img
                        src="/mhr-dark.png"
                        alt="MHR Renovations & Contractors"
                        className="h-14 w-auto object-contain mix-blend-multiply sm:h-20"
                    />
                </Link>

                {/* Desktop navigation */}
                <nav className="hidden items-center gap-8 text-md font-bold uppercase tracking-[0.14em] lg:flex xl:gap-12">

                    {navItems.slice(0, 1).map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className="transition-colors hover:text-[#e87928]"
                        >
                            {item.label}
                        </Link>
                    ))}

                    {/* Services dropdown */}
                    <div className="group relative">
                        <button
                            type="button"
                            aria-haspopup="true"
                            className="flex items-center gap-2 py-5 transition-colors hover:text-[#e87928]"
                        >
                            Services
                            <ChevronDown
                                size={15}
                                className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                            />
                        </button>

                        {/* Dropdown panel */}
                        <div className="invisible absolute left-1/2 top-full w-[580px] -translate-x-1/2 translate-y-2 rounded-2xl border border-[#343536]/10 bg-white p-5 opacity-0 shadow-[0_20px_60px_rgba(0,0,0,0.13)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                            <div className="mb-4 flex items-end justify-between border-b border-[#343536]/10 pb-4">
                                <div>
                                    <p className="mb-1 text-[10px] tracking-[0.2em] text-[#e87928]">
                                        WHAT WE DO
                                    </p>
                                    <h3 className="font-serif text-2xl font-medium normal-case tracking-normal text-[#343536]">
                                        Our Services
                                    </h3>
                                </div>

                                <span className="text-[10px] font-medium tracking-wider text-[#343536]/50">
                                    {String(services.length).padStart(2, '0')} SERVICES
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                {services.map((service) => (
                                    <Link
                                        key={service.slug}
                                        to={`/services/${service.slug}`}
                                        className="group/item flex gap-3 rounded-xl p-3 transition-colors hover:bg-[#f7f6f2]"
                                    >
                                        <span className="pt-0.5 font-serif text-sm text-[#e87928]">
                                            {service.number}
                                        </span>

                                        <span className="min-w-0 flex-1">
                                            <span className="flex items-start justify-between gap-1 text-[11px] font-bold leading-5 tracking-[0.04em] text-[#343536]">
                                                {service.title}
                                                <ArrowUpRight
                                                    size={14}
                                                    className="mt-0.5 shrink-0 text-[#e87928] opacity-0 transition-all group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 group-hover/item:opacity-100"
                                                />
                                            </span>

                                            <span className="mt-1 block text-[11px] font-normal normal-case leading-relaxed tracking-normal text-[#343536]/60">
                                                {service.text}
                                            </span>
                                        </span>
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-4 flex items-center justify-between rounded-xl bg-[#343536] px-4 py-3 text-white">
                                <span className="text-[11px] font-medium normal-case tracking-normal">
                                    Have a project in mind?
                                </span>
                                <Link
                                    to="/contact"
                                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#f19a53] hover:text-white"
                                >
                                    Get a quote
                                    <ArrowUpRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {navItems.slice(1).map((item) => (
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
                    onClick={() => {
                        setOpen(!open)
                        setServicesOpen(false)
                    }}
                    className="rounded-lg p-2 text-[#343536] transition hover:bg-[#f7f6f2] lg:hidden"
                >
                    {open ? <X size={25} /> : <Menu size={25} />}
                </button>
            </div>

            {/* Mobile navigation */}
            {open && (
                <nav className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-[#343536]/10 pb-6 pt-4 lg:hidden">

                    {navItems.slice(0, 1).map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            onClick={closeMenus}
                            className="block py-3 text-sm font-bold tracking-wider text-[#343536] transition hover:text-[#e87928]"
                        >
                            {item.label}
                        </Link>
                    ))}

                    {/* Mobile services accordion */}
                    <div className="border-y border-[#343536]/10">
                        <button
                            type="button"
                            aria-expanded={servicesOpen}
                            onClick={() => setServicesOpen(!servicesOpen)}
                            className="flex w-full items-center justify-between py-4 text-lg font-bold uppercase tracking-wider text-[#343536] transition hover:text-[#e87928]"
                        >
                            SERVICES
                            <ChevronDown
                                size={18}
                                className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180 text-[#e87928]' : ''
                                    }`}
                            />
                        </button>

                        {servicesOpen && (
                            <div className="mb-4 space-y-1 rounded-xl bg-[#f7f6f2] p-2">
                                {services.map((service) => (
                                    <Link
                                        key={service.slug}
                                        to={`/services/${service.slug}`}
                                        onClick={closeMenus}
                                        className="flex items-start gap-3 rounded-lg p-3 transition hover:bg-white"
                                    >
                                        <span className="pt-0.5 font-serif text-sm text-[#e87928]">
                                            {service.number}
                                        </span>

                                        <span>
                                            <span className="block text-sm font-semibold text-[#343536]">
                                                {service.title}
                                            </span>
                                            <span className="mt-1 block text-xs font-normal normal-case leading-relaxed text-[#343536]/60">
                                                {service.text}
                                            </span>
                                        </span>

                                        <ArrowUpRight
                                            size={15}
                                            className="ml-auto mt-1 shrink-0 text-[#e87928]"
                                        />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {navItems.slice(1).map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            onClick={closeMenus}
                            className="block py-3 text-sm font-bold uppercase tracking-wider text-[#343536] transition hover:text-[#e87928]"
                        >
                            {item.label}
                        </Link>
                    ))}

                    <Link
                        to="/contact"
                        onClick={closeMenus}
                        className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#e87928] px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#d76519]"
                    >
                        Get a quote
                        <ArrowUpRight size={16} />
                    </Link>
                </nav>
            )}
        </header>
    )
}
