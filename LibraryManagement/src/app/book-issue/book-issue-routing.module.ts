import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'add',
    loadComponent:()=> import('./add-issue/add-issue.component').then(c=>c.AddIssueComponent)
  },
  {
    path:'header',
    loadComponent:()=> import('./header-bookissue/header-bookissue.component').then(c=>c.HeaderBookissueComponent)
  },
  {
    path:'details',
    loadComponent:()=> import('./details-issue/details-issue.component').then(c=>c.DetailsIssueComponent)
  },
  {
    path:'returnDetails',
    loadComponent:()=> import('./return-book/return-book.component').then(c=>c.ReturnBookComponent)
  },
  {
    path:'returnBookDetails',
    loadComponent:()=> import('./return-book-details/return-book-details.component').then(c=>c.ReturnBookDetailsComponent)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookIssueRoutingModule { }
