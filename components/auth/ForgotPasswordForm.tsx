'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotValues = z.infer<typeof schema>;

export default function ForgotPasswordForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ForgotValues) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          padding: 'var(--space-6)',
          borderRadius: 'var(--radius-lg)',
          background: 'oklch(from var(--color-success) l c h / 0.08)',
          border: '1px solid oklch(from var(--color-success) l c h / 0.2)',
          textAlign: 'center',
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-success)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ margin: '0 auto var(--space-3)' }}
          aria-hidden="true"
        >
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.9a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
        <p style={{ fontWeight: 600, color: 'var(--color-text)', marginBottom: 'var(--space-1)' }}>Check your inbox</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
          If that email is registered, you&apos;ll receive a magic link shortly.
        </p>
        <Link
          href="/login"
          style={{ display: 'inline-block', marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-primary)', fontWeight: 500 }}
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Password reset form">
      {status === 'error' && (
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
          Something went wrong. Please try again.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div>
          <label
            htmlFor="forgot-email"
            style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 500, marginBottom: 'var(--space-1)', color: 'var(--color-text)' }}
          >
            Email address
          </label>
          <input
            id="forgot-email"
            type="email"
            autoComplete="email"
            aria-describedby={errors.email ? 'forgot-email-error' : 'forgot-email-hint'}
            aria-invalid={!!errors.email}
            {...register('email')}
            style={{
              width: '100%',
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${errors.email ? 'var(--color-error)' : 'var(--color-border)'}`,
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
              fontSize: 'var(--text-sm)',
              outline: 'none',
              transition: 'border-color 150ms ease',
              minHeight: '44px',
            }}
          />
          <p id="forgot-email-hint" style={{ marginTop: 'var(--space-1)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            We&apos;ll send a magic link to this address.
          </p>
          {errors.email && (
            <p id="forgot-email-error" role="alert" style={{ marginTop: 'var(--space-1)', fontSize: 'var(--text-xs)', color: 'var(--color-error)' }}>
              {errors.email.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          aria-busy={status === 'loading'}
          style={{
            width: '100%',
            padding: 'var(--space-3) var(--space-4)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-primary)',
            color: '#fff',
            fontWeight: 600,
            fontSize: 'var(--text-sm)',
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            opacity: status === 'loading' ? 0.7 : 1,
            border: 'none',
            minHeight: '44px',
            transition: 'opacity 150ms ease',
          }}
        >
          {status === 'loading' ? 'Sending...' : 'Send magic link'}
        </button>
      </div>

      <p style={{ marginTop: 'var(--space-6)', textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
        Remembered it?{' '}
        <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
