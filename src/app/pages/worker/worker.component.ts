import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DepartmentType } from 'src/app/models/departmentTypes/departmentType';
import { Worker } from 'src/app/models/workers/worker';
import { WorkerDto } from 'src/app/models/workers/workerDto';
import { DepartmentTypeService } from 'src/app/services/department-type.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {

  workers : Worker
  workersDto : WorkerDto[] = []
  departmentTypes : DepartmentType[] = []
  dataLoaded = false;
  filterText = "";

  constructor( 
    private formBuilder: FormBuilder,
    private workerService: WorkerService,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private departmentTypeService: DepartmentTypeService,
    private toastrService: ToastrService,
    private router: Router) { }

  workerForm: FormGroup; 
  modalRef : BsModalRef;

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.getWorkers();
    this.createWorkerForm();
  }

  createWorkerForm() {
    this.workerForm = this.formBuilder.group({
      workerName:['', Validators.required],
      workerSurname:['', Validators.required],
      DailyWorkingTime:['', Validators.required],
      HourSalary:['',Validators.required],
    })
  }

  getWorkers(){
    this.workerService.getAll().subscribe((response) => {
      this.workersDto = response.data
      console.log(response.data)
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
      let workerModel = Object.assign({}, this.workerForm.value);
      this.workerService.add(workerModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.router.navigate(['worker']);
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

  deleteWorker(worker:Worker){
    this.workerService.delete(worker).subscribe((response => {
      this.toastrService.success(response.message);
      this.router.navigate(['worker']);
    }),errorResponse=>{
      if (errorResponse.error.error.length>0){
        for(let i=0; i < errorResponse.error.error.length; i++){
          this.toastrService.error(errorResponse.error.error[i].ErrorMessage,"Verification Error");
        }
      }
    })
  }

  updateWorker(){
    if(this.workerForm.valid){
      let workerModel = Object.assign({}, this.workerForm.value);
      this.workerService.update(workerModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.router.navigate(['worker']);
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

}
