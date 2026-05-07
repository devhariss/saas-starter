import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { SkipLink } from '@/components/shared/SkipLink'
import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg)]">
      <SkipLink />
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 overflow-y-auto p-4 md:p-6"
        >
          {children}
        </main>
      </div>
    </div>
  )
}
