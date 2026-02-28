'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useAppStore, demoConfigs } from '@/stores/app-store'
import {
  Sparkles, Zap, Shield, Palette, Code2, Database, Globe, Rocket, ArrowRight,
  CheckCircle2, Github, Bot, Brain, MessageSquare, FileCode, Settings,
  Cpu, Cloud, Lock, Terminal, Layers, GitBranch, Workflow, Users, Star,
  Mic, Image, Video, FileText, Search, Webhook
} from 'lucide-react'

// 核心能力数据
const coreAbilities = [
  {
    icon: Brain,
    title: 'AI 模型集成',
    description: '深度集成 Kimi-K2.5、GLM-4.7 等大语言模型，支持智能对话、代码生成、文本分析等多种 AI 能力',
    features: ['多模型切换', '上下文理解', '流式响应'],
    level: 95,
  },
  {
    icon: Code2,
    title: '全栈开发',
    description: '精通 Next.js 15、React、TypeScript 等现代前端技术栈，以及 Node.js、Prisma 等后端技术',
    features: ['前后端一体化', '类型安全', '最佳实践'],
    level: 98,
  },
  {
    icon: Database,
    title: '数据库设计',
    description: '擅长 Prisma ORM、PostgreSQL、SQLite 等数据库设计与优化，支持复杂数据模型和高效查询',
    features: ['Schema 设计', '数据迁移', '性能优化'],
    level: 90,
  },
  {
    icon: Cloud,
    title: '云端部署',
    description: '熟练配置 Cloudflare Tunnel、OpenClaw Gateway 等云服务，实现安全可靠的公网访问',
    features: ['隧道配置', '域名管理', 'SSL 证书'],
    level: 88,
  },
  {
    icon: Workflow,
    title: '自动化工作流',
    description: '配置 CI/CD 流水线、GitHub Actions、自动化测试等，提升开发效率和代码质量',
    features: ['持续集成', '自动部署', '质量监控'],
    level: 85,
  },
  {
    icon: Lock,
    title: '安全认证',
    description: '实现 OAuth 2.0、JWT、Session 等多种认证方案，保障应用安全性和用户数据隐私',
    features: ['OAuth 集成', '权限控制', '数据加密'],
    level: 92,
  },
]

// 技能领域
const skillDomains = [
  { name: 'Next.js 15', category: '前端框架', icon: '⚡', mastery: 98 },
  { name: 'React 19', category: 'UI 库', icon: '⚛️', mastery: 97 },
  { name: 'TypeScript', category: '编程语言', icon: '📘', mastery: 96 },
  { name: 'Tailwind CSS', category: '样式框架', icon: '🎨', mastery: 95 },
  { name: 'Prisma ORM', category: '数据库', icon: '🐘', mastery: 92 },
  { name: 'WebSocket', category: '实时通信', icon: '🔌', mastery: 90 },
  { name: 'SSE/Streaming', category: '服务端推送', icon: '📡', mastery: 93 },
  { name: 'shadcn/ui', category: '组件库', icon: '🧩', mastery: 96 },
  { name: 'Zustand', category: '状态管理', icon: '🐻', mastery: 94 },
  { name: 'Zod', category: '数据验证', icon: '✅', mastery: 91 },
  { name: 'OpenClaw', category: 'AI Gateway', icon: '🦞', mastery: 88 },
  { name: 'Cloudflare', category: '云服务', icon: '☁️', mastery: 85 },
]

// AI 能力模块
const aiCapabilities = [
  { icon: MessageSquare, name: '智能对话', description: '多轮对话、上下文记忆、角色扮演' },
  { icon: FileCode, name: '代码生成', description: '多语言支持、最佳实践、自动补全' },
  { icon: FileText, name: '文档创作', description: 'Markdown、Word、PDF 多格式输出' },
  { icon: Image, name: '图像生成', description: 'AI 绘图、图像编辑、风格转换' },
  { icon: Video, name: '视频理解', description: '视频分析、内容提取、场景识别' },
  { icon: Mic, name: '语音处理', description: '语音识别、语音合成、多语言支持' },
  { icon: Search, name: '网络搜索', description: '实时信息检索、知识更新' },
  { icon: Webhook, name: 'API 集成', description: 'RESTful API、GraphQL、WebSocket' },
]

// 案例项目
const showcaseProjects = [
  {
    title: 'OpenClaw Chat',
    description: '基于 OpenClaw Gateway 的 AI 聊天应用，支持多模型切换、SSE 心跳、WebSocket 实时通信。集成 Kimi-K2.5 和 GLM-4.7-Flash 模型，实现智能对话能力。',
    tags: ['AI', 'WebSocket', 'SSE', 'Next.js'],
    icon: Bot,
    featured: true,
    demo: '/demo/openclaw-chat',
    highlights: ['多模型支持', '实时心跳', '流式响应', '设备授权'],
  },
  {
    title: 'WebSocket 聊天室',
    description: '实时聊天室应用，展示 WebSocket 连接管理、消息广播、在线用户列表等功能。支持房间管理、私聊、消息历史等高级特性。',
    tags: ['WebSocket', '实时通信', 'Bun'],
    icon: Users,
    featured: true,
    demo: '/demo/websocket',
    highlights: ['实时消息', '用户管理', '房间系统', '消息历史'],
  },
  {
    title: '组件展示系统',
    description: '完整的 shadcn/ui 组件库展示，包含 40+ 组件的实时演示、代码示例和 API 文档。支持深色模式、响应式设计和主题定制。',
    tags: ['UI', '组件库', '文档'],
    icon: Layers,
    featured: false,
    demo: '/examples/components',
    highlights: ['40+ 组件', '实时预览', '代码示例', 'API 文档'],
  },
  {
    title: '认证系统',
    description: '完整的用户认证解决方案，支持邮箱密码登录、Google OAuth、Session 管理和权限控制。基于 Zustand 实现状态持久化。',
    tags: ['认证', 'OAuth', '安全'],
    icon: Shield,
    featured: false,
    demo: '/user',
    highlights: ['OAuth 2.0', 'Session 管理', '权限控制', '状态持久化'],
  },
]

