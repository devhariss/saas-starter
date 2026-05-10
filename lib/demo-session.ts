/**
 * demo-session.ts
 * Returns a fake session object for the preview branch.
 * Swap every `await auth()` / `getServerSession()` call with
 * `getDemoSession()` when NEXT_PUBLIC_DEMO_MODE=true.
 */
export const DEMO_SESSION = {
  user: {
    id:    'demo-user-001',
    name:  'Mohammed Hariss',
    email: 'demo@saastarter.dev',
    image: null,
    role:  'admin' as const,
    plan:  'pro'  as const,
  },
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
}

export type DemoSession = typeof DEMO_SESSION
