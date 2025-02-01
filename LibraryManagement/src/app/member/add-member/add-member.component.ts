import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberService } from '../member.service';
import { NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import Utils from 'src/app/utils/Utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-member',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,NgbNavModule],
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent {
_frmGroup: FormGroup;
@Input() data:any
 
  constructor(private formBuilder:FormBuilder, 
    private service : MemberService,
    private modalService: NgbModal
  ) {
    this._frmGroup = this.formBuilder.group({ 
     id:[null],
     nm: [null, [Validators.required,Validators.maxLength(30),Validators.minLength(2)]],
     address : [null,[Validators.required,Validators.maxLength(30)]]  ,
     mobile : [null, [Validators.required,Validators.pattern("^[0-9]*$")]],
     email : [ null,[Validators.required]],
     admissionDate : [ Utils.formatFormDate(new Date()),[Validators.required]],
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
        address:this.data.address,
        mobile : this.data.mobile,
        email : this.data.email,
        admissionDate :Utils.formatFormDate(this.data.admissionDate) ,
      })
    }

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
   else{
    this.service.update(this._frmGroup.value.id, this._frmGroup.value).subscribe({
      next: (res: any) => {
        console.log(res) 
        Swal.fire({
          title: 'Record Update Sucessfully.',
          icon: 'success',
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
