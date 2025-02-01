
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookIssueService {

  private _Url=environment.apiUrl +"api/BookIssue"
    constructor( private http: HttpClient) {}
  
    Add(data: any): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post(this._Url,data, { headers })
      .pipe(map(data=>data as any))
    }
  
    get(data:any) {
      debugger
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post<any>(this._Url + '/betweendt', data)
       .pipe(map(data=>data as any));
    }


    getcount() {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.get<any>(this._Url + '/getcount')
       .pipe(map(data=>data as any));
    }

    update(id: number,data: any): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post<any>(this._Url + '/update/' + id ,data, { headers })
       .pipe(map(data=>data as any));
    }

    bookReturn(id: number): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post<any>(this._Url + '/isReturn/' + id , { headers })
       .pipe(map(data=>data as any));
    }

    delete(id:number)
    {
       const headers = new HttpHeaders().set('Content-Type', 'application/json');
       return this.http.post<any>(this._Url+'/Delete/'+id ,{ headers })
       .pipe(map(data=>data as any));
    }



}
