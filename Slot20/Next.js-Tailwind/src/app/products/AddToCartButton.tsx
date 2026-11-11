'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addedToCart, selectQuantityInCart } from '@/lib/features/cart/cartSlice';
import type { CartProduct } from '@/types';

type Props = { product: CartProduct; className?: string };

export default function AddToCartButton({ product, className = '' }: Props) {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector((s) => selectQuantityInCart(s, product.id));
  const [justAdded, setJustAdded] = useState<boolean>(false);

  useEffect(() => {
    if (!justAdded) return;
    const timer = setTimeout(() => setJustAdded(false), 1200);
    return () => clearTimeout(timer);
  }, [justAdded]);

  return (
    <button
      onClick={() => {
        dispatch(addedToCart(product));
        setJustAdded(true);
      }}
      className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition active:scale-95 ${
        justAdded ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
      } ${className}`}
    >
      {justAdded ? '✓ Đã thêm' : quantity > 0 ? `Thêm nữa (${quantity})` : 'Thêm vào giỏ'}
    </button>
  );
}
