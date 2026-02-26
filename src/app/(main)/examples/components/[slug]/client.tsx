'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  componentRegistry,
  categoryInfo,
  getComponentBySlug,
} from '@/components/docs/component-registry'
import { CodeBlock } from '@/components/docs/code-block'
import { ThemeToggle, useTheme } from '@/components/docs/theme-toggle'
import { ComponentSidebar } from '@/components/docs/component-sidebar'
import { ButtonDemo } from '@/components/docs/demos/button-demo'
import { InputDemo } from '@/components/docs/demos/input-demo'
import { BadgeDemo } from '@/components/docs/demos/badge-demo'
import { CardDemo } from '@/components/docs/demos/card-demo'
import { AlertDemo } from '@/components/docs/demos/alert-demo'
import { DialogDemo } from '@/components/docs/demos/dialog-demo'
import { TabsDemo } from '@/components/docs/demos/tabs-demo'
import { CheckboxDemo } from '@/components/docs/demos/checkbox-demo'
import { SwitchDemo } from '@/components/docs/demos/switch-demo'
import { ProgressDemo } from '@/components/docs/demos/progress-demo'
import { SkeletonDemo } from '@/components/docs/demos/skeleton-demo'
import { AvatarDemo } from '@/components/docs/demos/avatar-demo'
import { SelectDemo } from '@/components/docs/demos/select-demo'
import { TextareaDemo } from '@/components/docs/demos/textarea-demo'
import { RadioGroupDemo } from '@/components/docs/demos/radio-group-demo'
import { SliderDemo } from '@/components/docs/demos/slider-demo'
import { ToastDemo } from '@/components/docs/demos/toast-demo'
import { TooltipDemo } from '@/components/docs/demos/tooltip-demo'
import { PopoverDemo } from '@/components/docs/demos/popover-demo'
import { AlertDialogDemo } from '@/components/docs/demos/alert-dialog-demo'
import { SheetDemo } from '@/components/docs/demos/sheet-demo'
import { AccordionDemo } from '@/components/docs/demos/accordion-demo'
import { ScrollAreaDemo } from '@/components/docs/demos/scroll-area-demo'
import { DropdownMenuDemo } from '@/components/docs/demos/dropdown-menu-demo'
import { CommandDemo } from '@/components/docs/demos/command-demo'
import { CarouselDemo } from '@/components/docs/demos/carousel-demo'
import {
  ArrowLeft,
  Code2,
  Package,
  ExternalLink,
  Copy,
  Check,
  FileCode,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const demoComponents: Record<string, React.ComponentType> = {
  // 基础组件
  button: ButtonDemo,
  badge: BadgeDemo,
  skeleton: SkeletonDemo,
  // 表单组件
  input: InputDemo,
  textarea: TextareaDemo,
  checkbox: CheckboxDemo,
  'radio-group': RadioGroupDemo,
  select: SelectDemo,
  switch: SwitchDemo,
  slider: SliderDemo,
  // 布局组件
  card: CardDemo,
  tabs: TabsDemo,
  accordion: AccordionDemo,
  'scroll-area': ScrollAreaDemo,
  // 反馈组件
  alert: AlertDemo,
  dialog: DialogDemo,
  'alert-dialog': AlertDialogDemo,
  sheet: SheetDemo,
  toast: ToastDemo,
  popover: PopoverDemo,
  tooltip: TooltipDemo,
  // 数据展示
  avatar: AvatarDemo,
  progress: ProgressDemo,
  // 高级组件
  command: CommandDemo,
  'dropdown-menu': DropdownMenuDemo,
  carousel: CarouselDemo,
}

// 获取组件的安装代码
const getInstallCode = (name: string) => `npx shadcn@latest add ${name.toLowerCase()}`

// 获取组件的基础使用代码
const getBasicUsageCode = (name: string) => {
  const codes: Record<string, string> = {
    Button: `import { Button } from '@/components/ui/button'

export function ButtonExample() {
  return (
    <Button variant="default">
      Click me
    </Button>
  )
}`,
    Input: `import { Input } from '@/components/ui/input'

export function InputExample() {
  return (
    <Input placeholder="Enter text..." />
  )
}`,
    Badge: `import { Badge } from '@/components/ui/badge'

export function BadgeExample() {
  return (
    <Badge>New</Badge>
  )
}`,
    Card: `import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function CardExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
    </Card>
  )
}`,
  }
  return codes[name] || `import { ${name} } from '@/components/ui/${name.toLowerCase().replace(/ /g, '-')}'

// 使用组件
<${name} />`
}

export default function ComponentDetailClient({ slug }: { slug: string }) {
  const component = getComponentBySlug(slug)
  const { isDark } = useTheme()
  const [copiedInstall, setCopiedInstall] = useState(false)

  if (!component) {
    return (
      <div className="flex">
        <ComponentSidebar currentSlug={slug} />
        <div className="flex-1 space-y-6 p-6">
          <Button variant="ghost" asChild>
            <Link href="/examples/components">
              <ArrowLeft className="w-4 h-4 mr-2" />返回组件列表
            </Link>
          </Button>
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">组件未找到</h2>
              <p className="text-muted-foreground mb-4">该组件可能已被移除或不存在</p>
              <Button asChild>
                <Link href="/examples/components">查看所有组件</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const DemoComponent = demoComponents[slug]
  const installCode = getInstallCode(component.name)
  const usageCode = getBasicUsageCode(component.name)

  // 获取相邻组件
  const currentIndex = componentRegistry.findIndex(c => c.slug === slug)
  const prevComponent = currentIndex > 0 ? componentRegistry[currentIndex - 1] : null
  const nextComponent = currentIndex < componentRegistry.length - 1 ? componentRegistry[currentIndex + 1] : null

  const copyInstallCode = async () => {
    await navigator.clipboard.writeText(installCode)
    setCopiedInstall(true)
    setTimeout(() => setCopiedInstall(false), 2000)
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* 侧边栏导航 */}
      <ComponentSidebar currentSlug={slug} />

      {/* 主内容区 */}
      <div className="flex-1 min-w-0">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {/* 顶部工具栏 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/examples/components" className="hover:text-foreground transition-colors">
                组件
              </Link>
              <span>/</span>
              <span className="text-foreground">{component.name}</span>
            </div>
            <ThemeToggle />
          </div>

          {/* 组件头部 */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Code2 className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold">{component.name}</h1>
                    <Badge variant="secondary" className="text-xs">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {categoryInfo[component.category].label}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-1">{component.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {component.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="outline" asChild>
                <a
                  href={`https://ui.shadcn.com/docs/components/${component.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <ExternalLink className="w-4 h-4" />官方文档
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href={`https://github.com/shadcn-ui/ui/tree/main/apps/www/registry/new-york/ui/${component.slug}.tsx`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <FileCode className="w-4 h-4" />源码
                </a>
              </Button>
            </div>
          </div>

          <Separator />

          {/* 安装 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="w-5 h-5" />
                安装
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-muted rounded-lg p-4 text-sm font-mono overflow-x-auto">
                  <code>{installCode}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={copyInstallCode}
                >
                  {copiedInstall ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 文档 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">组件说明</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{component.docs}</p>
            </CardContent>
          </Card>

          {/* API 属性 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">API 属性</CardTitle>
              <CardDescription>组件支持的主要属性和方法</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full">
                <div className="rounded-md border min-w-[500px]">
                  <div className="grid grid-cols-4 gap-4 p-4 bg-muted/50 text-sm font-medium">
                    <div>属性名</div>
                    <div>类型</div>
                    <div>默认值</div>
                    <div>说明</div>
                  </div>
                  <Separator />
                  {component.props.map((prop, index) => (
                    <div key={prop.name}>
                      {index > 0 && <Separator />}
                      <div className="grid grid-cols-4 gap-4 p-4 text-sm">
                        <div className="font-mono text-primary">
                          {prop.required && <span className="text-destructive">*</span>}
                          {prop.name}
                        </div>
                        <div className="font-mono text-xs text-muted-foreground">{prop.type}</div>
                        <div className="font-mono text-xs">{prop.default || '-'}</div>
                        <div className="text-muted-foreground">{prop.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>

          {/* 基础用法 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                基础用法
              </CardTitle>
              <CardDescription>如何使用此组件</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={usageCode} language="tsx" isDark={isDark} />
            </CardContent>
          </Card>

          {/* 演示示例 */}
          {DemoComponent && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">使用示例</CardTitle>
                <CardDescription>组件不同状态的演示和代码</CardDescription>
              </CardHeader>
              <CardContent>
                <DemoComponent />
              </CardContent>
            </Card>
          )}

          {!DemoComponent && (
            <Card className="bg-muted/50">
              <CardContent className="py-8 text-center">
                <Code2 className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                <h3 className="font-medium mb-2">演示示例开发中</h3>
                <p className="text-sm text-muted-foreground mb-4">该组件的演示示例正在开发中，请参考官方文档</p>
                <Button variant="outline" asChild>
                  <a href={`https://ui.shadcn.com/docs/components/${component.slug}`} target="_blank" rel="noopener noreferrer">
                    查看官方示例
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* 依赖 */}
          {component.dependencies.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">相关依赖</CardTitle>
                <CardDescription>该组件依赖的其他组件</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {component.dependencies.map((dep) => (
                    <Button key={dep} variant="outline" size="sm" asChild>
                      <Link href={`/examples/components/${dep.toLowerCase()}`}>{dep}</Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 相邻组件导航 */}
          <div className="grid md:grid-cols-2 gap-4">
            {prevComponent ? (
              <Link
                href={`/examples/components/${prevComponent.slug}`}
                className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-muted/50 transition-all group"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">上一个</p>
                  <p className="font-semibold group-hover:text-primary">{prevComponent.name}</p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextComponent ? (
              <Link
                href={`/examples/components/${nextComponent.slug}`}
                className="flex items-center justify-end gap-4 p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-muted/50 transition-all group text-right"
              >
                <div>
                  <p className="text-sm text-muted-foreground">下一个</p>
                  <p className="font-semibold group-hover:text-primary">{nextComponent.name}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
