# 组件展示模块 PRD 文档

## 1. 项目背景

项目已有49个shadcn/ui组件，需要提供一个可视化的组件展示模块，帮助开发者快速了解和使用这些组件。

## 2. 需求目标

- 展示项目中所有UI组件
- 提供组件文档说明（属性、用法）
- 展示组件不同状态的使用用例
- 支持搜索、分类筛选
- 集成到案例广场

## 3. 架构设计

### 3.1 目录结构

```
src/
├── components/
│   └── showcase/                    # 组件展示模块（独立目录，不污染现有代码）
│       ├── component-registry.ts    # 组件元数据注册表
│       ├── component-card.tsx       # 组件卡片
│       ├── component-preview.tsx    # 组件预览容器
│       ├── component-detail.tsx     # 组件详情展示
│       └── demos/                   # 各组件的演示用例
│           ├── button-demo.tsx
│           ├── input-demo.tsx
│           └── ...
├── app/
│   └── (main)/
│       └── examples/
│           └── components/
│               ├── page.tsx         # 组件列表页
│               └── [slug]/
│                   └── page.tsx     # 组件详情页
```

### 3.2 核心设计原则

1. **静态元数据注册** - 组件信息预定义，避免运行时动态解析，确保快速响应
2. **懒加载演示组件** - 使用Next.js dynamic import，详情页按需加载演示代码
3. **独立目录隔离** - showcase目录独立，不影响现有组件代码
4. **类型安全** - 完整TypeScript类型定义

### 3.3 组件元数据结构

```typescript
interface ComponentMeta {
  name: string;              // 组件名称
  slug: string;              // URL路径标识
  category: ComponentCategory; // 分类
  description: string;       // 简短描述
  docs: string;              // 文档说明
  props: ComponentProp[];    // 属性列表
  demo: ComponentDemo[];     // 演示用例
  dependencies: string[];    // 依赖的其他组件
}

interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface ComponentDemo {
  title: string;
  description: string;
  code: string;
}
```

### 3.4 分类规划

| 分类 | 组件 |
|------|------|
| 基础组件 | Button, Badge, Separator, Skeleton, AspectRatio |
| 表单组件 | Input, Textarea, Checkbox, RadioGroup, Select, Switch, Slider, Label, Form |
| 布局组件 | Card, Tabs, Accordion, Collapsible, Resizable, ScrollArea, Sidebar |
| 导航组件 | NavigationMenu, Breadcrumb, Pagination, Menubar |
| 反馈组件 | Alert, Dialog, AlertDialog, Drawer, Sheet, Toast, Popover, Tooltip, HoverCard |
| 数据展示 | Table, Avatar, Progress, Calendar, Chart |
| 高级组件 | Command, ContextMenu, DropdownMenu, Toggle, ToggleGroup, Carousel |

## 4. 页面设计

### 4.1 组件列表页 `/examples/components`

- 顶部搜索栏
- 分类筛选标签
- 组件网格展示（卡片形式）
- 点击卡片进入详情页

### 4.2 组件详情页 `/examples/components/[slug]`

- 组件名称和描述
- 属性文档表格
- 多个状态演示区块
- 代码示例（可复制）

## 5. 性能优化策略

1. **静态生成** - 组件元数据编译时确定，无需服务端请求
2. **代码分割** - 每个组件演示独立文件，动态加载
3. **虚拟列表** - 组件数量增多时考虑虚拟滚动
4. **缓存策略** - 详情页使用客户端缓存

## 6. 开发计划

1. 创建组件注册系统和类型定义
2. 实现组件列表页
3. 实现组件详情页
4. 添加组件演示用例（优先高频组件）
5. 更新案例广场入口

## 7. 验收标准

- [ ] 页面首屏加载 < 1s
- [ ] 所有组件可搜索、筛选
- [ ] 详情页展示完整文档和演示
- [ ] 代码可复制
- [ ] 响应式布局，移动端可用
