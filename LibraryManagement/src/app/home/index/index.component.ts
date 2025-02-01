import { Component, OnInit } from '@angular/core';
import { BookIssueService } from 'src/app/book-issue/book-issue.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
 

  
  constructor(private bookissue:BookIssueService) {
    
    
  }
  count=0
  returnCount=0
  ngOnInit(): void {
  this.bookissue.getcount().subscribe(res=>{this.count=res.count, this.returnCount=res.returncount})
 
  }
  

}
