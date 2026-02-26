'use client'

import { useSyncExternalStore, useEffect } from 'react'
import { Navbar, PageContainer, Footer } from '@/components/layout/navbar'
import { HomePage } from '@/components/pages/home-page'
import { ExamplesPage } from '@/components/pages/examples-page'
import { UserPage } from '@/components/pages/user-page'
import { WebSocketDemo } from '@/components/pages/websocket-demo'
import { useAppStore } from '@/stores/app-store'
import { useAuthStore } from '@/stores/auth-store'

function useIsClient() {
  return useSyncExternalStore(() => () => {}, () => true, () => false)
}

function AppContent() {
  const isClient = useIsClient()
  const { currentView, currentDemo } = useAppStore()
  const { checkAuth, isLoading: authLoading } = useAuthStore()

  useEffect(() => {
    if (isClient) checkAuth()
  }, [isClient, checkAuth])

  if (!isClient || authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <PageContainer>
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">加载中...</p>
            </div>
          </div>
        </PageContainer>
        <Footer />
      </div>
    )
  }

  const renderPage = () => {
    if (currentView === 'demo' && currentDemo) {
      switch (currentDemo.id) {
        case 'websocket-chat': return <WebSocketDemo />
        default: return <ExamplesPage />
      }
    }
    switch (currentView) {
      case 'home': return <HomePage />
      case 'examples': return <ExamplesPage />
      case 'user': return <UserPage />
      default: return <HomePage />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageContainer>{renderPage()}</PageContainer>
      <Footer />
    </div>
  )
}

export default function Home() {
  return <AppContent />
}
