import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,NgbModule],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  _frmGroup: FormGroup;
 

  @Input() data:any


  constructor(private formBuilder:FormBuilder, 
    private service : BookService,
    private modalService: NgbModal
  ) {
    this._frmGroup = this.formBuilder.group({ 
     id:[null],
     nm: [null, [Validators.required,Validators.maxLength(30),Validators.minLength(2)]],
     author : [null,[Validators.required,Validators.maxLength(30)]]  ,
     publication : [null, [Validators.required,Validators.maxLength(30)]],
     year : [ null,[Validators.required]],
     category : [ null,[Validators.required]],
     stock : [ null,[Validators.required]],
    });
  }

  id = 0
  ngOnInit(): void {
    console.log(this.data,'data')
    if( typeof this.data != "undefined")
    {
      this.id = this.data.id
      this._frmGroup.patchValue({
        id:this.data.id,
        nm:this.data.nm,
        author:this.data.author,
        publication : this.data.publication,
        year : this.data.year,
        category : this.data.category,
        stock : this.data.stock,
      })
    }

  }

  // OnSubmit() {
  //   console.log(this._frmGroup.value)

  //   this.service.Add(this._frmGroup.value)
  //     .subscribe({
  //       next: (res: any) => {
  //         console.log(res) 
  //         alert('Book Save')
  //         this._frmGroup.reset()    
  //       },
  //       error: err => {
  //         console.log(err);
  //       }
  //     });
  // }

  serverErrors: string[] = []
  OnSubmit() {
    if( typeof this.data == "undefined")
    {
      this.service.Add(this._frmGroup.value)
       .subscribe({
        next: (res: any) => {
          console.log(res) 
          Swal.fire({
            title: "Record Save Sucessfully.",
            icon: "success",
            draggable: true,
            timer: 3000,
          });
         // alert('Book Save')
          this._frmGroup.reset()        
          this.modalService.dismissAll('Click');
        },
        error: err => {
          console.log(err);
        }
      });
    }
   else{
    this.service.update(this._frmGroup.value.id, this._frmGroup.value).subscribe({
      next: (res: any) => {
        console.log(res) 
        Swal.fire({
          title: "Record Update Sucessfully.",
          icon: "success",
          draggable: true,
          timer: 3000,
        });
        this._frmGroup.reset()   
       this.modalService.dismissAll('Click');
      },
      error: err => {
        console.log(err);
        this.serverErrors = err.error.serverErrors.errors
      }
    })
   }
  }

  get f() {return this._frmGroup.controls; }
}
