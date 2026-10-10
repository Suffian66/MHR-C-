import { Link } from 'react-router-dom'
import {
    ArrowRight,
    ClipboardList,
    Hammer,
    KeyRound,
    Sparkles,
} from 'lucide-react'

const steps = [
    {
        number: '01',
        title: 'Start with a conversation',
        text: 'Tell us what you are imagining, what matters most, and how you want your home to feel.',
        icon: ClipboardList,
    },
    {
        number: '02',
        title: 'Shape the right plan',
        text: 'We turn your ideas into a clear scope, considered choices, and a practical path forward.',
        icon: Sparkles,
    },
    {
        number: '03',
        title: 'Build with care',
        text: 'Our skilled team keeps the site tidy, communication open, and craftsmanship consistent.',
        icon: Hammer,
    },
    {
        number: '04',
        title: 'Step into better living',
        text: 'We finish every detail, walk you through the result, and leave you with a home to love.',
        icon: KeyRound,
    },
]

export function ProcessSection() {
    return (
        <section
            id="process"
            className="relative overflow-hidden bg-[#343536] px-6 py-24 text-white sm:py-32"
        >
            <div className="absolute -right-24 top-16 size-72 rounded-full border border-white/10" />
            <div className="absolute -right-8 top-32 size-40 rounded-full border border-[#e87928]/30" />

            <div className="relative mx-auto max-w-7xl">
                <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_.6fr] lg:items-end">
                    <div>
                        <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#f19a53]">
                            Our process
                        </p>

                        <h2 className="max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">
                            A clearer path to{' '}
                            <em className="font-normal text-[#f19a53]">
                                better living.
                            </em>
                        </h2>
                    </div>

                    <p className="max-w-sm text-sm leading-7 text-white/60">
                        Renovation should feel exciting, not overwhelming. Our process
                        keeps every step considered, collaborative, and calm.
                    </p>
                </div>

                <div className="grid gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map(({ number, title, text, icon: Icon }) => (
                        <article
                            key={number}
                            className="group relative bg-[#343536] p-7 transition duration-500 hover:bg-[#e87928]"
                        >
                            <div className="flex items-start justify-between">
                                <span className="font-serif text-4xl text-[#f19a53] transition group-hover:text-white">
                                    {number}
                                </span>

                                <Icon className="text-[#f19a53] transition duration-500 group-hover:rotate-12 group-hover:text-white" />
                            </div>

                            <div className="mt-16">
                                <h3 className="font-serif text-2xl leading-tight">
                                    {title}
                                </h3>

                                <p className="mt-4 text-sm leading-6 text-white/55 transition group-hover:text-white/80">
                                    {text}
                                </p>
                            </div>

                            <div className="mt-8 h-1 w-8 bg-[#e87928] transition-all duration-500 group-hover:w-full group-hover:bg-white" />
                        </article>
                    ))}
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-between gap-5">
                    <p className="text-sm text-white/55">
                        Good work starts with a good conversation.
                    </p>

                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-3 rounded-full border border-white/30 px-6 py-3 text-xs font-bold uppercase tracking-widest transition hover:border-white hover:bg-white hover:text-[#343536]"
                    >
                        Talk to us <ArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default ProcessSection