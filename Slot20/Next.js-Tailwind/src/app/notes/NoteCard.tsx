'use client';

import { useState } from 'react';
import { useDeleteNoteMutation, useUpdateNoteMutation } from '@/lib/features/notes/notesApi';
import { getErrorMessage } from '@/lib/errors';
import type { Note } from '@/types';

type Props = { note: Note; color: string };

export default function NoteCard({ note, color }: Props) {
  const [updateNote, { isLoading: saving }] = useUpdateNoteMutation();
  const [deleteNote, { isLoading: deleting }] = useDeleteNoteMutation();
  const [editing, setEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(note.title);
  const [content, setContent] = useState<string>(note.content);

  async function handleSave() {
    try {
      await updateNote({ id: note.id, title, content }).unwrap();
      setEditing(false);
    } catch (err) {
      alert(getErrorMessage(err));
    }
  }

  function handleDelete() {
    if (confirm(`Xóa ghi chú "${note.title}"?`)) deleteNote(note.id);
  }

  if (editing) {
    return (
      <article className={`flex flex-col gap-2 rounded-xl p-4 shadow-md ring-2 ring-blue-500 ${color}`}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded bg-white/70 px-2 py-1 font-bold text-gray-800 focus:outline-none"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="resize-none rounded bg-white/70 px-2 py-1 text-sm text-gray-800 focus:outline-none"
        />
        <div className="flex justify-end gap-2 text-sm">
          <button
            onClick={() => {
              setEditing(false);
              setTitle(note.title);
              setContent(note.content);
            }}
            className="rounded px-3 py-1 text-gray-600 hover:bg-white/60"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded bg-blue-600 px-3 py-1 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Đang lưu...' : 'Lưu'}
          </button>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`group flex flex-col rounded-xl p-4 text-gray-800 shadow-sm transition hover:-rotate-1 hover:shadow-md ${color} ${
        deleting ? 'opacity-50' : ''
      }`}
    >
      <h2 className="font-bold">{note.title}</h2>
      <p className="mt-2 flex-1 whitespace-pre-line text-sm">{note.content}</p>
      <div className="mt-4 flex items-center justify-between">
        <time className="text-xs text-gray-500">{new Date(note.createdAt).toLocaleDateString('vi-VN')}</time>
        <div className="flex gap-3 text-sm opacity-0 transition group-hover:opacity-100">
          <button onClick={() => setEditing(true)} className="text-blue-600 hover:underline">
            Sửa
          </button>
          <button onClick={handleDelete} className="text-red-500 hover:underline">
            Xóa
          </button>
        </div>
      </div>
    </article>
  );
}
