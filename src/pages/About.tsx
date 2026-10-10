import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';


export default function AboutUs() {
    return (
        <main className="bg-[#f7f6f2] text-[#343536]">
            <Header />

            {/* Hero Section */}
            <section className="bg-[#343536] px-6 py-28 text-white">
                <div className="mx-auto max-w-7xl">
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#f19a53]">
                        About MHR
                    </p>

                    <h1 className="mt-5 max-w-3xl font-serif text-6xl sm:text-8xl">
                        Renovating with{' '}
                        <em className="font-normal text-[#f19a53]">heart.</em>
                    </h1>
                </div>
            </section>

            {/* Our History */}
            <section className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-2 lg:items-center">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#e87928]">
                        Our history
                    </p>

                    <h2 className="mt-5 font-serif text-4xl sm:text-6xl">
                        Built on care, craft, and good relationships.
                    </h2>

                    <p className="mt-7 text-lg leading-8 text-[#343536]/70">
                        MHR started with a simple idea: the best renovations are built
                        around people. Over the years, that belief has shaped every
                        project, partnership, and home we have had the privilege to work on.
                    </p>
                </div>

                <img
                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85"
                    alt="Completed MHR renovation"
                    className="aspect-[4/3] w-full object-cover"
                />
            </section>

            {/* Mission and Vision */}
            <section className="bg-[#eeeae1] px-6 py-24">
                <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
                    <div className="bg-[#343536] p-10 text-white">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#f19a53]">
                            Our mission
                        </p>

                        <p className="mt-8 font-serif text-4xl">
                            To make renovation feel clear, collaborative, and rewarding.
                        </p>
                    </div>

                    <div className="bg-[#e87928] p-10 text-white">
                        <p className="text-xs font-bold uppercase tracking-widest text-white/70">
                            Our vision
                        </p>

                        <p className="mt-8 font-serif text-4xl">
                            Homes that support better living for generations to come.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="px-6 py-24 text-center">
                <h2 className="font-serif text-5xl">Have a home in mind?</h2>

                <Link
                    to="/contact"
                    className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#e87928] px-7 py-4 text-xs font-bold uppercase tracking-widest text-white"
                >
                    Start a conversation <ArrowRight />
                </Link>
            </section>

            <Footer />
        </main>
    );
}