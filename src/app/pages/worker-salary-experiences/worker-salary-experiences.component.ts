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
  addworkerSalaryExperience
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
  workerSalaryExperiencesUpdateForm : FormGroup
  modalRef : BsModalRef;

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  openModalUpdate(template: TemplateRef<any>, workerSalaryExperiences : WorkerSalaryExperienceDto){
    this.workerSalaryExperience = new WorkerSalaryExperienceDto(workerSalaryExperiences["workerSalaryExperienceID"],workerSalaryExperiences["departmentTypeID"],workerSalaryExperiences["year"],workerSalaryExperiences.minHourSalary,workerSalaryExperiences.maxHourSalary)
    this.createWorkerSalaryExperienceUpdateForm()
    this.modalRef = this.modalService.show(template);
  }

  createWorkerSalaryExperienceForm () {
    this.workerSalaryExperiencesForm = this.formBuilder.group({
      DepartmentTypeID:['', Validators.required],
      Year:['', Validators.required],
      minHourSalary:['', Validators.required],
      maxHourSalary:['',Validators.required],
    })
  }

  createWorkerSalaryExperienceUpdateForm () {
    this.workerSalaryExperiencesUpdateForm = this.formBuilder.group({
      DepartmentTypeID:[this.workerSalaryExperience["DepartmentTypeID"]?this.workerSalaryExperience["DepartmentTypeID"]:"", Validators.required],
      Year:[this.workerSalaryExperience["Year"], Validators.required],
      minHourSalary:[this.workerSalaryExperience["minHourSalary"]?this.workerSalaryExperience["minHourSalary"]:"", Validators.required],
      maxHourSalary:[this.workerSalaryExperience["maxHourSalary"]?this.workerSalaryExperience["maxHourSalary"]:"",Validators.required],
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
      this.dataLoaded = true
    })
  }

  addWorkerSalaryExperiences (){
    if(this.workerSalaryExperiencesForm.valid){
      this.addworkerSalaryExperience = new WorkerSalaryExperience(
        Number(this.workerSalaryExperiencesForm.value.DepartmentTypeID),
        Number(this.workerSalaryExperiencesForm.value.Year),
        Number(this.workerSalaryExperiencesForm.value.minHourSalary),
        Number(this.workerSalaryExperiencesForm.value.maxHourSalary))

      this.workerSalaryExperienceService.add(this.addworkerSalaryExperience).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.getWorkerSalaryExperiences()
      },responseError=>{
        this.toastrService.error(responseError.error.message)
      })
    } else {
      this.toastrService.error("Your form is missing", "Warning");
    }
  }

  updateWorkerSalaryExperiences (){    
    if(this.workerSalaryExperiencesUpdateForm.valid){
      let workerSalaryExperienceModel = Object.assign({}, this.workerSalaryExperiencesUpdateForm.value);
      workerSalaryExperienceModel.WorkerSalaryExperienceID=Number(this.workerSalaryExperience.WorkerSalaryExperienceID)
      this.workerSalaryExperienceService.update(workerSalaryExperienceModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.getWorkerSalaryExperiences()
      },responseError=>{
        this.toastrService.error(responseError.error.message)
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
