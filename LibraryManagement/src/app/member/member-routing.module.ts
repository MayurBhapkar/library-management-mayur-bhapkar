import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'add',
    loadComponent:()=> import('./add-member/add-member.component').then(c=>c.AddMemberComponent)
  },
  {
    path:'header',
    loadComponent:()=> import('./header-member/header-member.component').then(c=>c.HeaderMemberComponent)
  },
  {
    path:'details',
    loadComponent:()=> import('./details-member/details-member.component').then(c=>c.DetailsMemberComponent)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
