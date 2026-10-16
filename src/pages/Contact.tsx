
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react'
import { type FormEvent } from 'react'
import { Footer } from '../components/footer'
import { Header } from '../components/header'
import { PageHero } from '../components/pagesHero'
import { Cta } from '../components/pagesCta'
import Topbar from '../components/topbar'

export default function Contact() {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        alert('Thank you! Your enquiry form is ready to be connected.')
    }

    return (
        <main className="bg-[#f7f6f2] text-[#343536]">
            <Topbar />
            <Header />

            {/* Shared hero component */}
            <PageHero
                eyebrow="START A CONVERSATION"
                title="Let's make room for"
                highlight="better."
                description="Have a renovation in mind? Tell us what you're dreaming of, and let's talk about how we can bring it to life."
                image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=85"
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
                            We'd love to hear from you
                        </p>

                        <h2 className="mt-4 max-w-lg font-serif text-4xl leading-tight sm:text-5xl">
                            Every great space starts with a conversation.
                        </h2>

                        <p className="mt-6 max-w-md text-base leading-8 text-[#343536]/65">
                            Tell us a little about your project. Whether you're
                            planning a kitchen update or a complete home
                            transformation, we're here to help you take the
                            next step.
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
                                        Give us a call
                                    </span>
                                    <span className="mt-1 block text-sm font-medium transition-colors group-hover:text-[#e87928]">
                                        (289) 855-5559
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
                                        Send us an email
                                    </span>
                                    <span className="mt-1 block break-all text-sm font-medium transition-colors group-hover:text-[#e87928]">
                                        magichammerrenovations@gmail.com
                                    </span>
                                </span>
                            </p>

                            <div className="flex items-start gap-4">
                                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-[#e87928]">
                                    <MapPin size={19} />
                                </span>
                                <span className="pt-1">
                                    <span className="block text-xs font-bold uppercase tracking-widest text-[#343536]/50">
                                        Our service area
                                    </span>
                                    <span className="mt-1 block text-sm font-medium">
                                        Ontario, Canada
                                    </span>
                                </span>
                            </div>
                        </div>

                        <div className="mt-10 border-l-2 border-[#e87928] pl-5">
                            <p className="font-serif text-xl italic text-[#343536]/80">
                                "Your vision. Our craftsmanship. A space that feels like you."
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
                                Your project starts here
                            </p>
                            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                                Tell us about it.
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-[#343536]/60">
                                Fill in the details below and we'll be in touch.
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
                            No pressure, no obligation — just a conversation
                            about your project.
                        </p>
                    </form>
                </div>
            </section>

            {/* Shared CTA with Contact-specific copy */}
            <Cta
                eyebrow="READY WHEN YOU ARE"
                title="Let's bring your vision to life."
                description="Have questions or still exploring ideas? Let's talk about your space, your plans, and what we can create together."
                buttonText="Explore our services"
                buttonLink="/#services"
            />

            <Footer />
        </main>
    )
}
