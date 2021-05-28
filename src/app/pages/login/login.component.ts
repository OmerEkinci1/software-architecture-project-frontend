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
      email: ["",Validators.required],
      password:["",Validators.required],
      rememberMe:[""]
    })
  }

  login(){
    console.log("giremedi")
    if(this.loginForm.valid){
      let loginModel = Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message)
        console.log("naber")
        if(this.isChecked){    
          console.log("girdi")    
          console.log(this.isChecked)
          localStorage.setItem("token",response.data.token)
          localStorage.setItem("expiration",response.data.expiration)
          localStorage.setItem("userID",response.data.userID.toString())
        }
        this.router.navigate(['']);
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
  }

}