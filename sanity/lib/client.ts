import { createClient, type SanityClient } from '@sanity/client';
import { projectId, dataset, apiVersion } from '../env';

// CAVEMAN: no projectId = no Sanity yet, queries fall back to placeholder
export function getClient(): SanityClient | null {
  if (!projectId) return null;
  return createClient({ projectId, dataset, apiVersion, useCdn: true });
}
