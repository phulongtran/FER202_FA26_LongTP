import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Note, NoteInput, NoteUpdate } from '@/types';

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Note'],
  endpoints: (build) => ({
    // GET /api/notes
    getNotes: build.query<Note[], void>({
      query: () => '/notes',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Note' as const, id })), { type: 'Note' as const, id: 'LIST' }]
          : [{ type: 'Note' as const, id: 'LIST' }],
    }),

    // POST /api/notes
    addNote: build.mutation<Note, NoteInput>({
      query: (body) => ({ url: '/notes', method: 'POST', body }),
      invalidatesTags: [{ type: 'Note', id: 'LIST' }],
    }),

    // PUT /api/notes/:id
    updateNote: build.mutation<Note, { id: number } & NoteUpdate>({
      query: ({ id, ...patch }) => ({ url: `/notes/${id}`, method: 'PUT', body: patch }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Note', id }],
    }),

    // DELETE /api/notes/:id – có optimistic update
    deleteNote: build.mutation<void, number>({
      query: (id) => ({ url: `/notes/${id}`, method: 'DELETE' }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // 1) Xóa ngay trên giao diện (trong cache)
        const patch = dispatch(
          notesApi.util.updateQueryData('getNotes', undefined, (draft) => draft.filter((n) => n.id !== id))
        );
        try {
          await queryFulfilled; // 2) Đợi server xác nhận
        } catch {
          patch.undo(); // 3) Lỗi → khôi phục lại
        }
      },
      invalidatesTags: (_result, _error, id) => [{ type: 'Note', id }],
    }),
  }),
});

export const { useGetNotesQuery, useAddNoteMutation, useUpdateNoteMutation, useDeleteNoteMutation } = notesApi;
