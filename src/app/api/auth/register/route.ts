import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hashPassword, isValidEmail, isValidPassword, createSession, setSessionCookie, formatUser } from '@/lib/auth-utils'
import type { AuthResponse } from '@/types/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name } = body
    if (!email || !isValidEmail(email)) return NextResponse.json<AuthResponse>({ success: false, error: '请输入有效的邮箱地址' }, { status: 400 })
    const passwordValidation = isValidPassword(password)
    if (!password || !passwordValidation.valid) return NextResponse.json<AuthResponse>({ success: false, error: passwordValidation.message || '密码格式不正确' }, { status: 400 })
    const existingUser = await db.user.findUnique({ where: { email } })
    if (existingUser) return NextResponse.json<AuthResponse>({ success: false, error: '该邮箱已被注册' }, { status: 400 })
    const hashedPassword = await hashPassword(password)
    const user = await db.user.create({ data: { email, password: hashedPassword, name: name || null } })
    const session = await createSession(user.id, false)
    await setSessionCookie(session.token, false)
    return NextResponse.json<AuthResponse>({ success: true, user: formatUser(user) })
  } catch {
    return NextResponse.json<AuthResponse>({ success: false, error: '注册失败，请稍后重试' }, { status: 500 })
  }
}
