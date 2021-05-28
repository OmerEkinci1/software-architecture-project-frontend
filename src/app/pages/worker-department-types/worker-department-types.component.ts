import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DepartmentType } from 'src/app/models/departmentTypes/departmentType';
import { WorkerDepartmentDto } from 'src/app/models/workerDepartmentTypes/workerDepartmentDto';
import { WorkerDepartmentType } from 'src/app/models/workerDepartmentTypes/workerDepartmentType';
import { WorkerModel } from 'src/app/models/workers/workerModel';
import { WorkerSalaryExperience } from 'src/app/models/workerSalaryExperiences/workerSalaryExperience';
import { DepartmentTypeService } from 'src/app/services/department-type.service';
import { WorkerDepartmentTypeService } from 'src/app/services/worker-department-type.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-worker-department-types',
  templateUrl: './worker-department-types.component.html',
  styleUrls: ['./worker-department-types.component.css']
})
export class WorkerDepartmentTypesComponent implements OnInit {

  workers : WorkerModel[] = []
  departmentTypes : DepartmentType[] = []
  workerSalaryExperienceAdd
  workerDepartmentTypes : WorkerDepartmentType[] = []
  workerDepartmentDto : WorkerDepartmentDto[] = []
  dataLoaded = false

  constructor(
    private workerDepartmentTypeService : WorkerDepartmentTypeService,
    private workerService: WorkerService,
    private departmentTypeService : DepartmentTypeService,
    private formBuilder : FormBuilder,
    private toastrService : ToastrService,
    private modalService: BsModalService,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getWorkers()
    this.getDepartmentTypes()
    this.getWorkerDepartments()
    this.createWorkerDepartmentTypeForm()
    this.activatedRoute.queryParams.subscribe((params) => {
      if(params['DepartmentTypeID'])
        this.getAllWorkersByDepartmentTypeID(params['DepartmentTypeID'])
    })
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  modalRef : BsModalRef;
  workerDepartmentTypeForm : FormGroup
  workerDepartmentTypeUpdateForm : FormGroup

  createWorkerDepartmentTypeForm() {
    this.workerDepartmentTypeForm = this.formBuilder.group({
      WorkerID:['', Validators.required],
      DepartmentTypeID:['', Validators.required],
    })
  }

  getWorkerDepartments(){
    this.workerDepartmentTypeService.getAll().subscribe((response) => {
      this.workerDepartmentDto = response.data
      this.dataLoaded = true
    })
  }

  getWorkers(){
    this.workerService.getAll().subscribe((response) => {
      this.workers = response.data
      this.dataLoaded = true
    })
  }

  getDepartmentTypes(){
    this.departmentTypeService.getAll().subscribe((response) => {
      this.departmentTypes = response.data
      this.dataLoaded = true
    })
  }

  addWorkerToDepartment(){
    if(this.workerDepartmentTypeForm.valid){
      this.workerSalaryExperienceAdd = new WorkerDepartmentType(
        Number(this.workerDepartmentTypeForm.value.WorkerID),
        Number(this.workerDepartmentTypeForm.value.WorkerID)
      )
      this.workerDepartmentTypeService.add(this.workerSalaryExperienceAdd).subscribe((response) => {
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

  deleteWorkerDepartmentType(workerDepartmentType:WorkerDepartmentType){
    this.workerDepartmentTypeService.delete(workerDepartmentType).subscribe((response => {
      this.toastrService.success(response.message);
    }),errorResponse=>{
      if (errorResponse.error.error.length>0){
        for(let i=0; i < errorResponse.error.error.length; i++){
          this.toastrService.error(errorResponse.error.error[i].ErrorMessage,"Verification Error");
        }
      }
    })
  }

  getAllWorkersByDepartmentTypeID(DepartmentTypeID:number){
    this.workerDepartmentTypeService.getAllDepartmentByID(DepartmentTypeID).subscribe(response => {
      this.workerDepartmentDto = response.data,
      this.dataLoaded = true
      if (this.workerDepartmentDto.length == 0) {
        this.toastrService.info("There is no record for your filter.","Result of searching");
      }
    })
  }

}
