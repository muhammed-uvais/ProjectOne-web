import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginlayoutComponent } from './login/loginlayout/loginlayout.component';
import { AuthGuard } from './Core/Guards/auth.guard';


const routes: Routes = [
  { path: '',component:LoginlayoutComponent,
  children:[{path:'login',loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},]  },
              { path: '', redirectTo: 'login',pathMatch: 'full' },
              { path: 'hrms', loadChildren: () => import('./hrms/hrms.module').then(m => m.HrmsModule) },
              {
                path: '',
                redirectTo: '',
                pathMatch: 'full'
              },
  { path: 'commonconcepts', loadChildren: () => import('./commonconcepts/commonconcepts.module').then(m => m.CommonconceptsModule) },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
];






@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
