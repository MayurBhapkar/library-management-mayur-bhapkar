import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberService } from '../member.service';
import { ModalDismissReasons, NgbModal, NgbNavModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { AddMemberComponent } from '../add-member/add-member.component';

@Component({
  selector: 'app-details-member',
  standalone: true,
  imports: [CommonModule,NgbNavModule,AddMemberComponent,NgbTooltip],
  templateUrl: './details-member.component.html',
  styleUrls: ['./details-member.component.css']
})
export class DetailsMemberComponent {
member: any[] = []

  constructor(
    private memberservice: MemberService,
    private modalService: NgbModal
  ) {

  } 
  
  ngOnInit(): void {
    this.getMemberData()
  }

  getMemberData() {
    this.memberservice.get().subscribe((res: any) => {
      this.member = res
    })
  }

  closeResult=''
    memberdata:any
    Edit(data:any,update:any){
     
      this.memberdata = data
    
        this.modalService.open(update, { ariaLabelledBy: 'modal-basic-title', size: 'lg', scrollable: true }).result.then(
          (result) => {
  
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
           this.getMemberData()
          },
        );
      }
    
      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return `with: ${reason}`;
        }
      }
}
