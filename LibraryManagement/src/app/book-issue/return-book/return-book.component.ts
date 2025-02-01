import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';
import Utils from 'src/app/utils/Utils';
import Swal from 'sweetalert2';
import { BookIssueService } from '../book-issue.service';

@Component({
  selector: 'app-return-book',
  standalone: true,
  imports: [CommonModule, NgbNavModule, ReactiveFormsModule],
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.css'],
})
export class ReturnBookComponent {
  bookIssue: any[] = [];
  _frmGroupBetweenDate: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bookIssueservice: BookIssueService,
    private modalService: NgbModal
  ) {
    this._frmGroupBetweenDate = this.formBuilder.group({
      startdt: [Utils.addMinusOneMonthFromDate(new Date()),[Validators.required]],
      enddt: [Utils.formatFormDate(new Date()), [Validators.required]],
    });
  }


  count:any[]=[]
  returnCount:any[]=[]
  ngOnInit(): void {
    this.getBookIssueData();
  }

  payload: any;
  getBookIssueData() {
    this.payload = {
      startdt: this._frmGroupBetweenDate.value.startdt,
      enddt: this._frmGroupBetweenDate.value.enddt,
    };
debugger
    this.bookIssueservice.get(this.payload).subscribe((res: any) => {
      console.log(res+"res")
      this.bookIssue = res.filter((issue: any) => issue.isReturn === false);
      
      this.count=(res.filter((issue: any) => Utils.formatFormDate(issue.date) === Utils.formatFormDate(new Date())));
      this.returnCount=(res.filter((issue: any) => issue.isReturn === true && Utils.formatFormDate(issue.returnDate) === Utils.formatFormDate(new Date())));
    });
  }
  isReturn(item: any): void {
    debugger;
    console.log(item);

    let massage = item.isReturn == 'YES' ? 'Pending' : 'Return';

    Swal.fire({
      title: 'Are you sure?',
      text: 'Can you want to ' + massage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookIssueservice.bookReturn(item.id).subscribe((res: any) => {
          this.getBookIssueData();
        });
      }
    });
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

  get getControlsBetweenDate() {
    return this._frmGroupBetweenDate.controls;
  }
}
