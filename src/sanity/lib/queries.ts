import { groq } from 'next-sanity';

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
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
