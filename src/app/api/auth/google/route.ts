import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSession, setSessionCookie, formatUser } from '@/lib/auth-utils'
import type { AuthResponse } from '@/types/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, googleId, avatar } = body
    if (!email || !googleId) return NextResponse.json<AuthResponse>({ success: false, error: 'Google登录信息不完整' }, { status: 400 })
    let user = await db.user.findFirst({ where: { provider: 'google', providerId: googleId } })
    if (!user) {
      user = await db.user.findUnique({ where: { email } })
      if (user) {
        user = await db.user.update({ where: { id: user.id }, data: { provider: 'google', providerId: googleId, avatar: avatar || user.avatar } })
      } else {
        user = await db.user.create({ data: { email, name: name || null, avatar: avatar || null, provider: 'google', providerId: googleId } })
      }
    }
    const session = await createSession(user.id, false)
    await setSessionCookie(session.token, false)
    return NextResponse.json<AuthResponse>({ success: true, user: formatUser(user) })
  } catch {
    return NextResponse.json<AuthResponse>({ success: false, error: 'Google登录失败，请稍后重试' }, { status: 500 })
  }
}
