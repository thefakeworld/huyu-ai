# Z.ai Code Scaffold

基于 Next.js 16 的现代化全栈开发脚手架，集成最佳实践和 AI 辅助编程。

## ✨ 特性

- 🚀 **Next.js 16** - 最新版本 App Router
- 💎 **TypeScript 5** - 完整类型支持
- 🎨 **Tailwind CSS 4** - 原子化 CSS
- 🧩 **shadcn/ui** - 49 个精美组件
- 🗄️ **Prisma ORM** - SQLite 数据库
- 📦 **Zustand** - 轻量状态管理
- ✅ **React Hook Form + Zod** - 表单验证
- 🔐 **完整认证系统** - 邮箱登录 + OAuth

## 📦 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── (main)/            # 主布局路由组
│   │   ├── page.tsx       # 首页
│   │   ├── examples/      # 案例广场
│   │   │   ├── page.tsx
│   │   │   └── components/ # 组件展示
│   │   └── user/          # 用户中心
│   ├── login/             # 登录页（独立布局）
│   ├── demo/              # 演示页面
│   │   └── websocket/     # WebSocket 聊天室
│   └── api/               # API 路由
│       └── auth/          # 认证接口
├── components/
│   ├── ui/                # shadcn/ui 组件
│   ├── auth/              # 认证组件
│   ├── layout/            # 布局组件
│   └── showcase/          # 组件展示模块
├── stores/                # Zustand 状态管理
├── lib/                   # 工具函数
├── hooks/                 # 自定义 Hooks
└── types/                 # 类型定义
```

## 🚀 快速开始

```bash
# 安装依赖
bun install

# 初始化数据库
bunx prisma db push

# 启动开发服务器
bun run dev
```

访问 http://localhost:3000

## 📱 页面预览

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | `/` | 项目介绍 |
| 案例广场 | `/examples` | 功能演示入口 |
| 组件展示 | `/examples/components` | 49个UI组件文档 |
| 用户中心 | `/user` | 登录/用户信息 |
| 登录页 | `/login` | 独立登录页 |
| 聊天室 | `/demo/websocket` | WebSocket演示 |

## 🧩 组件展示

内置 49 个 shadcn/ui 组件，包含完整的文档和使用示例：

- **基础组件**: Button, Badge, Separator, Skeleton, AspectRatio
- **表单组件**: Input, Textarea, Checkbox, RadioGroup, Select, Switch, Slider
- **布局组件**: Card, Tabs, Accordion, Collapsible, Resizable, ScrollArea
- **导航组件**: NavigationMenu, Breadcrumb, Pagination, Menubar
- **反馈组件**: Alert, Dialog, AlertDialog, Drawer, Sheet, Toast, Tooltip
- **数据展示**: Table, Avatar, Progress, Calendar, Chart
- **高级组件**: Command, ContextMenu, DropdownMenu, Toggle, Carousel

## 🔐 认证功能

- ✅ 邮箱密码注册/登录
- ✅ 记住登录状态
- ✅ Google OAuth（需配置）
- ✅ 密码加密存储（SHA-256 + salt）
- ✅ Session 会话管理

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 |
| 语言 | TypeScript 5 |
| 样式 | Tailwind CSS 4 |
| 组件 | shadcn/ui + Radix UI |
| 数据库 | Prisma + SQLite |
| 状态 | Zustand |
| 表单 | React Hook Form + Zod |
| 图标 | Lucide React |

## 📄 License

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
