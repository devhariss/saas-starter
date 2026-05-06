import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { SkeletonCard } from '@/components/shared/SkeletonCard';

const BarChart = dynamic(() => import('@/components/dashboard/BarChart'), {
  loading: () => <SkeletonCard className="h-64 w-full" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Analytics',
  description: 'Product analytics: signups, retention, and revenue.',
};

export default function AnalyticsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 700,
          color: 'var(--color-text)',
        }}
      >
        Analytics
      </h1>
      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-base)',
            fontWeight: 600,
            color: 'var(--color-text)',
            marginBottom: 'var(--space-4)',
          }}
        >
          New signups per day (last 30 days)
        </h2>
        <BarChart />
      </div>
    </div>
  );
}
