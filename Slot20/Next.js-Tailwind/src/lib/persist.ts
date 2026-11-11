
import type { RootState } from './store';
import type { Theme } from './features/ui/uiSlice';
import type { TodosState } from './features/todos/todosSlice';

export type PersistedState = {
  theme?: Theme;
  todos?: TodosState;
};

const KEY = 'slot20-state';

export function selectPersisted(state: RootState): PersistedState {
  return {
    theme: state.ui.theme,
    todos: state.todos,
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
