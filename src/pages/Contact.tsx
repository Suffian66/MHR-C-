import { Mail, MapPin, Phone } from 'lucide-react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { FormEvent } from 'react';

export default function Contact() {
    return (
        <main className="bg-[#f7f6f2] text-[#343536]">
            <Header />

            {/* Hero Section */}
            <section className="bg-[#343536] px-6 py-28 text-white">
                <div className="mx-auto max-w-7xl">
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#f19a53]">
                        Start a conversation
                    </p>

                    <h1 className="mt-5 max-w-3xl font-serif text-6xl sm:text-8xl">
                        Let&apos;s make room for{' '}
                        <em className="font-normal text-[#f19a53]">better.</em>
                    </h1>
                </div>
            </section>

            {/* Contact Information and Form */}
            <section className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[.7fr_1.3fr]">
                <div>
                    <h2 className="font-serif text-4xl">Get in touch</h2>

                    <p className="mt-5 text-base leading-7 text-[#343536]/65">
                        Tell us a little about your project and we&apos;ll be in touch for
                        a relaxed, no-obligation chat.
                    </p>

                    <div className="mt-10 flex flex-col gap-5 text-sm">
                        <a
                            href="tel:+6495550123"
                            className="flex items-center gap-4"
                        >
                            <Phone className="text-[#e87928]" />
                            +64 9 555 0123
                        </a>

                        <a
                            href="mailto:hello@mhrrenovations.co.nz"
                            className="flex items-center gap-4"
                        >
                            <Mail className="text-[#e87928]" />
                            hello@mhrrenovations.co.nz
                        </a>

                        <p className="flex items-center gap-4">
                            <MapPin className="text-[#e87928]" />
                            Auckland, New Zealand
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={(event: FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        alert('Thank you! Your enquiry form is ready to be connected.');
                    }}
                    className="grid gap-5 border border-[#343536]/10 bg-white p-7 sm:grid-cols-2 sm:p-10"
                >
                    <label className="grid gap-2 text-xs font-bold uppercase tracking-widest">
                        Name
                        <input
                            type="text"
                            name="name"
                            required
                            className="border-b border-[#343536]/20 px-0 py-3 text-base font-normal outline-none focus:border-[#e87928]"
                        />
                    </label>

                    <label className="grid gap-2 text-xs font-bold uppercase tracking-widest">
                        Email
                        <input
                            type="email"
                            name="email"
                            required
                            className="border-b border-[#343536]/20 px-0 py-3 text-base font-normal outline-none focus:border-[#e87928]"
                        />
                    </label>

                    <label className="grid gap-2 text-xs font-bold uppercase tracking-widest sm:col-span-2">
                        What can we help with?
                        <select
                            name="service"
                            defaultValue=""
                            className="border-b border-[#343536]/20 bg-transparent px-0 py-3 text-base font-normal outline-none focus:border-[#e87928]"
                        >
                            <option value="" disabled>
                                Choose a service
                            </option>
                            <option value="kitchen">Kitchen renovation</option>
                            <option value="bathroom">Bathroom renovation</option>
                            <option value="full-home">Full home renovation</option>
                        </select>
                    </label>

                    <label className="grid gap-2 text-xs font-bold uppercase tracking-widest sm:col-span-2">
                        Tell us about your project
                        <textarea
                            name="message"
                            required
                            rows={5}
                            className="resize-none border-b border-[#343536]/20 px-0 py-3 text-base font-normal outline-none focus:border-[#e87928]"
                        />
                    </label>

                    <button
                        type="submit"
                        className="bg-[#e87928] px-6 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#d76519] sm:col-span-2"
                    >
                        Send enquiry
                    </button>
                </form>
            </section>

            {/* Closing Banner */}
            <section className="bg-[#e87928] px-6 py-20 text-center text-white">
                <h2 className="font-serif text-5xl">
                    Good spaces start with a good conversation.
                </h2>
            </section>

            <Footer />
        </main>
    );
}