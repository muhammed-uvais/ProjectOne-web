import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaxgroupService {
  private url = environment.apiUrl + 'TaxGroup';
  constructor(private http: HttpClient) { }
  Create(master: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.http.post<any>(this.url + '/CreateTaxGroup', master, httpOptions)
  }
  GetAll1():Promise<any> {
    return this.http.get<any[]>(this.url + '/GetTaxGroup').toPromise()
  }
  GetAll():Observable<any[]> {
    return this.http.get<any[]>(this.url + '/GetTaxGroup')
  }
  GetById(id: string): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    let params = new HttpParams()
    params = params.append('id', id)
    return this.http.get<any>(this.url + '/GetTaxGroupById', {params})
  }
  DeleteByID(id : string){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    let params = new HttpParams()
    params = params.append('id', id)
    return this.http.get<any>(this.url + '/DeleteByID', {params})
  }
  GetAllPromsie(){
    return new Promise((resolve, reject) => {
      try {
        let apiUrl = `${this.url}/GetTaxGroup`;
        this.http.get(apiUrl).toPromise().then(res =>
          {

            console.log(res);
            resolve(res);

          },

          msg => { // Error
            reject(msg);
          }
          )
      } catch (error) {
        return error
      }

    });
  }


}
