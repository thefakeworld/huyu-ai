'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type ViewType = 'home' | 'examples' | 'user' | 'demo'

export interface DemoConfig {
  id: string
  name: string
  description: string
  category: string
  icon: string
  path: string
  featured: boolean
}

interface AppState {
  currentView: ViewType
  currentDemo: DemoConfig | null
  sidebarOpen: boolean
  setView: (view: ViewType) => void
  setDemo: (demo: DemoConfig | null) => void
  toggleSidebar: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentView: 'home',
      currentDemo: null,
      sidebarOpen: false,
      setView: (view) => set({ currentView: view, currentDemo: null }),
      setDemo: (demo) => set({ currentDemo: demo, currentView: demo ? 'demo' : 'examples' }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ currentView: state.currentView }),
    }
  )
)

export const demoConfigs: DemoConfig[] = [
  {
    id: 'websocket-chat',
    name: 'WebSocket 聊天室',
    description: '实时多人聊天应用，支持用户加入、离开通知，在线用户列表展示。',
    category: '实时通信',
    icon: 'MessageSquare',
    path: 'websocket',
    featured: true,
  },
]

export const categories = [...new Set(demoConfigs.map(d => d.category))]
