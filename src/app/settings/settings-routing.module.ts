import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { TaxgroupComponent } from './taxgroup/taxgroup.component';
import { TaxgrouplistComponent } from './taxgrouplist/taxgrouplist.component';
import { CompanyComponent } from './company/company.component';

const routes: Routes = [{ path: '', component: SettingsComponent },
{ path: 'taxgroup', component: TaxgroupComponent },
{path:'taxgrouplist' ,component:TaxgrouplistComponent},
{path : 'company',component : CompanyComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
