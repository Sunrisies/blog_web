# Blog Web 项目架构图

## 整体架构

```mermaid
graph TB
    subgraph "客户端层"
        Browser[浏览器]
        Mobile[移动设备]
    end

    subgraph "Next.js 应用层"
        App[Next.js App Router]
        SSR[Server-Side Rendering]
        Static[Static Generation]
    end

    subgraph "页面路由层"
        Home[首页 /]
        Blog[博客列表 /blog]
        Article[文章详情 /article/:uuid]
        BlogDetail[博客详情 /blog/:id]
        Chat[聊天室 /chat]
        ChatRoom[聊天室详情 /chat/:roomId]
        MusicPlayer[音乐播放器 /music-player]
        Libraries[库列表 /libraries]
        LibraryDetail[库详情 /libraries/:id]
        About[关于页 /about]
        Timeline[时间线 /timeline]
        Album[相册 /album]
        Tag[标签 /tag/:id]
        Contact[联系方式 /contact]
    end

    subgraph "API 路由层"
        RSS[RSS订阅 /api/rss]
    end

    subgraph "组件层"
        Layout[布局组件]
        UI[UI 组件库 - Radix UI]
        Business[业务组件]
    end

    subgraph "工具层"
        Utils[工具函数]
        WS[WebSocket 客户端]
        ClientInfo[客户端信息检测]
    end

    subgraph "外部服务"
        API[后端 API]
        WSServer[WebSocket 服务器]
        CDN[图片 CDN]
        Analytics[Umami 分析]
    end

    Browser --> App
    Mobile --> App
    App --> SSR
    App --> Static
    SSR --> Home & Blog & Article & BlogDetail & Chat & ChatRoom & MusicPlayer & Libraries & LibraryDetail & About & Timeline & Album & Tag & Contact
    Static --> RSS
    Home & Blog & Article & BlogDetail & Chat & ChatRoom & MusicPlayer & Libraries & LibraryDetail & About & Timeline & Album & Tag & Contact --> Layout
    Layout --> UI
    Layout --> Business
    Business --> Utils
    Business --> WS
    Utils --> ClientInfo
    WS --> WSServer
    Home & Blog & Article & BlogDetail & Chat & ChatRoom & MusicPlayer & Libraries & LibraryDetail & About & Timeline & Album & Tag & Contact --> API
    Business --> CDN
    App --> Analytics
```

## 技术栈架构

```mermaid
graph LR
    subgraph "前端框架"
        React[React 19]
        Next[Next.js 15.3.2]
    end

    subgraph "UI 层"
        Radix[Radix UI]
        Tailwind[Tailwind CSS 4.1]
        Lucide[Lucide Icons]
        Sonner[Toast 通知]
    end

    subgraph "功能库"
        Markdown[React Markdown]
        Syntax[代码高亮]
        Echarts[图表库]
        Feed[RSS Feed]
        Giscus[评论系统]
        Themes[主题切换]
    end

    subgraph "网络层"
        Ky[HTTP 客户端 - Ky]
        ReWS[WebSocket - ReconnectingWS]
    end

    subgraph "构建工具"
        TypeScript[TypeScript 5]
        ESLint[代码检查]
        Turbopack[开发构建]
        BundleAnalyzer[打包分析]
    end

    Next --> React
    Next --> Radix & Tailwind & Lucide & Sonner
    Next --> Markdown & Syntax & Echarts & Feed & Giscus & Themes
    Next --> Ky & ReWS
    Next --> TypeScript & ESLint & Turbopack & BundleAnalyzer
```

## 组件架构

```mermaid
graph TB
    subgraph "布局组件"
        RootLayout[根布局 layout.tsx]
        Header[顶部导航 header.tsx]
        Footer[底部 footer.tsx]
        Navbar[导航栏 navbar.tsx]
    end

    subgraph "通用组件"
        Avatar[头像 avatar.tsx]
        Comment[评论 comment.tsx]
        FPS[FPS 计数器]
        Theme[主题切换]
        Scroll[回到顶部]
        Version[版本指示器]
    end

    subgraph "UI 组件 (Radix)"
        Dialog[对话框]
        Accordion[手风琴]
        Progress[进度条]
        Select[选择器]
        Slider[滑块]
    end

    subgraph "业务组件"
        subgraph "首页"
            HomeComp[首页组件]
        end

        subgraph "博客"
            BlogList[博客列表]
            BlogDetail2[博客详情]
        end

        subgraph "文章"
            ArticleList[文章列表]
            ArticleDetail[文章详情]
            ArticleTOC[目录]
        end

        subgraph "聊天"
            ChatList[聊天列表]
            ChatRoom2[聊天室]
            MessageList[消息列表]
        end

        subgraph "音乐"
            Player[播放器]
            Playlist[播放列表]
        end

        subgraph "其他"
            LibraryComp[库组件]
            AboutComp[关于组件]
            TimelineComp[时间线]
            AlbumComp[相册]
        end
    end

    RootLayout --> Header & Footer
    Header --> Navbar & Theme
    RootLayout --> FPS & Version
    BlogList & ArticleDetail & ChatRoom2 --> UI组件
    HomeComp & BlogList & ArticleDetail & ChatRoom2 & Player --> Avatar & Comment & Scroll
```

