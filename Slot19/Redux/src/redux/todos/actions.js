
import * as T from './actionTypes';

// Thêm công việc
export const addTodo = (text) => ({
  type: T.ADD_TODO,
  payload: {
    id: Date.now(),
    text,
    done: false,
  },
});

// Đánh dấu hoàn thành / chưa hoàn thành
export const toggleTodo = (id) => ({
  type: T.TOGGLE_TODO,
  payload: id,
});

// Xóa công việc
export const deleteTodo = (id) => ({
  type: T.DELETE_TODO,
  payload: id,
});

// Chỉnh sửa nội dung công việc
export const editTodo = (id, text) => ({
  type: T.EDIT_TODO,
  payload: {
    id,
    text,
  },
});

// Xóa tất cả công việc đã hoàn thành
export const clearCompleted = () => ({
  type: T.CLEAR_COMPLETED,
});

// Thay đổi bộ lọc
export const setFilter = (filter) => ({
  type: T.SET_FILTER,
  payload: filter,
});
