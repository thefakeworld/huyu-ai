'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { MessageSquare, Search, Star, Users, Clock, ArrowRight, Filter, Sparkles, Package, Code2, Layers, Radio } from 'lucide-react'
import { componentRegistry } from '@/components/docs/component-registry'
import { businessRegistry } from '@/components/business/registry'

const demoConfigs = [
  {
    id: 'websocket-chat',
    name: 'WebSocket 聊天室',
    description: '实时多人聊天应用，支持用户加入、离开通知，在线用户列表展示。',
    category: '实时通信',
    icon: 'MessageSquare',
    featured: true,
    href: '/demo/websocket',
  },
  {
    id: 'openclaw-chat',
    name: 'OpenClaw Chat',
    description: 'OpenClaw Gateway 集成示例，SSE 心跳机制，支持多模型提供商。',
    category: 'AI Agent',
    icon: 'Radio',
    featured: true,
    href: '/demo/openclaw-chat',
  },
]

const categories = [...new Set(demoConfigs.map(d => d.category))]
const iconMap: Record<string, typeof MessageSquare> = { MessageSquare, Radio }

export default function ExamplesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredDemos = demoConfigs.filter((demo) => {
    const matchesSearch = demo.name.toLowerCase().includes(searchQuery.toLowerCase()) || demo.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || demo.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredDemos = demoConfigs.filter((demo) => demo.featured)

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold">案例广场</h1>
        </div>
        <p className="text-muted-foreground text-lg">探索基于 Z.ai Scaffold 构建的精彩案例项目</p>
      </div>

      {/* 功能入口 - 三列布局 */}
      <section className="grid md:grid-cols-3 gap-4">
        {/* UI 组件 */}
        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/30 bg-gradient-to-br from-primary/5 to-background">
          <Link href="/examples/components">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">UI 组件</CardTitle>
                    <Badge variant="secondary" className="mt-1">基础组件库</Badge>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base mb-3">
                浏览 {componentRegistry.length} 个基础 UI 组件，查看文档、属性和使用示例。
              </CardDescription>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">Button</Badge>
                <Badge variant="outline" className="text-xs">Input</Badge>
                <Badge variant="outline" className="text-xs">Dialog</Badge>
                <Badge variant="outline" className="text-xs">+{componentRegistry.length - 3} 更多</Badge>
              </div>
            </CardContent>
          </Link>
        </Card>

        {/* 业务组件 */}
        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-background">
          <Link href="/examples/business">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <Layers className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">业务组件</CardTitle>
                    <Badge variant="secondary" className="mt-1 bg-emerald-500/10 text-emerald-600">业务模块</Badge>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-emerald-600 transition-colors" />
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base mb-3">
                探索 {businessRegistry.length} 个业务级组件，包含认证、布局、页面模块。
              </CardDescription>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">LoginForm</Badge>
                <Badge variant="outline" className="text-xs">Navbar</Badge>
                <Badge variant="outline" className="text-xs">+{businessRegistry.length - 2} 更多</Badge>
              </div>
            </CardContent>
          </Link>
        </Card>

        {/* 在线演示 */}
        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/30 bg-gradient-to-br from-primary/5 to-background md:row-span-1">
          <Link href="/demo/websocket">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Code2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">在线演示</CardTitle>
                    <Badge variant="secondary" className="mt-1">实战案例</Badge>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base mb-3">
                体验实时 WebSocket 聊天室，感受前后端联动的完整功能。
              </CardDescription>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">WebSocket</Badge>
                <Badge variant="outline" className="text-xs">实时通信</Badge>
              </div>
            </CardContent>
          </Link>
        </Card>
      </section>

      {featuredDemos.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />精选案例
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {featuredDemos.map((demo) => {
              const Icon = iconMap[demo.icon] || MessageSquare
              return (
                <Card key={demo.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{demo.name}</CardTitle>
                          <Badge variant="secondary" className="mt-1">{demo.category}</Badge>
                        </div>
                      </div>
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">{demo.description}</CardDescription>
                    <Button asChild className="w-full gap-2">
                      <Link href={demo.href}>立即体验<ArrowRight className="w-4 h-4" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      )}

      <section className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="搜索案例..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <div className="flex gap-2 flex-wrap">
            <Button variant={selectedCategory === null ? 'default' : 'outline'} size="sm" onClick={() => setSelectedCategory(null)}>全部</Button>
            {categories.map((category) => (
              <Button key={category} variant={selectedCategory === category ? 'default' : 'outline'} size="sm" onClick={() => setSelectedCategory(category)}>{category}</Button>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">全部案例</h2>
        {filteredDemos.length === 0 ? (
          <Card><CardContent className="py-12 text-center"><p className="text-muted-foreground">没有找到匹配的案例</p></CardContent></Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDemos.map((demo) => {
              const Icon = iconMap[demo.icon] || MessageSquare
              return (
                <Card key={demo.id} className="group hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{demo.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">{demo.category}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-2 mb-4">{demo.description}</CardDescription>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1"><Users className="w-4 h-4" /><span>多人在线</span></div>
                      <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>实时</span></div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </section>

      <section>
        <Card className="bg-muted/50">
          <CardContent className="py-8 text-center">
            <Sparkles className="w-8 h-8 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">更多案例即将上线</h3>
            <p className="text-muted-foreground mb-4">我们正在准备更多精彩案例，敬请期待！</p>
            <Button variant="outline" asChild><a href="https://chat.z.ai" target="_blank" rel="noopener noreferrer">提交您的案例</a></Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
