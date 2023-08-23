import { ChangeDetectorRef, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, catchError, finalize, tap } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
@Injectable({providedIn: 'root'})
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService,){}
  private excludedUrls: string[] = [
    '/api/Invoice/CustomerSearchByName', //autocomplete in invoice
  ];

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.isExcludedUrl(req.url)) {
      // Pass the request through without intercepting
      return next.handle(req);
    }
    this.loaderService.show();
    return next.handle(req).pipe(
      finalize(() => this.loaderService.hide()),
);
    // return next.handle(req).pipe(tap(evt => {
    //   if (evt instanceof HttpResponse){

    // }}))

  }
  private isExcludedUrl(url: string): boolean {
    return this.excludedUrls.some(excludedUrl => url.includes(excludedUrl));
  }
}
