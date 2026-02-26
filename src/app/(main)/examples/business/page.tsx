'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import Link from 'next/link'
import {
  businessRegistry,
  businessCategoryInfo,
  type BusinessCategory,
} from '@/components/business/registry'
import {
  Search,
  Shield,
  Layout,
  FileText,
  ArrowRight,
  Code2,
  Layers,
  Grid3X3,
  List,
  Folder,
} from 'lucide-react'

const iconMap: Record<string, typeof Shield> = {
  Shield,
  Layout,
  FileText,
}

export default function BusinessComponentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | 'all'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredComponents = useMemo(() => {
    return businessRegistry.filter((component) => {
      const matchesSearch =
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: businessRegistry.length }
    businessRegistry.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1
    })
    return counts
  }, [])

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* 头部区域 */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-background border p-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
            <Layers className="w-8 h-8 text-emerald-600" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">业务组件</h1>
              <Badge variant="secondary" className="text-sm bg-emerald-500/10 text-emerald-600">
                <Folder className="w-3 h-3 mr-1" />
                {businessRegistry.length} 组件
              </Badge>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl">
              项目中构建的业务级组件，包含认证、布局、页面等完整功能模块。
              这些组件展示了如何将基础 UI 组件组合成复杂的业务功能。
            </p>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/examples/components" className="gap-2">
                  <Code2 className="w-4 h-4" />
                  查看基础组件
                </Link>
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
            placeholder="搜索业务组件..."
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
        <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as BusinessCategory | 'all')}>
          <TabsList className="flex-wrap h-auto gap-1 bg-transparent p-0">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-full"
            >
              全部 ({categoryCounts.all})
            </TabsTrigger>
            {Object.entries(businessCategoryInfo).map(([key, info]) => {
              const Icon = iconMap[info.icon] || Shield
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-full"
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
          {filteredComponents.map((component) => {
            const Icon = iconMap[businessCategoryInfo[component.category].icon] || Shield
            return (
              <Card
                key={component.slug}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-emerald-500/50"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                        <Icon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base group-hover:text-emerald-600 transition-colors">
                          {component.name}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {businessCategoryInfo[component.category].label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-2 mb-3">{component.description}</CardDescription>
                  <div className="flex flex-wrap gap-1">
                    {component.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t">
                    <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {component.path}
                    </code>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredComponents.map((component) => {
            const Icon = iconMap[businessCategoryInfo[component.category].icon] || Shield
            return (
              <div
                key={component.slug}
                className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:border-emerald-500/50 hover:bg-muted/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors flex-shrink-0">
                  <Icon className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold group-hover:text-emerald-600 transition-colors">{component.name}</h3>
                    <Badge variant="outline" className="text-xs">{businessCategoryInfo[component.category].label}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{component.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {component.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded hidden lg:block">
                  {component.path}
                </code>
              </div>
            )
          })}
        </div>
      )}

      {/* 组件详情提示 */}
      <Card className="bg-gradient-to-r from-emerald-500/5 to-background border-emerald-500/20">
        <CardContent className="py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-semibold mb-1">业务组件使用说明</h3>
              <p className="text-sm text-muted-foreground">
                业务组件位于 <code className="text-xs bg-muted px-1 rounded">@/components/business/</code> 目录，
                可直接导入使用
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/examples/components" className="gap-2">
                查看基础 UI 组件
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
