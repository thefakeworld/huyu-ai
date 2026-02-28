'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// 演示配置类型
export interface DemoConfig {
  id: string
  name: string
  description: string
  category: string
  icon: string
  featured?: boolean
  path: string
  tags?: string[]
}

// 分类列表
export const categories = ['AI', '组件', '实时通信', '数据可视化', '工具']

// 演示配置
export const demoConfigs: DemoConfig[] = [
  {
    id: 'openclaw-chat',
    name: 'OpenClaw Chat',
    description: '基于 OpenClaw Gateway 的 AI 聊天应用，支持多模型切换、SSE 心跳检测、WebSocket 实时通信',
    category: 'AI',
    icon: 'MessageSquare',
    featured: true,
    path: '/demo/openclaw-chat',
    tags: ['AI', 'Chat', 'SSE', 'WebSocket'],
  },
  {
    id: 'websocket-demo',
    name: 'WebSocket 聊天室',
    description: '实时聊天室演示，展示 WebSocket 连接、消息收发和在线用户列表',
    category: '实时通信',
    icon: 'MessageSquare',
    featured: true,
    path: '/demo/websocket',
    tags: ['WebSocket', '聊天', '实时'],
  },
  {
    id: 'component-showcase',
    name: '组件展示',
    description: 'shadcn/ui 组件库展示，包含所有可用组件的演示和代码示例',
    category: '组件',
    icon: 'Layers',
    path: '/examples/components',
    tags: ['UI', '组件', 'shadcn'],
  },
]

// 视图类型
export type ViewType = 'home' | 'examples' | 'user' | 'demo'

// 应用状态接口
interface AppState {
  currentView: ViewType
  currentDemo: DemoConfig | null
  sidebarOpen: boolean
  setView: (view: ViewType) => void
  setDemo: (demo: DemoConfig | null) => void
  toggleSidebar: () => void
}

// 创建应用状态存储
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentView: 'home',
      currentDemo: null,
      sidebarOpen: true,

      setView: (view) => set({ currentView: view, currentDemo: null }),
      setDemo: (demo) => set({ currentDemo: demo, currentView: demo ? 'demo' : 'examples' }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ sidebarOpen: state.sidebarOpen }),
    }
  )
)
