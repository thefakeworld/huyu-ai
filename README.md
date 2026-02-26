# Z.ai Code Scaffold

基于 Next.js 16 的现代化全栈开发脚手架，集成最佳实践和 AI 辅助编程。

## ✨ 特性

- 🚀 **Next.js 16** - 最新版本 App Router
- 💎 **TypeScript 5** - 完整类型支持
- 🎨 **Tailwind CSS 4** - 原子化 CSS
- 🧩 **shadcn/ui** - 49 个精美组件
- 📦 **组件库架构** - 清晰的三层分离（UI/业务/文档）
- 🗄️ **Prisma ORM** - SQLite 数据库
- 📦 **Zustand** - 轻量状态管理
- ✅ **React Hook Form + Zod** - 表单验证
- 🔐 **完整认证系统** - 邮箱登录 + OAuth
- 🌓 **主题切换** - 支持亮色/暗色/系统模式

## 📦 项目结构

```
src/
├── app/                       # Next.js App Router
│   ├── (main)/               # 主布局路由组
│   │   ├── page.tsx          # 首页
│   │   ├── examples/         # 案例广场
│   │   │   ├── page.tsx      # 入口页面
│   │   │   ├── components/   # UI 组件文档
│   │   │   │   ├── page.tsx  # 组件列表
│   │   │   │   └── [slug]/   # 组件详情
│   │   │   └── business/     # 业务组件文档
│   │   └── user/             # 用户中心
│   ├── login/                # 登录页（独立布局）
│   ├── demo/                 # 演示页面
│   │   └── websocket/        # WebSocket 聊天室
│   └── api/                  # API 路由
│       └── auth/             # 认证接口
│
├── components/
│   ├── ui/                   # 🎨 基础 UI 组件 (49个)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   │
│   ├── docs/                 # 📚 组件文档模块
│   │   ├── component-registry.ts  # 组件元数据
│   │   ├── code-block.tsx         # 代码高亮
│   │   ├── theme-toggle.tsx       # 主题切换
│   │   └── demos/                 # 演示示例
│   │
│   └── business/             # 💼 业务组件模块
│       ├── registry.ts            # 业务组件元数据
│       ├── auth/                  # 认证组件
│       │   ├── login-form.tsx
│       │   ├── oauth-buttons.tsx
│       │   └── auth-provider.tsx
│       ├── layout/                # 布局组件
│       │   └── navbar.tsx
│       └── pages/                 # 页面组件
│           ├── home-page.tsx
│           ├── user-page.tsx
│           └── ...
│
├── stores/                    # Zustand 状态管理
├── lib/                       # 工具函数
├── hooks/                     # 自定义 Hooks
└── types/                     # 类型定义
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
| **UI 组件** | `/examples/components` | 49个基础UI组件文档 |
| **业务组件** | `/examples/business` | 11个业务组件文档 |
| 组件详情 | `/examples/components/[slug]` | 单个组件详情页 |
| 用户中心 | `/user` | 登录/用户信息 |
| 登录页 | `/login` | 独立登录页 |
| 聊天室 | `/demo/websocket` | WebSocket演示 |

## 🧩 组件架构

### 三层分离设计

项目采用清晰的三层组件架构，便于维护和扩展：

| 层级 | 目录 | 职责 | 数量 |
|------|------|------|------|
| **UI 组件** | `components/ui/` | 基础可复用 UI 组件 | 49 |
| **业务组件** | `components/business/` | 业务功能模块组件 | 11 |
| **文档模块** | `components/docs/` | 组件文档和演示 | - |

### UI 组件分类

内置 49 个 shadcn/ui 组件，包含完整的文档和使用示例：

- **基础组件**: Button, Badge, Separator, Skeleton, AspectRatio
- **表单组件**: Input, Textarea, Checkbox, RadioGroup, Select, Switch, Slider
- **布局组件**: Card, Tabs, Accordion, Collapsible, Resizable, ScrollArea
- **导航组件**: NavigationMenu, Breadcrumb, Pagination, Menubar
- **反馈组件**: Alert, Dialog, AlertDialog, Drawer, Sheet, Toast, Tooltip
- **数据展示**: Table, Avatar, Progress, Calendar, Chart
- **高级组件**: Command, ContextMenu, DropdownMenu, Toggle, Carousel

### 业务组件分类

- **认证组件**: LoginForm, RegisterForm, OAuthButtons, AuthProvider, UserAvatar
- **布局组件**: Navbar, Footer
- **页面组件**: HomePage, UserPage, ExamplesPage, WebSocketDemo

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
| 代码高亮 | react-syntax-highlighter |

## 📄 License

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
