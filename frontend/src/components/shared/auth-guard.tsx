"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface AuthGuardProps {
  icon: LucideIcon
  title: string
  description?: string
}

export function AuthGuard({ icon: Icon, title, description }: AuthGuardProps) {
  const router = useRouter()
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-16 h-16 rounded-sm bg-gold-500/10 border border-gold-800/40 flex items-center justify-center mx-auto mb-5">
          <Icon size={28} className="text-gold-400" />
        </div>
        <h2 className="font-heading text-xl text-obsidian-100 mb-2">{title}</h2>
        {description && <p className="text-obsidian-500 text-sm mb-6">{description}</p>}
        <Button className="btn-gold" onClick={() => router.push("/login")}>Masuk Sekarang</Button>
      </div>
    </div>
  )
}
