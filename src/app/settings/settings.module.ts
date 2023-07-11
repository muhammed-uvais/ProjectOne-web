import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { TaxgroupComponent } from './taxgroup/taxgroup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { TaxgrouplistComponent } from './taxgrouplist/taxgrouplist.component';

import { MatTooltipModule } from '@angular/material/tooltip';
import { CompanyComponent } from './company/company.component';

@NgModule({
  declarations: [
    SettingsComponent,
    TaxgroupComponent,
    TaxgrouplistComponent,
    CompanyComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule
  ]
})
export class SettingsModule { }
