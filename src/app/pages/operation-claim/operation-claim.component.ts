import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim/operationClaim';
import { OperationClaimService } from 'src/app/services/operation-claim.service';

@Component({
  selector: 'app-operation-claim',
  templateUrl: './operation-claim.component.html',
  styleUrls: ['./operation-claim.component.css']
})
export class OperationClaimComponent implements OnInit {

  modalRef: BsModalRef;

  operationClaims : OperationClaim[] = []
  dataLoaded = false
  constructor(
    private formBuilder: FormBuilder,
    private operationClaimService: OperationClaimService,
    private toastrService: ToastrService,
    private modalService: BsModalService,
  ) { }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  operationClaimForm: FormGroup

  ngOnInit(): void {
    this.getOperationClaims()
  }

  createOperationClaimForm() {
    this.operationClaimForm = this.formBuilder.group({
      OperationClaimName:['', Validators.required],
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
      let operationClaimModel = Object.assign({}, this.operationClaimForm.value);
      this.operationClaimService.update(operationClaimModel).subscribe((response) => {
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

}
