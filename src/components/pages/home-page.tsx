'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/stores/app-store'
import { Sparkles, Zap, Shield, Palette, Code2, Database, Globe, Rocket, ArrowRight, CheckCircle2, Github } from 'lucide-react'

const features = [
  { icon: Zap, title: '极速开发', description: '预配置的工具链和最佳实践，让开发效率提升10倍' },
  { icon: Shield, title: '类型安全', description: '全栈TypeScript配合Zod验证，消除运行时错误' },
  { icon: Palette, title: '精美UI', description: '完整的shadcn/ui组件库，支持深色模式和响应式设计' },
  { icon: Database, title: '数据库就绪', description: 'Prisma ORM开箱即用，支持多种数据库类型' },
  { icon: Code2, title: 'AI友好', description: '结构化代码库，完美适配AI辅助编程' },
  { icon: Globe, title: '国际化', description: 'Next Intl内置多语言支持，轻松扩展全球市场' },
]

const techStack = [
  { name: 'Next.js 16', category: '框架' },
  { name: 'TypeScript 5', category: '语言' },
  { name: 'Tailwind CSS 4', category: '样式' },
  { name: 'shadcn/ui', category: '组件' },
  { name: 'Prisma', category: '数据库' },
  { name: 'Zustand', category: '状态' },
  { name: 'React Hook Form', category: '表单' },
  { name: 'Zod', category: '验证' },
]

export function HomePage() {
  const { setView } = useAppStore()

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border p-8 md:p-12">
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />AI驱动的现代开发框架
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Z.ai Code Scaffold</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              基于 Next.js 16 的现代化全栈开发脚手架，集成最佳实践和AI辅助编程，让您专注于创造而非配置。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button size="lg" onClick={() => setView('examples')} className="gap-2">
                <Rocket className="w-4 h-4" />浏览案例<ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="gap-2">
                  <Github className="w-4 h-4" />GitHub
                </a>
              </Button>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
              <img src="/logo.svg" alt="Z.ai Logo" className="relative z-10 w-full h-full object-contain animate-pulse" style={{ animationDuration: '3s' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">为什么选择 Z.ai Scaffold？</h2>
          <p className="text-muted-foreground">开箱即用的现代化开发体验</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent><CardDescription className="text-base">{feature.description}</CardDescription></CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">技术栈</h2>
          <p className="text-muted-foreground">精选的现代前端技术组合</p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {techStack.map((tech, index) => (
                <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
                  <CheckCircle2 className="w-3 h-3 mr-2 text-green-500" />{tech.name}
                  <span className="ml-2 text-muted-foreground text-xs">({tech.category})</span>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="text-center space-y-6 py-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">准备好开始了吗？</h2>
          <p className="text-muted-foreground text-lg">
            访问 <a href="https://chat.z.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">chat.z.ai</a> 体验AI辅助编程
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" onClick={() => setView('examples')} className="gap-2">查看案例广场<ArrowRight className="w-4 h-4" /></Button>
          <Button size="lg" variant="outline" onClick={() => setView('user')} className="gap-2">登录体验</Button>
        </div>
      </section>
    </div>
  )
}
