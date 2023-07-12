import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrmsRoutingModule } from './hrms-routing.module';
import { HrmsComponent } from './hrms.component';
import { RouterModule } from '@angular/router';
import { HrmsuserdashboardComponent } from './hrmsuserdashboard/hrmsuserdashboard.component';
import { CreateinvoiceComponent } from './createinvoice/createinvoice.component';
import { InvoiceentryComponent } from './invoiceentry/invoiceentry.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HrmsComponent,
    HrmsuserdashboardComponent,
    CreateinvoiceComponent,
    InvoiceentryComponent
  ],
  imports: [

    HrmsRoutingModule,
    MatExpansionModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class HrmsModule { }
