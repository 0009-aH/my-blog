import { ImageResponse } from 'next/og';
import { sanityFetch } from '@/sanity/lib/fetch';
import { groq } from 'next-sanity';

export const runtime = 'edge';

// Image metadata
export const alt = 'Blog Post Image';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

// Data fetching
async function getPost(slug: string) {
    return sanityFetch<{ title: string; publishedAt: string; author?: { name: string } }>({
        query: groq`*[_type == "post" && slug.current == $slug][0]{
      title,
      publishedAt,
      author->{name}
    }`,
        params: { slug },
    });
}

export default async function Image({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug);

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 60,
                    background: 'linear-gradient(to bottom right, #1a1a1a, #2d2d2d)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    padding: '80px',
                    color: 'white',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    <div
                        style={{
                            backgroundImage: 'linear-gradient(to right, #a855f7, #3b82f6)',
                            backgroundClip: 'text',
                            color: 'transparent',
                            fontSize: 32,
                            fontWeight: 700,
                            marginBottom: 20,
                        }}
                    >
                        My Tech Blog
                    </div>
                    <div
                        style={{
                            fontSize: 80,
                            fontWeight: 900,
                            lineHeight: 1.1,
                            marginBottom: 40,
                            letterSpacing: '-0.02em',
                            // Use a max-width to ensure text wrapping if title is long
                            maxWidth: '1000px',
                        }}
                    >
                        {post?.title || 'Blog Post'}
                    </div>
                    <div
                        style={{
                            fontSize: 30,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            opacity: 0.8,
                        }}
                    >
                        {post?.author?.name && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {post.author.name}
                            </div>
                        )}
                        {post?.publishedAt && (
                            <>
                                <div style={{ width: 4, height: 4, background: 'currentColor', borderRadius: '50%' }} />
                                <div>{new Date(post.publishedAt).toLocaleDateString('en-US', { dateStyle: 'long' })}</div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
