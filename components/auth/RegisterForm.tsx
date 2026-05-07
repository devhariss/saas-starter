'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    terms: z.literal(true, { errorMap: () => ({ message: 'You must accept the terms to continue' }) }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterValues = z.infer<typeof registerSchema>;

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { score, label: 'Weak', color: 'var(--color-error)' };
  if (score <= 3) return { score, label: 'Fair', color: 'var(--color-warning)' };
  return { score, label: 'Strong', color: 'var(--color-success)' };
}

export default function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [passwordValue, setPasswordValue] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterValues) => {
    setIsLoading(true);
    setServerError(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
      });
      if (!res.ok) {
        const body = await res.json();
        setServerError(body.error ?? 'Registration failed. Please try again.');
        setIsLoading(false);
        return;
      }
      // Sign in immediately after successful registration
      await signIn('credentials', { email: data.email, password: data.password, callbackUrl: '/dashboard' });
    } catch {
      setServerError('An unexpected error occurred.');
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setOauthLoading(provider);
    await signIn(provider, { callbackUrl: '/dashboard' });
  };

  const strength = getPasswordStrength(passwordValue);

  const inputStyle = (hasError: boolean) => ({
    width: '100%',
    padding: 'var(--space-3) var(--space-4)',
    borderRadius: 'var(--radius-md)',
    border: `1px solid ${hasError ? 'var(--color-error)' : 'var(--color-border)'}`,
    background: 'var(--color-surface)',
    color: 'var(--color-text)',
    fontSize: 'var(--text-sm)',
    outline: 'none',
    transition: 'border-color 150ms ease',
    minHeight: '44px',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Create account form">
      {serverError && (
        <div
          role="alert"
          aria-live="polite"
          style={{
            marginBottom: 'var(--space-4)',
            padding: 'var(--space-3) var(--space-4)',
            borderRadius: 'var(--radius-md)',
            background: 'oklch(from var(--color-error) l c h / 0.1)',
            color: 'var(--color-error)',
            fontSize: 'var(--text-sm)',
          }}
        >
          {serverError}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div>
          <label htmlFor="name" style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 500, marginBottom: 'var(--space-1)', color: 'var(--color-text)' }}>Full name</label>
          <input id="name" type="text" autoComplete="name" aria-describedby={errors.name ? 'name-error' : undefined} aria-invalid={!!errors.name} {...register('name')} style={inputStyle(!!errors.name)} />
          {errors.name && <p id="name-error" role="alert" style={{ marginTop: 'var(--space-1)', fontSize: 'var(--text-xs)', color: 'var(--color-error)' }}>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="reg-email" style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 500, marginBottom: 'var(--space-1)', color: 'var(--color-text)' }}>Email address</label>
          <input id="reg-email" type="email" autoComplete="email" aria-describedby={errors.email ? 'reg-email-error' : undefined} aria-invalid={!!errors.email} {...register('email')} style={inputStyle(!!errors.email)} />
          {errors.email && <p id="reg-email-error" role="alert" style={{ marginTop: 'var(--space-1)', fontSize: 'var(--text-xs)', color: 'var(--color-error)' }}>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="reg-password" style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 500, marginBottom: 'var(--space-1)', color: 'var(--color-text)' }}>Password</label>
          <input
            id="reg-password"
            type="password"
            autoComplete="new-password"
            aria-describedby="password-strength"
            aria-invalid={!!errors.password}
            {...register('password', { onChange: (e) => setPasswordValue(e.target.value) })}
            style={inputStyle(!!errors.password)}
          />
          {passwordValue.length > 0 && (
            <div id="password-strength" aria-live="polite" style={{ marginTop: 'var(--space-2)' }}>
              <div style={{ display: 'flex', gap: 'var(--space-1)', marginBottom: 'var(--space-1)' }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    style={{
                      height: '3px',
                      flex: 1,
                      borderRadius: 'var(--radius-full)',
                      background: i <= strength.score ? strength.color : 'var(--color-border)',
                      transition: 'background 200ms ease',
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: 'var(--text-xs)', color: strength.color }}>{strength.label}</span>
            </div>
          )}
          {errors.password && <p role="alert" style={{ marginTop: 'var(--space-1)', fontSize: 'var(--text-xs)', color: 'var(--color-error)' }}>{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 500, marginBottom: 'var(--space-1)', color: 'var(--color-text)' }}>Confirm password</label>
          <input id="confirmPassword" type="password" autoComplete="new-password" aria-describedby={errors.confirmPassword ? 'confirm-error' : undefined} aria-invalid={!!errors.confirmPassword} {...register('confirmPassword')} style={inputStyle(!!errors.confirmPassword)} />
          {errors.confirmPassword && <p id="confirm-error" role="alert" style={{ marginTop: 'var(--space-1)', fontSize: 'var(--text-xs)', color: 'var(--color-error)' }}>{errors.confirmPassword.message}</p>}
        </div>

        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
            <input
              id="terms"
              type="checkbox"
              aria-describedby={errors.terms ? 'terms-error' : undefined}
              aria-invalid={!!errors.terms}
              {...register('terms')}
              style={{ marginTop: '2px', accentColor: 'var(--color-primary)', width: '16px', height: '16px', flexShrink: 0, cursor: 'pointer' }}
            />
            <label htmlFor="terms" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.5, cursor: 'pointer' }}>
              I agree to the{' '}
              <Link href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>Privacy Policy</Link>
            </label>
          </div>
          {errors.terms && <p id="terms-error" role="alert" style={{ marginTop: 'var(--space-1)', fontSize: 'var(--text-xs)', color: 'var(--color-error)' }}>{errors.terms.message}</p>}
        </fieldset>

        <button
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
          style={{
            width: '100%',
            padding: 'var(--space-3) var(--space-4)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-primary)',
            color: '#fff',
            fontWeight: 600,
            fontSize: 'var(--text-sm)',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1,
            border: 'none',
            minHeight: '44px',
            transition: 'opacity 150ms ease',
          }}
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', margin: 'var(--space-6) 0' }}>
        <span style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-faint)', whiteSpace: 'nowrap' }}>or continue with</span>
        <span style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <button type="button" onClick={() => handleOAuth('google')} disabled={oauthLoading !== null} aria-label="Continue with Google" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: 'var(--text-sm)', fontWeight: 500, cursor: oauthLoading !== null ? 'not-allowed' : 'pointer', opacity: oauthLoading !== null ? 0.7 : 1, minHeight: '44px', transition: 'background 150ms ease' }}>
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
          {oauthLoading === 'google' ? 'Redirecting...' : 'Continue with Google'}
        </button>
        <button type="button" onClick={() => handleOAuth('github')} disabled={oauthLoading !== null} aria-label="Continue with GitHub" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: 'var(--text-sm)', fontWeight: 500, cursor: oauthLoading !== null ? 'not-allowed' : 'pointer', opacity: oauthLoading !== null ? 0.7 : 1, minHeight: '44px', transition: 'background 150ms ease' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.572C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z"/></svg>
          {oauthLoading === 'github' ? 'Redirecting...' : 'Continue with GitHub'}
        </button>
      </div>

      <p style={{ marginTop: 'var(--space-6)', textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
        Already have an account?{' '}
        <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Sign in</Link>
      </p>
    </form>
  );
}
