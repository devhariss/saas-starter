import { create } from 'zustand'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: Date
}

interface UIState {
  sidebarCollapsed: boolean
  commandPaletteOpen: boolean
  notifications: Notification[]
  unreadCount: number
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  openCommandPalette: () => void
  closeCommandPalette: () => void
  addNotification: (n: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void
  markAllRead: () => void
  dismissNotification: (id: string) => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  commandPaletteOpen: false,
  notifications: [
    {
      id: '1',
      title: 'Welcome to SaasStarter',
      message: 'Your account has been set up successfully.',
      type: 'success',
      read: false,
      createdAt: new Date(),
    },
  ],
  unreadCount: 1,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  openCommandPalette: () => set({ commandPaletteOpen: true }),
  closeCommandPalette: () => set({ commandPaletteOpen: false }),
  addNotification: (n) =>
    set((s) => ({
      notifications: [
        { ...n, id: crypto.randomUUID(), read: false, createdAt: new Date() },
        ...s.notifications,
      ],
      unreadCount: s.unreadCount + 1,
    })),
  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  dismissNotification: (id) =>
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== id),
      unreadCount: s.notifications.filter((n) => n.id !== id && !n.read).length,
    })),
}))
