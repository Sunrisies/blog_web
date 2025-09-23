export function AlbumHero() {
    return (
        <div className="relative mb-8 rounded-lg overflow-hidden">
            <div className="relative h-64 bg-gradient-to-r from-blue-500 to-purple-600">
                <img src="/city-skyline-with-modern-buildings-and-blue-sky.jpg" alt="网络相册横幅" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white text-center">网络相册</h1>
                </div>
            </div>
        </div>
    )
}
