import { NextResponse } from 'next/server'
import { getSessionToken, getSession, formatUser } from '@/lib/auth-utils'
import type { AuthResponse } from '@/types/auth'

export async function GET() {
  try {
    const token = await getSessionToken()
    if (!token) return NextResponse.json<AuthResponse>({ success: false, error: '未登录' }, { status: 401 })
    const result = await getSession(token)
    if (!result) return NextResponse.json<AuthResponse>({ success: false, error: '会话已过期，请重新登录' }, { status: 401 })
    return NextResponse.json<AuthResponse>({ success: true, user: formatUser(result.user) })
  } catch {
    return NextResponse.json<AuthResponse>({ success: false, error: '获取会话失败' }, { status: 500 })
  }
}
