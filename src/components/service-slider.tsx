import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { services } from './data'

export function ServiceSlider() {
    const [active, setActive] = useState(0)
    const service = services[active]

    return (
        <div>
            <div className="relative overflow-hidden">
                <img
                    key={service.slug}
                    src={service.image}
                    alt={service.title}
                    className="aspect-[16/8] w-full object-cover animate-fade-in"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-between gap-5 p-6 text-white sm:flex-row sm:items-end sm:p-10">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#f19a53]">
                            {service.number} / 06
                        </p>

                        <h3 className="mt-2 font-serif text-3xl sm:text-5xl">
                            {service.title}
                        </h3>

                        <p className="mt-3 max-w-lg text-sm leading-6 text-white/75">
                            {service.text}
                        </p>
                    </div>

                    <Link
                        to={`/ services / ${service.slug} `}
                        className="inline-flex items-center gap-2 rounded-full bg-[#e87928] px-5 py-3 text-xs font-bold uppercase tracking-widest"
                    >
                        Explore service <ArrowRight />
                    </Link>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {services.map((item, index) => (
                    <button
                        key={item.slug}
                        type="button"
                        onClick={() => setActive(index)}
                        aria-pressed={index === active}
                        className={`border - t - 2 px - 2 py - 3 text - left text - [10px] font - bold uppercase tracking - wider transition sm: text - xs ${index === active
                            ? 'border-[#e87928] text-[#e87928]'
                            : 'border-[#343536]/20 text-[#343536]/50 hover:border-[#e87928]'
                            } `}
                    >
                        <span className="mb-1 block">{item.number}</span>
                        {item.title}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ServiceSlider