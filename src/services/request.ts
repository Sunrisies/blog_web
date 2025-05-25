export interface IPagination {
  total: number;
  page: number;
  limit: number;
}

// GET请求返回类型
export type PaginatedResponseDto<T> = {
  code: number
  message: string
  data: {
    data: T,
    pagination?: IPagination
  }
}

// POST请求返回类型
export type ResponseDto<T> = {
  code: number
  message: string
  data: T,
}
// 请求配置类型
type RequestInitExtended = Omit<RequestInit, 'body'> & {
  body?: unknown
  timeout?: number
}
// 自定义HTTP错误
export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string
  ) {
    super(`HTTP Error ${statusCode}: ${message}`)
    Object.setPrototypeOf(this, HttpError.prototype)
  }
}

class Http {
  private interceptors = {
    request: [] as ((config: RequestInitExtended) => RequestInitExtended)[],
    response: [] as ((response: Response) => Response)[]
  }
  private options: any
  constructor(private readonly BASE_URL: string, private defaultOptions: RequestInitExtended = {
    cache: 'no-store'
  }) {
  }
  // 请求拦截器
  useRequestInterceptor(fn: (config: RequestInitExtended) => RequestInitExtended) {
    this.interceptors.request.push(fn)
    return () => {
      this.interceptors.request = this.interceptors.request.filter(f => f !== fn)
    }
  }

  // 响应拦截器
  useResponseInterceptor(fn: (response: Response) => Response) {
    this.interceptors.response.push(fn)
    return () => {
      this.interceptors.response = this.interceptors.response.filter(f => f !== fn)
    }
  }
  async get<T, R = PaginatedResponseDto<T>>(url: string, options?: any): Promise<R> {
    this.options = { ...options }
    return await this.fetch<T, R>(url, { method: 'GET', ...options })
  }

  async post<T>(url: string, options?: any): Promise<ResponseDto<T>> {
    return await this.fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(options?.body)  // 关键修复点：序列化请求体
    })
  }

  async fetch<T, R = ResponseDto<T> | PaginatedResponseDto<T>>(url: string, options: RequestInitExtended): Promise<R> {
    console.log(`${this.BASE_URL}${url}`, options, '请求数据')
    const controller = new AbortController()
    const timeoutId = options.timeout && setTimeout(
      () => controller.abort(`Request timed out after ${options.timeout}ms`),
      options.timeout
    )
    try {
      // 应用请求拦截器
      let finalOptions = { ...this.defaultOptions, ...options }
      for (const interceptor of this.interceptors.request) {
        finalOptions = interceptor(finalOptions)
      }
      let response = await fetch(`${this.BASE_URL}${url}`, {
        ...Object.assign({}, finalOptions, {
          body: finalOptions.body ? JSON.stringify(finalOptions.body) : undefined
        }),
        signal: controller.signal
      })


      if (!response.ok) {
        throw new HttpError(response.status, await response.text())
      }
      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new Error('请求超时')
      }
      throw error
    } finally {
      timeoutId && clearTimeout(timeoutId)
    }
  }
}
export default new Http(process.env.NEXT_PUBLIC_API_URL)