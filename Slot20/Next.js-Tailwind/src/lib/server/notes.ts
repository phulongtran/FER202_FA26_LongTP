import { promises as fs } from 'fs';
import path from 'path';
import type { Note, NoteInput, NoteUpdate } from '@/types';

const FILE = path.join(process.cwd(), 'data', 'notes.json');

async function readAll(): Promise<Note[]> {
  const raw = await fs.readFile(FILE, 'utf-8');
  return JSON.parse(raw) as Note[];
}

async function writeAll(notes: Note[]): Promise<void> {
  await fs.writeFile(FILE, JSON.stringify(notes, null, 2));
}

export async function getNotes(): Promise<Note[]> {
  const notes = await readAll();
  return notes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getNote(id: number): Promise<Note | null> {
  const notes = await readAll();
  return notes.find((n) => n.id === id) ?? null;
}

export async function createNote(input: NoteInput): Promise<Note> {
  const notes = await readAll();
  const note: Note = { id: Date.now(), ...input, createdAt: new Date().toISOString() };
  notes.push(note);
  await writeAll(notes);
  return note;
}

export async function updateNote(id: number, data: NoteUpdate): Promise<Note | null> {
  const notes = await readAll();
  const idx = notes.findIndex((n) => n.id === id);
  if (idx === -1) return null;
  notes[idx] = { ...notes[idx], ...data };
  await writeAll(notes);
  return notes[idx];
}

export async function deleteNote(id: number): Promise<boolean> {
  const notes = await readAll();
  const filtered = notes.filter((n) => n.id !== id);
  if (filtered.length === notes.length) return false;
  await writeAll(filtered);
  return true;
}
