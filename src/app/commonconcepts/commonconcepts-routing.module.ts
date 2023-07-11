import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonconceptsComponent } from './commonconcepts.component';
import { ErrorscreenComponent } from './errorscreen/errorscreen.component';

const routes: Routes = [
  { path: 'concept', component: CommonconceptsComponent },
  { path: 'error404', component: ErrorscreenComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonconceptsRoutingModule { }
