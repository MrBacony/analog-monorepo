import { Component, resource } from '@angular/core';
import { injectTrpcLibClient } from '@app/notes';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'lib-mono-notes-page',
  template: `
    <div class="flex text-slate-500 bg-slate-900 flex-col gap-4">
      <h1>Notes</h1>
      <p>Here you can take notes3</p>

      @for (note of notes.value(); track note.id) {
      <div class="note">
        <p>{{ note.note }}</p>
      </div>
      }
    </div>
  `,
})
export default class NotesPageComponent {
  private trpc = injectTrpcLibClient();

  public notes = resource({
    loader: () => lastValueFrom(this.trpc.note.list.query()),
  });
}
