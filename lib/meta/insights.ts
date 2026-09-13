import { metaFetch } from './client'

export type MetaInsightsRow = {
  impressions?: string
  clicks?: string
  spend?: string
  actions?: Array<{ action_type: string; value: string }>
  cost_per_action_type?: Array<{ action_type: string; value: string }>
  date_start?: string
  date_stop?: string
}

export type AdInsights = {
  impressions: number
  clicks: number
  spendPkr: number
  results: number
  costPerResultPkr: number | null
  dateStart?: string
  dateStop?: string
  raw: MetaInsightsRow | null
}

const RESULT_ACTION_TYPES = new Set([
  'onsite_conversion.messaging_conversation_started_7d',
  'onsite_conversion.messaging_first_reply',
  'onsite_conversion.total_messaging_connection',
  'click_to_whatsapp',
])

function sumActions(actions?: Array<{ action_type: string; value: string }>): number {
  if (!actions) return 0
  return actions
    .filter((a) => RESULT_ACTION_TYPES.has(a.action_type))
    .reduce((sum, a) => sum + Number(a.value ?? 0), 0)
}

function averageCost(costs?: Array<{ action_type: string; value: string }>): number | null {
  if (!costs) return null
  const values = costs.filter((c) => RESULT_ACTION_TYPES.has(c.action_type)).map((c) => Number(c.value))
  if (values.length === 0) return null
  const total = values.reduce((s, v) => s + v, 0)
  return total / values.length
}

export async function getAdInsights(
  adId: string,
  datePreset: 'today' | 'yesterday' | 'last_7d' | 'last_30d' | 'lifetime' = 'lifetime',
): Promise<AdInsights> {
  const res = await metaFetch<{ data: MetaInsightsRow[] }>(`/${adId}/insights`, {
    query: {
      fields: 'impressions,clicks,spend,actions,cost_per_action_type,date_start,date_stop',
      date_preset: datePreset,
      level: 'ad',
    },
  })

  const row = res.data?.[0] ?? null

  return {
    impressions: Number(row?.impressions ?? 0),
    clicks: Number(row?.clicks ?? 0),
    spendPkr: Number(row?.spend ?? 0),
    results: sumActions(row?.actions),
    costPerResultPkr: averageCost(row?.cost_per_action_type),
    dateStart: row?.date_start,
    dateStop: row?.date_stop,
    raw: row,
  }
}
