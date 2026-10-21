import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Clock3, CalendarDays } from 'lucide-react';
import { blogPosts, featuredPost, remainingPosts } from '../data/blogData';
import Topbar from '../components/topbar';
import { Header } from '../components/header';
import Footer from '../components/footer';
import { PageHero } from '../components/pagesHero';
import { Cta } from '../components/pagesCta';

export default function Blog() {
    const { slug } = useParams();

    const selectedPost = blogPosts.find(
        (post) => post.slug === slug
    );

    const isSelectedPost = Boolean(selectedPost);

    return (
        <>
            <Topbar />
            <Header />

            <PageHero
                eyebrow="Ideas, inspiration & expertise"
                title="The MHR"
                highlight="Journal"
                description="Explore renovation advice, thoughtful design ideas, and practical guidance to help you make the most of your space."
                image="/images/blogs.jpg"
                imageAlt="Beautiful contemporary home interior"
                breadcrumb="Blog"
            />

            <section className="bg-[#f7f6f2] px-6 py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-7xl">

                    {selectedPost ? (
                        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(240px,1fr)] lg:gap-10 xl:gap-14">

                            {/* Selected Blog Article */}
                            <article className="min-w-0">

                                <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[#343536]/65">
                                    <span className="inline-flex items-center gap-2">
                                        <CalendarDays size={16} />
                                        {selectedPost.date}
                                    </span>

                                    <span className="inline-flex items-center gap-2">
                                        <Clock3 size={16} />
                                        {selectedPost.readTime}
                                    </span>
                                </div>

                                <span className="mb-4 inline-block rounded-full bg-[#e87928]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#e87928]">
                                    {selectedPost.category}
                                </span>

                                <h1 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-[#343536] sm:text-4xl lg:text-5xl">
                                    {selectedPost.title}
                                </h1>

                                <p className="mb-8 max-w-3xl text-base leading-8 text-[#343536]/75 sm:text-lg">
                                    {selectedPost.excerpt}
                                </p>

                                <div className="mb-10 overflow-hidden rounded-2xl">
                                    <img
                                        src={selectedPost.image}
                                        alt={selectedPost.title}
                                        className="h-auto max-h-[560px] w-full object-cover"
                                    />
                                </div>

                                <div className="max-w-3xl space-y-6 text-base leading-8 text-[#343536]/80">
                                    {selectedPost.content?.map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>

                                <div className="mt-12 border-t border-[#343536]/10 pt-8">
                                    <Link
                                        to="/"
                                        className="inline-flex items-center gap-2 font-semibold text-[#e87928] transition-colors hover:text-[#343536]"
                                    >
                                        Back to Home
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </article>

                            {/* More Articles Sidebar */}
                            <aside className="lg:sticky lg:top-28">
                                <div className="border-b border-[#343536]/15 pb-5">
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e87928]">
                                        Keep Exploring
                                    </p>

                                    <h2 className="text-2xl font-semibold tracking-tight text-[#343536]">
                                        More Articles
                                    </h2>
                                </div>

                                <div className="divide-y divide-[#343536]/10">
                                    {blogPosts
                                        .filter((post) => post.slug !== selectedPost.slug)
                                        .map((post) => (
                                            <Link
                                                key={post.id}
                                                to={`/blog/${post.slug}`}
                                                className="group flex gap-4 py-6"
                                            >
                                                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#eeeae1]">
                                                    <img
                                                        src={post.image}
                                                        alt={post.title}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </div>

                                                <div className="min-w-0">
                                                    <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-[#e87928]">
                                                        {post.category}
                                                    </span>

                                                    <h3 className="text-sm font-semibold leading-6 text-[#343536] transition-colors group-hover:text-[#e87928]">
                                                        {post.title}
                                                    </h3>

                                                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#343536]/60">
                                                        Read Article
                                                        <ArrowRight size={13} />
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                </div>
                            </aside>
                        </div>
                    ) : (
                        /* Original Blog Listing: shown when the slug is missing or invalid */
                        <>
                            <div className="mb-12 max-w-2xl">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e87928]">
                                    The MHR Journal
                                </p>

                                <h2 className="text-3xl font-semibold tracking-tight text-[#343536] sm:text-4xl">
                                    Ideas worth exploring.
                                </h2>
                            </div>

                            <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(240px,1fr)] lg:gap-10 xl:gap-14">

                                {/* Featured Post */}
                                <article>
                                    <Link
                                        to={`/blog/${featuredPost.slug}`}
                                        className="group block"
                                    >
                                        <div className="mb-7 overflow-hidden rounded-2xl">
                                            <img
                                                src={featuredPost.image}
                                                alt={featuredPost.title}
                                                className="h-auto max-h-[500px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                            />
                                        </div>

                                        <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[#343536]/65">
                                            <span className="font-semibold text-[#e87928]">
                                                {featuredPost.category}
                                            </span>

                                            <span className="inline-flex items-center gap-2">
                                                <CalendarDays size={15} />
                                                {featuredPost.date}
                                            </span>

                                            <span className="inline-flex items-center gap-2">
                                                <Clock3 size={15} />
                                                {featuredPost.readTime}
                                            </span>
                                        </div>

                                        <h3 className="mb-4 text-2xl font-semibold leading-tight text-[#343536] transition-colors group-hover:text-[#e87928] sm:text-3xl">
                                            {featuredPost.title}
                                        </h3>

                                        <p className="mb-6 max-w-3xl leading-8 text-[#343536]/75">
                                            {featuredPost.excerpt}
                                        </p>

                                        <span className="inline-flex items-center gap-2 font-semibold text-[#e87928]">
                                            Read Article
                                            <ArrowRight size={18} />
                                        </span>
                                    </Link>
                                </article>

                                {/* Articles Sidebar */}
                                <aside>
                                    <div className="border-b border-[#343536]/15 pb-5">
                                        <h2 className="text-2xl font-semibold tracking-tight text-[#343536]">
                                            More Articles
                                        </h2>
                                    </div>

                                    <div className="divide-y divide-[#343536]/10">
                                        {remainingPosts.map((post) => (
                                            <Link
                                                key={post.id}
                                                to={`/blog/${post.slug}`}
                                                className="group flex gap-4 py-6"
                                            >
                                                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#eeeae1]">
                                                    <img
                                                        src={post.image}
                                                        alt={post.title}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </div>

                                                <div className="min-w-0">
                                                    <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-[#e87928]">
                                                        {post.category}
                                                    </span>

                                                    <h3 className="text-sm font-semibold leading-6 text-[#343536] transition-colors group-hover:text-[#e87928]">
                                                        {post.title}
                                                    </h3>

                                                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#343536]/60">
                                                        Read Article
                                                        <ArrowRight size={13} />
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </aside>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <Cta
                eyebrow="PLANNING A RENOVATION?"
                title="Let's bring your ideas to life."
                description="Have a project in mind? Talk to our team about creating a space that works for you."
                buttonText="Start your project"
                buttonLink="/contact"
            />
            <Footer />
        </>
    );
}

