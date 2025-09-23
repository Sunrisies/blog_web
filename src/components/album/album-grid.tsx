"use client"

import { useState } from "react"

const albums = [
    {
        id: 1,
        title: "自己做的，或外面吃的",
        category: "美食",
        image: "/delicious-food-and-cooking-dishes.jpg",
        description: "美食记录",
    },
    {
        id: 2,
        title: "去过的地方",
        category: "足迹",
        image: "/travel-destinations-and-beautiful-places.jpg",
        description: "旅行足迹",
    },
    {
        id: 3,
        title: "生活的精彩瞬间",
        category: "生活",
        image: "/happy-life-moments-and-daily-activities.jpg",
        description: "生活记录",
    },
    {
        id: 4,
        title: "美丽的景色",
        category: "景色",
        image: "/beautiful-hometown-landscape-and-scenery.jpg",
        description: "家乡风景",
    },
]

export function AlbumGrid() {
    const [hoveredAlbum, setHoveredAlbum] = useState<number | null>(null)
    const [isContainerHovered, setIsContainerHovered] = useState(false)

    return (
        <div className="mb-12">
            <div
                className="p-8 -m-8 rounded-lg transition-all duration-300"
                onMouseEnter={() => setIsContainerHovered(true)}
                onMouseLeave={() => {
                    setIsContainerHovered(false)
                    setHoveredAlbum(null)
                }}
            >
                <div className="flex flex-col lg:flex-row gap-4">
                    {albums.map((album) => (
                        <div
                            key={album.id}
                            className={`relative flex-1 cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 ${hoveredAlbum !== null && hoveredAlbum !== album.id
                                ? "blur-sm scale-95 opacity-70"
                                : hoveredAlbum === album.id
                                    ? "scale-105 shadow-2xl"
                                    : isContainerHovered && hoveredAlbum === null
                                        ? "blur-sm scale-95 opacity-70"
                                        : ""
                                }`}
                            onMouseEnter={() => setHoveredAlbum(album.id)}
                            onMouseLeave={() => setHoveredAlbum(null)}
                        >
                            <div className="relative aspect-[3/4] lg:aspect-[4/5] group">
                                <img
                                    src={album.image || `/placeholder.svg?height=400&width=300&text=${encodeURIComponent(album.title)}`}
                                    alt={album.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement
                                        target.src = `/placeholder.svg?height=400&width=300&text=${encodeURIComponent(album.title)}`
                                    }}
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                                <div className="absolute top-4 left-4">
                                    <span className="inline-block px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                                        {album.category}
                                    </span>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-white text-xl lg:text-2xl font-bold leading-tight mb-2 drop-shadow-lg">
                                        {album.title}
                                    </h3>
                                    <p className="text-white/90 text-sm font-medium drop-shadow-md">{album.description}</p>
                                </div>

                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
