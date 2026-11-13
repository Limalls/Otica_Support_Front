import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Carrinho guardado no localStorage para não se perder ao recarregar a página.
// O total aqui serve só para exibir: o total oficial do pedido vem da API.
export const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      addItem: (produto, quantidade = 1) =>
        set((state) => {
          const existe = state.items.some((item) => item.id === produto.id)
          if (existe) {
            return {
              items: state.items.map((item) =>
                item.id === produto.id
                  ? { ...item, quantidade: item.quantidade + quantidade }
                  : item,
              ),
            }
          }
          return { items: [...state.items, { ...produto, quantidade }] }
        }),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),

      clear: () => set({ items: [] }),
    }),
    { name: 'otica-carrinho' },
  ),
)