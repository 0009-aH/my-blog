import Link from 'next/link';
import Image from 'next/image';
import { sanityFetch } from '@/sanity/lib/fetch';
import { POSTS_QUERY } from '@/sanity/lib/queries';
import { SanityDocument } from 'next-sanity';
import { urlForImage } from '@/sanity/lib/image';

export default async function Home() {
  const posts = await sanityFetch<SanityDocument[]>({
    query: POSTS_QUERY,
  });

  return (
    <section className="py-12">
      <h1 className="text-4xl font-bold mb-12 text-zinc-900 dark:text-zinc-50 tracking-tight">Latest Posts</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => {
          const coverUrl = post.mainImage
            ? urlForImage(post.mainImage).width(1200).height(630).url()
            : `/api/cover?title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.excerpt || '')}`;

          return (
            <article key={post._id} className="group relative flex flex-col h-full bg-white dark:bg-zinc-900/50 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden hover:border-blue-500 dark:hover:border-blue-500 transition-colors duration-300">
              <Link href={`/blog/${post.slug.current}`} className="block flex-1 flex flex-col">
                <div className="aspect-video relative w-full overflow-hidden">
                  <Image
                    src={coverUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 mb-3">
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

                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>

                  {post.excerpt && (
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            </article>
          );
        })}
        {posts.length === 0 && (
          <p className="text-zinc-500 text-center py-12 col-span-full">No posts found.</p>
        )}
      </div>
    </section>
  );
}
