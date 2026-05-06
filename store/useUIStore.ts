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
  removeNotification: (id: string) => void
}

export const useUIStore = create<UIState>((set, get) => ({
  sidebarCollapsed: false,
  commandPaletteOpen: false,
  notifications: [
    {
      id: '1',
      title: 'Welcome to SaasStarter!',
      message: 'Your account is ready. Start building.',
      type: 'success',
      read: false,
      createdAt: new Date(),
    },
  ],
  get unreadCount() {
    return get().notifications.filter((n) => !n.read).length
  },
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  openCommandPalette: () => set({ commandPaletteOpen: true }),
  closeCommandPalette: () => set({ commandPaletteOpen: false }),
  addNotification: (n) =>
    set((s) => ({
      notifications: [
        {
          ...n,
          id: Math.random().toString(36).slice(2),
          read: false,
          createdAt: new Date(),
        },
        ...s.notifications,
      ],
    })),
  markAllRead: () =>
    set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
  removeNotification: (id) =>
    set((s) => ({ notifications: s.notifications.filter((n) => n.id !== id) })),
}))
