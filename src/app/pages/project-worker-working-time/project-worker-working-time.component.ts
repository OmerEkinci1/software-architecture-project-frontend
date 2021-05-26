import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ProjectWorkerWorkingTime } from 'src/app/models/projectWorkerWorkingTimes/projectWorkerWorkingTime';
import { ProjectWorkerWorkingTimeDto } from 'src/app/models/projectWorkerWorkingTimes/projectWorkerWorkingTimeDto';
import { ProjectWorkerWorkingTimeService } from 'src/app/services/project-worker-working-time.service';

@Component({
  selector: 'app-project-worker-working-time',
  templateUrl: './project-worker-working-time.component.html',
  styleUrls: ['./project-worker-working-time.component.css']
})
export class ProjectWorkerWorkingTimeComponent implements OnInit {

  projectWorkerWorkingTimes : ProjectWorkerWorkingTime[] = []
  projectWorkerWorkingTimeDto : ProjectWorkerWorkingTimeDto[] = []
  dataLoaded = false

  constructor(
    private projectWorkerWorkingTimeService : ProjectWorkerWorkingTimeService,
    private formBuilder : FormBuilder,
    private toastrService : ToastrService,
    private modalService: BsModalService,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if(params['ProjectWorkerID'])
        this.getByProjectWorkerID(params['ProjectWorkerID'])
      else
        this.getProjectWorkerWorkingTimes()
    })
  }

  projectWorkerWorkingTimeUpdateForm : FormGroup
  modalRef : BsModalRef;

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  createProjectWorkerWorkingTime () {
    this.projectWorkerWorkingTimeUpdateForm = this.formBuilder.group({
      ProjectWorkerID:['', Validators.required],
      DailyStartHour:['', Validators.required],
      DailyFinishHour:['', Validators.required],
    })
  }

  getProjectWorkerWorkingTimes(){
    this.projectWorkerWorkingTimeService.getAll().subscribe((response) => {
      this.projectWorkerWorkingTimeDto = response.data
      this.dataLoaded = true
    })
  }

  getByProjectWorkerID(ProjectWorkerID:number){
    this.projectWorkerWorkingTimeService.getByProjectWorkerID(ProjectWorkerID).subscribe(response => {
      this.projectWorkerWorkingTimeDto = response.data,
      this.dataLoaded = true
      if (this.projectWorkerWorkingTimes.length == 0) {
        this.toastrService.info("There is no record for your filter.","Result of searching");
      }
    })
  }

  updateProjectWorkerWorkingTimes(){
    if(this.projectWorkerWorkingTimeUpdateForm.valid){
      let projectWorkerWorkingTimeModel = Object.assign({}, this.projectWorkerWorkingTimeUpdateForm.value);
      this.projectWorkerWorkingTimeService.update(projectWorkerWorkingTimeModel).subscribe((response) => {
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
