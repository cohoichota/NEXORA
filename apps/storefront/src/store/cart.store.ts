import type { CartItem } from '@nexora/shared-types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ── Cart Store (UI state) ─────────────────────────────────────────
// Server state is managed by TanStack Query — this store handles
// optimistic UI state and cart drawer visibility

interface CartUIState {
  isOpen: boolean;
  items: CartItem[]; // Optimistic local copy
  itemCount: number;

  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setItems: (items: CartItem[]) => void;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartUIState>()(
  persist(
    (set, get) => ({
      isOpen: false,
      items: [],
      itemCount: 0,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      setItems: (items) =>
        set({
          items,
          itemCount: items.reduce((acc, item) => acc + item.quantity, 0),
        }),

      addItem: (newItem) => {
        const { items } = get();
        const existing = items.find((i) => i.id === newItem.id);
        if (existing) {
          const updated = items.map((i) =>
            i.id === newItem.id ? { ...i, quantity: i.quantity + newItem.quantity } : i,
          );
          set({ items: updated, itemCount: updated.reduce((a, i) => a + i.quantity, 0) });
        } else {
          const updated = [...items, newItem];
          set({ items: updated, itemCount: updated.reduce((a, i) => a + i.quantity, 0) });
        }
      },

      removeItem: (itemId) => {
        const updated = get().items.filter((i) => i.id !== itemId);
        set({ items: updated, itemCount: updated.reduce((a, i) => a + i.quantity, 0) });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        const updated = get().items.map((i) => (i.id === itemId ? { ...i, quantity } : i));
        set({ items: updated, itemCount: updated.reduce((a, i) => a + i.quantity, 0) });
      },

      clearCart: () => set({ items: [], itemCount: 0 }),
    }),
    {
      name: 'nexora-cart',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
