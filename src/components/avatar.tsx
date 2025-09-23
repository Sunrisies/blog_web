import { cn } from "@/lib/utils"
import Image from "next/image"
interface Props {
    size?: 16 | 24 | 32 | 40 | 48 | 64 | 80 | 96
}
const sizeClasses = {
    16: "xs:w-12 xs:h-12 tb:w-16 tb:h-16 pc:w-20 pc:h-20",
    24: "xs:w-20 xs:h-20 tb:w-24 tb:h-24 pc:w-32 pc:h-32",
    32: "xs:w-28 xs:h-28 tb:w-32 tb:h-32 pc:w-40 pc:h-40",
    40: "xs:w-32 xs:h-32 tb:w-40 tb:h-40 pc:w-48 pc:h-48",
    48: "xs:w-40 xs:h-40 tb:w-48 tb:h-48 pc:w-64 pc:h-64",
    64: "xs:w-56 xs:h-56 tb:w-64 tb:h-64 pc:w-80 pc:h-80",
    80: "xs:w-72 xs:h-72 tb:w-80 tb:h-80 pc:w-96 pc:h-96",
    96: "xs:w-88 xs:h-88 tb:w-96 tb:h-96 pc:w-128 pc:h-128",
}
export const Avatar: React.FC<Props> = ({ size = 16 }: Props) => {

    return (
        <div className={cn("relative overflow-hidden cursor-pointer rounded-full rounded-full overflow-hidden border-4 border-primary/20 shadow-lg  transition-all duration-1500  hover:scale-120 hover:rotate-360",
            sizeClasses[size])}
        >
            <Image src="blog.png" alt="Profile" fill className="object-cover" />
        </div >
    )

}