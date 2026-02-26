'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/stores/auth-store'
import { useToast } from '@/hooks/use-toast'

const loginSchema = z.object({
  email: z.string().min(1, '请输入邮箱地址').email('请输入有效的邮箱地址'),
  password: z.string().min(1, '请输入密码').min(8, '密码长度至少为8位'),
  rememberMe: z.boolean().optional(),
})

const registerSchema = z.object({
  name: z.string().min(1, '请输入用户名').max(50, '用户名不能超过50个字符'),
  email: z.string().min(1, '请输入邮箱地址').email('请输入有效的邮箱地址'),
  password: z.string().min(1, '请输入密码').min(8, '密码长度至少为8位'),
  confirmPassword: z.string().min(1, '请确认密码'),
}).refine((data) => data.password === data.confirmPassword, { message: '两次输入的密码不一致', path: ['confirmPassword'] })

type LoginFormData = z.infer<typeof loginSchema>
type RegisterFormData = z.infer<typeof registerSchema>

export function LoginForm({ onSuccess, onSwitchToRegister }: { onSuccess?: () => void; onSwitchToRegister?: () => void }) {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const { login, isLoading, error, clearError } = useAuthStore()
  const { toast } = useToast()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema), defaultValues: { email: '', password: '', rememberMe: false } })

  const onSubmit = async (data: LoginFormData) => {
    clearError()
    const result = await login({ email: data.email, password: data.password, rememberMe })
    if (result.success) {
      toast({ title: '登录成功', description: '欢迎回来！' })
      onSuccess?.()
    } else {
      toast({ variant: 'destructive', title: '登录失败', description: result.error || '请检查您的邮箱和密码' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">邮箱地址</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="email" type="email" placeholder="请输入邮箱" className="pl-10" {...register('email')} disabled={isLoading} />
        </div>
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">密码</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="请输入密码" className="pl-10 pr-10" {...register('password')} disabled={isLoading} />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="rememberMe" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked as boolean)} disabled={isLoading} />
          <Label htmlFor="rememberMe" className="text-sm font-normal cursor-pointer">记住登录状态</Label>
        </div>
      </div>
      {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">{error}</div>}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />登录中...</> : '登录'}
      </Button>
      <div className="text-center text-sm">
        还没有账户？ <button type="button" onClick={onSwitchToRegister} className="text-primary hover:underline font-medium">立即注册</button>
      </div>
    </form>
  )
}

export function RegisterForm({ onSuccess, onSwitchToLogin }: { onSuccess?: () => void; onSwitchToLogin?: () => void }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register: registerUser, isLoading, error, clearError } = useAuthStore()
  const { toast } = useToast()
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema), defaultValues: { name: '', email: '', password: '', confirmPassword: '' } })

  const onSubmit = async (data: RegisterFormData) => {
    clearError()
    const result = await registerUser({ email: data.email, password: data.password, name: data.name })
    if (result.success) {
      toast({ title: '注册成功', description: '欢迎加入！' })
      onSuccess?.()
    } else {
      toast({ variant: 'destructive', title: '注册失败', description: result.error || '请检查您的输入' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="register-name">用户名</Label>
        <Input id="register-name" type="text" placeholder="请输入用户名" {...register('name')} disabled={isLoading} />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="register-email">邮箱地址</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="register-email" type="email" placeholder="请输入邮箱" className="pl-10" {...register('email')} disabled={isLoading} />
        </div>
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="register-password">密码</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="register-password" type={showPassword ? 'text' : 'password'} placeholder="请输入密码（至少8位）" className="pl-10 pr-10" {...register('password')} disabled={isLoading} />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">确认密码</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="请再次输入密码" className="pl-10 pr-10" {...register('confirmPassword')} disabled={isLoading} />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
      </div>
      {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">{error}</div>}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />注册中...</> : '注册'}
      </Button>
      <div className="text-center text-sm">
        已有账户？ <button type="button" onClick={onSwitchToLogin} className="text-primary hover:underline font-medium">立即登录</button>
      </div>
    </form>
  )
}
