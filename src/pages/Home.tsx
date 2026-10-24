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
import { Helmet } from 'react-helmet-async'
import { useContent } from '@/adminPanel/features/contentContext'
import { useEffect } from 'react'

export default function Home() {
    const slug = "home";

    const {
        sectionsBySlug,
        loadSectionsBySlug,
        loading,
    } = useContent();

    useEffect(() => {
        loadSectionsBySlug(slug);
    }, [slug, loadSectionsBySlug]);

    const meta = sectionsBySlug[slug]?.["Meta"]?.blocks;

    const keywords =
        (typeof meta?.paragraph2?.text === "string"
            ? [meta.paragraph2.text]
            : Array.isArray(meta?.paragraph2?.text) ? meta.paragraph2.text : []
        ).join(", ");

    return (
        <>
            <Helmet>
                {meta?.heading1?.text && (
                    <title>{meta.heading1.text}</title>
                )}

                {meta?.paragraph1?.text && (
                    <meta
                        name="description"
                        content={meta.paragraph1.text}
                    />
                )}

                {keywords && (
                    <meta name="keywords" content={keywords} />
                )}

                {meta?.paragraph3?.text && (
                    <link
                        rel="canonical"
                        href={meta.paragraph3.text}
                    />
                )}
            </Helmet>
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
        </>
    )
}
