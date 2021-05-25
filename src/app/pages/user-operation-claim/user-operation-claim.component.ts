import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserOperationClaim } from 'src/app/models/userOperationClaims/userOperationClaim';
import { UserOperationClaimDto } from 'src/app/models/userOperationClaims/userOperationClaimDto';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';

@Component({
  selector: 'app-user-operation-claim',
  templateUrl: './user-operation-claim.component.html',
  styleUrls: ['./user-operation-claim.component.css']
})
export class UserOperationClaimComponent implements OnInit {

  userOperationClaims : UserOperationClaim[] = []
  userOperationClaimDto : UserOperationClaimDto[] = []
  dataLoaded = false

  constructor(
    private userOperationClaimService : UserOperationClaimService,
    private toastrService : ToastrService,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.getUserOperationClaims()
  }

  userOperationClaimForm : FormGroup

  createUserOperationClaimForm() {
    this.userOperationClaimForm = this.formBuilder.group({
      UserID:['', Validators.required],
      OperationClaimID:['', Validators.required],
    })
  }

  getUserOperationClaims(){
    this.userOperationClaimService.getAll().subscribe((response) => {
      this.userOperationClaimDto = response.data
      this.dataLoaded = true
    })
  }

  addUserOperationClaim(){
    if(this.userOperationClaimForm.valid){
      let userOperationClaimModel = Object.assign({}, this.userOperationClaimForm.value);
      this.userOperationClaimService.add(userOperationClaimModel).subscribe((response) => {
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

  deleteUserOperationClaim(userOperationClaim:UserOperationClaim){
    this.userOperationClaimService.delete(userOperationClaim).subscribe((response => {
      this.toastrService.success(
        "Worker is deleted"
      );
    }),errorResponse=>{
      if (errorResponse.error.error.length>0){
        for(let i=0; i < errorResponse.error.error.length; i++){
          this.toastrService.error(errorResponse.error.error[i].ErrorMessage,"Verification Error");
        }
      }
    })
  }

  updateUserOperationClaim(){
    if(this.userOperationClaimForm.valid){
      let userOperationClaimModel = Object.assign({}, this.userOperationClaimForm.value);
      this.userOperationClaimService.update(userOperationClaimModel).subscribe((response) => {
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

}
