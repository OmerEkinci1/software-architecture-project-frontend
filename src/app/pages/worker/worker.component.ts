import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Worker } from 'src/app/models/workers/worker';
import { WorkerDto } from 'src/app/models/workers/workerDto';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {

  workers : Worker[] = [];
  workersDto : WorkerDto[] = []
  dataLoaded = false;
  filterText = "";

  constructor( 
    private formBuilder: FormBuilder,
    private workerService: WorkerService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService) { }

  workerForm: FormGroup; 

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
      this.dataLoaded = true
    })
  }

  addWorker(){
    if(this.workerForm.valid){
      let workerModel = Object.assign({}, this.workerForm.value);
      this.workerService.add(workerModel).subscribe((response) => {
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

  deleteWorker(worker:Worker){
    this.workerService.delete(worker).subscribe((response => {
      this.toastrService.success(response.message);
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
