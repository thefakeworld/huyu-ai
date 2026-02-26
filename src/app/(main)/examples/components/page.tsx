'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import Link from 'next/link'
import { ThemeToggle } from '@/components/docs/theme-toggle'
import {
  componentRegistry,
  categoryInfo,
  type ComponentCategory,
} from '@/components/docs/component-registry'
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
  Sparkles,
  BookOpen,
  ExternalLink,
  Grid3X3,
  List,
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

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
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* 头部区域 */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border p-8">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Package className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">组件库</h1>
              <Badge variant="secondary" className="text-sm">
                <Sparkles className="w-3 h-3 mr-1" />
                {componentRegistry.length} 组件
              </Badge>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl">
              基于 shadcn/ui 构建的企业级 React 组件库，提供完整的设计系统和开发体验。
              每个组件都经过精心设计，支持深色模式、响应式布局和完整的无障碍访问。
            </p>
            <div className="flex items-center gap-3">
              <Button asChild>
                <a href="https://ui.shadcn.com/docs" target="_blank" rel="noopener noreferrer" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  官方文档
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://github.com/shadcn-ui/ui" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 搜索和视图切换 */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="搜索组件名称、描述或标签..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 分类标签 */}
      <ScrollArea className="w-full whitespace-nowrap">
        <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as ComponentCategory | 'all')}>
          <TabsList className="flex-wrap h-auto gap-1 bg-transparent p-0">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full"
            >
              全部 ({categoryCounts.all})
            </TabsTrigger>
            {Object.entries(categoryInfo).map(([key, info]) => {
              const Icon = iconMap[info.icon] || Box
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full"
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {info.label} ({categoryCounts[key] || 0})
                </TabsTrigger>
              )
            })}
          </TabsList>
        </Tabs>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* 组件列表 */}
      {filteredComponents.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">没有找到匹配的组件</p>
            <Button variant="link" onClick={() => setSearchQuery('')} className="mt-2">
              清除搜索
            </Button>
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredComponents.map((component) => (
            <Card
              key={component.slug}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50 hover:border-primary/50"
            >
              <Link href={`/examples/components/${component.slug}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Code2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base group-hover:text-primary transition-colors">
                          {component.name}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {categoryInfo[component.category].label}
                        </Badge>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
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
      ) : (
        <div className="space-y-2">
          {filteredComponents.map((component) => (
            <Link
              key={component.slug}
              href={`/examples/components/${component.slug}`}
              className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-muted/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{component.name}</h3>
                  <Badge variant="outline" className="text-xs">{categoryInfo[component.category].label}</Badge>
                </div>
                <p className="text-sm text-muted-foreground truncate">{component.description}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {component.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      )}

      {/* 底部信息 */}
      <Card className="bg-gradient-to-r from-primary/5 to-background border-primary/20">
        <CardContent className="py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-semibold mb-1">基于 shadcn/ui 构建</h3>
              <p className="text-sm text-muted-foreground">
                所有组件基于 Radix UI 原语构建，确保可访问性和自定义能力
              </p>
            </div>
            <Button variant="outline" asChild>
              <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="gap-2">
                查看官方文档
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
