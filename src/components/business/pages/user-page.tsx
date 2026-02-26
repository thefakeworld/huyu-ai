'use client'

import { useSyncExternalStore } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useAuthStore } from '@/stores/auth-store'
import { useAppStore } from '@/stores/app-store'
import { LoginForm, RegisterForm } from '@/components/business/auth/login-form'
import { OAuthButtons } from '@/components/business/auth/oauth-buttons'
import { UserAvatar } from '@/components/business/auth/auth-provider'
import { User as UserIcon, Mail, Calendar, Shield, Settings, LogOut, Activity, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { useState } from 'react'

function useIsClient() {
  return useSyncExternalStore(() => () => {}, () => true, () => false)
}

function UserDashboard() {
  const { user, logout, isLoading } = useAuthStore()
  const { setView } = useAppStore()

  const getProviderLabel = (provider: string | null) => {
    switch (provider) {
      case 'google': return 'Google 登录'
      case 'github': return 'GitHub 登录'
      default: return '邮箱密码登录'
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <UserAvatar user={user} size="lg" />
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold">{user?.name || '用户'}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <Badge variant="secondary"><CheckCircle2 className="w-3 h-3 mr-1" />已验证</Badge>
                <Badge variant="outline">{getProviderLabel(user?.provider)}</Badge>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="outline" onClick={() => setView('examples')} className="gap-2"><Activity className="w-4 h-4" />浏览案例</Button>
              <Button variant="destructive" onClick={() => logout()} disabled={isLoading} className="gap-2"><LogOut className="w-4 h-4" />退出登录</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><UserIcon className="w-5 h-5" />账户信息</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground"><Mail className="w-4 h-4" /><span>邮箱</span></div>
              <span className="font-medium">{user?.email}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground"><UserIcon className="w-4 h-4" /><span>用户名</span></div>
              <span className="font-medium">{user?.name || '未设置'}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="w-4 h-4" /><span>注册时间</span></div>
              <span className="font-medium">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('zh-CN') : '-'}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5" />安全设置</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground"><Shield className="w-4 h-4" /><span>账户状态</span></div>
              <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle2 className="w-3 h-3 mr-1" />正常</Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground"><Clock className="w-4 h-4" /><span>登录状态</span></div>
              <Badge variant="secondary">已登录</Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground"><AlertCircle className="w-4 h-4" /><span>登录方式</span></div>
              <span className="font-medium">{getProviderLabel(user?.provider)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Settings className="w-5 h-5" />快捷操作</CardTitle>
          <CardDescription>管理您的账户设置和偏好</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="justify-start gap-2"><UserIcon className="w-4 h-4" />编辑资料</Button>
            <Button variant="outline" className="justify-start gap-2"><Shield className="w-4 h-4" />安全设置</Button>
            <Button variant="outline" className="justify-start gap-2"><Mail className="w-4 h-4" />消息通知</Button>
            <Button variant="outline" className="justify-start gap-2"><Settings className="w-4 h-4" />偏好设置</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AuthPage() {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-1 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <UserIcon className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">{isRegister ? '创建账户' : '用户登录'}</CardTitle>
          <CardDescription>{isRegister ? '注册新账户以访问所有功能' : '登录您的账户以访问所有功能'}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isRegister ? <RegisterForm onSuccess={() => {}} onSwitchToLogin={() => setIsRegister(false)} /> : <LoginForm onSuccess={() => {}} onSwitchToRegister={() => setIsRegister(true)} />}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><Separator /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">第三方登录</span></div>
          </div>
          <OAuthButtons onSuccess={() => {}} />
          <div className="text-center text-sm text-muted-foreground mt-4">
            登录即表示您同意我们的<button className="text-primary hover:underline ml-1">服务条款</button>和<button className="text-primary hover:underline ml-1">隐私政策</button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function UserPage() {
  const isClient = useIsClient()
  const { isAuthenticated } = useAuthStore()
  // 不再在这里调用 checkAuth，由 page.tsx 统一管理

  if (!isClient) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">加载中...</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? <UserDashboard /> : <AuthPage />
}
