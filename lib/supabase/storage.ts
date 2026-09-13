import { randomUUID } from 'node:crypto'

export const AD_MEDIA_BUCKET = 'ad-media'

export function adMediaObjectPath(businessId: string, filename: string): string {
  const clean = filename.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120)
  return `${businessId}/${randomUUID()}-${clean}`
}
