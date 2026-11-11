import type { Product } from '@/types';

export async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`https://dummyjson.com/products/${id}`, { next: { revalidate: 60 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Không tải được sản phẩm');
  return (await res.json()) as Product;
}
