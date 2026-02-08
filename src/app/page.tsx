import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export default function Home() {
  const posts = getAllPosts();

  return (
    <section className="py-12">
      <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-gray-100 dark:border-gray-800 pb-8 last:border-0 hover:opacity-80 transition-opacity">
            <Link href={`/blog/${post.slug}`} className="block">
              <h2 className="text-2xl font-semibold mb-2">{post.meta.title}</h2>
              <div className="flex items-center text-sm text-gray-500 mb-3 gap-4">
                <time dateTime={post.meta.date}>
                  {new Date(post.meta.date).toLocaleDateString()}
                </time>
                {post.meta.tags && (
                  <div className="flex gap-2">
                    {post.meta.tags.map(tag => (
                      <span key={tag} className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                {post.meta.description}
              </p>
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
