import { MetadataRoute } from 'next';

const BASE_URL = 'https://my-tech-blog.com'; // Replace with actual domain

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
