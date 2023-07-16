import { ChangeDetectorRef, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, catchError, finalize, tap } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
@Injectable({providedIn: 'root'})
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService,){}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return next.handle(req).pipe(
      finalize(() => this.loaderService.hide()),
);
    // return next.handle(req).pipe(tap(evt => {
    //   if (evt instanceof HttpResponse){

    // }}))

  }
}
