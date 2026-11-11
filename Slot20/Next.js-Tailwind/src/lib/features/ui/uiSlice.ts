
import { createSlice } from '@reduxjs/toolkit';
import { hydrate } from '@/lib/actions';
import type { RootState } from '@/lib/store';

export type Theme = 'light' | 'dark';

type UiState = {
  theme: Theme;
  menuOpen: boolean;
};

const initialState: UiState = {
  theme: 'light',
  menuOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Chuyển đổi giao diện sáng / tối
    themeToggled(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },

    // Đóng / mở menu mobile
    menuToggled(state) {
      state.menuOpen = !state.menuOpen;
    },

    // Đóng menu mobile
    menuClosed(state) {
      state.menuOpen = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      if (action.payload.theme) {
        state.theme = action.payload.theme;
      }
    });
  },
});

export const {
  themeToggled,
  menuToggled,
  menuClosed,
} = uiSlice.actions;

// Selectors
export const selectTheme = (state: RootState) => state.ui.theme;
export const selectMenuOpen = (state: RootState) => state.ui.menuOpen;

export default uiSlice.reducer;
