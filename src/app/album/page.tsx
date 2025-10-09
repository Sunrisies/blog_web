import { AlbumHero } from "@/components/album/hero"
import { AlbumGrid } from "@/components/album/album-grid"

export default function AlbumPage() {
    return (
        <div className="bg-gray-50">
            <main className="container mx-auto px-4 py-6.5 max-w-4xl">
                <AlbumHero />
                <AlbumGrid />
            </main>
        </div>
    )
}
