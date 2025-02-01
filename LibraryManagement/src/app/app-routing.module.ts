import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './home/index/index.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path : '', component:LoginComponent},
  
  {path: 'home', component:HomeComponent,
    children:[
      {
        path: 'index', component:IndexComponent
      },
      {
        path: 'book', loadChildren: () => import('./book/book-routing.module').then(e => e.BookRoutingModule)
      }, 
      {
        path: 'member', loadChildren: () => import('./member/member-routing.module').then(e => e.MemberRoutingModule)
      }, 
      {
        path: 'book-issue', loadChildren: () => import('./book-issue/book-issue-routing.module').then(e => e.BookIssueRoutingModule)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
