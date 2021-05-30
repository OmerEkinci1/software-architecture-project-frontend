import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentType } from 'src/app/models/departmentTypes/departmentType';
import { RegisterModel } from 'src/app/models/register/registerModel';
import { AuthService } from 'src/app/services/auth.service';
import { DepartmentTypeService } from 'src/app/services/department-type.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  departmentType : DepartmentType[] = []

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private departmentTypeService: DepartmentTypeService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private matselect : MatSelectModule,

  ) { }

  ngOnInit() {
    this.getDepartmentTypeNames()
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

  getDepartmentTypeNames(){
    this.departmentTypeService.getAll().subscribe((response) => {
      this.departmentType = response.data
      console.log(response.data)
    })
  }

  register() {
    console.log(this.registerForm.value)
    if (!this.registerForm.valid) return;
    this.registerForm.value.departmentTypeID = Number(this.registerForm.value.departmentTypeID)
    let registerModel = Object.assign({}, this.registerForm.value);
    console.log(registerModel)
    this.authService.register(registerModel).subscribe((response) => {
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("expiration",response.data.expiration)
      localStorage.setItem("userID",response.data.userID.toString())      
      this.toastrService.info(response.message);
      this.router.navigate(['']);
    },responseError=>{
      this.toastrService.error(responseError.error.message)
    });
  }

}
