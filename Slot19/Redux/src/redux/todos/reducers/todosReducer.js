
import * as T from '../actionTypes';

const initialState = [
  {
    id: 1,
    text: 'Học Redux cơ bản',
    done: true,
  },
  {
    id: 2,
    text: 'Làm bài tập Todo',
    done: false,
  },
];

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    // Thêm công việc
    case T.ADD_TODO:
      return [...state, action.payload];

    // Đánh dấu hoàn thành / chưa hoàn thành
    case T.TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, done: !todo.done }
          : todo
      );

    // Chỉnh sửa nội dung công việc
    case T.EDIT_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );

    // Xóa công việc
    case T.DELETE_TODO:
      return state.filter(
        (todo) => todo.id !== action.payload
      );

    // Xóa các công việc đã hoàn thành
    case T.CLEAR_COMPLETED:
      return state.filter((todo) => !todo.done);

    default:
      return state;
  }
}
