import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim/operationClaim';
import { UserOperationClaim } from 'src/app/models/userOperationClaims/userOperationClaim';
import { UserOperationClaimDto } from 'src/app/models/userOperationClaims/userOperationClaimDto';
import { User } from 'src/app/models/users/user';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-operation-claim',
  templateUrl: './operation-claim.component.html',
  styleUrls: ['./operation-claim.component.css']
})
export class OperationClaimComponent implements OnInit {

  modalRef: BsModalRef;

  operationClaim
  operationClaims : OperationClaim[] = []
  userOperationClaims : UserOperationClaim[] = []
  userOperationClaimAdd
  userOperationClaimUpdate
  userOperationClaimDto : UserOperationClaimDto[] = []
  users : User[] = []
  dataLoaded = false


  constructor(
    private formBuilder: FormBuilder,
    private operationClaimService: OperationClaimService,
    private userOperationClaimService : UserOperationClaimService,
    private userService : UserService,
    private toastrService: ToastrService,
    private router: Router,
    private modalService: BsModalService,
  ) { }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  openModalUpdate(template: TemplateRef<any>, operationClaims : OperationClaim){
    this.operationClaim = new OperationClaim(operationClaims)
    console.log(this.operationClaim)
    this.modalRef = this.modalService.show(template)
  }

  openModalUpdateUserOperationClaim(template: TemplateRef<any>, userOperationClaims : UserOperationClaim){
    console.log(userOperationClaims)
    this.userOperationClaimUpdate = new UserOperationClaim(userOperationClaims.UserID,userOperationClaims.OperationClaimID)
    this.modalRef = this.modalService.show(template)
  }

  operationClaimForm: FormGroup
  userOperationClaimForm : FormGroup

  ngOnInit(): void {
    this.getUserByStatusTrue()
    this.getOperationClaims()
    this.getUserOperationClaims()
    this.createOperationClaimForm()
    this.createUserOperationClaimForm()
  }

  createOperationClaimForm() {
    this.operationClaimForm = this.formBuilder.group({
      OperationClaimName:['', Validators.required],
    })
  }

  createUserOperationClaimForm() {
    this.userOperationClaimForm = this.formBuilder.group({
      UserID:['', Validators.required],
      OperationClaimID:['', Validators.required],
    })
  }

  getOperationClaims(){
    this.operationClaimService.getAll().subscribe((response) => {
      this.operationClaims = response.data
      this.dataLoaded = true
    })
  }

  getUserByStatusTrue(){
    this.userService.getalluserbystatustrue().subscribe((response) => {
      this.users = response.data
      this.dataLoaded = true
    })
  }

  getUserOperationClaims(){
    console.log("girdi")
    this.userOperationClaimService.getAll().subscribe((response) => {
      this.userOperationClaimDto = response.data
      console.log(response.data)
      this.dataLoaded = true
    })
  }

  addOperationClaim(){
    if(this.operationClaimForm.valid){
      let operationClaimModel = Object.assign({}, this.operationClaimForm.value);
      this.operationClaimService.add(operationClaimModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.router.navigate(['operation-claim']);
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

  updateOperationClaim(){
    if(this.operationClaimForm.valid){
      console.log(this.operationClaim)
      this.operationClaimService.update(this.operationClaim).subscribe((response) => {
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

  deleteOperationClaim(operationClaim:OperationClaim){
    this.operationClaimService.delete(operationClaim).subscribe((response => {
      this.toastrService.success(response.message);
    }),errorResponse=>{
      if (errorResponse.error.error.length>0){
        for(let i=0; i < errorResponse.error.error.length; i++){
          this.toastrService.error(errorResponse.error.error[i].ErrorMessage,"Verification Error");
        }
      }
    })
  }

  addUserOperationClaim(){
    if(this.userOperationClaimForm.valid){
      this.userOperationClaimAdd= new UserOperationClaim(Number(this.userOperationClaimForm.value.UserID),Number(this.userOperationClaimForm.value.OperationClaimID))
      this.userOperationClaimService.add(this.userOperationClaimAdd).subscribe((response) => {
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
      //let userOperationClaimModel = Object.assign({}, this.userOperationClaimForm.value);
      this.userOperationClaimService.update(this.userOperationClaimUpdate).subscribe((response) => {
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
