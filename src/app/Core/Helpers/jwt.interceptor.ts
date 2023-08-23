import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUserString = localStorage.getItem('currentUser');
        const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request).pipe(catchError((error : any) => {

           if(error instanceof HttpErrorResponse){
            if (error.status === 401) {
              localStorage.removeItem('currentUser');

            }else {
            console.error('HTTP Error:', error);
          }

           }
          return throwError(error)
        })


        )
    }
}
