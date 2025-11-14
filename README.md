# Blog Web 🚀

<div align="center">

![Version](https://img.shields.io/badge/version-0.1.27-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black.svg)
![React](https://img.shields.io/badge/React-19.0.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

一个基于 Next.js 15 构建的现代化全栈博客网站，支持文章发布、实时聊天、音乐播放等多种功能。

[在线演示](https://your-demo-url.com) · [报告问题](https://github.com/your-repo/issues) · [功能请求](https://github.com/your-repo/issues)

</div>

---

## ✨ 特性

### 🎯 核心功能
- **📝 博客系统** - 支持 Markdown 编写、代码高亮、目录导航
- **📰 文章管理** - 文章发布、分类、标签、搜索
- **💬 实时聊天** - 基于 WebSocket 的多人聊天室
- **🎵 音乐播放器** - 在线音乐播放功能
- **📸 相册展示** - 图片画廊和相册管理
- **⏰ 时间线** - 个人时间轴展示
- **📚 库管理** - 技术栈和工具库展示
- **📧 联系方式** - 联系表单和社交链接

### 🎨 用户体验
- **🌓 主题切换** - 支持明暗模式自动切换
- **📱 响应式设计** - 完美适配移动端、平板、桌面
- **⚡ 性能优化** - SSR/SSG、图片懒加载、代码分割
- **🔔 通知系统** - Toast 消息提示
- **💨 流畅动画** - 页面过渡和交互动画
- **📊 FPS 监控** - 实时性能监控
- **🔄 自动重连** - WebSocket 断线自动重连

### 🛠️ 开发特性
- **📦 Standalone 模式** - 优化的生产构建
- **🐳 Docker 支持** - 容器化部署
- **📈 Bundle 分析** - 打包体积分析
- **🔥 Turbopack** - 极速开发体验
- **💻 TypeScript** - 完整的类型支持
- **🎨 Tailwind CSS 4** - 现代化 CSS 框架
- **🧩 Radix UI** - 高质量无障碍组件

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18.0.0
- **pnpm** / **npm** / **yarn** / **bun**
- **Git**

### 安装步骤

1. **克隆项目**

```bash
git clone <your-repository-url>
cd blog-web
```

2. **安装依赖**

```bash
# 推荐使用 pnpm
pnpm install

# 或使用其他包管理器
npm install
# yarn install
# bun install
```

3. **配置环境变量**

创建 `.env` 文件并配置以下变量：

```env
# API 地址
NEXT_PUBLIC_API_URL=https://api.sunrise1024.top:12345

# 其他配置（可选）
# NODE_ENV=development
```

4. **启动开发服务器**

```bash
pnpm dev
# 或
npm run dev
```

访问 [http://localhost:12002](http://localhost:12002) 查看应用。

### 构建部署

```bash
# 生产构建
pnpm build

# 启动生产服务器
pnpm start

# 构建并复制资源（用于 standalone 模式）
pnpm run build:copy-assets
```

## 📁 项目结构

```
blog-web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # 根布局
│   │   ├── page.tsx           # 首页
│   │   ├── about/             # 关于页面
│   │   ├── album/             # 相册
│   │   ├── article/[uuid]/    # 文章详情（动态路由）
│   │   ├── blog/[id]/         # 博客详情（动态路由）
│   │   ├── chat/[roomId]/     # 聊天室（动态路由）
│   │   ├── contact/           # 联系方式
│   │   ├── libraries/[id]/    # 库详情（动态路由）
│   │   ├── music-player/      # 音乐播放器
│   │   ├── tag/[id]/          # 标签（动态路由）
│   │   ├── timeline/          # 时间线
│   │   └── api/rss/           # RSS API 路由
│   │
│   ├── components/            # React 组件
│   │   ├── ui/               # 基础 UI 组件（Radix）
│   │   ├── about/            # 关于页组件
│   │   ├── album/            # 相册组件
│   │   ├── article/          # 文章组件
│   │   ├── blog/             # 博客组件
│   │   ├── chat/             # 聊天组件
│   │   ├── home/             # 首页组件
│   │   ├── libraries/        # 库组件
│   │   ├── music-player/     # 音乐播放器组件
│   │   ├── timeline/         # 时间线组件
│   │   ├── header.tsx        # 顶部导航
│   │   ├── footer.tsx        # 底部
│   │   ├── navbar.tsx        # 导航栏
│   │   └── ...               # 其他通用组件
│   │
│   ├── utils/                # 工具函数
│   │   ├── index.ts          # 通用工具
│   │   ├── websocket.ts      # WebSocket 客户端
│   │   └── get-client-info.ts # 客户端信息检测
│   │
│   └── types/                # TypeScript 类型定义
│       └── index.tsx
│
├── public/                   # 静态资源
│   ├── *.jpg                # 图片资源
│   ├── *.svg                # SVG 图标
│   └── ...
│
├── .next/                    # Next.js 构建输出（自动生成）
├── node_modules/            # 依赖包（自动生成）
│
├── next.config.ts           # Next.js 配置
├── tailwind.config.ts       # Tailwind CSS 配置
├── tsconfig.json            # TypeScript 配置
├── postcss.config.mjs       # PostCSS 配置
├── eslint.config.mjs        # ESLint 配置
├── components.json          # shadcn/ui 配置
├── package.json             # 项目依赖和脚本
├── Dockerfile               # Docker 镜像配置
├── deploy.sh                # 部署脚本
└── README.md                # 项目文档
```

## 🛠️ 技术栈

### 核心框架
- **[Next.js 15.3.2](https://nextjs.org/)** - React 全栈框架
- **[React 19.0.0](https://react.dev/)** - UI 库
- **[TypeScript 5](https://www.typescriptlang.org/)** - 类型安全

### UI 和样式
- **[Tailwind CSS 4.1](https://tailwindcss.com/)** - CSS 框架
- **[Radix UI](https://www.radix-ui.com/)** - 无障碍组件库
- **[Lucide React](https://lucide.dev/)** - 图标库
- **[next-themes](https://github.com/pacocoursey/next-themes)** - 主题管理
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast 通知

### 内容和 Markdown
- **[react-markdown](https://github.com/remarkjs/react-markdown)** - Markdown 渲染
- **[react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)** - 代码高亮
- **[remark-gfm](https://github.com/remarkjs/remark-gfm)** - GitHub 风格 Markdown
- **[rehype-raw](https://github.com/rehypejs/rehype-raw)** - 支持原始 HTML
- **[rehype-slug](https://github.com/rehypejs/rehype-slug)** - 自动生成标题 ID

### 网络和通信
- **[ky](https://github.com/sindresorhus/ky)** - HTTP 客户端
- **[reconnecting-websocket](https://github.com/pladaria/reconnecting-websocket)** - WebSocket 自动重连
- **[ua-parser-js](https://github.com/faisalman/ua-parser-js)** - User Agent 解析

### 数据和可视化
- **[echarts-for-react](https://github.com/hustcc/echarts-for-react)** - 图表库
- **[date-fns](https://date-fns.org/)** - 日期处理
- **[feed](https://github.com/jpmonette/feed)** - RSS Feed 生成

### 社交和评论
- **[@giscus/react](https://giscus.app/)** - GitHub Discussions 评论系统

### 开发工具
- **[Turbopack](https://turbo.build/pack)** - 快速构建工具
- **[ESLint 9](https://eslint.org/)** - 代码检查
- **[@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)** - 打包分析
- **[@faker-js/faker](https://fakerjs.dev/)** - 模拟数据生成

## 📝 开发指南

### 添加新组件

使用 shadcn/ui CLI 添加预构建组件：

```bash
# 使用 bun
bunx --bun shadcn@latest add <component-name>

# 使用 pnpm
pnpx shadcn@latest add <component-name>

# 例如：添加 button 组件
bunx --bun shadcn@latest add button
```

### 代码规范

- ✅ 使用 **TypeScript** 编写所有新代码
- ✅ 遵循 **ESLint** 规则（运行 `pnpm lint` 检查）
- ✅ 组件使用 **函数式组件** 和 **Hooks**
- ✅ 使用 **Tailwind CSS** 进行样式编写
- ✅ 提交前确保代码通过类型检查

### 常用命令

```bash
# 开发
pnpm dev              # 启动开发服务器（端口 12002）

# 构建
pnpm build            # 生产构建（带 bundle 分析）
pnpm build:copy-assets # 构建并复制静态资源

# 运行
pnpm start            # 启动生产服务器

# 代码检查
pnpm lint             # 运行 ESLint

# 依赖管理
pnpm install          # 安装依赖
pnpm add <package>    # 添加新依赖
```

### 环境变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `NEXT_PUBLIC_API_URL` | 后端 API 地址 | `https://api.sunrise1024.top:12345` |
| `NODE_ENV` | 运行环境 | `development` / `production` |
| `ANALYZE` | 是否开启打包分析 | `true` / `false` |

## 🐳 Docker 部署

### 使用 Docker

```bash
# 构建镜像
docker build -t blog-web .

# 运行容器
docker run -p 3000:3000 blog-web
```

### 使用自动化脚本

```bash
# 执行部署脚本
bash deploy.sh
```

该脚本会自动：
1. 构建 Next.js 应用
2. 复制必要的静态资源
3. 创建 Docker 镜像
4. 启动容器

## 📊 性能优化

- ⚡ **SSR/SSG** - 服务端渲染和静态生成
- 🖼️ **图片优化** - Next.js Image 组件自动优化
- 📦 **代码分割** - 自动按路由分割代码
- 🗜️ **压缩** - 自动压缩 HTML、CSS、JS
- 🔄 **懒加载** - Intersection Observer 实现懒加载
- 📈 **Bundle 分析** - 使用 `ANALYZE=true` 分析打包体积

## 🔧 故障排除

### 端口被占用

```bash
# 修改端口，在 package.json 中更改 dev 脚本
"dev": "next dev --turbopack -p <your-port>"
```

### 依赖安装失败

```bash
# 清除缓存后重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 构建失败

```bash
# 清除 .next 目录
rm -rf .next
pnpm build
```

## 📚 相关文档

- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://react.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Radix UI 文档](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. **Fork** 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 **Pull Request**

### 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `perf:` 性能优化
- `test:` 测试相关
- `chore:` 构建/工具链相关

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

---

<div align="center">

**[⬆ 回到顶部](#blog-web-)**

Made with ❤️ by [Your Name](https://github.com/your-username)

</div>


        