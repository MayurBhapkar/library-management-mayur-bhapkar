import { Injectable, PipeTransform } from '@angular/core';
import { Search } from '../utils/search';
import { DecimalPipe } from '@angular/common';
import { BookService } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class BookSearchService extends Search<any> {
  isLoading:boolean=true
  matches(searchObject: any, term: string, pipe: PipeTransform) {
    return searchObject.nm.toLowerCase().includes(term.toLowerCase())

  }

  constructor(pipe: DecimalPipe, private service: BookService) {
    super(pipe)
  }

  getData() {
   debugger
    this.service.get().subscribe(
      res => {
        this.Data= res
        this.searchTerm = ""
      })
  }
}
