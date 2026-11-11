
'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type AppStore } from '@/lib/store';
import { hydrate } from '@/lib/actions';
import { loadState, saveState, selectPersisted } from '@/lib/persist';

export default function StoreProvider({
  children,
}: {
  children: ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (storeRef.current === null) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const store = storeRef.current;
    if (!store) return;

    // 1. Đọc dữ liệu đã lưu từ localStorage
    const saved = loadState();

    if (saved) {
      store.dispatch(hydrate(saved));
    }

    // 2. Theo dõi Redux Store và lưu khi state thay đổi
    const unsubscribe = store.subscribe(() => {
      saveState(selectPersisted(store.getState()));
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  );
}
