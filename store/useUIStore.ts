import { create } from 'zustand'

interface Notification {
  id: string
  title: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  read: boolean
}

interface UIState {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  setSidebarCollapsed: (v: boolean) => void
  commandOpen: boolean
  setCommandOpen: (v: boolean) => void
  notifications: Notification[]
  unreadCount: number
  addNotification: (n: Omit<Notification, 'id' | 'read'>) => void
  markAllRead: () => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
  commandOpen: false,
  setCommandOpen: (v) => set({ commandOpen: v }),
  notifications: [
    { id: '1', title: 'New user signed up', message: 'Alex Johnson just created an account.', type: 'info', read: false },
    { id: '2', title: 'Subscription upgraded', message: 'Maria Garcia upgraded to Pro.', type: 'success', read: false },
    { id: '3', title: 'Invoice paid', message: '$29 received from NexaFlow Inc.', type: 'success', read: true },
  ],
  get unreadCount() {
    return this.notifications.filter((n) => !n.read).length
  },
  addNotification: (n) =>
    set((s) => ({
      notifications: [{ ...n, id: crypto.randomUUID(), read: false }, ...s.notifications],
    })),
  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
    })),
}))
