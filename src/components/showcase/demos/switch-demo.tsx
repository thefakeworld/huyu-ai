'use client'

import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Copy, Check } from 'lucide-react'

const codeExamples = {
  basic: `import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

<div className="flex items-center gap-2">
  <Switch id="airplane" />
  <Label htmlFor="airplane">飞行模式</Label>
</div>`,
  withText: `import { Switch } from '@/components/ui/switch'

<div className="flex items-center justify-between">
  <div>
    <p className="font-medium">邮件通知</p>
    <p className="text-sm text-muted-foreground">接收新邮件提醒</p>
  </div>
  <Switch />
</div>`,
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

export function SwitchDemo() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础用法</CardTitle>
          <CardDescription>Switch 用于切换二元状态</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Switch id="airplane" />
              <Label htmlFor="airplane" className="cursor-pointer">飞行模式</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="wifi" defaultChecked />
              <Label htmlFor="wifi" className="cursor-pointer">WiFi</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="bluetooth" />
              <Label htmlFor="bluetooth" className="cursor-pointer">蓝牙</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="disabled" disabled />
              <Label htmlFor="disabled" className="cursor-pointer text-muted-foreground">禁用开关</Label>
            </div>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.basic} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">设置项场景</CardTitle>
          <CardDescription>Switch 在设置页面的典型用法</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-medium">邮件通知</p>
                <p className="text-sm text-muted-foreground">接收新邮件提醒</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-medium">深色模式</p>
                <p className="text-sm text-muted-foreground">切换应用主题风格</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.withText} />
        </CardContent>
      </Card>
    </div>
  )
}
