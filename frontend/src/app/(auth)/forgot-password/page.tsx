"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Mail, ArrowLeft, Check } from "lucide-react"

import {
  Form, FormField, FormItem,
  FormLabel, FormControl, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { AuthApiSchema, AuthDefaultValues, type AuthFormValues } from "@/features/auth/contracts/api-schema"
import { useForgotPassword } from "@/features/auth/hooks/use-auth"

function ForgotPasswordContent() {
  const searchParams = useSearchParams()
  const [sent, setSent] = useState(false)
  const [sentEmail, setSentEmail] = useState("")

  const forgotMutation = useForgotPassword()

  const form = useForm<AuthFormValues.ForgotPassword>({
    resolver: zodResolver(AuthApiSchema.ForgotPassword),
    defaultValues: {
      ...AuthDefaultValues.forgotPassword,
      email: searchParams.get("email") ?? "",
    },
  })

  const onSubmit = async (values: AuthFormValues.ForgotPassword) => {
    try {
      await forgotMutation.mutateAsync(values)
      setSentEmail(values.email)
      setSent(true)
      toast.success("Email reset password telah dikirim")
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Gagal mengirim email")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian-950 px-6">
      <div className="w-full max-w-md animate-fade-in">

        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-obsidian-500 hover:text-gold-400 transition-colors text-sm mb-10"
        >
          <ArrowLeft size={14} />
          Kembali ke Login
        </Link>

        <div className="card-dark p-8">
          {sent ? (
            // Success state
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={28} className="text-gold-400" />
              </div>
              <h2 className="font-heading text-2xl text-obsidian-50 mb-3">Email Dikirim!</h2>
              <p className="text-obsidian-400 text-sm leading-relaxed">
                Kami telah mengirim link reset password ke{" "}
                <span className="text-gold-400">{sentEmail}</span>.
                Periksa inbox atau folder spam Anda.
              </p>
              <button
                onClick={() => setSent(false)}
                className="btn-outline mt-6 text-xs"
              >
                Kirim Ulang
              </button>
            </div>
          ) : (
            // Form state
            <>
              <div className="mb-8">
                <div className="w-12 h-12 bg-gold-500/20 rounded-sm flex items-center justify-center mb-4">
                  <Mail size={22} className="text-gold-400" />
                </div>
                <h1 className="font-heading text-2xl text-obsidian-50">Lupa Password?</h1>
                <p className="text-obsidian-500 text-sm mt-2">
                  Masukkan email Anda dan kami akan mengirimkan link reset password.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                  <FormField name="email" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-obsidian-400 text-xs tracking-widest uppercase">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="nama@email.com" className="input-dark" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <Button
                    type="submit"
                    disabled={forgotMutation.isPending}
                    className="btn-gold w-full flex items-center justify-center gap-2"
                  >
                    {forgotMutation.isPending ? (
                      <div className="w-4 h-4 border-2 border-obsidian-900/30 border-t-obsidian-900 rounded-full animate-spin" />
                    ) : (
                      <>
                        <Mail size={16} />
                        Kirim Link Reset
                      </>
                    )}
                  </Button>

                </form>
              </Form>
            </>
          )}
        </div>

      </div>
    </div>
  )
}

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPasswordContent />
    </Suspense>
  )
}