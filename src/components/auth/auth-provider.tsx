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
  
  // 未登录状态
  if (!user) {
    return (
      <div className={`${sizeClasses[size]} rounded-full bg-muted flex items-center justify-center`}>
        <span className="text-muted-foreground">?</span>
      </div>
    )
  }
  
  // 有头像则显示头像
  if (user.avatar && user.avatar.trim() !== '') {
    return (
      <img 
        src={user.avatar} 
        alt={user.name || user.email || '用户头像'} 
        className={`${sizeClasses[size]} rounded-full object-cover`}
        onError={(e) => {
          // 头像加载失败时隐藏图片，显示首字母
          e.currentTarget.style.display = 'none'
          if (e.currentTarget.nextSibling) {
            (e.currentTarget.nextSibling as HTMLElement).style.display = 'flex'
          }
        }}
      />
    )
  }
  
  // 没有头像则显示首字母
  const getInitials = () => {
    if (user.name && user.name.trim() !== '') {
      return user.name.trim().slice(0, 2).toUpperCase()
    }
    if (user.email && user.email.trim() !== '') {
      return user.email.trim().slice(0, 2).toUpperCase()
    }
    return 'U'
  }
  
  return (
    <div className={`${sizeClasses[size]} rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium`}>
      {getInitials()}
    </div>
  )
}
