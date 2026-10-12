import { ArrowRight, MoveUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Cta({
  eyebrow = "LET'S TALK",
  title = "Ready to make a change?",
  description = "Tell us a little about your project, and let's explore how we can bring your vision to life.",
  buttonText = "",
  buttonLink = "",
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#e87928] px-6 py-16 text-white sm:px-8 sm:py-20 lg:py-24">
      {/* Background image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85')",
        }}
      />

      {/* Orange overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[#e87928]/90"
      />

      {/* Decorative circle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 -z-10 size-[380px] -translate-y-1/2 rounded-full border border-white/20 sm:size-[480px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 top-1/2 -z-10 size-[280px] -translate-y-1/2 rounded-full border border-white/15 sm:size-[360px]"
      />

      {/* Main content */}
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
        {/* Left content */}
        <div className="max-w-3xl">
          <p className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-white/75 sm:text-xs">
            <span className="h-px w-8 bg-white/70" />
            {eyebrow}
          </p>

          <h2 className="max-w-2xl font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-7xl">
            {title}
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/85 sm:mt-6 sm:text-base sm:leading-8">
            {description}
          </p>
        </div>

        {/* Right CTA */}
        <div className="relative flex items-center justify-start lg:justify-end">
          {buttonText && buttonLink && (
            <Link
              to={buttonLink}
              className="group inline-flex min-h-16 items-center gap-5 border border-white/40 bg-[#343536] px-6 py-5 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-lg transition-all duration-300 hover:border-white hover:bg-white hover:text-[#343536] sm:px-8"
            >
              <span>{buttonText}</span>

              <span className="flex size-9 items-center justify-center rounded-full border border-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:border-[#343536]/30">
                <ArrowRight size={17} />
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Bottom accent */}
      <div
        aria-hidden="true"
        className="mx-auto mt-12 h-px max-w-7xl bg-white/25 lg:mt-16"
      />
    </section >
  );
}