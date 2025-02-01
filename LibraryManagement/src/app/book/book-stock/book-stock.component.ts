import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbNavModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { BookSearchService } from '../book-search.service';
import { Observable } from 'rxjs';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-stock',
  standalone: true,
  providers: [BookSearchService, DecimalPipe],
  imports: [CommonModule,FormsModule,NgbNavModule,NgbTypeaheadModule],
  templateUrl: './book-stock.component.html',
  styleUrls: ['./book-stock.component.css']
})
export class BookStockComponent {

  items$: Observable<any> | undefined;
  total$: Observable<number> | undefined;

  constructor(public SearchService: BookSearchService,
    private bookservice: BookService,
    private modalService: NgbModal
  ) {
    this.items$ = SearchService.items$;
    this.total$ = SearchService.total$;
    this.SearchService.getData();
  } 
  
  ngOnInit(): void {
    this.SearchService.getData()
  }
}
