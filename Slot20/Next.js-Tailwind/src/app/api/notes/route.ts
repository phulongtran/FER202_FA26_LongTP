import { createNote, getNotes } from '@/lib/server/notes';
import type { NoteInput } from '@/types';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms)); // giả lập mạng chậm

// GET /api/notes
export async function GET() {
  const notes = await getNotes();
  return Response.json(notes);
}

// POST /api/notes   body: { title, content }
export async function POST(request: Request) {
  const body = (await request.json()) as Partial<NoteInput>;
  const title = body.title?.trim() ?? '';

  if (!title) return Response.json({ error: 'Tiêu đề không được để trống' }, { status: 400 });
  if (title.length > 100) return Response.json({ error: 'Tiêu đề tối đa 100 ký tự' }, { status: 400 });

  await delay(600);
  const note = await createNote({ title, content: body.content?.trim() ?? '' });
  return Response.json(note, { status: 201 });
}
