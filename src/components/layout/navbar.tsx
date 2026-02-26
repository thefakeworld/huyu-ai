'use client'

import { useSyncExternalStore } from 'react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth-store'
import { UserAvatar } from '@/components/auth/auth-provider'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LayoutGrid, User, LogOut, Menu, X, Sparkles } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { id: 'home', label: '首页', href: '/', icon: Home },
  { id: 'examples', label: '案例广场', href: '/examples', icon: LayoutGrid },
  { id: 'user', label: '用户中心', href: '/user', icon: User },
]

function useIsClient() {
  return useSyncExternalStore(() => () => {}, () => true, () => false)
}

export function Navbar() {
  const isClient = useIsClient()
  const pathname = usePathname()
  const { isAuthenticated, user, logout } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const handleLogout = async () => { await logout() }

  if (!isClient) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Z.ai Logo" className="w-8 h-8" />
          <span className="font-bold text-xl hidden sm:inline">Z.ai</span>
          <Sparkles className="w-4 h-4 text-primary hidden sm:inline" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Button key={item.id} variant={active ? 'secondary' : 'ghost'} size="sm" asChild className="gap-2">
                <Link href={item.href}>
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </Button>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-medium">{user?.name || '用户'}</span>
                <span className="text-xs text-muted-foreground">{user?.email}</span>
              </div>
              <UserAvatar user={user} size="sm" />
              <Button variant="ghost" size="icon" onClick={handleLogout} title="退出登录">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button variant="default" size="sm" asChild>
              <Link href="/login">登录</Link>
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {sidebarOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-2 flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Button
                  key={item.id}
                  variant={active ? 'secondary' : 'ghost'}
                  size="sm"
                  asChild
                  className="gap-2 justify-start"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Link href={item.href}>
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </Button>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t py-6 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Z.ai Logo" className="w-6 h-6" />
            <span className="text-sm text-muted-foreground">© 2024 Z.ai Code Scaffold. Powered by AI.</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="https://chat.z.ai" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Z.ai 官网</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
