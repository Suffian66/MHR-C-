import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { services } from '../data/data'

export function ServiceSlider() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % services.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setActive((current) => (current + 1) % services.length)
  }

  const previousSlide = () => {
    setActive((current) => (current - 1 + services.length) % services.length)
  }

  const visibleServices = [0, 1, 2].map(
    (offset) => services[(active + offset) % services.length],
  )

  return (
    <div>
      {/* Service cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleServices.map((service, index) => (
          <article
            key={service.slug}
            className={`service-card-enter group relative isolate h-[390px] overflow-hidden rounded-sm bg-[#252627] sm:h-[430px] ${index === 1 ? 'hidden sm:block' : ''
              } ${index === 2 ? 'hidden lg:block' : ''}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background image */}
            <img
              src={service.image}
              alt={service.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
            />

            {/* Image overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#171819] via-[#171819]/35 to-[#171819]/5 transition-colors duration-500 group-hover:via-[#171819]/20" />

            {/* Top details */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
              {/* <span className="text-xs font-bold tracking-[0.2em] text-white/75">
                {service.number}
              </span> */}

              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 group-hover:border-[#e87928] group-hover:bg-[#e87928]">
                <ArrowUpRight size={19} />
              </span>
            </div>

            {/* Bottom content */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
              <div className="mb-4 h-px w-10 bg-[#e87928] transition-all duration-500 group-hover:w-20" />

              <h3 className="max-w-sm font-serif text-3xl leading-tight text-white sm:text-4xl">
                {service.title}
              </h3>

              <p className="mt-3 line-clamp-3 max-w-sm text-sm leading-6 text-white/70">
                {service.text}
              </p>

              <Link
                to={`/services/${service.slug}`}
                className="mt-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#f19a53] transition-colors hover:text-white"
              >
                Explore service
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Hover accent */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#e87928] transition-all duration-500 group-hover:w-full" />
          </article>
        ))}
      </div>

      {/* Slider controls */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-white/15 pt-6">
        <div className="flex items-center gap-3">
          <span className="font-serif text-2xl text-white">
            {String(active + 1).padStart(2, '0')}
          </span>

          <span className="h-px w-10 bg-[#e87928]" />

          <span className="text-xs tracking-widest text-white/50">
            {String(services.length).padStart(2, '0')} SERVICES
          </span>
        </div>

        {/* Pagination dots */}
        <div className="flex items-center gap-2">
          {services.map((service, index) => (
            <button
              key={service.slug}
              type="button"
              aria-label={`Show service ${index + 1}: ${service.title}`}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${index === active
                  ? 'w-9 bg-[#e87928]'
                  : 'w-2 bg-white/30 hover:bg-white/70'
                }`}
            />
          ))}
        </div>

        {/* Previous / next */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous services"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 hover:border-[#e87928] hover:bg-[#e87928]"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next services"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 hover:border-[#e87928] hover:bg-[#e87928]"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceSlider