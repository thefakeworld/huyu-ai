'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  componentRegistry,
  categoryInfo,
  getCategories,
  getComponentsByCategory,
  type ComponentCategory,
} from '@/components/docs/component-registry'
import {
  ChevronDown,
  ChevronRight,
  Search,
  Box,
  FileText,
  Layout,
  Navigation,
  MessageCircle,
  Database,
  Settings,
  Menu,
  X,
} from 'lucide-react'

// 分类图标映射
const categoryIcons: Record<ComponentCategory, React.ReactNode> = {
  basic: <Box className="w-4 h-4" />,
  form: <FileText className="w-4 h-4" />,
  layout: <Layout className="w-4 h-4" />,
  navigation: <Navigation className="w-4 h-4" />,
  feedback: <MessageCircle className="w-4 h-4" />,
  data: <Database className="w-4 h-4" />,
  advanced: <Settings className="w-4 h-4" />,
}

interface ComponentSidebarProps {
  currentSlug: string
}

export function ComponentSidebar({ currentSlug }: ComponentSidebarProps) {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<ComponentCategory>>(
    new Set(getCategories())
  )
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // 切换分类展开状态
  const toggleCategory = (category: ComponentCategory) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  // 过滤组件
  const filteredComponents = searchQuery
    ? componentRegistry.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : null

  // 按分类分组的组件
  const categories = getCategories()

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* 搜索框 */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="搜索组件..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* 组件列表 */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {/* 搜索结果 */}
          {filteredComponents ? (
            <div className="space-y-1">
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
                搜索结果 ({filteredComponents.length})
              </div>
              {filteredComponents.map((component) => (
                <Link
                  key={component.slug}
                  href={`/examples/components/${component.slug}`}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    component.slug === currentSlug
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <span>{component.name}</span>
                  <Badge variant="outline" className="text-xs ml-auto">
                    {categoryInfo[component.category].label}
                  </Badge>
                </Link>
              ))}
              {filteredComponents.length === 0 && (
                <div className="px-3 py-8 text-center text-muted-foreground text-sm">
                  未找到匹配的组件
                </div>
              )}
            </div>
          ) : (
            /* 分类列表 */
            <div className="space-y-1">
              {categories.map((category) => {
                const components = getComponentsByCategory(category)
                const isExpanded = expandedCategories.has(category)
                const info = categoryInfo[category]
                const hasActiveComponent = components.some((c) => c.slug === currentSlug)

                return (
                  <div key={category}>
                    {/* 分类标题 */}
                    <button
                      onClick={() => toggleCategory(category)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        hasActiveComponent
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      {categoryIcons[category]}
                      <span className="flex-1 text-left">{info.label}</span>
                      <Badge variant="secondary" className="text-xs">
                        {components.length}
                      </Badge>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>

                    {/* 组件列表 */}
                    {isExpanded && (
                      <div className="ml-4 mt-1 space-y-0.5 border-l pl-2">
                        {components.map((component) => (
                          <Link
                            key={component.slug}
                            href={`/examples/components/${component.slug}`}
                            onClick={() => setIsMobileOpen(false)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                              component.slug === currentSlug
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            <span className="truncate">{component.name}</span>
                            {!componentRegistry.find(c => c.slug === component.slug)?.dependencies.length ? null : (
                              <span className="text-xs text-muted-foreground">•</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* 底部信息 */}
      <div className="p-4 border-t">
        <Link
          href="/examples/components"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Layout className="w-4 h-4" />
          <span>查看所有组件</span>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* 移动端触发按钮 */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-4 z-50 lg:hidden shadow-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </Button>

      {/* 移动端侧边栏 */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-72 bg-background border-r shadow-lg transform transition-transform duration-300 lg:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* 桌面端侧边栏 */}
      <aside className="hidden lg:block w-64 shrink-0 border-r bg-muted/30">
        <div className="sticky top-16 h-[calc(100vh-4rem)]">
          {sidebarContent}
        </div>
      </aside>
    </>
  )
}
