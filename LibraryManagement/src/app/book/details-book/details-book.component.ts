import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { BookService } from '../book.service';
import { ModalDismissReasons, NgbModal, NgbNavModule, NgbTooltip, NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { AddBookComponent } from '../add-book/add-book.component';
import Swal from 'sweetalert2';
import { BookSearchService } from '../book-search.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details-book',
  standalone: true,
   providers: [BookSearchService, DecimalPipe],
  imports: [CommonModule,NgbNavModule,AddBookComponent,NgbTooltip,FormsModule,NgbTypeaheadModule],
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.css']
})
export class DetailsBookComponent {

  book: any[] = []

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

  // getBookData() {
  //   this.bookservice.get().subscribe((res: any) => {
  //     this.book = res
  //   })
 // }

  closeResult=''
  bookdata:any
  Edit(data:any,update:any){
   
    this.bookdata = data
  
      this.modalService.open(update, { ariaLabelledBy: 'modal-basic-title', size: 'lg', scrollable: true }).result.then(
        (result) => {

        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.SearchService.getData()
        },
      );
    }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }


    delete(id:number)
    {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookservice.delete(id).subscribe(
          (res:any)=>{
            Swal.fire({
              title: 'Record Deleted Sucessfully.',
              icon: 'success',
              timer: 3000,
              draggable: false,
            });
            this.SearchService.getData()
          }
        )
      }
    });
  }
}
