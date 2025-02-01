import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _Url=environment.apiUrl +"api/Book"
  constructor( private http: HttpClient) {}

  Add(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this._Url,data, { headers })
    .pipe(map(data=>data as any))
  }

  get() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(this._Url, { headers })
     .pipe(map(data=>data as any));
  }

  stockBook() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(this._Url + '/stock', { headers })
     .pipe(map(data=>data as any));
  }

  update(id: number,data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this._Url + '/update/' + id ,data, { headers })
     .pipe(map(data=>data as any));
  }


  delete(id:number)
  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this._Url+'/Delete/'+id ,{ headers })
    .pipe(map(data=>data as any));
  }



}
