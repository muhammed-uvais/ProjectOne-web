import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonconceptsRoutingModule } from './commonconcepts-routing.module';
import { CommonconceptsComponent } from './commonconcepts.component';
import { ErrorscreenComponent } from './errorscreen/errorscreen.component';


@NgModule({
  declarations: [
    CommonconceptsComponent,
    ErrorscreenComponent
  ],
  imports: [
    CommonModule,
    CommonconceptsRoutingModule
  ]
})
export class CommonconceptsModule { }
