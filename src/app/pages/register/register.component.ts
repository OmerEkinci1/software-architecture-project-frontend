import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/register/registerModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  registerForm: FormGroup;
  passwordHidden: boolean = true;

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      departmentTypeID: [, Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register(register : RegisterModel) {
    if (!this.registerForm.valid) return;
    let registerModel = Object.assign({}, this.registerForm.value);
    console.log(registerModel)
    this.authService.register(registerModel).subscribe((response) => {
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("expiration",response.data.expiration)
      localStorage.setItem("userID",response.data.userID.toString())
      this.toastrService.info(response.message);
      this.router.navigate(['']);
    },responseError=>{
      this.toastrService.error(responseError.error)
    });
  }

}
