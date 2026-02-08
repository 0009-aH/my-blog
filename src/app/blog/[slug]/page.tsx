import { sanityFetch } from '@/sanity/lib/fetch';
import { POST_QUERY, POSTS_SLUG_QUERY } from '@/sanity/lib/queries';
import { PortableText, type SanityDocument } from 'next-sanity';
import GiscusComments from '@/components/GiscusComments';

export async function generateStaticParams() {
    const slugs = await sanityFetch<string[]>({
        query: POSTS_SLUG_QUERY,
        tags: ['post'],
    });
    return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const post = await sanityFetch<SanityDocument>({
        query: POST_QUERY,
        params: { slug },
        tags: ['post'],
    });

    if (!post) {
        return (
            <div className="container mx-auto py-12 text-center">
                <h1 className="text-4xl font-bold">Post not found</h1>
            </div>
        );
    }

    return (
        <article className="prose prose-lg dark:prose-invert mx-auto py-12">
            <header className="mb-8 text-center not-prose">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div className="text-gray-500 text-sm flex justify-center gap-4">
                    <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString()}</time>
                    {post.categories && (
                        <div className="flex gap-2">
                            {post.categories.map((category: string) => <span key={category}>#{category}</span>)}
                        </div>
                    )}
                </div>
            </header>
            <div className="prose dark:prose-invert">
                {post.body ? <PortableText value={post.body} /> : null}
            </div>
            <GiscusComments />
        </article>
    );
}
