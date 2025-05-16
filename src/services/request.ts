// 帮我使用fetch封装一个请求方法，在详细一点，写一个类

interface IResponse<T> {
    data: T;
    pagination?: {
        total: number;
        page: number;
        limit: number;
    }
    code: number;
}
interface IPagination {
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
class Http {
    private url: string
    private options: any
    constructor(private readonly BASE_URL: string) {
        console.log(BASE_URL, 'BASE_URL')
        this.BASE_URL = BASE_URL
        this.url = ''
        this.options = {
            cache: 'no-store'
        }
    }
    async get<T, R = ResponseDto<T>>(url: string, options?: any): Promise<R> {
        this.url = url
        this.options = { ...options }
        console.log(this.options, 'options')
        return await this.fetch<T, R>()
    }

    post(url: string, options?: any) {
        this.url = url
        this.options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            body: JSON.stringify(options?.body)  // 关键修复点：序列化请求体
        }
        this.options.method = 'POST'
        console.log(this.options, 'options')
        return this.fetch()
    }

    async fetch<T, R = ResponseDto<T> | PaginatedResponseDto<T>>(): Promise<R> {
        console.log(`${this.BASE_URL}${this.url}`, this.options, '请求数据')
        const res = await fetch(`${this.BASE_URL}${this.url}`, {
            ...this.options,
        })
        if (res.ok) {
            const response = await res.json()
            // console.log(data, code, 'data')
            return response
            // return { ...data, code }
        } else {
            throw new Error('Network response was not ok')
        }
    }
}
export default new Http(process.env.NEXT_PUBLIC_API_URL)