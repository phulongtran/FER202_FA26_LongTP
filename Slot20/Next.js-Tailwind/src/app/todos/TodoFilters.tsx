
'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  filterChanged,
  selectTodoFilter,
} from '@/lib/features/todos/todosSlice';

import type { TodoFilter } from '@/types';

const LABELS: Record<TodoFilter, string> = {
  all: 'Tất cả',
  active: 'Chưa xong',
  done: 'Đã xong',
};

export default function TodoFilters() {
  const dispatch = useAppDispatch();
  const current = useAppSelector(selectTodoFilter);

  return (
    <div className="flex gap-2">
      {(Object.keys(LABELS) as TodoFilter[]).map((key) => (
        <button
          key={key}
          onClick={() => dispatch(filterChanged(key))}
          className={`rounded-full px-4 py-1 text-sm transition ${
            current === key
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          {LABELS[key]}
        </button>
      ))}
    </div>
  );
}
