
'use client';

import { useState, type KeyboardEvent } from 'react';

import { useAppDispatch } from '@/lib/hooks';
import {
  todoEdited,
  todoRemoved,
  todoToggled,
} from '@/lib/features/todos/todosSlice';

import type { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
};

export default function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useAppDispatch();

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  function handleSave() {
    const text = draft.trim();

    if (!text) {
      setDraft(todo.text);
      setEditing(false);
      return;
    }

    dispatch(todoEdited({ id: todo.id, text }));
    setEditing(false);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSave();
    }

    if (e.key === 'Escape') {
      setDraft(todo.text);
      setEditing(false);
    }
  }

  return (
    <li className="group flex items-center gap-3 py-3">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => dispatch(todoToggled(todo.id))}
        className="peer h-5 w-5 cursor-pointer accent-blue-600"
        aria-label="Đánh dấu hoàn thành"
      />

      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-lg border border-blue-400 bg-transparent px-2 py-1 outline-none"
        />
      ) : (
        <span
          onDoubleClick={() => {
            setDraft(todo.text);
            setEditing(true);
          }}
          className={`flex-1 cursor-pointer select-none ${
            todo.done
              ? 'text-gray-400 line-through'
              : 'text-gray-800 dark:text-gray-200'
          }`}
        >
          {todo.text}
        </span>
      )}

      <button
        onClick={() => dispatch(todoRemoved(todo.id))}
        className="rounded-lg px-2 py-1 text-sm text-red-500 opacity-100 transition hover:bg-red-50 hover:text-red-700 md:opacity-0 md:group-hover:opacity-100"
        aria-label="Xóa công việc"
      >
        Xóa
      </button>
    </li>
  );
}
