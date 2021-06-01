import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DepartmentType } from 'src/app/models/departmentTypes/departmentType';
import {  WorkerModel } from 'src/app/models/workers/workerModel';
import { WorkerDto } from 'src/app/models/workers/workerDto';
import { DepartmentTypeService } from 'src/app/services/department-type.service';
import { WorkerService } from 'src/app/services/worker.service';
import { User } from 'src/app/models/users/user';
import { UserService } from 'src/app/services/user.service';
import { WorkerCreationDto } from 'src/app/models/workers/workerCreationDto';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {

  workerModel
  workerCreationDto : WorkerCreationDto
  workers : WorkerModel
  workersDto : WorkerDto[] = []
  users: User[] = []
  departmentTypes : DepartmentType[] = []
  dataLoaded = false;
  filterText = "";

  constructor( 
    private formBuilder: FormBuilder,
    private workerService: WorkerService,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private departmentTypeService: DepartmentTypeService,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router) { }

  workerForm: FormGroup;
  workerUpdateForm : FormGroup 
  modalRef : BsModalRef;

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  openModalUpdate(template: TemplateRef<any>, workerDto : WorkerDto){
    this.workerModel = new WorkerDto(workerDto["workerID"],workerDto["workerName"],workerDto["workerSurname"],
    workerDto["userID"],workerDto["name"],workerDto["dailyWorkingTime"],workerDto["hourSalary"],workerDto["startTime"],workerDto["status"],
    workerDto["departmentType"])

    console.log( this.workerModel)
    this.createWorkerUpdateForm()
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.getUsers();
    this.getWorkers();
    this.getDepartmentTypes();
    this.createWorkerForm();
  }

  createWorkerForm() {
    this.workerForm = this.formBuilder.group({
      DepartmentTypes:[[], Validators.required],
      userID:['', Validators.required],
      workerName:['', Validators.required],
      workerSurname:['', Validators.required],
      DailyWorkingTime:['', Validators.required],
      HourSalary:['',Validators.required],
    })
  }

  createWorkerUpdateForm() {
    this.workerUpdateForm = this.formBuilder.group({
      DepartmentTypes:[this.workerModel["DepartmentType"], Validators.required],
      userID:[this.workerModel["UserID"], Validators.required],
      workerName:[this.workerModel["WorkerName"], Validators.required],
      workerSurname:[this.workerModel["WorkerSurname"], Validators.required],
      DailyWorkingTime:[this.workerModel["DailyWorkingTime"], Validators.required],
      HourSalary:[this.workerModel["HourSalary"],Validators.required],
    })
  }

  getWorkers(){
    this.workerService.getAll().subscribe((response) => {
      this.workersDto = response.data
      this.dataLoaded = true
    })
  }

  getUsers(){
    this.userService.getalluserbystatustrue().subscribe((response) => {
      this.users = response.data
      
      this.dataLoaded = true
    })
  }

  getDepartmentTypes(){
    this.departmentTypeService.getAll().subscribe((response) => {
      this.departmentTypes = response.data
      
      this.dataLoaded = true
    })
  }

  addWorker(){
    if(this.workerForm.valid){
      this.workerForm.value.userID = Number(this.workerForm.value.userID)      
      // for (let index = 0; index < this.workerForm.value.DepartmentTypes.length; index++) {
      //   this.workerForm.value.DepartmentTypes[index] = Number(this.workerForm.value.DepartmentTypes[index])        
      // }
      
      this.workerForm.value.DailyWorkingTime = Number(this.workerForm.value.DailyWorkingTime)
      this.workerCreationDto = Object.assign({}, this.workerForm.value);
      this.workerService.add(this.workerCreationDto).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.getWorkers()
      },responseError=>{
        this.toastrService.error(responseError.error.message)
      }
      )
    } else {
      this.toastrService.error("Your form is missing", "Warning");
        }
  }

  deleteWorker(worker:WorkerModel){
    this.workerService.delete(worker).subscribe((response => {
      this.toastrService.success(response.message);
      this.getWorkers()
    }),errorResponse=>{
      this.toastrService.error(errorResponse.error.message)
    }
    )
  }

  updateWorker(){
    if(this.workerUpdateForm.valid){
      let workerModel = Object.assign({}, this.workerUpdateForm.value);
      workerModel.WorkerID=this.workerModel["WorkerID"]
      workerModel.Status=this.workerModel["Status"]
      workerModel.Name=this.workerModel["Name"]

      this.workerService.update(workerModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.getWorkers()
      },errorResponse=>{
        this.toastrService.error(errorResponse.error.message)
      })
    } else {
      this.toastrService.error("Your form is missing", "Warning");
    }
  }

}
