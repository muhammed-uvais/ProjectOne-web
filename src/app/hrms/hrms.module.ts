import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrmsRoutingModule } from './hrms-routing.module';
import { HrmsComponent } from './hrms.component';
import { RouterModule } from '@angular/router';
import { HrmsuserdashboardComponent } from './hrmsuserdashboard/hrmsuserdashboard.component';
import { CreateinvoiceComponent } from './createinvoice/createinvoice.component';
import { InvoiceentryComponent } from './invoiceentry/invoiceentry.component';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    HrmsComponent,
    HrmsuserdashboardComponent,
    CreateinvoiceComponent,
    InvoiceentryComponent
  ],
  imports: [

    HrmsRoutingModule,
    MatExpansionModule
  ]
})
export class HrmsModule { }
