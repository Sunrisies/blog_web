import { Button } from "@/components/ui/button"
import { Github, Mail, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function ProfileCard() {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex flex-col items-center">
        <div className="relative h-20 w-20 overflow-hidden rounded-full  transition-all duration-1500  hover:scale-150 hover:rotate-360">
          <Image src="blog.png" alt="Profile" fill className="object-cover" />
        </div>

        <h2 className="mt-4 text-lg font-medium">Li Wei</h2>
        <p className="text-center text-sm text-muted-foreground">Writer and Chinese culture enthusiast</p>

        <div className="mt-4 flex gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://twitter.com">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="mailto:contact@example.com">
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
