import { create } from 'zustand'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'error' | 'warning'
  read: boolean
  createdAt: Date
}

interface UIStore {
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebar: () => void

  searchOpen: boolean
  setSearchOpen: (open: boolean) => void

  notifications: Notification[]
  addNotification: (n: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void
  markAllRead: () => void
  unreadCount: () => number
}

export const useUIStore = create<UIStore>((set, get) => ({
  sidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),

  notifications: [
    { id: '1', title: 'New signup', message: 'alice@example.com joined', type: 'info', read: false, createdAt: new Date() },
    { id: '2', title: 'Invoice paid', message: 'Invoice #INV-042 paid — $29.00', type: 'success', read: false, createdAt: new Date() },
    { id: '3', title: 'Subscription upgraded', message: 'bob@example.com → Pro plan', type: 'success', read: true, createdAt: new Date() },
  ],
  addNotification: (n) =>
    set((s) => ({
      notifications: [
        { ...n, id: crypto.randomUUID(), read: false, createdAt: new Date() },
        ...s.notifications,
      ],
    })),
  markAllRead: () =>
    set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
  unreadCount: () => get().notifications.filter((n) => !n.read).length,
}))
