'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { User, Settings, LogOut, Mail, Plus, Github, LifeBuoy } from 'lucide-react'

const codeExamples = {
  basic: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">打开菜单</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>个人资料</DropdownMenuItem>
    <DropdownMenuItem>设置</DropdownMenuItem>
    <DropdownMenuItem>退出</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  group: `import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>菜单</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>我的账户</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>个人资料</DropdownMenuItem>
      <DropdownMenuItem>设置</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem>退出登录</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  shortcut: `import { DropdownMenuItem, DropdownMenuShortcut } from '@/components/ui/dropdown-menu'

<DropdownMenuItem>
  复制
  <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
</DropdownMenuItem>`,
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto whitespace-pre-wrap">
      <code>{code}</code>
    </pre>
  )
}

export function DropdownMenuDemo() {
  return (
    <div className="space-y-8">
      {/* 基础用法 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础用法</CardTitle>
          <CardDescription>下拉菜单组件的基础使用方式</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">打开菜单</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => toast.success('点击了个人资料')}>
                个人资料
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success('点击了设置')}>
                设置
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success('点击了帮助')}>
                帮助中心
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Separator />
          <CodeBlock code={codeExamples.basic} />
        </CardContent>
      </Card>

      {/* 带分组和标签 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">分组和标签</CardTitle>
          <CardDescription>使用 Group 和 Label 组织菜单项</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <User className="w-4 h-4 mr-2" />
                我的账户
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>我的账户</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>个人资料</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>设置</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>邀请好友</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>新建团队</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast.success('已退出登录')}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>退出登录</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Separator />
          <CodeBlock code={codeExamples.group} />
        </CardContent>
      </Card>

      {/* 子菜单 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">子菜单</CardTitle>
          <CardDescription>使用 Sub 创建嵌套菜单</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">更多选项</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>帮助</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LifeBuoy className="mr-2 h-4 w-4" />
                获取帮助
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>查看源码</DropdownMenuItem>
                    <DropdownMenuItem>提交 Issue</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>查看文档</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>
                API 文档（即将推出）
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>

      {/* 复选框项 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">不同状态</CardTitle>
          <CardDescription>禁用状态和选中状态</CardDescription>
        </CardHeader>
        <CardContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">状态演示</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                正常项目
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                禁用项目
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem inset>
                缩进项目
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    </div>
  )
}