## 数据流架构

```mermaid
sequenceDiagram
    participant User as 用户
    participant Browser as 浏览器
    participant Next as Next.js 服务器
    participant API as 后端 API
    participant WS as WebSocket 服务器
    participant CDN as 图片 CDN

    User->>Browser: 访问页面
    Browser->>Next: 请求页面
    Next->>API: 获取数据 (SSR)
    API-->>Next: 返回数据
    Next-->>Browser: 返回渲染的 HTML
    Browser->>CDN: 加载图片
    CDN-->>Browser: 返回图片

    Note over Browser,WS: 实时通信 (聊天功能)
    Browser->>WS: 建立 WebSocket 连接
    WS-->>Browser: 连接成功
    Browser->>WS: 发送消息
    WS-->>Browser: 推送消息

    Note over Browser,API: 客户端请求
    Browser->>API: 客户端 API 调用
    API-->>Browser: 返回 JSON 数据
```

## 目录结构

```
blog-web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # 根布局
│   │   ├── page.tsx           # 首页
│   │   ├── about/             # 关于页
│   │   ├── album/             # 相册
│   │   ├── article/           # 文章
│   │   │   └── [uuid]/        # 动态路由
│   │   ├── blog/              # 博客
│   │   │   └── [id]/          # 动态路由
│   │   ├── chat/              # 聊天
│   │   │   └── [roomId]/      # 动态路由
│   │   ├── contact/           # 联系方式
│   │   ├── libraries/         # 库
│   │   │   └── [id]/          # 动态路由
│   │   ├── music-player/      # 音乐播放器
│   │   ├── tag/               # 标签
│   │   │   └── [id]/          # 动态路由
│   │   ├── timeline/          # 时间线
│   │   └── api/               # API 路由
│   │       └── rss/           # RSS 订阅
│   │
│   ├── components/            # React 组件
│   │   ├── ui/               # UI 基础组件 (Radix)
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
│   │   ├── avatar.tsx        # 头像
│   │   ├── comment.tsx       # 评论
│   │   ├── theme-toggle.tsx  # 主题切换
│   │   ├── fps-counter.tsx   # FPS 计数器
│   │   └── versionIndicator.tsx # 版本指示器
│   │
│   ├── utils/                # 工具函数
│   │   ├── index.ts          # 通用工具
│   │   ├── websocket.ts      # WebSocket 客户端
│   │   └── get-client-info.ts # 客户端信息
│   │
│   └── types/                # TypeScript 类型定义
│       └── index.tsx
│
├── public/                   # 静态资源
├── .next/                    # Next.js 构建输出
├── next.config.ts           # Next.js 配置
├── tailwind.config.ts       # Tailwind 配置
├── tsconfig.json            # TypeScript 配置
├── package.json             # 项目依赖
├── Dockerfile               # Docker 镜像
└── deploy.sh                # 部署脚本
```

## 部署架构

```mermaid
graph LR
    subgraph "开发环境"
        Dev[本地开发]
        DevServer[开发服务器<br/>端口 12002]
    end

    subgraph "构建过程"
        Build[Next.js Build]
        Standalone[Standalone 输出]
        Docker[Docker 镜像]
    end

    subgraph "生产环境"
        Container[Docker 容器]
        App[Next.js 应用]
        Static[静态资源]
    end

    subgraph "监控"
        Umami[Umami 分析]
        Version2[版本指示器]
        FPS2[FPS 监控]
    end

    Dev --> DevServer
    DevServer --> Build
    Build --> Standalone
    Standalone --> Docker
    Docker --> Container
    Container --> App
    App --> Static
    App --> Umami
    App --> Version2
    App --> FPS2
```

## 关键特性

### 1. 服务端渲染 (SSR)
- 使用 Next.js 15 的 App Router
- 服务端数据预取
- SEO 优化

### 2. 响应式设计
- Tailwind CSS 4.1
- 移动端适配
- 设备类型检测

### 3. 实时通信
- WebSocket 支持
- 自动重连机制
- 聊天室功能

### 4. 内容管理
- Markdown 渲染
- 代码高亮
- RSS 订阅
- Giscus 评论系统

### 5. 用户体验
- 主题切换 (明暗模式)
- Toast 通知
- 进度条
- FPS 计数器
- 回到顶部

### 6. 性能优化
- 图片懒加载
- 代码分割
- Bundle 分析
- Standalone 输出模式

### 7. 开发体验
- TypeScript 支持
- ESLint 代码检查
- Turbopack 快速构建
- 热更新

### 8. 部署
- Docker 容器化
- 自动化部署脚本
- 版本号管理
- Umami 访问统计
