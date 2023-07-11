import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(){}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(tap(evt => {
      if (evt instanceof HttpResponse){

    }}))

  }
}
