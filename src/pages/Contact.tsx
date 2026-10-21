
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react'
import { useEffect, type FormEvent } from 'react'
import { Footer } from '../components/footer'
import { Header } from '../components/header'
import { PageHero } from '../components/pagesHero'
import { Cta } from '../components/pagesCta'
import Topbar from '../components/topbar'
import { useContent } from '../adminPanel/features/contentContext'

export default function Contact() {
    const slug = "contact";
    const { sectionsBySlug, loadSectionsBySlug, loading, media } = useContent();

    useEffect(() => {
        loadSectionsBySlug(slug);
    }, [slug]);

    if (loading && !sectionsBySlug[slug]) {
        return (
            <div className="flex items-center justify-center h-screen w-full">
                <p className="text-xl font-bold">Loading...</p>
            </div>
        );
    }

    const banner = sectionsBySlug[slug]?.["Banner"]?.blocks;
    const info = sectionsBySlug[slug]?.["Information"]?.blocks;
    const form = sectionsBySlug[slug]?.["Form"]?.blocks;
    const cta = sectionsBySlug[slug]?.["CTA"]?.blocks;
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        alert('Thank you! Your enquiry form is ready to be connected.')
    }

    const getUrl = (imageId?: string) =>
        media.find((m) => m.id === imageId)?.mediaUrl || null;

    return (
        <main className="bg-[#f7f6f2] text-[#343536]">
            <Topbar />
            <Header />

            {/* Shared hero component */}
            <PageHero
                eyebrow={banner?.heading1?.text}
                title={banner?.heading2?.text}
                highlight={banner?.heading3?.text}
                description={banner?.paragraph1?.text}
                image={getUrl(banner?.image1?.imageId) || "/images/contact.jpg"}
                imageAlt="Beautifully renovated contemporary living space"
                breadcrumb="Contact"
            // ctaText="Tell us about your project"
            // ctaLink="#contact-form"
            />

            {/* Contact information and enquiry form */}
            <section
                id="contact-form"
                className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24"
            >
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

                    {/* Contact details */}
                    <div className="lg:py-5">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e87928]">
                            {info?.heading1?.text}
                        </p>

                        <h2 className="mt-4 max-w-lg font-serif text-4xl leading-tight sm:text-5xl">
                            {info?.paragraph1?.text}
                        </h2>

                        <p className="mt-6 max-w-md text-base leading-8 text-[#343536]/65">
                            {info?.paragraph2?.text}
                        </p>

                        <div className="mt-10 space-y-6">
                            <p
                                className="group flex items-start gap-4"
                            >
                                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-[#e87928] transition-colors group-hover:bg-[#e87928] group-hover:text-white">
                                    <Phone size={19} />
                                </span>
                                <span className="pt-1">
                                    <span className="block text-xs font-bold uppercase tracking-widest text-[#343536]/50">
                                        {info?.heading2?.text}
                                    </span>
                                    <span className="mt-1 block text-sm font-medium transition-colors group-hover:text-[#e87928]">
                                        {info?.heading3?.text}
                                    </span>
                                </span>
                            </p>

                            <p
                                className="group flex items-start gap-4"
                            >
                                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-[#e87928] transition-colors group-hover:bg-[#e87928] group-hover:text-white">
                                    <Mail size={19} />
                                </span>
                                <span className="min-w-0 pt-1">
                                    <span className="block text-xs font-bold uppercase tracking-widest text-[#343536]/50">
                                        {info?.heading4?.text}
                                    </span>
                                    <span className="mt-1 block break-all text-sm font-medium transition-colors group-hover:text-[#e87928]">
                                        {info?.heading5?.text}
                                    </span>
                                </span>
                            </p>

                            <div className="flex items-start gap-4">
                                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-[#e87928]">
                                    <MapPin size={19} />
                                </span>
                                <span className="pt-1">
                                    <span className="block text-xs font-bold uppercase tracking-widest text-[#343536]/50">
                                        {info?.heading6?.text}
                                    </span>
                                    <span className="mt-1 block text-sm font-medium">
                                        {info?.heading7?.text}
                                    </span>
                                </span>
                            </div>
                        </div>

                        <div className="mt-10 border-l-2 border-[#e87928] pl-5">
                            <p className="font-serif text-xl italic text-[#343536]/80">
                                {info?.paragraph3?.text}
                            </p>
                        </div>
                    </div>

                    {/* Enquiry form */}
                    <form
                        onSubmit={handleSubmit}
                        className="rounded-2xl border border-[#343536]/10 bg-white p-6 shadow-[0_12px_45px_rgba(52,53,54,0.05)] sm:p-10"
                    >
                        <div className="mb-8 border-b border-[#343536]/10 pb-6">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e87928]">
                                {form?.heading1?.text}
                            </p>
                            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                                {form?.heading2?.text}
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-[#343536]/60">
                                {form?.paragraph1?.text}
                            </p>
                        </div>

                        <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
                            <label className="grid gap-2 text-xs font-bold uppercase tracking-widest">
                                Your name
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full name"
                                    autoComplete="name"
                                    required
                                    className="min-w-0 rounded-lg border border-[#343536]/15 bg-[#f7f6f2]/50 px-4 py-3.5 text-sm font-normal normal-case tracking-normal outline-none transition focus:border-[#e87928] focus:bg-white focus:ring-2 focus:ring-[#e87928]/10"
                                />
                            </label>

                            <label className="grid gap-2 text-xs font-bold uppercase tracking-widest">
                                Email address
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    required
                                    className="min-w-0 rounded-lg border border-[#343536]/15 bg-[#f7f6f2]/50 px-4 py-3.5 text-sm font-normal normal-case tracking-normal outline-none transition focus:border-[#e87928] focus:bg-white focus:ring-2 focus:ring-[#e87928]/10"
                                />
                            </label>

                            <label className="grid gap-2 text-xs font-bold uppercase tracking-widest sm:col-span-2">
                                Phone number
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Your phone number (optional)"
                                    autoComplete="tel"
                                    className="min-w-0 rounded-lg border border-[#343536]/15 bg-[#f7f6f2]/50 px-4 py-3.5 text-sm font-normal normal-case tracking-normal outline-none transition focus:border-[#e87928] focus:bg-white focus:ring-2 focus:ring-[#e87928]/10"
                                />
                            </label>

                            <label className="grid gap-2 text-xs font-bold uppercase tracking-widest sm:col-span-2">
                                Service you're interested in
                                <select
                                    name="service"
                                    defaultValue=""
                                    required
                                    className="min-w-0 appearance-none rounded-lg border border-[#343536]/15 bg-[#f7f6f2]/50 px-4 py-3.5 text-sm font-normal normal-case tracking-normal outline-none transition focus:border-[#e87928] focus:bg-white focus:ring-2 focus:ring-[#e87928]/10"
                                >
                                    <option value="" disabled>
                                        Choose a service
                                    </option>
                                    <option value="kitchen-renovations">
                                        Kitchen Renovations
                                    </option>
                                    <option value="bathroom-renovations">
                                        Bathroom Renovations
                                    </option>
                                    <option value="basement-renovations">
                                        Basement Renovations
                                    </option>
                                    <option value="window-coverings">
                                        Window Coverings
                                    </option>
                                    <option value="drywall">
                                        Drywall
                                    </option>
                                    <option value="home-staging">
                                        Home Staging
                                    </option>
                                    <option value="other">
                                        Other / Not sure yet
                                    </option>
                                </select>
                            </label>

                            <label className="grid gap-2 text-xs font-bold uppercase tracking-widest sm:col-span-2">
                                Tell us about your project
                                <textarea
                                    name="message"
                                    rows={5}
                                    placeholder="What would you like to transform?"
                                    required
                                    className="min-w-0 resize-y rounded-lg border border-[#343536]/15 bg-[#f7f6f2]/50 px-4 py-3.5 text-sm font-normal normal-case leading-6 tracking-normal outline-none transition focus:border-[#e87928] focus:bg-white focus:ring-2 focus:ring-[#e87928]/10"
                                />
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="mt-7 flex w-full items-center justify-center gap-3 rounded-lg bg-[#e87928] px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#d76519] sm:w-auto"
                        >
                            Send enquiry
                            <ArrowRight size={16} />
                        </button>

                        <p className="mt-4 text-xs leading-5 text-[#343536]/50">
                            {form?.paragraph2?.text}
                        </p>
                    </form>
                </div>
            </section>

            {/* Shared CTA with Contact-specific copy */}
            <Cta
                eyebrow={cta?.heading1?.text}
                title={cta?.heading2?.text}
                description={cta?.paragraph1?.text}
                buttonText="Explore our services"
                buttonLink="/#services"
            />

            <Footer />
        </main>
    )
}
