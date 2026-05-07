import { create } from 'zustand'

interface Notification {
  id: string
  title: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  read: boolean
  createdAt: Date
}

interface UIState {
  sidebarCollapsed: boolean
  commandPaletteOpen: boolean
  notifications: Notification[]
  unreadCount: number
  toggleSidebar: () => void
  setSidebarCollapsed: (v: boolean) => void
  /** Opens the command palette. Alias: setCommandOpen(true) */
  openCommandPalette: () => void
  closeCommandPalette: () => void
  /** Convenience alias used by Header — maps to open/close */
  setCommandOpen: (open: boolean) => void
  addNotification: (n: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void
  markAllRead: () => void
  clearNotifications: () => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  commandPaletteOpen: false,
  notifications: [],
  unreadCount: 0,
  toggleSidebar: () =>
    set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
  openCommandPalette: () => set({ commandPaletteOpen: true }),
  closeCommandPalette: () => set({ commandPaletteOpen: false }),
  setCommandOpen: (open) => set({ commandPaletteOpen: open }),
  addNotification: (n) =>
    set((s) => {
      const notification: Notification = {
        ...n,
        id: crypto.randomUUID(),
        read: false,
        createdAt: new Date(),
      }
      return {
        notifications: [notification, ...s.notifications].slice(0, 50),
        unreadCount: s.unreadCount + 1,
      }
    }),
  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
}))
