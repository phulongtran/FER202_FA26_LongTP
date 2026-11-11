import { deleteNote, getNote, updateNote } from '@/lib/server/notes';
import type { NoteUpdate } from '@/types';

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Context) {
  const { id } = await params;
  const note = await getNote(Number(id));
  if (!note) return Response.json({ error: 'Không tìm thấy ghi chú' }, { status: 404 });
  return Response.json(note);
}

export async function PUT(request: Request, { params }: Context) {
  const { id } = await params;
  const body = (await request.json()) as NoteUpdate;
  if (body.title !== undefined && !body.title.trim()) {
    return Response.json({ error: 'Tiêu đề không được để trống' }, { status: 400 });
  }
  const note = await updateNote(Number(id), body);
  if (!note) return Response.json({ error: 'Không tìm thấy ghi chú' }, { status: 404 });
  return Response.json(note);
}

export async function DELETE(_request: Request, { params }: Context) {
  const { id } = await params;
  const ok = await deleteNote(Number(id));
  if (!ok) return Response.json({ error: 'Không tìm thấy ghi chú' }, { status: 404 });
  return new Response(null, { status: 204 });
}
