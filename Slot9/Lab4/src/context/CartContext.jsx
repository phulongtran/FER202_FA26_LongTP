import { createContext, useContext, useReducer } from 'react';
import {
  cartReducer,
  initialCart,
  getCartTotals,
  CART_ACTIONS,
} from '../reducers/cartReducer';

const CartContext = createContext(null);

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  const { totalQuantity, totalPrice } = getCartTotals(cart);

  const addToCart = (product) => {
    dispatch({
      type: CART_ACTIONS.ADD,
      payload: product,
    });
  };

  const clearCart = () => {
    dispatch({
      type: CART_ACTIONS.CLEAR,
    });
  };

  const value = {
    cart,
    dispatch,
    totalQuantity,
    totalPrice,
    addToCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}

export { CartContext, CartProvider, useCart };