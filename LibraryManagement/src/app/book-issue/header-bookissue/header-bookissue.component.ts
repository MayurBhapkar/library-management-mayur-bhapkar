import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddIssueComponent } from '../add-issue/add-issue.component';

@Component({
  selector: 'app-header-bookissue',
  standalone: true,
  imports: [CommonModule,AddIssueComponent],
  templateUrl: './header-bookissue.component.html',
  styleUrls: ['./header-bookissue.component.css']
})
export class HeaderBookissueComponent {

}
