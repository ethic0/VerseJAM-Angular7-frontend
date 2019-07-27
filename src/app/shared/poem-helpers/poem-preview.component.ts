import { Component, Input } from '@angular/core';

import { Poem } from '../../core';

@Component({
  selector: 'app-poem-preview',
  templateUrl: './poem-preview.component.html'
})
export class PoemPreviewComponent {
  @Input() poem: Poem;

  onToggleFavorite(favorited: boolean) {
    this.poem['favorited'] = favorited;

    if (favorited) {
      this.poem['favoritesCount']++;
    } else {
      this.poem['favoritesCount']--;
    }
  }
}
