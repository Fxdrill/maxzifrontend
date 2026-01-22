import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Add item to cart
      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }],
          });
        }
      },

      // Remove item from cart
      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      // Update item quantity
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      // Clear cart
      clearCart: () => {
        set({ items: [] });
      },

      // Get total items count
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      // Get cart total
      getCartTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      // Generate WhatsApp checkout message
      generateWhatsAppMessage: () => {
        const { items } = get();
        const total = get().getCartTotal();

        let message = 'Hello Maxzi, I would like to order:%0A%0A';

        items.forEach((item) => {
          const itemTotal = item.price * item.quantity;
          const availability = item.availability_type === 'in-store' ? '🟢 In-Store' : 
                             item.availability_type === 'on-demand' ? '🟡 On-Demand' : 
                             `${item.availability_type}`;
          message += `• ${item.name} (x${item.quantity}): ₦${itemTotal.toLocaleString()} [${availability}]%0A`;
        });

        message += `%0A*Total: ₦${total.toLocaleString()}*`;
        message += '%0A%0APlease confirm availability and delivery details.';

        return message;
      },

      // Get checkout URL
      getCheckoutUrl: (whatsappNumber = '2341234567890') => {
        const message = get().generateWhatsAppMessage();
        return `https://wa.me/${whatsappNumber}?text=${message}`;
      },
    }),
    {
      name: 'maxzi-cart',
    }
  )
);

export default useCartStore;
