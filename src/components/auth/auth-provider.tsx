'use client'

import { useSyncExternalStore } from 'react'
import type { User } from '@/types/auth'

function useIsClient() {
  return useSyncExternalStore(() => () => {}, () => true, () => false)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const isClient = useIsClient()
  if (!isClient) return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse">加载中...</div></div>
  return <>{children}</>
}

export function UserAvatar({ user, size = 'md' }: { user: User | null; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' }
  if (!user) return <div className={`${sizeClasses[size]} rounded-full bg-muted flex items-center justify-center`}>?</div>
  if (user.avatar) return <img src={user.avatar} alt={user.name || user.email} className={`${sizeClasses[size]} rounded-full object-cover`} />
  const initials = user.name ? user.name.slice(0, 2).toUpperCase() : user.email.slice(0, 2).toUpperCase()
  return <div className={`${sizeClasses[size]} rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium`}>{initials}</div>
}
