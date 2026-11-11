
import type { RootState } from './store';
import type { Theme } from './features/ui/uiSlice';

export type PersistedState = {
  theme?: Theme;
};

const KEY = 'slot20-state';

export function selectPersisted(state: RootState): PersistedState {
  return {
    theme: state.ui.theme,
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
    // Bỏ qua lỗi localStorage
  }
}
