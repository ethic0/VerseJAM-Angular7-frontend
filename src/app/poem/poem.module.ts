import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PoemComponent } from './poem.component';
import { PoemCommentComponent } from './poem-comment.component';
import { PoemResolver } from './poem-resolver.service';
import { MarkdownPipe } from './markdown.pipe';
import { SharedModule } from '../shared';
import { PoemRoutingModule } from './poem-routing.module';

@NgModule({
  imports: [
    SharedModule,
    PoemRoutingModule
  ],
  declarations: [
    PoemComponent,
    PoemCommentComponent,
    MarkdownPipe
  ],

  providers: [
    PoemResolver
  ]
})
export class PoemModule {}
