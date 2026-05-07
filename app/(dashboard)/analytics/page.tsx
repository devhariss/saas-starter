import type { Metadata } from 'next'
import { BarChartWidget, AreaChartWidget } from '@/components/dashboard/ChartWidgets'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Analytics' }

export default function AnalyticsPage() {
  return (
    <main
      id="main-content"
      style={{
        padding: 'var(--space-8)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-8)',
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 600,
            color: 'var(--color-text)',
          }}
        >
          Analytics
        </h1>
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            marginTop: 'var(--space-1)',
          }}
        >
          Signups, revenue, and engagement over time.
        </p>
      </div>

      <section aria-label="Revenue over time">
        <h2
          style={{
            fontSize: 'var(--text-base)',
            fontWeight: 600,
            color: 'var(--color-text)',
            marginBottom: 'var(--space-4)',
          }}
        >
          Revenue over time (MRR)
        </h2>
        <AreaChartWidget />
      </section>

      <section aria-label="Daily signups">
        <h2
          style={{
            fontSize: 'var(--text-base)',
            fontWeight: 600,
            color: 'var(--color-text)',
            marginBottom: 'var(--space-4)',
          }}
        >
          Daily new signups
        </h2>
        <BarChartWidget />
      </section>
    </main>
  )
}
