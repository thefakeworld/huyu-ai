'use client'

import { useSyncExternalStore } from 'react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth-store'
import { useAppStore, type ViewType } from '@/stores/app-store'
import { UserAvatar } from '@/components/auth/auth-provider'
import { Home, LayoutGrid, User, LogOut, Menu, X, Sparkles } from 'lucide-react'

const navItems: { id: ViewType; label: string; icon: typeof Home }[] = [
  { id: 'home', label: '首页', icon: Home },
  { id: 'examples', label: '案例广场', icon: LayoutGrid },
  { id: 'user', label: '用户中心', icon: User },
]

function useIsClient() {
  return useSyncExternalStore(() => () => {}, () => true, () => false)
}

export function Navbar() {
  const isClient = useIsClient()
  const { currentView, setView, sidebarOpen, toggleSidebar } = useAppStore()
  const { isAuthenticated, user, logout } = useAuthStore()

  const handleNavClick = (view: ViewType) => {
    setView(view)
    if (sidebarOpen) toggleSidebar()
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
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('home')}>
          <img src="/logo.svg" alt="Z.ai Logo" className="w-8 h-8" />
          <span className="font-bold text-xl hidden sm:inline">Z.ai</span>
          <Sparkles className="w-4 h-4 text-primary hidden sm:inline" />
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Button key={item.id} variant={currentView === item.id ? 'secondary' : 'ghost'} size="sm" onClick={() => handleNavClick(item.id)} className="gap-2">
                <Icon className="w-4 h-4" />
                {item.label}
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
            <Button variant="default" size="sm" onClick={() => handleNavClick('user')}>登录</Button>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {sidebarOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-2 flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button key={item.id} variant={currentView === item.id ? 'secondary' : 'ghost'} size="sm" onClick={() => handleNavClick(item.id)} className="gap-2 justify-start">
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}

export function PageContainer({ children }: { children: React.ReactNode }) {
  return <main className="flex-1"><div className="container mx-auto px-4 py-6">{children}</div></main>
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
