'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  fetchProducts,
  selectProductsError,
  selectProductsQuery,
  selectProductsStatus,
  selectSort,
  selectSortedProducts,
  sortChanged,
  type SortKey,
} from '@/lib/features/products/productsSlice';
import ProductCard from './ProductCard';

const SORT_LABELS: Record<SortKey, string> = {
  default: 'Mặc định',
  'price-asc': 'Giá tăng dần',
  'price-desc': 'Giá giảm dần',
  rating: 'Đánh giá cao',
};

export default function ProductList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectSortedProducts);
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);
  const query = useAppSelector(selectProductsQuery);
  const sort = useAppSelector(selectSort);
  const [text, setText] = useState<string>(query);

  // Chỉ gọi API lần đầu; quay lại trang này sẽ dùng dữ liệu đã có trong store
  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts(''));
  }, [status, dispatch]);

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(fetchProducts(text.trim()));
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tìm sản phẩm..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-64 dark:border-gray-700 dark:bg-gray-900"
          />
          <button className="rounded-lg bg-blue-600 px-4 font-semibold text-white hover:bg-blue-700">Tìm</button>
        </form>

        <select
          value={sort}
          onChange={(e) => dispatch(sortChanged(e.target.value as SortKey))}
          className="rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
        >
          {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
            <option key={k} value={k}>
              {SORT_LABELS[k]}
            </option>
          ))}
        </select>
      </div>

      {(status === 'loading' || status === 'idle') && <ProductSkeleton />}

      {status === 'failed' && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950">
          <p className="font-semibold text-red-700 dark:text-red-400">{error}</p>
          <button
            onClick={() => dispatch(fetchProducts(query))}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Thử lại
          </button>
        </div>
      )}

      {status === 'succeeded' &&
        (products.length === 0 ? (
          <p className="py-20 text-center text-gray-500">Không tìm thấy sản phẩm nào cho “{query}”.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ))}
    </>
  );
}

function ProductSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
          <div className="aspect-square bg-gray-200 dark:bg-gray-800" />
          <div className="space-y-2 p-4">
            <div className="h-4 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-9 rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
