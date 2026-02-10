'use client';

import { PortableText } from '@portabletext/react';
import { SanityImage } from '@/components/SanityImage';

const components = {
    types: {
        image: SanityImage,
    },
};

export function PostBody({ headers, content }: { headers?: any, content: any }) {
    return (
        <div className="prose dark:prose-invert">
            <PortableText value={content} components={components} />
        </div>
    );
}
