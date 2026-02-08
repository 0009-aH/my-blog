import { client } from './client';
import { type QueryParams } from 'next-sanity';

export async function sanityFetch<QueryResponse>({
    query,
    params = {},
    tags,
}: {
    query: string;
    params?: QueryParams;
    tags?: string[];
}) {
    return client.fetch<QueryResponse>(query, params, {
        next: {
            revalidate: 30, // for simple cache revalidation
            tags,
        },
    });
}
