import { DecimalPipe } from "@angular/common";
import { PipeTransform } from "@angular/core";


import { BehaviorSubject,  Observable,  of,  Subject } from "rxjs";
import { debounceTime, delay, switchMap, tap } from "rxjs/operators";


interface SearchResult<T> {
    result: T[];
    total: number;
  }

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
   
  }

export abstract  class Search<T> {

    public Data:T[]=[];
    private _loading$ = new BehaviorSubject<boolean>(true);
    // private _search$ = new Subject<void>();
    private _search$ = new Subject<void>();
    private _items$ = new BehaviorSubject<T[]>([]);
    private _total$ = new BehaviorSubject<number>(0);
  
    private _state: State = {
      page: 1,
      pageSize: 25,
      searchTerm: '',
     
      
    };
  
    
    get items$() { return this._items$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }
  
    set page(page: number) { this._set({page}); }
    set pageSize(pageSize: number) { this._set({pageSize}); }
    set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  
    abstract  matches(searchObject: T, term: string, pipe: PipeTransform):any
  
    private _set(patch: Partial<State>) {
      Object.assign(this._state, patch);
      this._search$.next();
    }
constructor(private pipe: DecimalPipe){
    this._search$.pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      ).subscribe(res => {
        this._items$.next(res.result);
        this._total$.next(res.total);
      });
      this._search$.next();

}
    private _search(): Observable<SearchResult<T>> {
        const { pageSize, page, searchTerm} = this._state;
      
        // 1. sort
        let customer =this.Data;
        
         
        // 1. sort
        //let countries = sort(COUNTRIES, sortColumn, sortDirection);

      console.warn(customer);
      console.warn(searchTerm);
      console.warn(this.pipe);
        // 2. filter
        customer =  customer.filter(customer => this.matches(customer, searchTerm, this.pipe));
        const total =  customer.length;
      
        // 3. paginate
        customer =  customer.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({result:customer, total});
        
      }
}
