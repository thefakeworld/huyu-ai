'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Copy, Check, Mail } from 'lucide-react'

const codeExamples = {
  basic: `import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

<Dialog>
  <DialogTrigger asChild>
    <Button>打开对话框</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>对话框标题</DialogTitle>
    </DialogHeader>
    <p>对话框内容</p>
  </DialogContent>
</Dialog>`,
  form: `import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

<Dialog>
  <DialogTrigger asChild>
    <Button>编辑资料</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>编辑个人资料</DialogTitle>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label>名称</Label>
        <Input placeholder="输入名称" />
      </div>
    </div>
    <DialogFooter>
      <Button>保存更改</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  alert: `import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">删除账户</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>确定删除？</AlertDialogTitle>
      <AlertDialogDescription>此操作无法撤销</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>取消</AlertDialogCancel>
      <AlertDialogAction>确认删除</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
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

export function DialogDemo() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础对话框</CardTitle>
          <CardDescription>Dialog 用于展示需要用户注意的内容</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>打开对话框</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>对话框标题</DialogTitle>
                <DialogDescription>这是对话框的描述内容，用于向用户说明对话框的用途。</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-muted-foreground">对话框主体内容区域，可以放置任意内容。</p>
              </div>
            </DialogContent>
          </Dialog>
          <Separator />
          <CodeBlock code={codeExamples.basic} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">表单对话框</CardTitle>
          <CardDescription>在对话框中放置表单内容</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline"><Mail className="w-4 h-4 mr-2" />编辑资料</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>编辑个人资料</DialogTitle>
                <DialogDescription>修改您的个人信息后点击保存。</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">名称</Label>
                  <Input placeholder="请输入名称" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">邮箱</Label>
                  <Input type="email" placeholder="请输入邮箱" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">保存更改</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Separator />
          <CodeBlock code={codeExamples.form} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">警告对话框</CardTitle>
          <CardDescription>AlertDialog 用于需要用户确认的重要操作</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">删除账户</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>确定要删除账户吗？</AlertDialogTitle>
                <AlertDialogDescription>此操作将永久删除您的账户和所有相关数据，且无法恢复。请确认您已备份重要信息。</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">确认删除</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Separator />
          <CodeBlock code={codeExamples.alert} />
        </CardContent>
      </Card>
    </div>
  )
}
