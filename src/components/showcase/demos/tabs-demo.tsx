'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Copy, Check, User, Settings, Bell } from 'lucide-react'

const codeExamples = {
  basic: `import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">账户</TabsTrigger>
    <TabsTrigger value="password">密码</TabsTrigger>
  </TabsList>
  <TabsContent value="account">账户设置内容</TabsContent>
  <TabsContent value="password">密码设置内容</TabsContent>
</Tabs>`,
  withIcon: `import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, Settings, Bell } from 'lucide-react'

<TabsList>
  <TabsTrigger value="profile"><User className="w-4 h-4 mr-2" />资料</TabsTrigger>
  <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-2" />设置</TabsTrigger>
  <TabsTrigger value="notifications"><Bell className="w-4 h-4 mr-2" />通知</TabsTrigger>
</TabsList>`,
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const copyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="relative group">
      <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
      <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={copyCode}>
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
      </Button>
    </div>
  )
}

export function TabsDemo() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础标签页</CardTitle>
          <CardDescription>Tabs 组件用于在同一区域内切换不同内容</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="account" className="w-full">
            <TabsList>
              <TabsTrigger value="account">账户</TabsTrigger>
              <TabsTrigger value="password">密码</TabsTrigger>
              <TabsTrigger value="settings">设置</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="p-4 border rounded-md mt-2">
              <h4 className="font-medium mb-2">账户设置</h4>
              <p className="text-muted-foreground text-sm">在这里可以修改您的账户信息和偏好设置。</p>
            </TabsContent>
            <TabsContent value="password" className="p-4 border rounded-md mt-2">
              <h4 className="font-medium mb-2">修改密码</h4>
              <p className="text-muted-foreground text-sm">定期更换密码可以提高账户安全性。</p>
            </TabsContent>
            <TabsContent value="settings" className="p-4 border rounded-md mt-2">
              <h4 className="font-medium mb-2">系统设置</h4>
              <p className="text-muted-foreground text-sm">配置系统的各项参数和选项。</p>
            </TabsContent>
          </Tabs>
          <Separator />
          <CodeBlock code={codeExamples.basic} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">带图标标签页</CardTitle>
          <CardDescription>标签页可以配合图标使用增强语义</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList>
              <TabsTrigger value="profile" className="gap-2"><User className="w-4 h-4" />资料</TabsTrigger>
              <TabsTrigger value="settings" className="gap-2"><Settings className="w-4 h-4" />设置</TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="w-4 h-4" />通知
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">3</Badge>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="p-4 border rounded-md mt-2">
              <p className="text-muted-foreground">个人资料内容区域</p>
            </TabsContent>
            <TabsContent value="settings" className="p-4 border rounded-md mt-2">
              <p className="text-muted-foreground">系统设置内容区域</p>
            </TabsContent>
            <TabsContent value="notifications" className="p-4 border rounded-md mt-2">
              <p className="text-muted-foreground">通知消息内容区域</p>
            </TabsContent>
          </Tabs>
          <Separator />
          <CodeBlock code={codeExamples.withIcon} />
        </CardContent>
      </Card>
    </div>
  )
}
