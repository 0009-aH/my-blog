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
      <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post._id} className="border-b border-gray-100 dark:border-gray-800 pb-8 last:border-0 hover:opacity-80 transition-opacity">
            <Link href={`/blog/${post.slug.current}`} className="block">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <div className="flex items-center text-sm text-gray-500 mb-3 gap-4">
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString()}
                </time>
                {post.categories && (
                  <div className="flex gap-2">
                    {post.categories.map((category: string) => (
                      <span key={category} className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs">{category}</span>
                    ))}
                  </div>
                )}
              </div>
              {/* Description is not in the schema yet, using title or excerpt if available. For now removing description until added to schema */}
            </Link>
          </article>
        ))}
        {posts.length === 0 && (
          <p className="text-gray-500">No posts found.</p>
        )}
      </div>
    </section>
  );
}
