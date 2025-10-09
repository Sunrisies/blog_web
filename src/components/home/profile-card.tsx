import { Button } from "@/components/ui/button"
import { Github, Mail } from "lucide-react"
import Link from "next/link"
import { Avatar } from "@/components/avatar"

export function ProfileCard() {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex flex-col items-center">
        <Avatar />
        <h2 className="mt-4 text-lg font-medium">朝阳</h2>
        <p className="text-center text-sm text-muted-foreground"> 朝阳的码农札记</p>

        <div className="mt-4 flex gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com/Sunrisies">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <Link href="mailto:3266420686@qq.com">
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
