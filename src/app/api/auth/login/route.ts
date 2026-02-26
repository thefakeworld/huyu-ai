import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyPassword, isValidEmail, createSession, setSessionCookie, formatUser } from '@/lib/auth-utils'
import type { AuthResponse } from '@/types/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, rememberMe } = body
    if (!email || !password) return NextResponse.json<AuthResponse>({ success: false, error: '请输入邮箱和密码' }, { status: 400 })
    if (!isValidEmail(email)) return NextResponse.json<AuthResponse>({ success: false, error: '请输入有效的邮箱地址' }, { status: 400 })
    const user = await db.user.findUnique({ where: { email } })
    if (!user) return NextResponse.json<AuthResponse>({ success: false, error: '邮箱或密码错误' }, { status: 401 })
    if (!user.password) return NextResponse.json<AuthResponse>({ success: false, error: '该账户使用第三方登录，请使用对应的登录方式' }, { status: 401 })
    const isValid = await verifyPassword(password, user.password)
    if (!isValid) return NextResponse.json<AuthResponse>({ success: false, error: '邮箱或密码错误' }, { status: 401 })
    const session = await createSession(user.id, rememberMe)
    await setSessionCookie(session.token, rememberMe)
    return NextResponse.json<AuthResponse>({ success: true, user: formatUser(user) })
  } catch {
    return NextResponse.json<AuthResponse>({ success: false, error: '登录失败，请稍后重试' }, { status: 500 })
  }
}
