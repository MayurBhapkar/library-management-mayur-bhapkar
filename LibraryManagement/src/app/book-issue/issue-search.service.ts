import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import { BookIssueService } from './book-issue.service';
import { Search } from '../utils/search';

@Injectable({
  providedIn: 'root'
})
export class IssueSearchService extends Search<any> {
  isLoading:boolean=true
  matches(searchObject: any, term: string, pipe: PipeTransform) {
    return searchObject.member.nm.toLowerCase().includes(term.toLowerCase())
    ||  searchObject.book.nm.toLowerCase().includes(term.toLowerCase())

  }

  constructor(pipe: DecimalPipe, private service: BookIssueService) {
    super(pipe)
  }

  //.filter((issue: any) => issue.isReturn === false)
  getData(data:any) {
   debugger
   if(data != undefined)
   {
    this.service.get(data).subscribe(
      res => {
        this.Data= res
        this.searchTerm = ""
      })
   }
    
  }
}
