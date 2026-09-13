import { createHmac } from 'node:crypto'
import { MetaApiError, type MetaApiErrorBody } from './errors'

type MetaConfig = {
  appId: string
  appSecret: string
  token: string
  businessId: string
  version: string
}

export function getMetaConfig(): MetaConfig {
  const appId = process.env.META_APP_ID
  const appSecret = process.env.META_APP_SECRET
  const token = process.env.META_SYSTEM_USER_TOKEN
  const businessId = process.env.META_BUSINESS_ID
  const version = process.env.META_GRAPH_API_VERSION || 'v21.0'

  const missing = [
    !appId && 'META_APP_ID',
    !appSecret && 'META_APP_SECRET',
    !token && 'META_SYSTEM_USER_TOKEN',
    !businessId && 'META_BUSINESS_ID',
  ].filter(Boolean) as string[]

  if (missing.length) {
    throw new Error(`Missing Meta env vars: ${missing.join(', ')}. Add them to .env.local and restart the dev server.`)
  }

  return { appId: appId!, appSecret: appSecret!, token: token!, businessId: businessId!, version }
}

function appsecretProof(token: string, appSecret: string): string {
  return createHmac('sha256', appSecret).update(token).digest('hex')
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'DELETE'
  query?: Record<string, string | number | boolean | undefined>
  body?: Record<string, unknown> | FormData
}

/**
 * Server-only Meta Graph API client using the system-user token.
 * Adds appsecret_proof automatically to every call.
 */
export async function metaFetch<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
  const cfg = getMetaConfig()
  const proof = appsecretProof(cfg.token, cfg.appSecret)

  const url = new URL(`https://graph.facebook.com/${cfg.version}${path.startsWith('/') ? path : `/${path}`}`)

  if (options.query) {
    for (const [k, v] of Object.entries(options.query)) {
      if (v !== undefined) url.searchParams.set(k, String(v))
    }
  }
  url.searchParams.set('access_token', cfg.token)
  url.searchParams.set('appsecret_proof', proof)

  const init: RequestInit = { method: options.method ?? 'GET' }

  if (options.body instanceof FormData) {
    init.body = options.body
  } else if (options.body) {
    init.headers = { 'Content-Type': 'application/json' }
    init.body = JSON.stringify(options.body)
  }

  const res = await fetch(url.toString(), init)
  const text = await res.text()
  const parsed = text ? safeParse(text) : {}

  if (!res.ok) {
    throw new MetaApiError(res.status, parsed as MetaApiErrorBody, `Meta ${res.status} on ${path}`)
  }

  return parsed as T
}

function safeParse(text: string): unknown {
  try {
    return JSON.parse(text)
  } catch {
    return { raw: text }
  }
}
