
import { createSlice, createSelector } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',

  initialState: {
    items: [],
  },

  reducers: {
    // Thêm sản phẩm vào giỏ hàng
    addToCart(state, action) {
      const product = action.payload;

      const existing = state.items.find(
        (item) => item.id === product.id
      );

      if (existing) {
        if (existing.quantity < existing.stock) {
          existing.quantity += 1;
        }
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
    },

    // Tăng số lượng sản phẩm
    increaseQty(state, action) {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item && item.quantity < item.stock) {
        item.quantity += 1;
      }
    },

    // Giảm số lượng sản phẩm
    decreaseQty(state, action) {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload
        );
      }
    },

    // Xóa sản phẩm khỏi giỏ hàng
    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    // Xóa toàn bộ giỏ hàng
    clearCart() {
      return {
        items: [],
      };
    },
  },
});

// Export actions
export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state) => state.cart.items;

// Tổng số lượng sản phẩm
export const selectCartCount = (state) =>
  state.cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

// Tổng tiền giỏ hàng
export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) =>
    items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
);

// Lấy số lượng của một sản phẩm
export const selectQtyInCart = (id) => (state) =>
  state.cart.items.find((item) => item.id === id)?.quantity ?? 0;
