import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex xs:min-h-[calc(100vh-3rem)] tb:min-h-[calc(100vh-21rem)] flex-col items-center justify-center overflow-hidden px-4 relative">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-blue-300/20 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* 主要内容 */}
      <div className="text-center relative">
        {/* 404数字动画 */}
        <div className="text-center relative">
          {/* 404数字动画 - 精细控制版本 */}
          <div className="relative mb-8">
            <h1 className="xs:text-[4.5rem] xs:leading-[4.5rem] tb:text-[7rem] tb:leading-[7rem]  pc:text-[8.5rem] pc:leading-[8.5rem]  font-black text-primary  animate-float-404 drop-shadow-lg">
              404
            </h1>
          </div>
        </div>

        {/* 副标题 */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
          页面未找到
        </h2>

        {/* 诗意文字 */}
        <div className="max-w-md mx-auto mb-8">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            <span className="block mb-3">但如果你不改变方向，</span>
            <span className="block mb-3">如果你继续寻找，</span>
            <span className="block">你终将抵达心之所向。</span>
          </p>
        </div>

        {/* 操作按钮组 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-105 shadow-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            返回首页
          </Link>

          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-md border border-primary/20 px-6 py-3 text-base font-medium text-primary transition-all duration-300 hover:bg-primary/10 hover:scale-105"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9"
              />
            </svg>
            浏览博客
          </Link>
        </div>

        {/* 额外的帮助文本 */}
        <p className="mt-8 text-sm text-muted-foreground max-w-xs mx-auto">
          如果你认为这是一个错误，请联系我们
        </p>
      </div>

      {/* 浮动元素 */}
      <div className="absolute bottom-10 left-10 w-8 h-8 bg-primary/20 rounded-full animate-bounce delay-300 hidden md:block"></div>
      <div className="absolute top-10 right-10 w-6 h-6 bg-blue-300/30 rounded-full animate-bounce delay-700 hidden md:block"></div>
      <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-green-300/20 rounded-full animate-ping delay-1000 hidden lg:block"></div>
    </div>
  )
}