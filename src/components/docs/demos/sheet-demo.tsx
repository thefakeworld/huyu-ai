'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Menu, Settings, User } from 'lucide-react'

const codeExamples = {
  basic: `import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">打开</Button>
  </SheetTrigger>
  <SheetContent>
    <p>这是侧边栏内容</p>
  </SheetContent>
</Sheet>`,
  sides: `import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

<Sheet>
  <SheetTrigger asChild>
    <Button>左侧</Button>
  </SheetTrigger>
  <SheetContent side="left">内容</SheetContent>
</Sheet>

<Sheet>
  <SheetTrigger asChild>
    <Button>右侧</Button>
  </SheetTrigger>
  <SheetContent side="right">内容</SheetContent>
</Sheet>`,
  form: `import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

<Sheet>
  <SheetTrigger asChild>
    <Button>编辑资料</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>编辑个人资料</SheetTitle>
    </SheetHeader>
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">姓名</Label>
        <Input id="name" defaultValue="张三" />
      </div>
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button>保存</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto whitespace-pre-wrap">
      <code>{code}</code>
    </pre>
  )
}

export function SheetDemo() {
  return (
    <div className="space-y-8">
      {/* 基础用法 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础用法</CardTitle>
          <CardDescription>侧边滑出的面板组件</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">打开侧边栏</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>侧边栏标题</SheetTitle>
                <SheetDescription>
                  这是一个基础的侧边栏面板示例
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  在这里放置任意内容...
                </p>
              </div>
            </SheetContent>
          </Sheet>
          <Separator />
          <CodeBlock code={codeExamples.basic} />
        </CardContent>
      </Card>

      {/* 不同方向 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">不同方向</CardTitle>
          <CardDescription>设置面板滑出的方向</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">左侧</Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>左侧面板</SheetTitle>
                </SheetHeader>
                <p className="mt-4 text-sm text-muted-foreground">
                  从左侧滑出的面板
                </p>
              </SheetContent>
            </Sheet>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">右侧</Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>右侧面板</SheetTitle>
                </SheetHeader>
                <p className="mt-4 text-sm text-muted-foreground">
                  从右侧滑出的面板
                </p>
              </SheetContent>
            </Sheet>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">顶部</Button>
              </SheetTrigger>
              <SheetContent side="top">
                <SheetHeader>
                  <SheetTitle>顶部面板</SheetTitle>
                </SheetHeader>
                <p className="mt-4 text-sm text-muted-foreground">
                  从顶部滑出的面板
                </p>
              </SheetContent>
            </Sheet>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">底部</Button>
              </SheetTrigger>
              <SheetContent side="bottom">
                <SheetHeader>
                  <SheetTitle>底部面板</SheetTitle>
                </SheetHeader>
                <p className="mt-4 text-sm text-muted-foreground">
                  从底部滑出的面板
                </p>
              </SheetContent>
            </Sheet>
          </div>
          <Separator />
          <CodeBlock code={codeExamples.sides} />
        </CardContent>
      </Card>

      {/* 表单示例 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">表单面板</CardTitle>
          <CardDescription>在侧边栏中包含表单内容</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <Settings className="w-4 h-4 mr-2" />
                编辑资料
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>编辑个人资料</SheetTitle>
                <SheetDescription>
                  修改您的个人信息后点击保存
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    姓名
                  </Label>
                  <Input id="name" defaultValue="张三" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    用户名
                  </Label>
                  <Input id="username" defaultValue="@zhangsan" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    邮箱
                  </Label>
                  <Input id="email" type="email" defaultValue="zhangsan@example.com" className="col-span-3" />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">保存更改</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <Separator />
          <CodeBlock code={codeExamples.form} />
        </CardContent>
      </Card>

      {/* 导航菜单 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">导航菜单</CardTitle>
          <CardDescription>移动端常见的侧边导航</CardDescription>
        </CardHeader>
        <CardContent>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  导航菜单
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 mt-4">
                <SheetClose asChild>
                  <Button variant="ghost" className="justify-start">首页</Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="ghost" className="justify-start">组件</Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="ghost" className="justify-start">文档</Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="ghost" className="justify-start">关于</Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </div>
  )
}
