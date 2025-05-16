# Blog Web

这是一个使用 Next.js 构建的现代博客网站前端项目。

## 技术栈

-  - React 框架
-  - UI 库
-  - CSS 框架
-  - UI 组件库

## 开始使用

### 环境要求

- Node.js 18.0 或更高版本
- npm 或 yarn 或 pnpm

### 安装

1. 克隆项目：

```bash
git clone <your-repository-url>
cd blog-web
```

2. 安装依赖：

```bash
npm install
# 或
yarn install
# 或
pnpm install
# 或
bun install
```

3. 启动开发服务器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

访问 [http://localhost:12001](http://localhost:12001) 查看你的应用。

### 构建

```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

## 项目结构

```
blog-web/
├── app/             # 应用路由和页面
├── components/      # React 组件
├── public/          # 静态资源
├── styles/          # 全局样式
└── lib/            # 工具函数和配置
```

## 特性

- 📱 响应式设计
- 🎨 使用 Tailwind CSS 的现代 UI
- ⚡ 快速的页面加载和导航
- 🔍 SEO 优化
- 🎯 TypeScript 支持

## 开发指南

### 添加新组件

使用 shadcn/ui 添加新组件：

```bash
bunx --bun shadcn@latest add <component-name>
```

### 代码规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码

## 部署

项目使用 Next.js 的 standalone 输出模式，可以轻松部署到各种平台。

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 许可证

[MIT](LICENSE)
```


        