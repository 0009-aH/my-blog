import { getPostBySlug, getPostSlugs } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import GiscusComments from '@/components/GiscusComments';

export async function generateStaticParams() {
    const slugs = getPostSlugs();
    return slugs.map((slug) => ({ slug: slug.replace(/\.mdx$/, '') }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const post = getPostBySlug(slug);

    const options = {
        mdxOptions: {
            rehypePlugins: [
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                [rehypePrettyCode, { theme: 'github-dark' }]
            ],
        },
    };

    return (
        <article className="prose prose-lg dark:prose-invert mx-auto py-12">
            <header className="mb-8 text-center not-prose">
                <h1 className="text-4xl font-bold mb-4">{post.meta.title}</h1>
                <div className="text-gray-500 text-sm flex justify-center gap-4">
                    <time dateTime={post.meta.date}>{new Date(post.meta.date).toLocaleDateString()}</time>
                    {post.meta.tags && (
                        <div className="flex gap-2">
                            {post.meta.tags.map(tag => <span key={tag}>#{tag}</span>)}
                        </div>
                    )}
                </div>
            </header>
            {/* @ts-expect-error Server Component */}
            <MDXRemote source={post.content} options={options} />
            <GiscusComments />
        </article>
    );
}
