import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('currentUser'))
       {
        // if(route.routeConfig != null){
        //   if(route.routeConfig.path == ""){
        //     //this.router.navigate(['/hrms/hrmdashboard'])
        //   }
        // }
        return true;
      }
      this.router.navigate(['/login/login'], { queryParams: { returnUrl: state.url } });
      return false;
  }

}
