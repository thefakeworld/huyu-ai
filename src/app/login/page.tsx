'use client'

import { useState, useEffect, useSyncExternalStore } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { LoginForm, RegisterForm } from '@/components/business/auth/login-form'
import { OAuthButtons } from '@/components/business/auth/oauth-buttons'
import { useAuthStore } from '@/stores/auth-store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User as UserIcon, Sparkles } from 'lucide-react'

function useIsClient() {
  return useSyncExternalStore(() => () => {}, () => true, () => false)
}

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false)
  const isClient = useIsClient()
  const router = useRouter()
  const { isAuthenticated, checkAuth, isLoading } = useAuthStore()

  useEffect(() => {
    if (isClient) checkAuth()
  }, [isClient, checkAuth])

  const handleSuccess = () => {
    router.push('/')
  }

  // 已登录则跳转到首页
  if (isClient && isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-background">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center space-y-4">
            <Sparkles className="w-12 h-12 mx-auto text-primary" />
            <h2 className="text-xl font-semibold">您已登录</h2>
            <p className="text-muted-foreground">正在跳转到首页...</p>
            <Button asChild className="w-full">
              <Link href="/">返回首页</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* 左侧品牌展示 */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        
        <div className="relative z-10 flex flex-col justify-center items-center text-primary-foreground p-12">
          <img src="/logo.svg" alt="Z.ai Logo" className="w-24 h-24 mb-8 drop-shadow-2xl" />
          <h1 className="text-4xl font-bold mb-4 text-center">欢迎使用 Z.ai</h1>
          <p className="text-xl text-primary-foreground/80 text-center max-w-md mb-8">
            AI 驱动的智能开发平台，让开发更简单、更高效
          </p>
          <div className="flex items-center gap-8 text-primary-foreground/60">
            <span className="flex items-center gap-2"><Sparkles className="w-5 h-5" />安全可靠</span>
            <span className="flex items-center gap-2"><UserIcon className="w-5 h-5" />用户友好</span>
          </div>
        </div>
      </div>

      {/* 右侧登录表单 */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* 移动端Logo */}
          <div className="lg:hidden text-center mb-8">
            <img src="/logo.svg" alt="Z.ai Logo" className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Z.ai</h1>
          </div>

          {/* 返回首页 */}
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/" className="gap-2">
              ← 返回首页
            </Link>
          </Button>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                {isRegister ? '创建账户' : '欢迎回来'}
              </CardTitle>
              <CardDescription className="text-center">
                {isRegister ? '填写信息创建您的新账户' : '登录您的账户继续'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isRegister ? (
                <RegisterForm onSuccess={handleSuccess} onSwitchToLogin={() => setIsRegister(false)} />
              ) : (
                <LoginForm onSuccess={handleSuccess} onSwitchToRegister={() => setIsRegister(true)} />
              )}

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><Separator /></div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">第三方登录</span>
                </div>
              </div>

              <OAuthButtons onSuccess={handleSuccess} />

              <p className="text-center text-sm text-muted-foreground mt-6">
                登录即表示您同意我们的
                <button className="text-primary hover:underline ml-1">服务条款</button>
                和
                <button className="text-primary hover:underline ml-1">隐私政策</button>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
