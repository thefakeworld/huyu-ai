import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import type { User, Session } from '@/types/auth'

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const combinedData = new Uint8Array(data.length + salt.length)
  combinedData.set(data)
  combinedData.set(salt, data.length)
  const hashBuffer = await crypto.subtle.digest('SHA-256', combinedData)
  const hashArray = new Uint8Array(hashBuffer)
  const result = new Uint8Array(salt.length + hashArray.length)
  result.set(salt)
  result.set(hashArray, salt.length)
  return btoa(String.fromCharCode(...result))
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const combined = Uint8Array.from(atob(hashedPassword), c => c.charCodeAt(0))
    const salt = combined.slice(0, 16)
    const storedHash = combined.slice(16)
    const combinedData = new Uint8Array(data.length + salt.length)
    combinedData.set(data)
    combinedData.set(salt, data.length)
    const hashBuffer = await crypto.subtle.digest('SHA-256', combinedData)
    const hashArray = new Uint8Array(hashBuffer)
    if (hashArray.length !== storedHash.length) return false
    for (let i = 0; i < hashArray.length; i++) {
      if (hashArray[i] !== storedHash[i]) return false
    }
    return true
  } catch {
    return false
  }
}

export function generateToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32))
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('')
}

export const COOKIE_NAME = 'auth_session'

export async function setSessionCookie(token: string, rememberMe: boolean = false): Promise<void> {
  const cookieStore = await cookies()
  const maxAge = rememberMe ? 7 * 24 * 60 * 60 : 24 * 60 * 60
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge,
    path: '/',
  })
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value
}

export async function createSession(userId: string, rememberMe: boolean = false): Promise<Session> {
  const token = generateToken()
  const expiresAt = new Date(Date.now() + (rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000))
  return db.session.create({
    data: { userId, token, expiresAt },
  })
}

export async function getSession(token: string): Promise<{ session: Session; user: User } | null> {
  const session = await db.session.findUnique({
    where: { token },
    include: { user: true },
  })
  if (!session) return null
  if (session.expiresAt < new Date()) {
    await db.session.delete({ where: { token } })
    return null
  }
  return { session, user: session.user as User }
}

export async function deleteSession(token: string): Promise<void> {
  try {
    await db.session.delete({ where: { token } })
  } catch { /* ignore */ }
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPassword(password: string): { valid: boolean; message: string } {
  if (password.length < 8) return { valid: false, message: '密码长度至少为8位' }
  return { valid: true, message: '' }
}

export function formatUser(user: { id: string; email: string; name: string | null; avatar: string | null; provider: string | null; createdAt: Date; updatedAt: Date }): User {
  return { id: user.id, email: user.email, name: user.name, avatar: user.avatar, provider: user.provider, createdAt: user.createdAt, updatedAt: user.updatedAt }
}
