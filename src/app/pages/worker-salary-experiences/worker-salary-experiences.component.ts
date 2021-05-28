import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DepartmentType } from 'src/app/models/departmentTypes/departmentType';
import { WorkerSalaryExperience } from 'src/app/models/workerSalaryExperiences/workerSalaryExperience';
import { WorkerSalaryExperienceDto } from 'src/app/models/workerSalaryExperiences/workerSalaryExperienceDto';
import { DepartmentTypeService } from 'src/app/services/department-type.service';
import { WorkerSalaryExperienceService } from 'src/app/services/worker-salary-experience.service';

@Component({
  selector: 'app-worker-salary-experiences',
  templateUrl: './worker-salary-experiences.component.html',
  styleUrls: ['./worker-salary-experiences.component.css']
})
export class WorkerSalaryExperiencesComponent implements OnInit {

  workerSalaryExperience
  departmentTypes : DepartmentType[] = []
  workerSalaryExperiences : WorkerSalaryExperience[] = []
  workerSalaryExperienceDtos : WorkerSalaryExperienceDto[] = []
  dataLoaded = false
  constructor(
    private workerSalaryExperienceService : WorkerSalaryExperienceService,
    private departmentTypeService: DepartmentTypeService,
    private toastrService : ToastrService,
    private formBuilder : FormBuilder,
    private modalService: BsModalService,
    private activatedRoute : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getDepartmentTypes()
    this.getWorkerSalaryExperiences()
    this.createWorkerSalaryExperienceForm()
  }

  workerSalaryExperiencesForm : FormGroup
  modalRef : BsModalRef;

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  // openModalUpdate(template: TemplateRef<any>, workerSalaryExperience : WorkerSalaryExperience){
  //   this.workerSalaryExperience = new WorkerSalaryExperience(workerSalaryExperience)
  //   this.modalRef = this.modalService.show(template);
  // }

  createWorkerSalaryExperienceForm () {
    this.workerSalaryExperiencesForm = this.formBuilder.group({
      DepartmentTypeID:['', Validators.required],
      Year:['', Validators.required],
      minHourSalary:['', Validators.required],
      maxHourSalary:['',Validators.required],
    })
  }

  getDepartmentTypes(){
    this.departmentTypeService.getAll().subscribe((response) => {
      this.departmentTypes = response.data
      this.dataLoaded = true
    })
  }

  getWorkerSalaryExperiences(){
    this.workerSalaryExperienceService.getAll().subscribe((response) => {
      this.workerSalaryExperienceDtos = response.data
      console.log(response.data)
      this.dataLoaded = true
    })
  }

  addWorkerSalaryExperiences (){
    console.log("geldi")
    if(this.workerSalaryExperiencesForm.valid){
      console.log("girdi")
      this.workerSalaryExperience = new WorkerSalaryExperience(
        Number(this.workerSalaryExperiencesForm.value.DepartmentTypeID),
        Number(this.workerSalaryExperiencesForm.value.Year),
        Number(this.workerSalaryExperiencesForm.value.minHourSalary),
        Number(this.workerSalaryExperiencesForm.value.maxHourSalary))
      console.log(this.workerSalaryExperience)
      this.workerSalaryExperienceService.add(this.workerSalaryExperience).subscribe((response) => {
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
