
import { projects } from '../components/data';
import { Footer } from '../components/footer';
import { Header } from '../components/header';

export default function Portfolio() {
    return (
        <main className="bg-[#f7f6f2] text-[#343536]">
            <Header />

            {/* Hero Section */}
            <section className="bg-[#343536] px-6 py-28 text-white">
                <div className="mx-auto max-w-7xl">
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#f19a53]">
                        Our work
                    </p>

                    <h1 className="mt-5 font-serif text-6xl sm:text-8xl">
                        Spaces with a{' '}
                        <em className="font-normal text-[#f19a53]">story.</em>
                    </h1>
                </div>
            </section>

            {/* Portfolio Projects */}
            <section className="mx-auto grid max-w-7xl gap-8 px-6 py-24 md:grid-cols-2">
                {[...projects, ...projects].map((project, index) => (
                    <article
                        key={`${project.title}-${index}`}
                        className="group"
                    >
                        <div className="overflow-hidden">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                            />
                        </div>

                        <p className="mt-5 text-xs font-bold uppercase tracking-widest text-[#e87928]">
                            {project.category}
                        </p>

                        <h2 className="mt-2 font-serif text-3xl">
                            {project.title}
                        </h2>
                    </article>
                ))}
            </section>

            <Footer />
        </main>
    );
}