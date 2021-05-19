import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private FormBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.createLoginForm();
  }
  
  createLoginForm(){
    this.loginForm = this.FormBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({}, this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message)
        localStorage.setItem("token",response.data.token)
      }, responseError=>{
        this.toastrService.error(responseError.console.error)
      })
    }
  }

}
