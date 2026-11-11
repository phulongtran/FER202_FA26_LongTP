import type { RootState } from './store';
import type { Theme } from './features/ui/uiSlice';
import type { TodosState } from './features/todos/todosSlice';
import type { CartState } from './features/cart/cartSlice';

export type PersistedState = {
  theme?: Theme;
  todos?: TodosState;
  cart?: CartState;
};

const KEY = 'slot20-state';

// Không lưu products: đó là dữ liệu server, mỗi lần mở lại nên lấy mới
export function selectPersisted(state: RootState): PersistedState {
  return {
    theme: state.ui.theme,
    todos: state.todos,
    cart: state.cart,
  };
}

export function loadState(): PersistedState | undefined {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PersistedState) : undefined;
  } catch {
    return undefined;
  }
}

export function saveState(state: PersistedState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* bỏ qua lỗi hết dung lượng */
  }
}
