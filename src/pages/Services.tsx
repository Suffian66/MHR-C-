import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Footer } from '../components/footer';
import { services } from '../components/data';
import { Header } from '../components/header';

export default function ServicePage() {
    const { slug } = useParams<{ slug: string }>();

    const service = services.find((item) => item.slug === slug);

    // Handle an invalid or missing service slug
    if (!service) {
        return <Navigate to="/404" replace />;
    }

    const steps = [
        'Initial consultation',
        'Considered planning',
        'Crafted installation',
    ];

    return (
        <main className="min-h-screen bg-[#f7f6f2] text-[#343536]">
            <Header />

            {/* Hero Section */}
            <section className="relative flex min-h-[520px] items-end overflow-hidden bg-[#343536] text-white">
                <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 size-full object-cover opacity-65"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#343536] via-[#343536]/30 to-transparent" />

                <div className="relative mx-auto w-full max-w-7xl px-6 py-20">
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#f19a53]">
                        MHR services / {service.number}
                    </p>

                    <h1 className="mt-5 max-w-3xl font-serif text-5xl sm:text-7xl">
                        {service.title}
                    </h1>
                </div>
            </section>

            {/* Service Introduction */}
            <section className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[1fr_.8fr]">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#e87928]">
                        Designed around you
                    </p>

                    <h2 className="mt-5 font-serif text-4xl sm:text-5xl">
                        A better way to make space.
                    </h2>

                    <p className="mt-7 text-lg leading-8 text-[#343536]/70">
                        {service.text} Our experienced team manages the details with
                        care, from the first measure-up and material selections through
                        to the finishing touches.
                    </p>
                </div>

                <div className="border-l-2 border-[#e87928] pl-7">
                    <p className="font-serif text-3xl leading-snug">
                        Clear advice. Beautiful results. A process you can enjoy.
                    </p>

                    <p className="mt-6 text-sm leading-7 text-[#343536]/60">
                        We keep you informed, protect your investment, and build spaces
                        that feel distinctly yours.
                    </p>
                </div>
            </section>

            {/* Our Process */}
            <section className="bg-[#eeeae1] px-6 py-24">
                <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
                    {steps.map((step, index) => (
                        <div key={step} className="bg-[#f7f6f2] p-7">
                            <span className="text-xs font-bold tracking-widest text-[#e87928]">
                                0{index + 1}
                            </span>

                            <h3 className="mt-12 font-serif text-2xl">{step}</h3>

                            <p className="mt-4 text-sm leading-6 text-[#343536]/60">
                                A thoughtful stage in your project, delivered with clear
                                communication and care.
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-[#e87928] px-6 py-20 text-white">
                <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row sm:items-center">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-white/70">
                            Ready when you are
                        </p>

                        <h2 className="mt-3 font-serif text-4xl">
                            Let&apos;s talk about your {service.title.toLowerCase()}.
                        </h2>
                    </div>

                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-3 rounded-full bg-[#343536] px-6 py-4 text-xs font-bold uppercase tracking-widest"
                    >
                        Request a quote <ArrowRight />
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}