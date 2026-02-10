'use client';

import {
    KBarProvider,
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    KBarSearch,
    KBarResults,
    useMatches,
    Action,
    useRegisterActions,
} from 'kbar';
import { useRouter } from 'next/navigation';

interface SearchProviderProps {
    children: React.ReactNode;
    posts: Array<{
        title: string;
        slug: { current: string };
        publishedAt: string;
    }>;
}

function PostActions({ posts }: { posts: SearchProviderProps['posts'] }) {
    const router = useRouter();

    useRegisterActions(
        posts.map((post) => ({
            id: post.slug.current,
            name: post.title,
            keywords: `post blog article ${post.title}`,
            subtitle: new Date(post.publishedAt).toLocaleDateString(),
            perform: () => router.push(`/blog/${post.slug.current}`),
        })),
        [posts, router]
    );

    return null;
}

export default function SearchProvider({ children, posts }: SearchProviderProps) {
    const router = useRouter();

    const staticActions: Action[] = [
        {
            id: 'home',
            name: 'Home',
            shortcut: ['h'],
            keywords: 'home index',
            perform: () => router.push('/'),
        },
        {
            id: 'about',
            name: 'About',
            shortcut: ['a'],
            keywords: 'about me contact',
            perform: () => router.push('/about'),
        },
    ];

    return (
        <KBarProvider actions={staticActions}>
            <PostActions posts={posts} />
            <KBarPortal>
                <KBarPositioner className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[15vh] p-4">
                    <KBarAnimator className="w-full max-w-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden transform transition-all">
                        <KBarSearch className="w-full px-4 py-4 bg-transparent border-b border-gray-200 dark:border-zinc-800 outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 font-medium" placeholder="Type a command or search..." />
                        <RenderResults />
                    </KBarAnimator>
                </KBarPositioner>
            </KBarPortal>
            {children}
        </KBarProvider>
    );
}

function RenderResults() {
    const { results } = useMatches();

    return (
        <KBarResults
            items={results}
            onRender={({ item, active }) =>
                typeof item === 'string' ? (
                    <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {item}
                    </div>
                ) : (
                    <div
                        className={`px-4 py-3 flex items-center justify-between cursor-pointer transition-colors ${active
                                ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-100'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800/50'
                            }`}
                    >
                        <div className="flex flex-col">
                            <span className="font-medium">{item.name}</span>
                            {item.subtitle && (
                                <span className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                                    {item.subtitle}
                                </span>
                            )}
                        </div>
                        {item.shortcut && (
                            <div className="flex gap-1">
                                {item.shortcut.map((sc) => (
                                    <kbd
                                        key={sc}
                                        className="px-2 py-1 bg-gray-200 dark:bg-zinc-700 rounded text-xs font-mono text-gray-600 dark:text-gray-300"
                                    >
                                        {sc}
                                    </kbd>
                                ))}
                            </div>
                        )}
                    </div>
                )
            }
        />
    );
}
