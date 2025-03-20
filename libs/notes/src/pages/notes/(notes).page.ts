import {RouteMeta} from "@analogjs/router";

import {Component} from "@angular/core";

@Component(
  {
    selector: 'lib-mono-notes-index-page',
    template: `
      <div class="flex flex-col gap-4">
        <h1>Notes</h1>
        <p>Here you can take notes</p>
      </div>
    `,
  }
)
export default class NotesIndexPageComponent {
}
