'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
})
type FormData = z.infer<typeof schema>

export default function ForgotPasswordForm() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    await signIn('resend', { email: data.email, redirect: false })
    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <div className="text-center space-y-4" role="status" aria-live="polite">
        <CheckCircle2 size={40} className="text-[var(--color-success)] mx-auto" aria-hidden="true" />
        <h2 className="text-base font-semibold text-[var(--color-text)]">Check your inbox</h2>
        <p className="text-sm text-[var(--color-text-muted)]">
          We sent a magic link to <strong className="text-[var(--color-text)]">{getValues('email')}</strong>.
          The link expires in 10 minutes.
        </p>
        <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-[var(--color-primary)] hover:underline">
          <ArrowLeft size={13} aria-hidden="true" /> Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <label htmlFor="forgot-email" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
          Email address
        </label>
        <input
          id="forgot-email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'forgot-email-error' : undefined}
          {...register('email')}
          className="w-full px-3 py-2 rounded-[var(--radius-md)] bg-[var(--color-surface-2)] border border-[oklch(from_var(--color-text)_l_c_h_/_0.12)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p id="forgot-email-error" role="alert" className="mt-1 text-xs text-[var(--color-error)]">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className="w-full py-2.5 px-4 rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending link…' : 'Send magic link'}
      </button>

      <p className="text-center text-sm text-[var(--color-text-muted)]">
        <Link href="/login" className="inline-flex items-center gap-1.5 text-[var(--color-primary)] hover:underline">
          <ArrowLeft size={13} aria-hidden="true" /> Back to sign in
        </Link>
      </p>
    </form>
  )
}
