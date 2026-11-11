'use client';

import { useState, type FormEvent } from 'react';
import { useAddNoteMutation } from '@/lib/features/notes/notesApi';
import { getErrorMessage } from '@/lib/errors';

export default function NoteForm() {
  const [addNote, { isLoading }] = useAddNoteMutation();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) {
      setError('Vui lòng nhập tiêu đề');
      return;
    }
    try {
      await addNote({ title: title.trim(), content: content.trim() }).unwrap(); // unwrap: lỗi → throw
      setTitle('');
      setContent('');
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  const inputClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800';

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl bg-white p-5 shadow dark:bg-gray-900">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tiêu đề" className={inputClass} />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        placeholder="Nội dung..."
        className={`${inputClass} resize-none`}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Đang lưu...' : '+ Thêm ghi chú'}
      </button>
    </form>
  );
}
