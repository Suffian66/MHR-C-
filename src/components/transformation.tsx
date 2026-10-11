
import { useState } from 'react'
import { ArrowLeft, ArrowRight, MoveHorizontal } from 'lucide-react'

const transformations = [
  {
    category: 'Living room',
    title: 'A fresh perspective.',
    description: 'A dated living space transformed with warm materials and considered details.',
    before: '/images/living-room-before.jpg',
    after: '/images/living-room-after.jpg',
  },
  {
    category: 'Kitchen',
    title: 'Made for everyday living.',
    description: 'A tired kitchen reimagined with a cleaner look and a more functional feel.',
    before: '/images/kitchen-before.jpg',
    after: '/images/kitchen-after.jpg',
  },
  {
    category: 'Bathroom',
    title: 'Every detail, renewed.',
    description: 'A refreshed bathroom with timeless finishes and a calm, modern atmosphere.',
    before: '/images/bathroom-before.jpg',
    after: '/images/bathroom-after.jpg',
  },
]

export function BeforeAfterSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [position, setPosition] = useState(50)

  const project = transformations[activeIndex]

  const changeProject = (index: number) => {
    setActiveIndex(index)
    setPosition(50)
  }

  return (
    <section
      id="transformations"
      className="bg-[#f7f6f2] px-5 py-14 text-[#343536] sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Compact heading */}
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e87928]">
              Before & after
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl">
              See the <em className="font-normal text-[#e87928]">difference.</em>
            </h2>
          </div>

          <p className="max-w-xs text-xs leading-6 text-[#343536]/60 sm:text-sm">
            Every renovation has a story. Explore the transformation.
          </p>
        </div>

        {/* Wide comparison image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-[#343536] sm:aspect-[2.2/1]">
          <img
            src={project.before}
            alt={`${project.category} before renovation`}
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
          />

          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 0 0 ${position}%)` }}
          >
            <img
              src={project.after}
              alt={`${project.category} after renovation`}
              draggable={false}
              className="absolute inset-0 h-full w-full max-w-none select-none object-cover"
            />
          </div>

          <span className="pointer-events-none absolute bottom-3 left-3 z-10 bg-black/50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white sm:bottom-5 sm:left-5">
            Before
          </span>

          <span className="pointer-events-none absolute bottom-3 right-3 z-10 bg-black/50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white sm:bottom-5 sm:right-5">
            After
          </span>

          <div
            className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white"
            style={{ left: `${position}%` }}
          >
            <div className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#e87928] text-white shadow-lg sm:size-12">
              <MoveHorizontal size={19} />
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            aria-label="Compare before and after"
            className="before-after-range absolute inset-0 z-20 h-full w-full"
          />
        </div>

        {/* Concise project details and controls */}
        <div className="mt-5 flex flex-col gap-5 border-b border-[#343536]/15 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#e87928]">
              {project.category}
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-2 text-xs leading-6 text-[#343536]/65 sm:text-sm">
              {project.description}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {transformations.map((item, index) => (
              <button
                key={item.category}
                type="button"
                onClick={() => changeProject(index)}
                aria-label={`Show ${item.category} transformation`}
                aria-pressed={activeIndex === index}
                className={`size-2.5 rounded-full transition-all ${
                  activeIndex === index
                    ? 'w-7 bg-[#e87928]'
                    : 'bg-[#343536]/25 hover:bg-[#e87928]/60'
                }`}
              />
            ))}

            <span className="mx-1 h-6 w-px bg-[#343536]/15" />

            <button
              type="button"
              onClick={() =>
                changeProject(
                  (activeIndex - 1 + transformations.length) %
                    transformations.length,
                )
              }
              aria-label="Previous transformation"
              className="flex size-9 items-center justify-center rounded-full border border-[#343536]/20 transition-colors hover:bg-[#343536] hover:text-white"
            >
              <ArrowLeft size={16} />
            </button>

            <button
              type="button"
              onClick={() =>
                changeProject((activeIndex + 1) % transformations.length)
              }
              aria-label="Next transformation"
              className="flex size-9 items-center justify-center rounded-full border border-[#343536]/20 transition-colors hover:bg-[#343536] hover:text-white"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BeforeAfterSection
