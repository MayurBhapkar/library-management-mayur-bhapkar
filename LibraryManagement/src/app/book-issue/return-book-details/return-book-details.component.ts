import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { BookIssueService } from '../book-issue.service';
import Utils from 'src/app/utils/Utils';
import { IssueSearchService } from '../issue-search.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-return-book-details',
  standalone: true,
  providers: [IssueSearchService, DecimalPipe],
  imports: [CommonModule,FormsModule,NgbTypeaheadModule,ReactiveFormsModule],
  templateUrl: './return-book-details.component.html',
  styleUrls: ['./return-book-details.component.css']
})
export class ReturnBookDetailsComponent {
bookIssue: any[] = [];
  _frmGroupBetweenDate: FormGroup;

  items$: Observable<any> | undefined;
    total$: Observable<number> | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private bookIssueservice: BookIssueService,
    private modalService: NgbModal,
    public SearchService: IssueSearchService
  ) {
    this._frmGroupBetweenDate = this.formBuilder.group({
      startdt: [Utils.addMinusOneMonthFromDate(new Date()),[Validators.required]],
      enddt: [Utils.formatFormDate(new Date()), [Validators.required]],
    });

    this.items$ = SearchService.items$;
    this.total$ = SearchService.total$;
    this.SearchService.getData(this.payload);
  }

  ngOnInit(): void {
    this.getBookIssueData();
  }

  payload: any;
  getBookIssueData() {
    this.payload = {
      startdt: this._frmGroupBetweenDate.value.startdt,
      enddt: this._frmGroupBetweenDate.value.enddt,
    };

    this.SearchService.getData(this.payload);
  }
 
  get getControlsBetweenDate() {
    return this._frmGroupBetweenDate.controls;
  }
}

