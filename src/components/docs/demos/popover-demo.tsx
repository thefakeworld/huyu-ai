'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Settings, User, Bell } from 'lucide-react'

const codeExamples = {
  basic: `import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">打开</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>这是弹出内容</p>
  </PopoverContent>
</Popover>`,
  form: `import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

<Popover>
  <PopoverTrigger asChild>
    <Button>设置</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium">设置</h4>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="width">宽度</Label>
        <Input id="width" defaultValue="100%" />
      </div>
    </div>
  </PopoverContent>
</Popover>`,
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto">
      <code>{code}</code>
    </pre>
  )
}

export function PopoverDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-8">
      {/* 基础用法 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础用法</CardTitle>
          <CardDescription>点击触发弹出内容</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">打开弹出框</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">尺寸</h4>
                  <p className="text-sm text-muted-foreground">
                    设置组件的宽度
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Separator />
          <CodeBlock code={codeExamples.basic} />
        </CardContent>
      </Card>

      {/* 表单弹出 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">表单弹出</CardTitle>
          <CardDescription>在弹出框中包含表单内容</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button>
                <Settings className="w-4 h-4 mr-2" />
                设置
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">设置面板</h4>
                  <p className="text-sm text-muted-foreground">
                    自定义您的偏好设置
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">宽度</Label>
                    <Input id="width" defaultValue="100%" className="col-span-2" />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height">高度</Label>
                    <Input id="height" defaultValue="auto" className="col-span-2" />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Separator />
          <CodeBlock code={codeExamples.form} />
        </CardContent>
      </Card>

      {/* 受控组件 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">受控组件</CardTitle>
          <CardDescription>通过 open 和 onOpenChange 控制</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <User className="w-4 h-4 mr-2" />
                  用户菜单
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="grid gap-2">
                  <Button variant="ghost" className="justify-start" onClick={() => setOpen(false)}>
                    个人资料
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => setOpen(false)}>
                    设置
                  </Button>
                  <Button variant="ghost" className="justify-start text-destructive" onClick={() => setOpen(false)}>
                    退出登录
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <span className="text-sm text-muted-foreground">
              状态: {open ? '打开' : '关闭'}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* 不同位置 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">不同位置</CardTitle>
          <CardDescription>设置弹出框显示位置</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">上方</Button>
              </PopoverTrigger>
              <PopoverContent side="top">
                <p>顶部弹出</p>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">右方</Button>
              </PopoverTrigger>
              <PopoverContent side="right">
                <p>右侧弹出</p>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">下方</Button>
              </PopoverTrigger>
              <PopoverContent side="bottom">
                <p>底部弹出</p>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">左方</Button>
              </PopoverTrigger>
              <PopoverContent side="left">
                <p>左侧弹出</p>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
