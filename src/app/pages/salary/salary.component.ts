import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  salaries : Salary[] = []
  workerSalaryDto : WorkerSalaryDto[] = []
  dataLoaded = false

  constructor(
    private salaryService:SalaryService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
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

  salaryForm : FormGroup

  createSalaryForm() {
    this.salaryForm = this.formBuilder.group({
      WorkerID:['', Validators.required],
      UserID:['', Validators.required],
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
      if (this.salaries.length == 0) {
        this.toastrService.info("There is no record for your filter.","Result of searching");
      }
    })
  }

  getSalaryByWorkerID(WorkerID:number){
    this.salaryService.getByWorkerID(WorkerID).subscribe(response => {
      this.workerSalaryDto = response.data,
      this.dataLoaded = true
      if (this.salaries.length == 0) {
        this.toastrService.info("There is no record for your filter.","Result of searching");
      }
    })
  }

}
