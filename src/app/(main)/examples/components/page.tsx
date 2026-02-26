'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import {
  componentRegistry,
  categoryInfo,
  type ComponentCategory,
} from '@/components/showcase/component-registry'
import {
  Search,
  Box,
  FileText,
  Layout,
  Navigation,
  MessageCircle,
  Database,
  Settings,
  ArrowRight,
  Code2,
  Package,
} from 'lucide-react'

const iconMap: Record<string, typeof Box> = {
  Box,
  FileText,
  Layout,
  Navigation,
  MessageCircle,
  Database,
  Settings,
}

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory | 'all'>('all')

  const filteredComponents = useMemo(() => {
    return componentRegistry.filter((component) => {
      const matchesSearch =
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: componentRegistry.length }
    componentRegistry.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1
    })
    return counts
  }, [])

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Package className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold">组件展示</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          探索项目中的 {componentRegistry.length} 个 UI 组件，查看文档和使用示例
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="搜索组件名称、描述或标签..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as ComponentCategory | 'all')}>
        <TabsList className="flex-wrap h-auto gap-1 bg-transparent p-0">
          <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            全部 ({categoryCounts.all})
          </TabsTrigger>
          {Object.entries(categoryInfo).map(([key, info]) => {
            const Icon = iconMap[info.icon] || Box
            return (
              <TabsTrigger key={key} value={key} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon className="w-4 h-4 mr-1" />
                {info.label} ({categoryCounts[key] || 0})
              </TabsTrigger>
            )
          })}
        </TabsList>
      </Tabs>

      {filteredComponents.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">没有找到匹配的组件</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredComponents.map((component) => (
            <Card key={component.slug} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <Link href={`/examples/components/${component.slug}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Code2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base group-hover:text-primary transition-colors">{component.name}</CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">{categoryInfo[component.category].label}</Badge>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-2 mb-3">{component.description}</CardDescription>
                  <div className="flex flex-wrap gap-1">
                    {component.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      )}

      <Card className="bg-muted/50">
        <CardContent className="py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-semibold mb-1">组件库基于 shadcn/ui</h3>
              <p className="text-sm text-muted-foreground">所有组件均基于 Radix UI 原语构建，确保可访问性和自定义能力</p>
            </div>
            <Button variant="outline" asChild>
              <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer">查看官方文档</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
