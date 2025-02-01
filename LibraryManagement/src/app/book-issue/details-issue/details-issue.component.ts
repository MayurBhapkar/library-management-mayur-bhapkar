import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { BookIssueService } from '../book-issue.service';
import { AddIssueComponent } from '../add-issue/add-issue.component';
import { ModalDismissReasons,  NgbModal, NgbNavModule,  NgbTooltip, NgbTypeaheadModule,} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,  FormGroup, FormsModule,  ReactiveFormsModule,  Validators,} from '@angular/forms';
import Utils from 'src/app/utils/Utils';
import Swal from 'sweetalert2';
import { IssueSearchService } from '../issue-search.service';
import { Observable } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { BookService } from 'src/app/book/book.service';
import { MemberService } from 'src/app/member/member.service';

@Component({
  selector: 'app-details-issue',
  standalone: true,
  providers: [IssueSearchService, DecimalPipe],
  imports: [CommonModule, NgbNavModule, ReactiveFormsModule,NgSelectModule ,FormsModule, NgbTypeaheadModule, NgbTooltip,],
  templateUrl: './details-issue.component.html',
  styleUrls: ['./details-issue.component.css'],
})
export class DetailsIssueComponent {
  bookIssue: any[] = [];

  member:any[]=[]
  memberAllList:any[]=[]
 
  book:any[]=[]
  bookAllList:any[]=[]

  _frmGroupBetweenDate: FormGroup;
 
  items$: Observable<any> | undefined;
  total$: Observable<number> | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private bookIssueservice: BookIssueService,
    private modalService: NgbModal,
    public SearchService: IssueSearchService,
     private memberService:MemberService,
       private bookService:BookService ,
       private service : BookIssueService,
    
  ) {
    this._frmGroupBetweenDate = this.formBuilder.group({
      startdt: [Utils.addMinusOneMonthFromDate(new Date()),[Validators.required],],
      enddt: [Utils.formatFormDate(new Date()), [Validators.required]],
    });

    this.items$ = SearchService.items$;
    this.total$ = SearchService.total$;
    this.SearchService.getData(this.payload);
  }

  ngOnInit(): void {
    this.getBookIssueData();
    this.loadMemberData()
    this.loadBookData()
  }

  payload: any;
  getBookIssueData() {
    this.payload = {
      startdt: this._frmGroupBetweenDate.value.startdt,
      enddt: this._frmGroupBetweenDate.value.enddt,
    };
    this.SearchService.getData(this.payload);
  }


  Edit(item:any) {
    item.isEditing = true;
  }


  loadMemberData()
  {
  this.memberService.get().subscribe(
    (res:any)=>{
      this.memberAllList =  res
      this.member= this.memberAllList.map((x:any)=>{
    return   {id:x.id,name:x.nm} 
      })
     

    }
  )
 }

 loadBookData()
 {
  this.bookService.get().subscribe(
    (res:any)=>{
      this.bookAllList =  res
      debugger
      this.book= this.bookAllList.map((x:any)=>{
         return   {id:x.id,name:x.nm} 
      })
    
    
    }
  )
 }
 

  delete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookIssueservice.delete(id).subscribe((res: any) => {
          Swal.fire({
            title: 'Record Deleted Sucessfully.',
            icon: 'success',
            timer: 3000,
            draggable: false,
          });
          this.getBookIssueData();
        });
      }
    });
  }

  
 save(item:any) {
    this.service.update(item.id, item).subscribe({
      next: (res: any) => {
        console.log(res) 
        Swal.fire({
          title: 'Record Update Sucessfully.',
          icon: 'success',
          draggable: true,
          timer: 3000,
        }); 
        item.isEditing = false;
      },
      error: err => {
        console.log(err);
      }
    })
 
}

cancel(item:any) {
  item.isEditing = false;
}


  get getControlsBetweenDate() {
    return this._frmGroupBetweenDate.controls;
  }
}
