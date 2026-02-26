'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

const codeExamples = {
  basic: `import { ScrollArea } from '@/components/ui/scroll-area'

<ScrollArea className="h-72 w-48 rounded-md border">
  <div className="p-4">
    <h4 className="mb-4 text-sm font-medium">标签列表</h4>
    {tags.map((tag) => (
      <div key={tag}>{tag}</div>
    ))}
  </div>
</ScrollArea>`,
  horizontal: `import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

<ScrollArea className="w-96 whitespace-nowrap rounded-md border">
  <div className="flex w-max space-x-4 p-4">
    {items.map((item) => (
      <figure key={item} className="shrink-0">
        <div className="w-24 h-24 bg-muted rounded-md" />
      </figure>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`,
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto whitespace-pre-wrap">
      <code>{code}</code>
    </pre>
  )
}

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

const artwork = [
  { id: 1, title: '日出', artist: '莫奈' },
  { id: 2, title: '星空', artist: '梵高' },
  { id: 3, title: '蒙娜丽莎', artist: '达芬奇' },
  { id: 4, title: '呐喊', artist: '蒙克' },
  { id: 5, title: '记忆的永恒', artist: '达利' },
]

export function ScrollAreaDemo() {
  return (
    <div className="space-y-8">
      {/* 基础用法 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础用法</CardTitle>
          <CardDescription>自定义滚动条样式的滚动区域</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-72 w-48 rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">版本历史</h4>
              {tags.map((tag) => (
                <>
                  <div key={tag} className="text-sm">
                    {tag}
                  </div>
                  <Separator className="my-2" />
                </>
              ))}
            </div>
          </ScrollArea>
          <Separator />
          <CodeBlock code={codeExamples.basic} />
        </CardContent>
      </Card>

      {/* 内容列表 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">内容列表</CardTitle>
          <CardDescription>展示列表数据的滚动区域</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-72 w-full rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">艺术作品</h4>
              {artwork.map((item) => (
                <div key={item.id}>
                  <div className="text-sm font-medium">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.artist}</div>
                  <Separator className="my-2" />
                </div>
              ))}
              {artwork.map((item) => (
                <div key={`${item.id}-2`}>
                  <div className="text-sm font-medium">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.artist}</div>
                  <Separator className="my-2" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* 聊天消息 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">聊天消息</CardTitle>
          <CardDescription>聊天应用的滚动消息区域</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-60 w-full rounded-md border">
            <div className="p-4 space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs">A</div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Alice</div>
                  <div className="text-sm text-muted-foreground bg-muted rounded-lg p-2 mt-1">
                    你好！最近怎么样？
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <div className="flex-1 text-right">
                  <div className="text-sm font-medium">我</div>
                  <div className="text-sm text-muted-foreground bg-primary text-primary-foreground rounded-lg p-2 mt-1 inline-block">
                    挺好的，你呢？
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs">A</div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Alice</div>
                  <div className="text-sm text-muted-foreground bg-muted rounded-lg p-2 mt-1">
                    我也很好！周末有什么计划吗？
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs">B</div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Bob</div>
                  <div className="text-sm text-muted-foreground bg-muted rounded-lg p-2 mt-1">
                    大家好！我刚加入群聊 👋
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <div className="flex-1 text-right">
                  <div className="text-sm font-medium">我</div>
                  <div className="text-sm text-muted-foreground bg-primary text-primary-foreground rounded-lg p-2 mt-1 inline-block">
                    欢迎 Bob！🎉
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
