import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectWorker } from 'src/app/models/projectWorkers/projectWorker';
import { ProjectWorkerGeneralDto } from 'src/app/models/projectWorkers/projectWorkerGeneralDto';
import { ProjectGeneralService } from 'src/app/services/project-general.service';
import { ProjectWorkerService } from 'src/app/services/project-worker.service';

@Component({
  selector: 'app-project-worker',
  templateUrl: './project-worker.component.html',
  styleUrls: ['./project-worker.component.css']
})
export class ProjectWorkerComponent implements OnInit {

  projectWorkers : ProjectWorker[] = []
  projectWorkerGeneralDtos : ProjectWorkerGeneralDto[] = []
  dataLoaded = false

  constructor(
    private formBuilder : FormBuilder,
    private projectWorkerService : ProjectWorkerService,
    private toastrService : ToastrService,
    private activatedRoute : ActivatedRoute,
    private projectGeneralService : ProjectGeneralService,
  ) { }

  ngOnInit(): void {
    this.getProjectWorkers()
  }

  projectWorkerForm : FormGroup

  createProjectWorkerForm () {
    this.projectWorkerForm = this.formBuilder.group({
      projectWorker:['', Validators.required],
      project:['', Validators.required],
    })
  }

  getProjectWorkers(){
    this.projectWorkerService.getAll().subscribe((response) => {
      this.projectWorkerGeneralDtos = response.data
      this.dataLoaded = true
    })
  }

  addProjectWorkers(){
    if(this.projectWorkerForm.valid){
      let projectWorkerModel = Object.assign({}, this.projectWorkerForm.value);
      this.projectWorkerService.add(projectWorkerModel).subscribe((response) => {
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

  deleteProjectWorker(projectWorker:ProjectWorker){
    this.projectWorkerService.delete(projectWorker).subscribe((response => {
      this.toastrService.success(response.message);
    }),errorResponse=>{
      if (errorResponse.error.error.length>0){
        for(let i=0; i < errorResponse.error.error.length; i++){
          this.toastrService.error(errorResponse.error.error[i].ErrorMessage,"Verification Error");
        }
      }
    })
  }

  updateProjectWorkers(){
    if(this.projectWorkerForm.valid){
      let projectWorkerModel = Object.assign({}, this.projectWorkerForm.value);
      this.projectWorkerService.update(projectWorkerModel).subscribe((response) => {
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
