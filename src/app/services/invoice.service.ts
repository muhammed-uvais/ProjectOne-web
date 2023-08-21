import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
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
  GetAll(FromDate :string , ToDate : string): Observable<any[]> {
    let params = new HttpParams()
  params = params.append('FromDate', FromDate)
  params = params.append('ToDate', ToDate)
    return this.http.get<any[]>(this.url + '/GetAll' , {params})
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
GetPdf(Id: any): Observable<Blob> {
  let params = new HttpParams();
  params = params.append('InvoiceNo', Id);

  const httpOptions = {
    headers: new HttpHeaders({ 'Accept': 'application/pdf' }),
    responseType: 'blob' as 'json',
  };

  // Send a GET request to the server with the query parameter and response type options
  return this.http.get<Blob>(this.url + '/generatepdf', { params, ...httpOptions })
    .pipe(
      catchError((error: any) => {
        console.error('Error fetching PDF:', error);
        throw error; // Rethrow the error to be caught by the subscriber
      })
    );
}
GetCustomerSearchByName(customerName: string): Observable<any> {
  let params = new HttpParams()
  params = params.append('customerName', customerName)
  return this.http.get<any>(this.url + '/CustomerSearchByName', {params})
}
}
