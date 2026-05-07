import type { Metadata } from 'next'
import KPICard from '@/components/dashboard/KPICard'
import ActivityFeed from '@/components/dashboard/ActivityFeed'
import { ChartGroup } from '@/components/dashboard/ChartGroup'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Dashboard' }

const sparkMRR   = [7200,8100,7900,8800,9400,9100,9900,10600,10200,11300,11800,12480].map(v=>({v}))
const sparkUsers = [1200,1310,1290,1410,1500,1480,1560,1620,1700,1780,1810,1847].map(v=>({v}))
const sparkChurn = [3.1,2.9,2.8,2.6,2.5,2.7,2.4,2.3,2.4,2.2,2.3,2.1].map(v=>({v}))
const sparkNPS   = [58,59,61,60,62,63,61,64,63,65,66,67].map(v=>({v}))

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[var(--color-text)]">Dashboard</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
          Welcome back. Here’s what’s happening.
        </p>
      </div>

      {/* KPI grid */}
      <section aria-label="Key performance indicators">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <KPICard title="MRR" value="$12,480" change={8.2} changeLabel="vs last month" trend="up" sparklineData={sparkMRR} />
          <KPICard title="Active users" value="1,847" change={12.4} changeLabel="vs last month" trend="up" sparklineData={sparkUsers} />
          <KPICard title="Churn rate" value="2.1%" change={-0.3} changeLabel="vs last month" trend="up" sparklineData={sparkChurn} />
          <KPICard title="NPS" value="67" change={4} changeLabel="vs last month" trend="up" sparklineData={sparkNPS} />
        </div>
      </section>

      {/* Charts + Activity feed */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          {/* ChartGroup is a Client Component — holds ssr:false dynamic imports */}
          <ChartGroup />
        </div>
        <div className="xl:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}
