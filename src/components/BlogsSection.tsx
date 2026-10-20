
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blogData';
import { useContent } from '../adminPanel/features/contentContext';
import { useEffect } from 'react';

export function BlogPreview() {
  const recentPosts = [...blogPosts].slice(0, 3);

  const slug = "home";
  const { sectionsBySlug, loadSectionsBySlug, loading, media } = useContent();

  useEffect(() => {
    loadSectionsBySlug(slug);
  }, [slug]);
  const getExcerpt = (text: string, maxWords = 30) => {
    const words = text.trim().split(/\s+/);

    if (words.length <= maxWords) return text;

    return `${words.slice(0, maxWords).join(' ')}...`;
  };

  if (loading && !sectionsBySlug[slug]) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p className="text-xl font-bold">Loading...</p>
      </div>
    );
  }

  const blogs = sectionsBySlug[slug]?.["Blogs"]?.blocks;

  return (
    <section className="bg-[#f7f6f2] px-5 py-20 text-[#343536] sm:px-8 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e87928] sm:text-xs">
              <span className="h-px w-8 bg-[#e87928]" />
              {blogs?.heading1?.text}
            </p>

            <h2 className="max-w-2xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {blogs?.heading2?.text}{' '}
              <span className="font-normal italic text-[#e87928]">
                {blogs?.heading3?.text}
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:items-end">
            <p className="max-w-sm text-sm leading-7 text-[#343536]/65 sm:text-right">
              {blogs?.paragraph1?.text}
            </p>

            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors hover:text-[#e87928]"
            >
              View all articles
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Blog cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {recentPosts.map((post) => (
            <article
              key={post.id}
              className="group flex h-full flex-col overflow-hidden border border-[#343536]/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#e87928]/35 hover:shadow-xl"
            >
              <Link
                to={`/blogs/${post.slug}`}
                className="relative block aspect-[4/3] overflow-hidden bg-[#eeeae1]"
                aria-label={`Read ${post.title}`}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />

                <span className="absolute bottom-0 left-0 bg-[#e87928] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-white">
                  {post.category}
                </span>
              </Link>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="font-serif text-2xl leading-snug transition-colors duration-300 group-hover:text-[#e87928]">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#343536]/65">
                  {getExcerpt(post.excerpt, 30)}
                </p>

                <div className="mt-auto pt-6">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-3 border-b border-[#e87928]/50 pb-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors hover:border-[#e87928] hover:text-[#e87928]"
                  >
                    Read article
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default BlogPreview;
