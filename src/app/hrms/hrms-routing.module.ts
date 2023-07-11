import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrmsComponent } from './hrms.component';
import { HrmsuserdashboardComponent } from './hrmsuserdashboard/hrmsuserdashboard.component';
import { AuthGuard } from '../Core/Guards/auth.guard';
import { CreateinvoiceComponent } from './createinvoice/createinvoice.component';
import { InvoiceentryComponent } from './invoiceentry/invoiceentry.component';

const routes: Routes = [
  { path: 'invoice', component: CreateinvoiceComponent },
  {path : 'invoicecreate' , component : InvoiceentryComponent},
{path:'hrmdashboard', component:HrmsuserdashboardComponent,canActivate: [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrmsRoutingModule { }
