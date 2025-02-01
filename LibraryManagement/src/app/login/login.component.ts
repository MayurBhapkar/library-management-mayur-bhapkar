import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'body',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
 
  title = '';
  islogin=false


  _loginForm: UntypedFormGroup;
  constructor(private formBuilder: UntypedFormBuilder, private _router: Router) {
    this._loginForm = this.formBuilder.group({
      uname: ['Mayur', [Validators.required,Validators.maxLength(5),Validators.minLength(2)]],
      upassword: ['0808', [Validators.required]]
  
    })
    
  }
  login(){
    this.islogin=true
    localStorage.setItem('islogin', this.islogin? 'Y' : 'N');
    this._router.navigate(['/home/index']);
  }
  

  get f() {return this._loginForm.controls; }
}
