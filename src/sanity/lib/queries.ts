import { groq } from 'next-sanity';

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "excerpt": array::join(string::split((pt::text(body)), "")[0..200], "") + "...",
  categories,
  author
}`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
  title,
  slug,
  publishedAt,
  mainImage,
  body,
  categories,
  author
}`;

export const POSTS_SLUG_QUERY = groq`*[_type == "post" && defined(slug.current)][].slug.current`;

export const SEARCH_POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  title,
  slug,
  publishedAt
}`;
