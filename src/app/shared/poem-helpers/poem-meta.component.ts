import { Component, Input } from '@angular/core';

import { Poem } from '../../core';

@Component({
  selector: 'app-poem-meta',
  templateUrl: './poem-meta.component.html'
})
export class PoemMetaComponent {
  @Input() poem: Poem;
}
