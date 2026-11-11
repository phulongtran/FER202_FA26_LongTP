import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { hydrate } from '@/lib/actions';
import type { RootState } from '@/lib/store';
import type { CartItem, CartProduct } from '@/types';

export type CartState = { items: CartItem[] };

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addedToCart(state, action: PayloadAction<CartProduct>) {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });
    },
    quantityChanged(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((i) => i.id !== id);
        return;
      }
      const item = state.items.find((i) => i.id === id);
      if (item) item.quantity = Math.min(quantity, 99);
    },
    removedFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    cartCleared(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      if (action.payload.cart) state.items = action.payload.cart.items;
    });
  },
});

export const { addedToCart, quantityChanged, removedFromCart, cartCleared } = cartSlice.actions;
export default cartSlice.reducer;

// ===== Selectors =====
export const selectCartItems = (s: RootState) => s.cart.items;

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + i.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0)
);

export const selectQuantityInCart = (s: RootState, id: number): number =>
  s.cart.items.find((i) => i.id === id)?.quantity ?? 0;
