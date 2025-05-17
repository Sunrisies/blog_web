import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex min-h-[calc(100vh-4.1rem)] flex-col items-center justify-center overflow-hidden px-4'>
      <h2 className='animate-bounce text-9xl font-bold text-primary'>
        404
      </h2>
      <p className='mt-6 max-w-md text-center text-lg font-medium text-muted-foreground'>
        But if you don't change your direction,
        <br />
        and if you keep looking,
        <br />
        you may end up where you are heading.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        返回首页
      </Link>
    </div>
  )
}