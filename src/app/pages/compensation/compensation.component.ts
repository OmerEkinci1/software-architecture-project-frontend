import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Compensation } from 'src/app/models/compensations/compensation';
import { WorkerCompensationDto } from 'src/app/models/compensations/workerCompensationDto';
import { CompensationService } from 'src/app/services/compensation.service';

@Component({
  selector: 'app-compensation',
  templateUrl: './compensation.component.html',
  styleUrls: ['./compensation.component.css']
})
export class CompensationComponent implements OnInit {

  compensations: Compensation[] = []
  workerCompensationDto : WorkerCompensationDto[] = []
  dataLoaded = false;

  constructor(
    private formBuilder: FormBuilder,
    private compensationService: CompensationService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) { }

  compensationForm : FormGroup;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if(params['UserID'])
        this.getCompensationByUserID(params['UserID'])
      else if(params['WorkerID'])
        this.getCompensationByWorkerID(params['WorkerID'])
      else
        this.getCompensations()
    })
  }

  createCompensationForm() {
    this.compensationForm = this.formBuilder.group({
      WorkerID:['', Validators.required],
      UserID:['', Validators.required],
      CompensationAmount:['', Validators.required],
    })
  }

  getCompensations(){
    this.compensationService.getAll().subscribe((response) => {
      this.workerCompensationDto = response.data
      this.dataLoaded = true
    })
  }

  addCompensation(){
    if(this.compensationForm.valid){
      let compensationModel = Object.assign({}, this.compensationForm.value);
      this.compensationService.add(compensationModel).subscribe((response) => {
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

  updateCompensation(){
    if(this.compensationForm.valid){
      let compensationModel = Object.assign({}, this.compensationForm.value);
      this.compensationService.update(compensationModel).subscribe((response) => {
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

  getCompensationByUserID(UserID:number){
    this.compensationService.getByUserID(UserID).subscribe(response => {
      this.workerCompensationDto = response.data,
      this.dataLoaded = true
      if (this.compensations.length == 0) {
        this.toastrService.info("There is no record for your filter.","Result of searching");
      }
    })
  }

  getCompensationByWorkerID(WorkerID:number){
    this.compensationService.getByWorkerID(WorkerID).subscribe(response => {
      this.workerCompensationDto = response.data,
      this.dataLoaded = true
      if (this.compensations.length == 0) {
        this.toastrService.info("There is no record for your filter.","Result of searching");
      }
    })
  }

}
