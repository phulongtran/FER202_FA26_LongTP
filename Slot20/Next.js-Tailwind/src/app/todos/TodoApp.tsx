
'use client';

import { useAppSelector } from '@/lib/hooks';
import { selectVisibleTodos } from '@/lib/features/todos/todosSlice';

import TodoForm from './TodoForm';
import TodoFilters from './TodoFilters';
import TodoItem from './TodoItem';
import TodoStats from './TodoStats';

export default function TodoApp() {
  const todos = useAppSelector(selectVisibleTodos);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900">
      {/* Form thêm công việc */}
      <TodoForm />

      {/* Bộ lọc công việc */}
      <div className="mt-5">
        <TodoFilters />
      </div>

      {/* Danh sách công việc */}
      <ul className="mt-5 divide-y divide-gray-100 dark:divide-gray-800">
        {todos.length === 0 ? (
          <li className="py-10 text-center text-gray-400">
            Không có công việc nào 🎉
          </li>
        ) : (
          todos.map((t) => (
            <TodoItem key={t.id} todo={t} />
          ))
        )}
      </ul>

      {/* Thống kê */}
      <TodoStats />
    </div>
  );
}
