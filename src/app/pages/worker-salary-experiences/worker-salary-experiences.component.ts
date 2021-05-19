import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WorkerSalaryExperience } from 'src/app/models/workerSalaryExperiences/workerSalaryExperience';
import { WorkerSalaryExperienceDto } from 'src/app/models/workerSalaryExperiences/workerSalaryExperienceDto';
import { WorkerSalaryExperienceService } from 'src/app/services/worker-salary-experience.service';

@Component({
  selector: 'app-worker-salary-experiences',
  templateUrl: './worker-salary-experiences.component.html',
  styleUrls: ['./worker-salary-experiences.component.css']
})
export class WorkerSalaryExperiencesComponent implements OnInit {

  workerSalaryExperiences : WorkerSalaryExperience[] = []
  workerSalaryExperienceDtos : WorkerSalaryExperienceDto[] = []
  dataLoaded = false
  constructor(
    private workerSalaryExperienceService : WorkerSalaryExperienceService,
    private toastrService : ToastrService,
    private formBuilder : FormBuilder,
    private activatedRoute : ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  workerSalaryExperiencesForm : FormGroup

  createWorkerSalaryExperienceForm () {
    this.workerSalaryExperiencesForm = this.formBuilder.group({
      DepartmentTypeID:['', Validators.required],
      Year:['', Validators.required],
      minHourSalary:['', Validators.required],
      maxHourSalary:['',Validators.required],
    })
  }

  addWorkerSalaryExperiences (){
    if(this.workerSalaryExperiencesForm.valid){
      let workerSalaryExperienceModel = Object.assign({}, this.workerSalaryExperiencesForm.value);
      this.workerSalaryExperienceService.add(workerSalaryExperienceModel).subscribe((response) => {
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

  updateWorkerSalaryExperiences (){
    if(this.workerSalaryExperiencesForm.valid){
      let workerSalaryExperienceModel = Object.assign({}, this.workerSalaryExperiencesForm.value);
      this.workerSalaryExperienceService.update(workerSalaryExperienceModel).subscribe((response) => {
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

  getByDepartmentTypeID(DepartmentTypeID:number){
    this.workerSalaryExperienceService.getByDepartmentTypeID(DepartmentTypeID).subscribe(response => {
      this.workerSalaryExperienceDtos = response.data,
      this.dataLoaded = true
      if (this.workerSalaryExperiences.length == 0) {
        this.toastrService.info("There is no record for your filter.","Result of searching");
      }
    })
  }

}
