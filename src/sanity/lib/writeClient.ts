import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn } from '../env';
import { token } from './token';

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  token, // Use the write token
  perspective: 'published',
});
