import { NextResponse } from 'next/server'
import { checkMetaHealth } from '@/lib/meta/health'

export const dynamic = 'force-dynamic'

export async function GET() {
  const report = await checkMetaHealth()
  return NextResponse.json(report, { status: report.ok ? 200 : 500 })
}
