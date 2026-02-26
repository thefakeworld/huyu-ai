'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth-store'
import { useToast } from '@/hooks/use-toast'

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

export function OAuthButtons({ onSuccess }: { onSuccess?: () => void }) {
  const [googleLoading, setGoogleLoading] = useState(false)
  const { googleLogin, isLoading } = useAuthStore()
  const { toast } = useToast()

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    try {
      const mockGoogleData = { email: `user_${Date.now()}@gmail.com`, name: 'Google User', googleId: `google_${Date.now()}`, avatar: 'https://lh3.googleusercontent.com/a/default-user' }
      await new Promise(resolve => setTimeout(resolve, 1000))
      const result = await googleLogin(mockGoogleData)
      if (result.success) {
        toast({ title: '登录成功', description: '已通过 Google 账户登录' })
        onSuccess?.()
      } else {
        toast({ variant: 'destructive', title: 'Google 登录失败', description: result.error || '请稍后重试' })
      }
    } catch {
      toast({ variant: 'destructive', title: 'Google 登录失败', description: '网络错误，请稍后重试' })
    } finally {
      setGoogleLoading(false)
    }
  }

  const isAnyLoading = isLoading || googleLoading

  return (
    <div className="space-y-3">
      <Button type="button" variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isAnyLoading}>
        {googleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon className="mr-2 h-4 w-4" />}
        使用 Google 登录
      </Button>
    </div>
  )
}
