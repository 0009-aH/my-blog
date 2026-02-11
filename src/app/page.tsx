import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/fetch';
import { POSTS_QUERY } from '@/sanity/lib/queries';
import { SanityDocument } from 'next-sanity';

export default async function Home() {
  const posts = await sanityFetch<SanityDocument[]>({
    query: POSTS_QUERY,
  });

  return (
    <section className="py-12">
      <h1 className="text-4xl font-bold mb-12 text-zinc-900 dark:text-zinc-50 tracking-tight">Latest Posts</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <article key={post._id} className="group relative">
            <Link href={`/blog/${post.slug.current}`} className="block p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-transparent hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-all duration-300">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  {post.categories && (
                    <div className="flex gap-2">
                      {post.categories.map((category: string) => (
                        <span key={category} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                          {category}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>

                {/* Description placeholder - if you add description to schema later, enable this */}
                {/* <p className="text-zinc-600 dark:text-zinc-400 line-clamp-2">
                  {post.description}
                </p> */}
              </div>
            </Link>
          </article>
        ))}
        {posts.length === 0 && (
          <p className="text-zinc-500 text-center py-12">No posts found.</p>
        )}
      </div>
    </section>
  );
}
