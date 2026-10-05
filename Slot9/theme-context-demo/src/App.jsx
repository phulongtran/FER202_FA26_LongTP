import { CartProvider } from "./contexts/CartContext";
import CartBadge from "./components/CartBadge";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

export default function App() {
  return (
    <CartProvider>
      <header><CartBadge /></header>
      <ProductList />
      <hr />
      <Cart />
    </CartProvider>
  );
}