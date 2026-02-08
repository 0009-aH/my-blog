'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function GiscusComments() {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <Giscus
                id="comments"
                repo="0009-aH/my-blog"
                repoId="R_kgDORLeQ8A"
                category="Announcements"
                categoryId="DIC_kwDORLeQ8M4C2DQy"
                mapping="pathname"
                term="Welcome to @giscus/react component!"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="bottom"
                theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
                lang="zh-CN"
                loading="lazy"
            />
        </div>
    );
}
