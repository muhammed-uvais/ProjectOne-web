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
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    HrmsComponent,
    HrmsuserdashboardComponent,
    CreateinvoiceComponent,
    InvoiceentryComponent
  ],
  imports: [
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
    HrmsRoutingModule,
    MatExpansionModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatCheckboxModule,
    MatAutocompleteModule,

  ]
})
export class HrmsModule { }
