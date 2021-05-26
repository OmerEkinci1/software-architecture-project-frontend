import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Salary } from 'src/app/models/salaries/salary';
import { WorkerSalaryDto } from 'src/app/models/salaries/workerSalaryDto';
import { SalaryService } from 'src/app/services/salary.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {

  salaries : Salary = {}
  salary : Salary[] = []
  salaryDto : WorkerSalaryDto
  workerSalaryDto : WorkerSalaryDto[] = []
  dataLoaded = false
  modalRef : BsModalRef;

  constructor(
    private salaryService:SalaryService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private modalService: BsModalService,
    private activatedRoute : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if(params['UserID'])
        this.getSalaryByUserID(params['UserID'])
      else if(params['WorkerID'])
        this.getSalaryByWorkerID(params['WorkerID'])
      else
        this.getSalaries()
    })
  }

  openModal(template: TemplateRef<any>, salaryDto: WorkerSalaryDto){
    this.salaryDto = salaryDto
    this.salaries.WorkerID = this.salaryDto.SalaryID  
    this.salaries.WorkerID = this.salaryDto.WorkerID 
    this.salaries.UserID = this.salaryDto.UserID 
    this.salaries.SalaryDate = this.salaryDto.SalaryDate 
    this.salaries.SalaryAmount = this.salaryDto.SalaryAmount 
    this.modalRef = this.modalService.show(template)
  }

  salaryForm : FormGroup
  salaryUpdateForm: FormGroup

  createSalaryForm() {
    this.salaryForm = this.formBuilder.group({
      WorkerID:['', Validators.required],
      UserID:['', Validators.required],
      SalaryAmount:['', Validators.required],
    })
  }

  createSalarynUpdateForm() {
    this.salaryUpdateForm = this.formBuilder.group({
      WorkerName:['',Validators.required],
      WorkerSurname:['',Validators.required],
      UserName:['',Validators.required],
      UserSurname:['',Validators.required],
      SalaryAmount:['', Validators.required],
    })
  }

  getSalaries(){
    this.salaryService.getAll().subscribe((response) => {
      this.workerSalaryDto = response.data
      this.dataLoaded = true
    })
  }

  addSalary(){
    if(this.salaryForm.valid){
      let salaryModel = Object.assign({}, this.salaryForm.value);
      this.salaryService.add(salaryModel).subscribe((response) => {
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

  updateSalary(){
    if(this.salaryForm.valid){
      let salaryModel = Object.assign({}, this.salaryForm.value);
      this.salaryService.update(salaryModel).subscribe((response) => {
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

  getSalaryByUserID(UserID:number){
    this.salaryService.getByUserID(UserID).subscribe(response => {
      this.workerSalaryDto = response.data,
      this.dataLoaded = true
      if (this.salary.length == 0) {
        this.toastrService.info("There is no record for your filter.","Result of searching");
      }
    })
  }

  getSalaryByWorkerID(WorkerID:number){
    this.salaryService.getByWorkerID(WorkerID).subscribe(response => {
      this.workerSalaryDto = response.data,
      this.dataLoaded = true
      if (this.salary.length == 0) {
        this.toastrService.info("There is no record for your filter.","Result of searching");
      }
    })
  }

}
