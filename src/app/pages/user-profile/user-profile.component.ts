import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/users/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  users: User[] = []
  dataLoaded = false

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  userUpdateForm : FormGroup

  createUserUpdateForm(){
    this.userUpdateForm = this.formBuilder.group({
      DepartmentTypeID:['', Validators.required],
      Name:['', Validators.required],
      Surname:['', Validators.required],
      Email:['',Validators.required],
      Password:['',Validators.required],
    })
  }

  getUsersByID(UserID:number){
    this.userService.get(UserID).subscribe((response) => {
      this.users = response.data
      this.dataLoaded = true
    })
  }

  updateUser(){
    if(this.userUpdateForm.valid){
      let userModel = Object.assign({}, this.userUpdateForm.value);
      this.userService.update(userModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
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

  deleteUser(user:User){
    this.userService.delete(user).subscribe((response => {
      this.toastrService.success(response.message);
    }),errorResponse=>{
      if (errorResponse.error.error.length>0){
        for(let i=0; i < errorResponse.error.error.length; i++){
          this.toastrService.error(errorResponse.error.error[i].ErrorMessage,"Verification Error");
        }
      }
    })
  }

}