// 技术栈
const techStack = [
  { name: 'Next.js 16', category: '框架', icon: '⚡' },
  { name: 'TypeScript 5', category: '语言', icon: '📘' },
  { name: 'Tailwind CSS 4', category: '样式', icon: '🎨' },
  { name: 'shadcn/ui', category: '组件', icon: '🧩' },
  { name: 'Prisma', category: '数据库', icon: '🐘' },
  { name: 'Zustand', category: '状态', icon: '🐻' },
  { name: 'React Hook Form', category: '表单', icon: '📝' },
  { name: 'Zod', category: '验证', icon: '✅' },
]

// 统计数据
const stats = [
  { label: '项目案例', value: '10+', icon: Rocket },
  { label: '技术栈', value: '20+', icon: Cpu },
  { label: 'AI 模型', value: '5+', icon: Brain },
  { label: '代码质量', value: '99%', icon: Star },
]

export function GHPagesHome() {
  const { setDemo } = useAppStore()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-32">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI-Powered Development Assistant</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Super Z
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl text-muted-foreground font-light">
              下一代 AI 开发助手
            </p>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              我是一个强大的 AI 开发助手，精通全栈开发、AI 模型集成、数据库设计和云端部署。
              让我帮助您将想法转化为现实，从概念到上线，全程陪伴。
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" onClick={() => setDemo(demoConfigs[0])} className="gap-2 px-8">
                <Rocket className="w-5 h-5" />
                体验案例
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2 px-8">
                <a href="https://github.com/thefakeworld/huyu-ai" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                  GitHub 仓库
                </a>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="bg-background/50 backdrop-blur border-primary/10">
                  <CardContent className="pt-6 text-center">
                    <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold flex items-center justify-center gap-3">
              <Brain className="w-10 h-10 text-primary" />
              AI 能力矩阵
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              整合多种 AI 能力，为您提供全方位的智能支持
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiCapabilities.map((capability, index) => {
              const Icon = capability.icon
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/10">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{capability.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{capability.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Core Abilities Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">核心能力</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              深厚的技术积累，助力您的项目成功
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreAbilities.map((ability, index) => {
              const Icon = ability.icon
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-primary/10">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-lg font-bold">
                        {ability.level}%
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mt-4">{ability.title}</CardTitle>
                    <CardDescription className="text-base">{ability.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress value={ability.level} className="h-2" />
                    <div className="flex flex-wrap gap-2">
                      {ability.features.map((feature, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold flex items-center justify-center gap-3">
              <Terminal className="w-10 h-10 text-primary" />
              技术栈精通度
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              精通现代全栈开发技术，快速构建高质量应用
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillDomains.map((skill, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-primary/10">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{skill.icon}</span>
                    <div>
                      <div className="font-semibold">{skill.name}</div>
                      <div className="text-xs text-muted-foreground">{skill.category}</div>
                    </div>
                  </div>
                  <Progress value={skill.mastery} className="h-2" />
                  <div className="text-right text-sm text-muted-foreground mt-1">{skill.mastery}%</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Projects */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold flex items-center justify-center gap-3">
              <Rocket className="w-10 h-10 text-primary" />
              案例展示
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              精选项目案例，展示实际开发能力
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {showcaseProjects.map((project, index) => {
              const Icon = project.icon
              return (
                <Card
                  key={index}
                  className={`group hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    project.featured ? 'border-primary/30 ring-1 ring-primary/10' : 'border-primary/10'
                  }`}
                  onClick={() => {
                    const demo = demoConfigs.find(d => d.path === project.demo)
                    if (demo) setDemo(demo)
                  }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl flex items-center gap-2">
                            {project.title}
                            {project.featured && <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
                          </CardTitle>
                          <div className="flex gap-2 mt-2">
                            {project.tags.map((tag, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">{project.description}</CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {project.highlights.map((highlight, i) => (
                        <Badge key={i} variant="outline" className="gap-1">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold flex items-center justify-center gap-3">
              <Settings className="w-10 h-10 text-primary" />
              技术栈
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              基于最新的现代技术栈构建
            </p>
          </div>

          <Card className="max-w-4xl mx-auto border-primary/10">
            <CardContent className="pt-8">
              <div className="flex flex-wrap gap-3 justify-center">
                {techStack.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-5 py-3 text-base gap-2 hover:bg-primary/10 transition-colors cursor-default"
                  >
                    <span className="text-lg">{tech.icon}</span>
                    {tech.name}
                    <span className="text-xs text-muted-foreground ml-1">({tech.category})</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">准备好开始了吗？</h2>
            <p className="text-muted-foreground text-lg">
              让 Super Z 帮助您实现下一个伟大的项目
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={() => setDemo(demoConfigs[0])} className="gap-2 px-8">
              <Sparkles className="w-5 h-5" />
              开始体验
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2 px-8">
              <a href="https://github.com/thefakeworld/huyu-ai" target="_blank" rel="noopener noreferrer">
                <GitBranch className="w-5 h-5" />
                查看源码
              </a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Powered by Next.js 16 + TypeScript + shadcn/ui + AI
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2025 Super Z. Built with ❤️ using Next.js and AI.</p>
          <p className="mt-2">
            <a href="https://github.com/thefakeworld/huyu-ai" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              GitHub
            </a>
            {' · '}
            <a href="https://chat.z.ai" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              Z.ai Chat
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
