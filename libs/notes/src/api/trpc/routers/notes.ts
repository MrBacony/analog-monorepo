import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { Note } from '../../../lib/notes/note.model';

let noteId = 0;
const notes: Note[] = [{ id: noteId++, note: 'Hello world 2', createdAt: new Date().toISOString() }];
export const noteRouter = router({
  create: publicProcedure
    .input(
      z.object({
        note: z.string(),
      })
    )
    .mutation(({ input }) =>
      notes.push({
        id: noteId++,
        note: input.note,
        createdAt: new Date().toISOString(),
      })
    ),
  list: publicProcedure.query(() => notes),
  remove: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(({ input }) => {
      const index = notes.findIndex((note) => input.id === note.id);
      notes.splice(index, 1);
    }),
});
