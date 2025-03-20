import { router } from '../trpc';
import { noteRouter } from './notes';

export const libRouter = router({
  note: noteRouter,
});
// export type definition of API
export type LibRouter = typeof libRouter;
