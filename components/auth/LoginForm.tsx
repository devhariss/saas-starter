'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Github } from 'lucide-react'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})
type FormData = z.infer<typeof schema>

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard'
  const [showPw, setShowPw] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setServerError(null)
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl,
    })
    setLoading(false)
    if (res?.error) {
      setServerError('Invalid email or password.')
    } else if (res?.ok) {
      router.push(callbackUrl)
    }
  }

  const handleOAuth = (provider: 'google' | 'github') => {
    signIn(provider, { callbackUrl })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {serverError && (
        <div role="alert" aria-live="assertive" className="p-3 rounded-[var(--radius-md)] bg-[oklch(from_var(--color-error)_l_c_h_/_0.08)] border border-[oklch(from_var(--color-error)_l_c_h_/_0.20)] text-sm text-[var(--color-error)]">
          {serverError}
        </div>
      )}

      <div>
        <label htmlFor="login-email" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
          Email address
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'login-email-error' : undefined}
          {...register('email')}
          className="w-full px-3 py-2 rounded-[var(--radius-md)] bg-[var(--color-surface-2)] border border-[oklch(from_var(--color-text)_l_c_h_/_0.12)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p id="login-email-error" role="alert" className="mt-1 text-xs text-[var(--color-error)]">{errors.email.message}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="login-password" className="block text-sm font-medium text-[var(--color-text)]">
            Password
          </label>
          <Link href="/forgot-password" className="text-xs text-[var(--color-primary)] hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <input
            id="login-password"
            type={showPw ? 'text' : 'password'}
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'login-pw-error' : undefined}
            {...register('password')}
            className="w-full px-3 py-2 pr-10 rounded-[var(--radius-md)] bg-[var(--color-surface-2)] border border-[oklch(from_var(--color-text)_l_c_h_/_0.12)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
            placeholder="••••••••"
          />
          <button
            type="button"
            aria-label={showPw ? 'Hide password' : 'Show password'}
            onClick={() => setShowPw(p => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            {showPw ? <EyeOff size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
          </button>
        </div>
        {errors.password && (
          <p id="login-pw-error" role="alert" className="mt-1 text-xs text-[var(--color-error)]">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className="w-full py-2.5 px-4 rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Signing in…' : 'Sign in'}
      </button>

      <div className="relative flex items-center gap-3 my-1">
        <div className="flex-1 h-px bg-[oklch(from_var(--color-text)_l_c_h_/_0.10)]" />
        <span className="text-xs text-[var(--color-text-faint)]">or continue with</span>
        <div className="flex-1 h-px bg-[oklch(from_var(--color-text)_l_c_h_/_0.10)]" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => handleOAuth('google')}
          className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-[var(--radius-md)] border border-[oklch(from_var(--color-text)_l_c_h_/_0.12)] text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors"
          aria-label="Continue with Google"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </button>
        <button
          type="button"
          onClick={() => handleOAuth('github')}
          className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-[var(--radius-md)] border border-[oklch(from_var(--color-text)_l_c_h_/_0.12)] text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors"
          aria-label="Continue with GitHub"
        >
          <Github size={15} aria-hidden="true" />
          GitHub
        </button>
      </div>

      <p className="text-center text-sm text-[var(--color-text-muted)]">
        No account?{' '}
        <Link href="/register" className="text-[var(--color-primary)] hover:underline font-medium">
          Create one
        </Link>
      </p>
    </form>
  )
}
