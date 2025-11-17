"use client"
import Image from 'next/image'
import { useState } from "react"
import Link from 'next/link'
interface IAlbum {
    id: number
    title: string
    category: string
    image: string
    description: string
    slug: string
}

const albums: IAlbum[] = [
    {
        id: 1,
        title: "自己做的，或外面吃的",
        category: "美食",
        image: "/delicious-food-and-cooking-dishes.jpg",
        description: "美食记录",
        slug: "food"
    },
    {
        id: 2,
        title: "去过的地方",
        category: "足迹",
        image: "/travel-destinations-and-beautiful-places.jpg",
        description: "旅行足迹",
        slug: "travel"
    },
    {
        id: 3,
        title: "生活的精彩瞬间",
        category: "生活",
        image: "/happy-life-moments-and-daily-activities.jpg",
        description: "生活记录",
        slug: "life"
    },
    {
        id: 4,
        title: "美丽的景色",
        category: "景色",
        image: "/beautiful-hometown-landscape-and-scenery.jpg",
        description: "家乡风景",
        slug: "scenery"
    },
]

export function AlbumGrid() {
    const [hoveredAlbum, setHoveredAlbum] = useState<number | null>(null)
    const [isContainerHovered, setIsContainerHovered] = useState(false)

    return (
        <div
            className="xs:p-4 tb:p-6 pc:p-8 xs:-m-4 tb:-m-6 pc:-m-8 rounded-lg transition-all duration-300"
            onMouseEnter={ () => setIsContainerHovered(true) }
            onMouseLeave={ () => {
                setIsContainerHovered(false)
                setHoveredAlbum(null)
            } }
        >
            {/* 移动端：垂直布局 */ }
            <div className="xs:flex xs:flex-col xs:gap-4 tb:hidden">
                { albums.map((album) => (
                    <AlbumCard
                        key={ album.id }
                        album={ album }
                        isMobile={ true }
                    />
                )) }
            </div>

            {/* 平板和PC：水平网格布局 */ }
            <div className="xs:hidden tb:grid tb:grid-cols-2 tb:gap-4 pc:grid-cols-4 pc:gap-6">
                { albums.map((album) => (
                    <AlbumCard
                        key={ album.id }
                        album={ album }
                        isMobile={ false }
                        hoveredAlbum={ hoveredAlbum }
                        setHoveredAlbum={ setHoveredAlbum }
                        isContainerHovered={ isContainerHovered }
                    />
                )) }
            </div>
        </div>
    )
}

// 提取相册卡片为独立组件
function AlbumCard({
    album,
    isMobile,
    hoveredAlbum,
    setHoveredAlbum,
    isContainerHovered
}: {
    album: IAlbum
    isMobile: boolean
    hoveredAlbum?: number | null
    setHoveredAlbum?: (id: number | null) => void
    isContainerHovered?: boolean
}) {
    if (isMobile) {
        return (
            <Link href={`/album/${album.slug}`} className="block relative cursor-pointer rounded-xl overflow-hidden shadow-lg">
                <div className="relative aspect-[4/3] group">

                    <Image
                        src={ album.image || `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(album.title)}` }
                        alt={ album.title }
                        width={ 400 }
                        height={ 300 }
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={ (e) => {
                            const target = e.target as HTMLImageElement
                            target.src = `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(album.title)}`
                        } }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                    <div className="absolute top-3 left-3">
                        <span className="inline-block px-2 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                            { album.category }
                        </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white text-lg font-bold leading-tight mb-1 drop-shadow-lg">
                            { album.title }
                        </h3>
                        <p className="text-white/80 text-xs font-medium drop-shadow-md">
                            { album.description }
                        </p>
                    </div>
                </div>
            </Link>
        )
    }

    // 平板和PC版本
    return (
        <Link href={`/album/${album.slug}`} className="block">
            <div
            className={ `relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 ${hoveredAlbum !== null && hoveredAlbum !== album.id
                ? "blur-sm scale-95 opacity-70"
                : hoveredAlbum === album.id
                    ? "scale-105 shadow-2xl"
                    : isContainerHovered && hoveredAlbum === null
                        ? "blur-sm scale-95 opacity-70"
                        : ""
                }` }
            onMouseEnter={ () => setHoveredAlbum?.(album.id) }
            onMouseLeave={ () => setHoveredAlbum?.(null) }
        >
            <div className="relative aspect-[3/4] group">
                <Image
                    src={ album.image || `/placeholder.svg?height=400&width=300&text=${encodeURIComponent(album.title)}` }
                    alt={ album.title }
                    width={ 300 }
                    height={ 400 }
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={ (e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `/placeholder.svg?height=400&width=300&text=${encodeURIComponent(album.title)}`
                    } }
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                        { album.category }
                    </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl tb:text-xl pc:text-2xl font-bold leading-tight mb-2 drop-shadow-lg">
                        { album.title }
                    </h3>
                    <p className="text-white/90 text-sm font-medium drop-shadow-md">
                        { album.description }
                    </p>
                </div>

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            </div>
        </Link>
    )
}