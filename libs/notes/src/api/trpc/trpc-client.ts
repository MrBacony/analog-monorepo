import { LibRouter } from './routers';
import { createTrpcClient } from '@analogjs/trpc';
import { inject } from '@angular/core';
import { SuperJSON } from 'superjson';

export const { provideTrpcClient, TrpcClient: TrpcNotesClient } = createTrpcClient<LibRouter>({
  url: '/api/notes/trpc',
  options: {
    transformer: SuperJSON,
  },
});

export function provideTrpcNotesClient() {
  return provideTrpcClient();
}

export function injectTrpcLibClient() {
  return inject(TrpcNotesClient);
}
