'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'

const codeExamples = {
  basic: `import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

<Carousel className="w-full max-w-xs">
  <CarouselContent>
    <CarouselItem>幻灯片 1</CarouselItem>
    <CarouselItem>幻灯片 2</CarouselItem>
    <CarouselItem>幻灯片 3</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
  autoplay: `import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

<Carousel
  plugins={[
    Autoplay({
      delay: 4000,
    }),
  ]}
>
  <CarouselContent>
    <CarouselItem>自动播放</CarouselItem>
  </CarouselContent>
</Carousel>`,
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto whitespace-pre-wrap">
      <code>{code}</code>
    </pre>
  )
}

const images = [
  { id: 1, color: 'bg-red-500', title: '红色' },
  { id: 2, color: 'bg-orange-500', title: '橙色' },
  { id: 3, color: 'bg-yellow-500', title: '黄色' },
  { id: 4, color: 'bg-green-500', title: '绿色' },
  { id: 5, color: 'bg-blue-500', title: '蓝色' },
]

const cards = [
  { id: 1, title: '特性一', desc: '高性能渲染引擎' },
  { id: 2, title: '特性二', desc: '响应式设计支持' },
  { id: 3, title: '特性三', desc: '丰富的组件库' },
  { id: 4, title: '特性四', desc: 'TypeScript 支持' },
]

export function CarouselDemo() {
  return (
    <div className="space-y-8">
      {/* 基础用法 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础用法</CardTitle>
          <CardDescription>轮播滑动组件的基础使用方式</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image.id}>
                  <div className="p-1">
                    <div className={`flex aspect-square items-center justify-center rounded-lg ${image.color}`}>
                      <span className="text-4xl font-semibold text-white">{image.title}</span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <Separator />
          <CodeBlock code={codeExamples.basic} />
        </CardContent>
      </Card>

      {/* 卡片轮播 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">卡片轮播</CardTitle>
          <CardDescription>展示内容卡片的轮播效果</CardDescription>
        </CardHeader>
        <CardContent>
          <Carousel className="w-full max-w-sm">
            <CarouselContent>
              {cards.map((card) => (
                <CarouselItem key={card.id}>
                  <div className="p-1">
                    <div className="flex flex-col aspect-square items-center justify-center rounded-lg border bg-muted p-6">
                      <span className="text-3xl font-bold mb-2">{card.title}</span>
                      <span className="text-sm text-muted-foreground text-center">{card.desc}</span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </CardContent>
      </Card>

      {/* 多项显示 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">多项显示</CardTitle>
          <CardDescription>同时显示多个项目</CardDescription>
        </CardHeader>
        <CardContent>
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full max-w-sm"
          >
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <div className={`flex aspect-square items-center justify-center rounded-lg ${image.color}`}>
                      <span className="text-xl font-semibold text-white">{image.title}</span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </CardContent>
      </Card>

      {/* 图片轮播 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">产品展示</CardTitle>
          <CardDescription>产品图片轮播展示</CardDescription>
        </CardHeader>
        <CardContent>
          <Carousel className="w-full max-w-md">
            <CarouselContent>
              {[
                { id: 1, name: '产品 A', price: '¥99' },
                { id: 2, name: '产品 B', price: '¥199' },
                { id: 3, name: '产品 C', price: '¥299' },
              ].map((product) => (
                <CarouselItem key={product.id}>
                  <div className="p-1">
                    <div className="flex flex-col items-center justify-center rounded-lg border bg-gradient-to-br from-muted to-background p-8">
                      <div className="w-24 h-24 rounded-full bg-primary/10 mb-4 flex items-center justify-center">
                        <span className="text-2xl">📦</span>
                      </div>
                      <span className="text-xl font-semibold mb-2">{product.name}</span>
                      <span className="text-lg text-primary font-bold mb-4">{product.price}</span>
                      <Button onClick={() => toast.success(`已添加 ${product.name} 到购物车`)}>
                        加入购物车
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </CardContent>
      </Card>

      {/* 垂直轮播 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">垂直轮播</CardTitle>
          <CardDescription>垂直方向的轮播滑动</CardDescription>
        </CardHeader>
        <CardContent>
          <Carousel
            opts={{
              align: 'start',
            }}
            orientation="vertical"
            className="w-full max-w-xs h-[250px]"
          >
            <CarouselContent className="h-full">
              {images.map((image) => (
                <CarouselItem key={image.id} className="pt-1 md:basis-1/2">
                  <div className="p-1">
                    <div className={`flex items-center justify-center rounded-lg h-24 ${image.color}`}>
                      <span className="text-xl font-semibold text-white">{image.title}</span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </CardContent>
      </Card>
    </div>
  )
}
