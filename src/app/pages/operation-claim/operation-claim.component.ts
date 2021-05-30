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
  userOperationClaimUpdate:UserOperationClaim
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
    this.userOperationClaimUpdate = new UserOperationClaim(userOperationClaims["userOperationClaimID"],userOperationClaims["userID"],userOperationClaims["operationClaimID"])
    this.createUserOperationUpdateClaimForm()
    // console.log(this.userOperationClaimUpdate)
    // this.userOperationClaimForm.value.UserID=this.userOperationClaimUpdate.UserID
    // this.userOperationClaimForm.value.OperationClaimID=this.userOperationClaimUpdate.OperationClaimID
    // this.userOperationClaimForm.value.UserOperationClaimID=this.userOperationClaimUpdate.UserOperationClaimID

    this.modalRef = this.modalService.show(template)
  }

  operationClaimForm: FormGroup
  userOperationClaimForm : FormGroup
  userOperationClaimUpdateForm : FormGroup

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
      UserID:[, Validators.required],
      OperationClaimID:[, Validators.required],
    })

  }

  createUserOperationUpdateClaimForm() {
    this.userOperationClaimUpdateForm = this.formBuilder.group({
      UserOperationClaimID:[this.userOperationClaimUpdate["UserOperationClaimID"]?this.userOperationClaimUpdate["UserOperationClaimID"]:""],
      UserID:[this.userOperationClaimUpdate["UserID"]?this.userOperationClaimUpdate["UserID"]:"", Validators.required],
      OperationClaimID:[this.userOperationClaimUpdate["OperationClaimID"]?this.userOperationClaimUpdate["OperationClaimID"]:"", Validators.required],
    })

  }

  getOperationClaims(){
    this.operationClaimService.getAll().subscribe((response) => {
      this.operationClaims = response.data
      this.dataLoaded = true
    })
  }

  addOperationClaim(){
    if(this.operationClaimForm.valid){
      let operationClaimModel = Object.assign({}, this.operationClaimForm.value);
      this.operationClaimService.add(operationClaimModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.getOperationClaims()
      },
      (responseError) => {       
        this.toastrService.error(responseError.error.message, "Verification Error");    
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
        this.getOperationClaims()
      },
      (responseError) => {       
        this.toastrService.error(responseError.error.message, "Verification Error");    
      })
    } else {
      this.toastrService.error("Your form is missing", "Warning");
    }
  }

  deleteOperationClaim(operationClaim:OperationClaim){
    this.operationClaimService.delete(operationClaim).subscribe((response => {
      this.toastrService.success(response.message);
      this.getOperationClaims()
    }), (responseError) => {       
      console.log(responseError)
      this.toastrService.error(responseError.error.message, "Verification Error");    
    })
  }




  addUserOperationClaim(){
    if(this.userOperationClaimForm.valid){
      this.userOperationClaimAdd= new UserOperationClaim(0,Number(this.userOperationClaimForm.value.UserID),Number(this.userOperationClaimForm.value.OperationClaimID))
      this.userOperationClaimService.add(this.userOperationClaimAdd).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.getUserOperationClaims()
      },
      (responseError) => {       
        console.log(responseError)
        this.toastrService.error(responseError.error.message, "Verification Error");    
      })
    } else {
      this.toastrService.error("Your form is missing", "Warning");
    }
  }

  deleteUserOperationClaim(userOperationClaim:UserOperationClaim){
    this.userOperationClaimService.delete(userOperationClaim).subscribe((response => {
      this.toastrService.success(response.message, "Success")
      this.getUserOperationClaims()
    }),(responseError) => {       
      console.log(responseError)
      this.toastrService.error(responseError.error.message, "Verification Error");    
    })
  }

  updateUserOperationClaim(){
    console.log("geldi")
    if(this.userOperationClaimUpdateForm.valid){
      console.log("girdi")
      let userOperationClaimModel = Object.assign({}, this.userOperationClaimUpdateForm.value);
      userOperationClaimModel.OperationClaimID=Number(userOperationClaimModel.OperationClaimID)
      console.log(userOperationClaimModel)
      this.userOperationClaimService.update(userOperationClaimModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.getUserOperationClaims()
      },
      (responseError) => {       
        console.log(responseError)
        this.toastrService.error(responseError.error.message, "Verification Error");    
      })
    } else {
      this.toastrService.error("Your form is missing", "Warning");
    }
  }

  getUserByStatusTrue(){
    this.userService.getalluserbystatustrue().subscribe((response) => {
      this.users = response.data
      this.dataLoaded = true
    },responseError=>{
      console.log(responseError)
      this.toastrService.error("Data not found","Error")
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

}
