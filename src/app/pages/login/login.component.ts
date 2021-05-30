import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators, FormBuilder  } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isChecked: any = false;
  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
     private authService:AuthService, private toastrService:ToastrService,
     private router: Router,) { }

  ngOnInit(): void {
    this.checkCheckBoxValue()
    this.createLoginForm();
  }

  checkCheckBoxValue(){
    console.log(this.isChecked)
  }

  createLoginForm(){

    this.loginForm = this.formBuilder.group({     
      email: [localStorage.getItem("email")?localStorage.getItem("email"):"",Validators.required],
      password:[localStorage.getItem("password")?localStorage.getItem("password"):"",Validators.required],
      rememberMe:[localStorage.getItem("email")?true:false]
    })

  }

  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{

        if(this.loginForm.value.rememberMe){       
          localStorage.setItem("email",this.loginForm.value.email)
          localStorage.setItem("password",this.loginForm.value.password)
          localStorage.setItem("token",response.data.token)
          localStorage.setItem("expiration",response.data.expiration)
          localStorage.setItem("userID",response.data.userID.toString())
        }
        this.toastrService.info(response.message)
        this.router.navigate(['']);
      },responseError=>{
        this.toastrService.error(responseError.error.message)
      })
    }
  }

}