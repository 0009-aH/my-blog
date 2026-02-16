import RSS from 'rss';
import { sanityFetch } from '@/sanity/lib/fetch';
import { groq } from 'next-sanity';

export async function GET() {
  const feed = new RSS({
    title: 'Peng Ji\'s Blog',
    description: 'The personal blog of Peng Ji (0009-aH).',
    site_url: 'https://my-tech-blog.com', // Replace with your production URL
    feed_url: 'https://my-tech-blog.com/feed.xml', // Replace with your production URL
    copyright: `${new Date().getFullYear()} Peng Ji`,
    language: 'en',
    pubDate: new Date(),
  });

  try {
    const posts = await sanityFetch<any[]>({
      query: groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...20] {
        title,
        "slug": slug.current,
        publishedAt,
        "author": author,
        "categories": categories
      }`,
      tags: ['post'],
    });

    posts.forEach((post) => {
      feed.item({
        title: post.title,
        url: `https://my-tech-blog.com/blog/${post.slug}`, // Replace with your production URL
        date: post.publishedAt,
        description: post.title, // Fallback since we don't have a dedicated description field yet
        author: post.author,
        categories: post.categories,
      });
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
