import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path:'header',
    loadComponent:()=> import('./header-book/header-book.component').then(c=>c.HeaderBookComponent)
  },
 
  {
    path:'add',
    loadComponent:()=> import('./add-book/add-book.component').then(c=>c.AddBookComponent)
  },
  {
    path:'details',
    loadComponent:()=> import('./details-book/details-book.component').then(c=>c.DetailsBookComponent)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
