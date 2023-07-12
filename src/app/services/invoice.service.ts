import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private url = environment.apiUrl + 'Invoice';
  constructor(private http: HttpClient) { }
  Create(master: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.http.post<any>(this.url + '/CreateInvoice', master, httpOptions)
  }
  GetAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/GetAll')
}

GetById(id: string): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
  let params = new HttpParams()
  params = params.append('id', id)
  return this.http.get<any>(this.url + '/GetById', {params})
}
Delete(master: any[]): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
  return this.http.post<any[]>(this.url + '/DeleteInvoice', master, httpOptions)
}
}
