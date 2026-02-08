import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define the directory where posts are stored
const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export type PostMeta = {
    title: string;
    date: string;
    description?: string;
    tags?: string[];
    [key: string]: any;
};

export type Post = {
    slug: string;
    meta: PostMeta;
    content: string;
};

export function getPostSlugs() {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string): Post {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug: realSlug,
        meta: data as PostMeta,
        content,
    };
}

export function getAllPosts(): Post[] {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
    return posts;
}
