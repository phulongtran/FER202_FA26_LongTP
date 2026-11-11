
import {
  createSelector,
  createSlice,
  nanoid,
  type PayloadAction,
} from '@reduxjs/toolkit';

import { hydrate } from '@/lib/actions';
import type { RootState } from '@/lib/store';
import type { Todo, TodoFilter } from '@/types';

export type TodosState = {
  items: Todo[];
  filter: TodoFilter;
};

const initialState: TodosState = {
  items: [],
  filter: 'all',
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,

  reducers: {
    // Thêm công việc
    todoAdded: {
      reducer(state, action: PayloadAction<Todo>) {
        state.items.unshift(action.payload);
      },

      prepare(text: string) {
        return {
          payload: {
            id: nanoid(),
            text: text.trim(),
            done: false,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },

    // Đánh dấu hoàn thành
    todoToggled(state, action: PayloadAction<string>) {
      const todo = state.items.find(
        (t) => t.id === action.payload
      );

      if (todo) {
        todo.done = !todo.done;
      }
    },

    // Chỉnh sửa công việc
    todoEdited(
      state,
      action: PayloadAction<{ id: string; text: string }>
    ) {
      const todo = state.items.find(
        (t) => t.id === action.payload.id
      );

      if (todo) {
        todo.text = action.payload.text.trim();
      }
    },

    // Xóa công việc
    todoRemoved(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (t) => t.id !== action.payload
      );
    },

    // Đảo trạng thái tất cả công việc
    allToggled(state) {
      const allDone = state.items.every((t) => t.done);

      state.items.forEach((t) => {
        t.done = !allDone;
      });
    },

    // Xóa các công việc đã hoàn thành
    completedCleared(state) {
      state.items = state.items.filter((t) => !t.done);
    },

    // Thay đổi bộ lọc
    filterChanged(state, action: PayloadAction<TodoFilter>) {
      state.filter = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      if (action.payload.todos) {
        return action.payload.todos;
      }
    });
  },
});

export const {
  todoAdded,
  todoToggled,
  todoEdited,
  todoRemoved,
  allToggled,
  completedCleared,
  filterChanged,
} = todosSlice.actions;

export default todosSlice.reducer;

// ===== Selectors =====

const FILTER_FN: Record<TodoFilter, (t: Todo) => boolean> = {
  all: () => true,
  active: (t) => !t.done,
  done: (t) => t.done,
};

export const selectTodos = (state: RootState) => state.todos.items;

export const selectTodoFilter = (state: RootState) => state.todos.filter;

export const selectVisibleTodos = createSelector(
  [selectTodos, selectTodoFilter],
  (items, filter) => items.filter(FILTER_FN[filter])
);

export const selectTodoStats = createSelector(
  [selectTodos],
  (items) => {
    const done = items.filter((t) => t.done).length;

    return {
      total: items.length,
      done,
      active: items.length - done,
      percent: items.length
        ? Math.round((done / items.length) * 100)
        : 0,
    };
  }
);
