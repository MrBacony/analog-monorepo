import { RouteMeta } from '@analogjs/router';

import { Component } from '@angular/core';

@Component({
  selector: 'lib-mono-notes-index-page',
  template: `
    <div class="flex text-slate-500 bg-slate-900 flex-col gap-4">
      <h1>Notes</h1>
      <p>Here you can take notes</p>
    </div>
  `,
})
export default class NotesIndexPageComponent {}
