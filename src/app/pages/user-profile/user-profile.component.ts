import { Component, OnInit, TemplateRef } from '@angular/core';
import {FormGroup,FormControl, Validators, FormBuilder  } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/users/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  users: User
  dataLoaded = false

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUsersByID();
  }

  userUpdateForm : FormGroup
  modalRef : BsModalRef

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  createUserUpdateForm(){
    this.userUpdateForm = this.formBuilder.group({
      Name:[this.users["name"], Validators.required],
      Surname:[this.users["surname"], Validators.required],
      Email:[this.users["email"],Validators.required],
      Password:["",Validators.required],
    })
  }

  getUsersByID(){
    let UserID = Number(localStorage.getItem("userID"))
    this.userService.get(UserID).subscribe((response) => {     
      this.users = response.data
      this.createUserUpdateForm()      
      this.dataLoaded = true
    })
  }

  updateUser(){
    if(this.userUpdateForm.valid){
      let userModel = Object.assign({}, this.userUpdateForm.value);
      userModel.userID = Number(localStorage.getItem("userID"));
      this.userService.update(userModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.router.navigate(['']);
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let index = 0; index < responseError.error.Errors.length; index++){
            this.toastrService.error(responseError.error.Errors[index].ErrorMessage, "Verification Error");
          }
        }       
      })
    } else {
      this.toastrService.error("Your form is missing", "Warning");
    }
  }

  deleteUser(){
    let user = this.users;
    localStorage.removeItem("token")
    localStorage.removeItem("expiration")
    localStorage.removeItem("userID")
    localStorage.removeItem("email")
    localStorage.removeItem("password")
    this.userService.delete(user).subscribe((response => {
      this.toastrService.success(response.message);
      this.router.navigate(['login']);
    }),errorResponse=>{
      if (errorResponse.error.error.length>0){
        for(let i=0; i < errorResponse.error.error.length; i++){
          this.toastrService.error(errorResponse.error.error[i].ErrorMessage,"Verification Error");
        }
      }
    })
  }

}
