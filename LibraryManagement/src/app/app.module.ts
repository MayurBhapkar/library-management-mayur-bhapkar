import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './home/index/index.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReturnBookComponent } from './book-issue/return-book/return-book.component';
import { BookStockComponent } from './book/book-stock/book-stock.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IndexComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    ReturnBookComponent,
    BookStockComponent
    
  ],
  providers: [],
  bootstrap: [LoginComponent]
})
export class AppModule { }
