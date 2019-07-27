import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoemComponent } from './poem.component';
import { PoemResolver } from './poem-resolver.service';

const routes: Routes = [
  {
    path: ':slug',
    component: PoemComponent,
    resolve: {
      poem: PoemResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoemRoutingModule {}
