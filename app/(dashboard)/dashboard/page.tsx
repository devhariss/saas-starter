import type { Metadata } from 'next'
import { KPICard } from '@/components/dashboard/KPICard'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { AreaChartWrapper } from '@/components/dashboard/AreaChartWrapper'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your SaasStarter overview: MRR, active users, churn, and NPS.',
}

const kpis = [
  {
    title: 'MRR',
    value: '$12,480',
    change: 8.2,
    changeLabel: 'vs last month',
    sparkline: [11200, 11340, 11480, 11620, 11890, 12010, 12480],
  },
  {
    title: 'Active Users',
    value: '1,847',
    change: 12.4,
    changeLabel: '30-day growth',
    sparkline: [1420, 1510, 1595, 1630, 1712, 1798, 1847],
  },
  {
    title: 'Churn Rate',
    value: '2.1%',
    change: -0.3,
    changeLabel: 'vs last month',
    sparkline: [2.8, 2.7, 2.6, 2.5, 2.4, 2.3, 2.1],
  },
  {
    title: 'NPS',
    value: '67',
    change: 4,
    changeLabel: 'promoter score change',
    sparkline: [59, 60, 61, 62, 63, 65, 67],
  },
]

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
          <KPICard key={kpi.title} {...kpi} />
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
          <AreaChartWrapper />
        </div>
        <ActivityFeed />
      </div>
    </div>
  )
}
