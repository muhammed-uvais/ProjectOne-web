import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private url = environment.apiUrl + 'CompanyMaster';
  constructor(private http: HttpClient) { }
   //Default Company
   CreateDefaultCompany(cmpny: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.url + '/CreateDefaultCompany',cmpny, httpOptions);
  }

  GetDefaultCompany() : Observable<any>{
    return this.http.get<any>(this.url + '/GetDefaultCompany');
  }

  UploadToServer(formData: FormData): Observable<any>{
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.post<any>(this.url + '/UploadFile', formData, requestOptions)
  }
}
