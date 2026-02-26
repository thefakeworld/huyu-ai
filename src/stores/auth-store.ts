'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User, AuthState, LoginCredentials, RegisterCredentials, AuthResponse } from '@/types/auth'

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<AuthResponse>
  register: (credentials: RegisterCredentials) => Promise<AuthResponse>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
  googleLogin: (googleData: { email: string; name: string; googleId: string; avatar?: string }) => Promise<AuthResponse>
  clearError: () => void
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true, // 初始为 true，等待首次检查
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          })
          const data: AuthResponse = await response.json()
          if (data.success && data.user) {
            set({ user: data.user, isAuthenticated: true, isLoading: false, error: null })
            return { success: true, user: data.user }
          }
          set({ isLoading: false, error: data.error || '登录失败' })
          return { success: false, error: data.error || '登录失败' }
        } catch {
          const errorMessage = '网络错误，请检查网络连接'
          set({ isLoading: false, error: errorMessage })
          return { success: false, error: errorMessage }
        }
      },

      register: async (credentials: RegisterCredentials) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          })
          const data: AuthResponse = await response.json()
          if (data.success && data.user) {
            set({ user: data.user, isAuthenticated: true, isLoading: false, error: null })
            return { success: true, user: data.user }
          }
          set({ isLoading: false, error: data.error || '注册失败' })
          return { success: false, error: data.error || '注册失败' }
        } catch {
          const errorMessage = '网络错误，请检查网络连接'
          set({ isLoading: false, error: errorMessage })
          return { success: false, error: errorMessage }
        }
      },

      logout: async () => {
        set({ isLoading: true })
        try {
          await fetch('/api/auth/logout', { method: 'POST' })
        } finally {
          set({ user: null, isAuthenticated: false, isLoading: false, error: null })
        }
      },

      checkAuth: async () => {
        // 不再检查 isLoading，直接执行
        try {
          const response = await fetch('/api/auth/session')
          const data: AuthResponse = await response.json()
          if (data.success && data.user) {
            set({ user: data.user, isAuthenticated: true, isLoading: false })
          } else {
            set({ user: null, isAuthenticated: false, isLoading: false })
          }
        } catch {
          set({ user: null, isAuthenticated: false, isLoading: false })
        }
      },

      googleLogin: async (googleData) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch('/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(googleData),
          })
          const data: AuthResponse = await response.json()
          if (data.success && data.user) {
            set({ user: data.user, isAuthenticated: true, isLoading: false, error: null })
            return { success: true, user: data.user }
          }
          set({ isLoading: false, error: data.error || 'Google登录失败' })
          return { success: false, error: data.error || 'Google登录失败' }
        } catch {
          const errorMessage = '网络错误，请检查网络连接'
          set({ isLoading: false, error: errorMessage })
          return { success: false, error: errorMessage }
        }
      },

      clearError: () => set({ error: null }),
      setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)
