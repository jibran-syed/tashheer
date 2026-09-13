export type MetaApiErrorBody = {
  error?: {
    message?: string
    type?: string
    code?: number
    error_subcode?: number
    error_user_title?: string
    error_user_msg?: string
    fbtrace_id?: string
  }
}

export class MetaApiError extends Error {
  readonly status: number
  readonly code?: number
  readonly subcode?: number
  readonly userTitle?: string
  readonly userMsg?: string
  readonly fbtraceId?: string
  readonly raw: unknown

  constructor(status: number, body: MetaApiErrorBody | unknown, fallback: string) {
    const err = (body as MetaApiErrorBody)?.error
    super(err?.message ?? fallback)
    this.name = 'MetaApiError'
    this.status = status
    this.code = err?.code
    this.subcode = err?.error_subcode
    this.userTitle = err?.error_user_title
    this.userMsg = err?.error_user_msg
    this.fbtraceId = err?.fbtrace_id
    this.raw = body
  }
}
