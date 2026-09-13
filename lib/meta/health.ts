import { metaFetch } from './client'
import { MetaApiError } from './errors'

export type MetaHealthReport = {
  ok: boolean
  stages: Record<string, string>
  identity?: { id: string; name?: string }
  scopes?: string[]
  business?: { id: string; name?: string }
  error?: string
}

export async function checkMetaHealth(): Promise<MetaHealthReport> {
  const stages: Record<string, string> = {}

  try {
    stages.env = 'ok'
    const identity = await metaFetch<{ id: string; name?: string }>('/me', { query: { fields: 'id,name' } })
    stages.identity = 'ok'

    const perms = await metaFetch<{ data: Array<{ permission: string; status: string }> }>('/me/permissions')
    const granted = perms.data.filter((p) => p.status === 'granted').map((p) => p.permission)
    stages.scopes = `granted: ${granted.length}`

    const required = [
      'ads_management',
      'ads_read',
      'business_management',
      'pages_show_list',
      'pages_read_engagement',
      'pages_manage_ads',
    ]
    const missing = required.filter((r) => !granted.includes(r))
    if (missing.length) {
      stages.scopes = `missing: ${missing.join(', ')}`
      return {
        ok: false,
        stages,
        identity,
        scopes: granted,
        error: `Token is valid but missing scopes: ${missing.join(', ')}. Re-generate the system-user token with all six permissions checked.`,
      }
    }

    const businessId = process.env.META_BUSINESS_ID!
    const business = await metaFetch<{ id: string; name?: string }>(`/${businessId}`, { query: { fields: 'id,name' } })
    stages.business = 'ok'

    return { ok: true, stages, identity, scopes: granted, business }
  } catch (err) {
    if (err instanceof MetaApiError) {
      return {
        ok: false,
        stages,
        error:
          err.userMsg ??
          err.message +
            (err.fbtraceId ? ` (fbtrace_id: ${err.fbtraceId})` : '') +
            (err.code ? ` [code ${err.code}]` : ''),
      }
    }
    return { ok: false, stages, error: err instanceof Error ? err.message : String(err) }
  }
}
