import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMemberComponent } from '../add-member/add-member.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailsMemberComponent } from '../details-member/details-member.component';
import { DetailsBookComponent } from "../../book/details-book/details-book.component";

@Component({
  selector: 'app-header-member',
  standalone: true,
  imports: [CommonModule, AddMemberComponent, NgbNavModule, DetailsMemberComponent],
  templateUrl: './header-member.component.html',
  styleUrls: ['./header-member.component.css']
})
export class HeaderMemberComponent {
active = 1
}
