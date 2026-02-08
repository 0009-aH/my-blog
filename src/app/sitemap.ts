import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';

const BASE_URL = 'https://my-tech-blog.com'; // Replace with actual domain

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts();

    const postsUrls = posts.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.meta.date),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...postsUrls,
    ];
}
