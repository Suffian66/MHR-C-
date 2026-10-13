import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import {
    AboutPreview,
    ContactCta,
    FeaturedProjects,
    ServicesSection,
    Testimonials,
} from '../components/home-sections'
import { Header } from '../components/header'
import ProcessSection from '../components/process-sections'
import { Footer } from '../components/footer'
import HeroSection from '../components/hero'
import BeforeAfterSection from '../components/transformation'

export default function Home() {
    return (
        <main className="min-h-screen bg-[#f7f6f2] text-[#343536]">
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
            <HeroSection />
            <AboutPreview />
            <BeforeAfterSection />
            <ServicesSection />
            <ProcessSection />
            <FeaturedProjects />
            <Testimonials />
            <ContactCta />
            <Footer />
        </main>
    )
}
