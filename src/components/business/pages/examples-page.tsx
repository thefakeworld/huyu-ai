'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useAppStore, demoConfigs, categories } from '@/stores/app-store'
import { MessageSquare, Search, Star, Users, Clock, ArrowRight, Filter, Sparkles, Bot, Layers, Shield } from 'lucide-react'

const iconMap: Record<string, typeof MessageSquare> = {
  MessageSquare,
  Bot,
  Layers,
  Shield,
  Users
}

export function ExamplesPage() {
  const { setDemo } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredDemos = demoConfigs.filter((demo) => {
    const matchesSearch = demo.name.toLowerCase().includes(searchQuery.toLowerCase()) || demo.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || demo.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredDemos = demoConfigs.filter((demo) => demo.featured)

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold">案例广场</h1>
        </div>
        <p className="text-muted-foreground text-lg">探索 Super Z 构建的精彩案例项目</p>
      </div>

      {featuredDemos.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />精选案例
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {featuredDemos.map((demo) => {
              const Icon = iconMap[demo.icon] || MessageSquare
              return (
                <Card key={demo.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/20" onClick={() => setDemo(demo)}>
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
                    <Button className="w-full gap-2">立即体验<ArrowRight className="w-4 h-4" /></Button>
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
                <Card key={demo.id} className="group cursor-pointer hover:shadow-md transition-all duration-300" onClick={() => setDemo(demo)}>
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
