import { NextResponse } from 'next/server'
import { getSessionToken, deleteSession, clearSessionCookie } from '@/lib/auth-utils'
import type { AuthResponse } from '@/types/auth'

export async function POST() {
  try {
    const token = await getSessionToken()
    if (token) await deleteSession(token)
    await clearSessionCookie()
    return NextResponse.json<AuthResponse>({ success: true })
  } catch {
    await clearSessionCookie()
    return NextResponse.json<AuthResponse>({ success: true })
  }
}
