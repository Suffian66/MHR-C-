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
import Topbar from '../components/topbar'
import BlogPreview from '../components/BlogsSection'

export default function Home() {
    return (
        <main className="min-h-screen bg-[#f7f6f2] text-[#343536]">

            <Topbar />
            <Header />
            <HeroSection />
            <AboutPreview />
            <BeforeAfterSection />
            <ServicesSection />
            <ProcessSection />
            <FeaturedProjects />
            <BlogPreview />
            <Testimonials />
            <ContactCta />
            <Footer />
        </main>
    )
}
