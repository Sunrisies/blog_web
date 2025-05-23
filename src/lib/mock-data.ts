import { faker } from '@faker-js/faker/locale/zh_CN'

export interface MockImage {
    id: string
    path: string
    title: string
    size: string
    type: string
    created_at: string
    storage_provider: string
}

export function generateMockImage(): MockImage {
    return {
        id: faker.string.uuid(),
        path: "https://kzmntyc0capmo12j485t.lite.vusercontent.net/placeholder.svg?height=600&width=800",
        title: `${faker.word.sample()}.jpeg`,
        size: `${faker.number.float({ min: 1, max: 10, })} MB`,
        type: 'image/jpeg',
        created_at: faker.date.future().toISOString(),
        storage_provider: faker.helpers.arrayElement(['qiniu', 'local', 'aws'])
    }
}

export function generateMockImages(count: number = 20): MockImage[] {
    return Array.from({ length: count }, generateMockImage)
}