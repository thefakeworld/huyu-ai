'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  componentRegistry,
  categoryInfo,
  getComponentBySlug,
} from '@/components/showcase/component-registry'
import { ButtonDemo } from '@/components/showcase/demos/button-demo'
import { InputDemo } from '@/components/showcase/demos/input-demo'
import { BadgeDemo } from '@/components/showcase/demos/badge-demo'
import { CardDemo } from '@/components/showcase/demos/card-demo'
import { AlertDemo } from '@/components/showcase/demos/alert-demo'
import { DialogDemo } from '@/components/showcase/demos/dialog-demo'
import { TabsDemo } from '@/components/showcase/demos/tabs-demo'
import { CheckboxDemo } from '@/components/showcase/demos/checkbox-demo'
import { SwitchDemo } from '@/components/showcase/demos/switch-demo'
import { ProgressDemo } from '@/components/showcase/demos/progress-demo'
import { SkeletonDemo } from '@/components/showcase/demos/skeleton-demo'
import { AvatarDemo } from '@/components/showcase/demos/avatar-demo'
import {
  ArrowLeft,
  Copy,
  Check,
  Code2,
  Package,
  ExternalLink,
} from 'lucide-react'
import { useState } from 'react'

// 演示组件映射
const demoComponents: Record<string, React.ComponentType> = {
  button: ButtonDemo,
  input: InputDemo,
  badge: BadgeDemo,
  card: CardDemo,
  alert: AlertDemo,
  dialog: DialogDemo,
  tabs: TabsDemo,
  checkbox: CheckboxDemo,
  switch: SwitchDemo,
  progress: ProgressDemo,
  skeleton: SkeletonDemo,
  avatar: AvatarDemo,
}

export default function ComponentDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const component = getComponentBySlug(slug)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  if (!component) {
    return (
      <div className="space-y-6">
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
    )
  }

  const DemoComponent = demoComponents[slug]

  const copyCode = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* 返回按钮 */}
      <Button variant="ghost" asChild>
        <Link href="/examples/components">
          <ArrowLeft className="w-4 h-4 mr-2" />返回组件列表
        </Link>
      </Button>

      {/* 组件头部信息 */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{component.name}</h1>
                <Badge variant="outline">{categoryInfo[component.category].label}</Badge>
              </div>
            </div>
            <p className="text-muted-foreground text-lg mt-2">{component.description}</p>
          </div>
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
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2">
          {component.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </div>

      <Separator />

      {/* 文档说明 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">组件文档</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{component.docs}</p>
        </CardContent>
      </Card>

      {/* 属性列表 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">API 属性</CardTitle>
          <CardDescription>组件支持的主要属性和方法</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
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
        </CardContent>
      </Card>

      {/* 组件演示 */}
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

      {/* 未实现演示提示 */}
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

      {/* 依赖组件 */}
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

      {/* 导航到其他组件 */}
      <Card className="bg-muted/50">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              共 {componentRegistry.length} 个组件
            </span>
            <Button variant="outline" asChild>
              <Link href="/examples/components">浏览全部组件</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
