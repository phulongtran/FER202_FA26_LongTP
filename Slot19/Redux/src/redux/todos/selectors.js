
// Lấy toàn bộ danh sách Todo
export const selectAllTodos = (state) => state.todos.todos;

// Lấy bộ lọc hiện tại
export const selectFilter = (state) => state.todos.filter;

// Lọc danh sách Todo theo bộ lọc
export const selectVisibleTodos = (state) => {
  const todos = selectAllTodos(state);
  const filter = selectFilter(state);

  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.done);

    case 'completed':
      return todos.filter((todo) => todo.done);

    case 'all':
    default:
      return todos;
  }
};

// Đếm số công việc chưa hoàn thành
export const selectActiveCount = (state) => {
  return selectAllTodos(state).filter((todo) => !todo.done).length;
};

// Đếm tổng số công việc
export const selectTotalCount = (state) => {
  return selectAllTodos(state).length;
};
