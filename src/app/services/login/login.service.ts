import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment.apiUrl + 'UserLogin';
  private url1 = environment.apiUrl + 'UserMaster';
  constructor(private http: HttpClient) { }
  CheckAuthentication(usrdata:any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.url + '/CheckLogin',
    usrdata, httpOptions);
  }
  GetById(Id : number) : Observable<any>{
    let params = new HttpParams();
    params = params.append('Id', Id);
    return this.http.get<any>(this.url1+'/GetById',{params});

  }
}
