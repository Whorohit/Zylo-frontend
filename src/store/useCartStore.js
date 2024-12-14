import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],
  totalItems: 0,
  addToCart: (nft) =>
    set((state) => ({
      items: [...state.items, nft],
      totalItems: state.totalItems + 1,
    })),
  removeFromCart: (nftId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== nftId),
      totalItems: state.totalItems - 1,
    })),
  clearCart: () => set({ items: [], totalItems: 0 }),
}));