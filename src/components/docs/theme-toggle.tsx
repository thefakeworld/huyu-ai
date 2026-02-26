'use client'

import { useEffect, useState, useCallback, useSyncExternalStore } from 'react'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Monitor } from 'lucide-react'

type Theme = 'light' | 'dark' | 'system'

function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('theme') as Theme | null
}

function applyThemeToDOM(theme: Theme) {
  const root = document.documentElement
  root.classList.remove('light', 'dark')

  if (theme === 'system') {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    root.classList.add(systemDark ? 'dark' : 'light')
  } else {
    root.classList.add(theme)
  }
}

export function ThemeToggle() {
  // 使用 useSyncExternalStore 处理 SSR
  const storedTheme = useSyncExternalStore(
    () => () => {},
    () => getStoredTheme(),
    () => null
  )
  
  const [theme, setTheme] = useState<Theme>(storedTheme || 'system')

  const cycleTheme = useCallback(() => {
    const themes: Theme[] = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
    applyThemeToDOM(nextTheme)
  }, [theme])

  useEffect(() => {
    applyThemeToDOM(theme)
  }, [theme])

  return (
    <Button variant="ghost" size="icon" onClick={cycleTheme} title={`当前主题: ${theme}`}>
      {theme === 'light' && <Sun className="w-4 h-4" />}
      {theme === 'dark' && <Moon className="w-4 h-4" />}
      {theme === 'system' && <Monitor className="w-4 h-4" />}
    </Button>
  )
}

export function useTheme() {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkDark()

    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  return { isDark: isClient ? isDark : true, mounted: isClient }
}
