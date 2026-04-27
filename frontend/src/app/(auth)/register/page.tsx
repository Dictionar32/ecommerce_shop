"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { UserPlus } from "lucide-react"

import {
  Form, FormField, FormItem,
  FormLabel, FormControl, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { AuthApiSchema, AuthDefaultValues, type AuthFormValues } from "@/features/auth/contracts/api-schema"
import { useRegister } from "@/features/auth/hooks/use-auth"
import { AuthService } from "@/features/auth/services/auth-service"

export default function RegisterPage() {
  const registerMutation = useRegister()

  const form = useForm<AuthFormValues.Register>({
    resolver: zodResolver(AuthApiSchema.Register),
    defaultValues: AuthDefaultValues.register,
  })

  const onSubmit = async (values: AuthFormValues.Register) => {
    try {
      await registerMutation.mutateAsync(values)
      toast.success("Akun dibuat! Selamat datang.")
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Gagal mendaftar")
    }
  }

  const handleOAuth = (provider: string) => {
    window.location.href = AuthService.getOAuthRedirectUrl(provider)
  }

  return (
    <div className="min-h-screen flex">

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-obsidian-900 via-obsidian-950 to-black" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "linear-gradient(#d4a843 1px, transparent 1px), linear-gradient(90deg, #d4a843 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="relative flex flex-col items-center justify-center w-full px-16 text-center">
          <Link href="/" className="font-heading text-4xl font-bold mb-2">
            KUN<span className="text-gold-500">PULAN</span>
          </Link>
          <div className="h-px w-24 bg-gold-500/40 my-6" />
          <p className="text-obsidian-300 text-lg font-heading italic">
            "Bergabunglah dengan<br />komunitas premium kami."
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[["10K+", "Produk"], ["50K+", "Member"], ["4.9", "Rating"]].map(([num, label]) => (
              <div key={label}>
                <p className="font-heading text-2xl text-gold-400">{num}</p>
                <p className="text-obsidian-600 text-xs uppercase tracking-widest mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-6 bg-obsidian-950">
        <div className="w-full max-w-md animate-fade-in">

          <Link href="/" className="lg:hidden block font-heading text-3xl font-bold text-center mb-8">
            KUN<span className="text-gold-500">PULAN</span>
          </Link>

          <div className="mb-8">
            <h1 className="font-heading text-3xl text-obsidian-50">Buat Akun</h1>
            <p className="text-obsidian-500 text-sm mt-1">Mulai belanja premium hari ini</p>
          </div>

          {/* OAuth */}
          <button
            type="button"
            onClick={() => handleOAuth("google")}
            className="w-full flex items-center justify-center gap-3 bg-obsidian-900 hover:bg-obsidian-800 border border-obsidian-700 text-obsidian-200 py-3 rounded-sm transition-colors text-sm mb-6"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Daftar dengan Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-obsidian-800" />
            <span className="text-obsidian-600 text-xs tracking-widest uppercase">atau</span>
            <div className="flex-1 h-px bg-obsidian-800" />
          </div>

          {/* Form — boilerplate tetap sama */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

              <FormField name="name" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-obsidian-400 text-xs tracking-widest uppercase">Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama kamu" className="input-dark" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="email" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-obsidian-400 text-xs tracking-widest uppercase">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="nama@email.com" className="input-dark" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="password" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-obsidian-400 text-xs tracking-widest uppercase">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Min. 6 karakter" className="input-dark" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="passwordConfirmation" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-obsidian-400 text-xs tracking-widest uppercase">Konfirmasi Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Ulangi password" className="input-dark" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <p className="text-obsidian-600 text-xs">
                Dengan mendaftar, Anda menyetujui{" "}
                <span className="text-gold-600">Syarat & Ketentuan</span> kami.
              </p>

              <Button
                type="submit"
                disabled={registerMutation.isPending}
                className="btn-gold w-full flex items-center justify-center gap-2"
              >
                {registerMutation.isPending ? (
                  <div className="w-4 h-4 border-2 border-obsidian-900/30 border-t-obsidian-900 rounded-full animate-spin" />
                ) : (
                  <>
                    <UserPlus size={16} />
                    Buat Akun
                  </>
                )}
              </Button>

            </form>
          </Form>

          <p className="text-center text-obsidian-500 text-sm mt-6">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-gold-400 hover:text-gold-300 transition-colors">
              Masuk
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}