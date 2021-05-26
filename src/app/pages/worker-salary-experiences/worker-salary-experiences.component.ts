import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
    private modalService: BsModalService,
    private activatedRoute : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getProjects()
    this.createWorkerSalaryExperienceForm()
  }

  workerSalaryExperiencesForm : FormGroup
  modalRef : BsModalRef;

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  createWorkerSalaryExperienceForm () {
    this.workerSalaryExperiencesForm = this.formBuilder.group({
      DepartmentTypeName:['', Validators.required],
      Year:['', Validators.required],
      minHourSalary:['', Validators.required],
      maxHourSalary:['',Validators.required],
    })
  }

  getProjects(){
    this.workerSalaryExperienceService.getAll().subscribe((response) => {
      this.workerSalaryExperienceDtos = response.data
      console.log(response.data)
      this.dataLoaded = true
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
