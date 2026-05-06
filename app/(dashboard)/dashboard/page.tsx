import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { KPICard } from '@/components/dashboard/KPICard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { SkeletonCard } from '@/components/shared/SkeletonCard';

const AreaChart = dynamic(
  () => import('@/components/dashboard/AreaChart'),
  {
    loading: () => <SkeletonCard className="h-64 w-full" />,
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your SaasStarter overview: MRR, active users, churn, and NPS.',
};

const kpis = [
  { label: 'MRR', value: '$12,480', trend: '+8.2%', direction: 'up' as const },
  { label: 'Active Users', value: '1,847', trend: '+12.4%', direction: 'up' as const },
  { label: 'Churn Rate', value: '2.1%', trend: '-0.3%', direction: 'down' as const },
  { label: 'NPS', value: '67', trend: '+4', direction: 'up' as const },
];

export default function DashboardPage() {
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
        Dashboard
      </h1>

      {/* KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 'var(--space-4)',
        }}
      >
        {kpis.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Chart + Activity Feed */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: 'var(--space-6)',
        }}
        className="dashboard-main-grid"
      >
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
            Revenue over time
          </h2>
          <AreaChart />
        </div>
        <ActivityFeed />
      </div>
    </div>
  );
}
