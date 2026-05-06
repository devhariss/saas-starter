import { create } from 'zustand'

interface Notification {
  id: string
  title: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  read: boolean
  createdAt: Date
}

interface UIState {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  setSidebarCollapsed: (v: boolean) => void

  searchOpen: boolean
  openSearch: () => void
  closeSearch: () => void

  notifications: Notification[]
  unreadCount: number
  addNotification: (n: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void
  markAllRead: () => void
  clearNotifications: () => void

  deleteAccountModalOpen: boolean
  openDeleteAccountModal: () => void
  closeDeleteAccountModal: () => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),

  searchOpen: false,
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),

  notifications: [
    {
      id: '1',
      title: 'Welcome to SaasStarter',
      message: 'Your account is ready. Start by creating your first project.',
      type: 'info',
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 5),
    },
  ],
  get unreadCount() {
    return this.notifications.filter((n) => !n.read).length
  },
  addNotification: (n) =>
    set((s) => ({
      notifications: [
        {
          ...n,
          id: crypto.randomUUID(),
          read: false,
          createdAt: new Date(),
        },
        ...s.notifications,
      ],
    })),
  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
    })),
  clearNotifications: () => set({ notifications: [] }),

  deleteAccountModalOpen: false,
  openDeleteAccountModal: () => set({ deleteAccountModalOpen: true }),
  closeDeleteAccountModal: () => set({ deleteAccountModalOpen: false }),
}))
