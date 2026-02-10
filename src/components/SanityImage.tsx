'use client';

import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';

export const SanityImage = ({ value }: { value: any }) => {
    if (!value?.asset?._ref) {
        return null;
    }

    return (
        <figure className="my-8">
            <Image
                src={urlForImage(value).url()}
                width={800}
                height={500}
                alt={value.alt || 'Blog post image'}
                className="rounded-lg shadow-md w-full h-auto"
            />
            {value.caption && (
                <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                    {value.caption}
                </figcaption>
            )}
        </figure>
    );
};
