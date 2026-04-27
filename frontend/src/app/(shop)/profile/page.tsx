"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { User, Mail, Shield, LogOut, ShoppingBag, ChevronRight, Loader2, Edit2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { AuthGuard } from "@/components/shared/auth-guard"
import { SectionHeader } from "@/components/shared/section-header"

import useAuthStore from "@/lib/stores/auth-store"
import { useLogout } from "@/features/auth/hooks/use-auth"
import { useProfile } from "@/features/profile/hooks/use-profile"
import { ProfileFormValues } from "@/features/profile/contracts/api-schema"

const UpdateSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
})

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const logoutMutation = useLogout()
  const updateProfile = useProfile.update()
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<ProfileFormValues.Update>({
    resolver: zodResolver(UpdateSchema),
    values: { name: user?.name ?? "", email: user?.email ?? "" },
  })

  const onSubmit = async (values: ProfileFormValues.Update) => {
    try {
      await updateProfile.mutateAsync([0, values] as any)
      toast.success("Profil berhasil diperbarui")
      setIsEditing(false)
    } catch {
      toast.error("Gagal memperbarui profil")
    }
  }

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => { toast.success("Berhasil keluar") },
      onError: () => { toast.error("Gagal keluar") },
    })
  }

  if (!isAuthenticated) {
    return <AuthGuard icon={User} title="Masuk untuk melihat profil" description="Kelola akun dan preferensi Anda" />
  }

  return (
    <div className="min-h-screen py-10 px-4 animate-[fadeIn_0.4s_ease]">
      <div className="max-w-2xl mx-auto">
        <SectionHeader label="Akun Saya" title="Profil" />

        {/* Avatar card */}
        <div className="card-dark p-8 mb-5">
          <div className="flex items-center gap-5 mb-6 pb-6 border-b border-obsidian-800">
            <div className="w-16 h-16 rounded-sm bg-gradient-to-br from-gold-600/30 to-gold-400/10 border border-gold-700/40 flex items-center justify-center text-gold-400 font-heading font-bold text-2xl shrink-0">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="font-heading text-xl text-obsidian-50">{user?.name}</h2>
              <p className="text-obsidian-500 text-sm">{user?.email}</p>
              <span className="badge border-gold-800/50 bg-gold-500/10 text-gold-400 mt-2">Member</span>
            </div>
            <Button variant="ghost" size="icon"
              className="text-obsidian-500 hover:text-gold-400 transition-colors"
              onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? <X size={16} /> : <Edit2 size={16} />}
            </Button>
          </div>

          {isEditing ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField name="name" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-obsidian-400 uppercase tracking-widest">Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama lengkap" className="input-dark" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="email" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-obsidian-400 uppercase tracking-widest">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="nama@email.com" className="input-dark" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="flex gap-3 pt-2">
                  <Button type="submit" disabled={updateProfile.isPending} className="btn-gold flex-1">
                    {updateProfile.isPending ? <Loader2 size={14} className="animate-spin" /> : "Simpan Perubahan"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { setIsEditing(false); form.reset() }}
                    className="btn-outline flex-1">
                    Batal
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <div className="space-y-3">
              {[
                { icon: User,   label: "Nama",   value: user?.name },
                { icon: Mail,   label: "Email",  value: user?.email },
                { icon: Shield, label: "Status", value: "Terverifikasi", valueClass: "text-emerald-400" },
              ].map(({ icon: Icon, label, value, valueClass }) => (
                <div key={label} className="flex items-center gap-4 p-4 bg-obsidian-900/50 border border-obsidian-800/50 rounded-sm">
                  <div className="w-8 h-8 rounded-sm bg-obsidian-800 flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-obsidian-400" />
                  </div>
                  <div>
                    <p className="text-xs text-obsidian-500 uppercase tracking-wider">{label}</p>
                    <p className={`text-sm font-medium mt-0.5 ${valueClass ?? "text-obsidian-200"}`}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nav */}
        <div className="card-dark divide-y divide-obsidian-800 mb-5">
          <Link href="/orders"
            className="flex items-center gap-4 p-5 hover:bg-obsidian-800/20 transition-colors group">
            <div className="w-9 h-9 rounded-sm bg-obsidian-800 border border-obsidian-700/60 flex items-center justify-center shrink-0 group-hover:border-gold-700/50 transition-colors">
              <ShoppingBag size={15} className="text-obsidian-400 group-hover:text-gold-400 transition-colors" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-obsidian-200">Pesanan Saya</p>
              <p className="text-xs text-obsidian-500">Lihat riwayat dan status pesanan</p>
            </div>
            <ChevronRight size={15} className="text-obsidian-600 group-hover:text-gold-500 transition-colors" />
          </Link>
        </div>

        {/* Logout */}
        <Button
          variant="destructive"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className="w-full border border-red-900/60 bg-red-900/10 text-red-400 hover:bg-red-900/20 hover:text-red-300 hover:border-red-800">
          {logoutMutation.isPending ? <Loader2 size={15} className="animate-spin" /> : <LogOut size={15} />}
          {logoutMutation.isPending ? "Keluar..." : "Keluar dari Akun"}
        </Button>
      </div>
    </div>
  )
}
