'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'

const codeExamples = {
  basic: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>第一项</AccordionTrigger>
    <AccordionContent>
      这是第一项的内容
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>第二项</AccordionTrigger>
    <AccordionContent>
      这是第二项的内容
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
  multiple: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

<Accordion type="multiple">
  <AccordionItem value="item-1">
    <AccordionTrigger>可同时展开</AccordionTrigger>
    <AccordionContent>内容一</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>多项展开</AccordionTrigger>
    <AccordionContent>内容二</AccordionContent>
  </AccordionItem>
</Accordion>`,
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto whitespace-pre-wrap">
      <code>{code}</code>
    </pre>
  )
}

export function AccordionDemo() {
  return (
    <div className="space-y-8">
      {/* 基础用法 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础用法</CardTitle>
          <CardDescription>手风琴折叠面板组件</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>什么是 React？</AccordionTrigger>
              <AccordionContent>
                React 是一个用于构建用户界面的 JavaScript 库。它由 Facebook 开发和维护，可以帮助开发者创建可复用的 UI 组件。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>什么是 Next.js？</AccordionTrigger>
              <AccordionContent>
                Next.js 是一个基于 React 的全栈框架，提供服务器端渲染、静态生成等功能，让构建 Web 应用更加简单高效。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>什么是 Tailwind CSS？</AccordionTrigger>
              <AccordionContent>
                Tailwind CSS 是一个实用优先的 CSS 框架，提供大量预定义的工具类，让开发者可以快速构建现代化界面。
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Separator />
          <CodeBlock code={codeExamples.basic} />
        </CardContent>
      </Card>

      {/* 多项展开 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">多项展开</CardTitle>
          <CardDescription>type="multiple" 允许同时展开多项</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>第一项</AccordionTrigger>
              <AccordionContent>
                这一项可以与其他项同时展开
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>第二项</AccordionTrigger>
              <AccordionContent>
                这一项也可以同时展开
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>第三项</AccordionTrigger>
              <AccordionContent>
                所有项都可以同时展开
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Separator />
          <CodeBlock code={codeExamples.multiple} />
        </CardContent>
      </Card>

      {/* 默认展开 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">默认展开</CardTitle>
          <CardDescription>通过 defaultValue 设置默认展开项</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible defaultValue="item-2" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>第一项</AccordionTrigger>
              <AccordionContent>
                这是第一项的内容
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>第二项（默认展开）</AccordionTrigger>
              <AccordionContent>
                这一项默认展开显示
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>第三项</AccordionTrigger>
              <AccordionContent>
                这是第三项的内容
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* FAQ 示例 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">FAQ 示例</CardTitle>
          <CardDescription>常见问题解答场景</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q1">
              <AccordionTrigger>如何开始使用？</AccordionTrigger>
              <AccordionContent>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>克隆项目到本地</li>
                  <li>运行 bun install 安装依赖</li>
                  <li>运行 bun run dev 启动开发服务器</li>
                  <li>访问 http://localhost:3000 查看效果</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>支持哪些浏览器？</AccordionTrigger>
              <AccordionContent>
                支持所有现代浏览器，包括 Chrome、Firefox、Safari、Edge 等主流浏览器的最新版本。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>如何部署？</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm">
                  支持多种部署方式：Vercel、Docker、静态部署等。推荐使用 Vercel 一键部署。
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
