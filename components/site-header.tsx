'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { navItems } from './site-data'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return <header className="sticky top-0 z-50 border-b border-[#343536]/10 bg-white/95 px-6 shadow-sm backdrop-blur-sm"><div className="mx-auto flex h-24 max-w-7xl items-center justify-between"><Link href="/" aria-label="MHR home"><img src="/mhr-logo-new.png" alt="MHR Renovations & Contractors" className="h-16 w-auto object-contain mix-blend-multiply" /></Link><nav className="hidden items-center gap-9 text-xs font-bold uppercase tracking-[0.18em] lg:flex">{navItems.map((item) => <Link key={item.href} href={item.href} className="transition-colors hover:text-[#e87928]">{item.label}</Link>)}<Link href="/contact" className="rounded-full bg-[#e87928] px-5 py-3 text-white transition hover:bg-[#d76519]">Get a quote</Link></nav><button type="button" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)} className="lg:hidden">{open ? <X /> : <Menu />}</button></div>{open && <nav className="flex flex-col gap-5 border-t border-[#343536]/10 pb-6 pt-5 text-sm font-bold uppercase tracking-widest lg:hidden">{navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}<Link href="/contact" onClick={() => setOpen(false)} className="text-[#e87928]">Get a quote</Link></nav>}</header>
}
