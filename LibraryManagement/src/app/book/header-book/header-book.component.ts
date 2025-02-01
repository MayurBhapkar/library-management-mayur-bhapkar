import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from '../add-book/add-book.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailsBookComponent } from '../details-book/details-book.component';

@Component({
  selector: 'app-header-book',
  standalone: true,
  imports: [CommonModule,AddBookComponent,NgbNavModule,DetailsBookComponent],
  templateUrl: './header-book.component.html',
  styleUrls: ['./header-book.component.css']
})
export class HeaderBookComponent {
active = 1
}
