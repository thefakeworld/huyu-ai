'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { Calculator, Calendar, CreditCard, Settings, Smile, User, Search, Command as CommandIcon } from 'lucide-react'

const codeExamples = {
  basic: `import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

<Command>
  <CommandInput placeholder="输入搜索..." />
  <CommandList>
    <CommandEmpty>没有找到结果</CommandEmpty>
    <CommandGroup heading="建议">
      <CommandItem>日历</CommandItem>
      <CommandItem>搜索表情</CommandItem>
      <CommandItem>计算器</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
  dialog: `import { Command } from '@/components/ui/command'
import { Dialog, DialogContent } from '@/components/ui/dialog'

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="overflow-hidden p-0">
    <Command>
      <CommandInput placeholder="搜索..." />
      <CommandList>
        <CommandEmpty>没有找到结果</CommandEmpty>
        <CommandGroup heading="建议">
          <CommandItem>日历</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  </DialogContent>
</Dialog>`,
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto whitespace-pre-wrap">
      <code>{code}</code>
    </pre>
  )
}

export function CommandDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-8">
      {/* 基础用法 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础用法</CardTitle>
          <CardDescription>命令面板组件，支持搜索和键盘导航</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="输入搜索内容..." />
            <CommandList>
              <CommandEmpty>没有找到结果</CommandEmpty>
              <CommandGroup heading="建议">
                <CommandItem onSelect={() => toast.success('选择了日历')}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>日历</span>
                </CommandItem>
                <CommandItem onSelect={() => toast.success('选择了表情')}>
                  <Smile className="mr-2 h-4 w-4" />
                  <span>搜索表情</span>
                </CommandItem>
                <CommandItem onSelect={() => toast.success('选择了计算器')}>
                  <Calculator className="mr-2 h-4 w-4" />
                  <span>计算器</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="设置">
                <CommandItem onSelect={() => toast.success('选择了个人资料')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>个人资料</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => toast.success('选择了账单')}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>账单</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => toast.success('选择了设置')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>设置</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
          <Separator />
          <CodeBlock code={codeExamples.basic} />
        </CardContent>
      </Card>

      {/* 命令面板弹窗 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">命令面板弹窗</CardTitle>
          <CardDescription>结合 Dialog 实现 Cmd+K 风格的命令面板</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button onClick={() => setOpen(true)}>
              <Search className="w-4 h-4 mr-2" />
              打开命令面板
            </Button>
            <span className="text-sm text-muted-foreground">
              或按 <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium"><CommandIcon className="w-3 h-3" />K</kbd>
            </span>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="overflow-hidden p-0 shadow-lg max-w-lg">
              <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
                <CommandInput placeholder="搜索命令..." />
                <CommandList>
                  <CommandEmpty>没有找到结果</CommandEmpty>
                  <CommandGroup heading="快速操作">
                    <CommandItem onSelect={() => { toast.success('新建文件'); setOpen(false) }}>
                      <Calculator className="mr-2 h-4 w-4" />
                      新建文件
                      <CommandShortcut>⌘N</CommandShortcut>
                    </CommandItem>
                    <CommandItem onSelect={() => { toast.success('打开文件'); setOpen(false) }}>
                      <Calendar className="mr-2 h-4 w-4" />
                      打开文件
                      <CommandShortcut>⌘O</CommandShortcut>
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="设置">
                    <CommandItem onSelect={() => { toast.success('打开设置'); setOpen(false) }}>
                      <Settings className="mr-2 h-4 w-4" />
                      设置
                      <CommandShortcut>⌘,</CommandShortcut>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </DialogContent>
          </Dialog>
          <Separator />
          <CodeBlock code={codeExamples.dialog} />
        </CardContent>
      </Card>

      {/* 搜索过滤 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">搜索过滤</CardTitle>
          <CardDescription>输入内容实时过滤菜单项</CardDescription>
        </CardHeader>
        <CardContent>
          <Command className="rounded-lg border">
            <CommandInput placeholder="搜索组件..." />
            <CommandList>
              <CommandEmpty>没有找到相关组件</CommandEmpty>
              <CommandGroup heading="基础组件">
                <CommandItem>Button 按钮</CommandItem>
                <CommandItem>Input 输入框</CommandItem>
                <CommandItem>Badge 徽章</CommandItem>
              </CommandGroup>
              <CommandGroup heading="布局组件">
                <CommandItem>Card 卡片</CommandItem>
                <CommandItem>Tabs 标签页</CommandItem>
                <CommandItem>Accordion 手风琴</CommandItem>
              </CommandGroup>
              <CommandGroup heading="反馈组件">
                <CommandItem>Dialog 对话框</CommandItem>
                <CommandItem>Toast 提示</CommandItem>
                <CommandItem>Alert 警告</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CardContent>
      </Card>
    </div>
  )
}
