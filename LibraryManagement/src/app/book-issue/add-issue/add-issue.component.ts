import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookIssueService } from '../book-issue.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { MemberService } from 'src/app/member/member.service';
import { BookService } from 'src/app/book/book.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Utils from 'src/app/utils/Utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-issue',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,NgSelectModule],
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.css']
})
export class AddIssueComponent implements OnInit {
_frmGroup: FormGroup;

@Input() data:any

 member:any[]=[]
 memberAllList:any[]=[]

 book:any[]=[]
 bookAllList:any[]=[]

  
  constructor(private formBuilder:FormBuilder, 
    private service : BookIssueService,
    private memberService:MemberService,
   private bookService:BookService ,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef
  ) {
    this._frmGroup = this.formBuilder.group({ 
     id: [null],
     memberId: [null, [Validators.required]],
     bookId : [null,[Validators.required]],
     date : [Utils.formatFormDate(new Date()), [Validators.required]],
     duedate : [ null,[Validators.required]],
     remark: [null, [Validators.maxLength(100),Validators.minLength(2)]],
     returnDate : [null]
    });
  }
 

  id=0
  ngOnInit(): void{

    this.loadMemberData()
    this.loadBookData()
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

 serverErrors: string[] = []
  OnSubmit() {
    if( typeof this.data == "undefined")
    {
      this.service.Add(this._frmGroup.value)
       .subscribe({
        next: (res: any) => {
          console.log(res) 
         Swal.fire({
           title: 'Record Save Sucessfully.',
           icon: 'success',
           draggable: true,
           timer: 3000,
         });
          this._frmGroup.reset()        
          this.modalService.dismissAll('Click');
        },
        error: err => {
          console.log(err);
        }
      });
    }
  
  }

  get f() {return this._frmGroup.controls; }
}
