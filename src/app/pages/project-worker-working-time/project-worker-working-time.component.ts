import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ProjectWorkerWorkingTime } from 'src/app/models/projectWorkerWorkingTimes/projectWorkerWorkingTime';
import { ProjectWorkerWorkingTimeDto } from 'src/app/models/projectWorkerWorkingTimes/projectWorkerWorkingTimeDto';
import { ProjectWorkerWorkingTimeService } from 'src/app/services/project-worker-working-time.service';
import { ProjectWorkerService } from 'src/app/services/project-worker.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-project-worker-working-time',
  templateUrl: './project-worker-working-time.component.html',
  styleUrls: ['./project-worker-working-time.component.css']
})
export class ProjectWorkerWorkingTimeComponent implements OnInit {

  projectWorker
  projectWorkerWorkingTimeDtoSingle
  projectWorkerWorkingTimes : ProjectWorkerWorkingTime[] = []
  projectWorkerWorkingTimeDto : ProjectWorkerWorkingTimeDto[] = []
  dataLoaded = false

  constructor(
    private projectWorkerWorkingTimeService : ProjectWorkerWorkingTimeService,
    private projectWorkerService: ProjectWorkerService,
    private workerService : WorkerService,
    private formBuilder : FormBuilder,
    private toastrService : ToastrService,
    private modalService: BsModalService,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProjectWorkerWorkingTimes()
  }

  projectWorkerWorkingTimeForm : FormGroup
  modalRef : BsModalRef;

  openModal(template: TemplateRef<any>,pwdto:ProjectWorkerWorkingTimeDto){
    this.projectWorkerWorkingTimeDtoSingle=pwdto
    this.createProjectWorkerWorkingTime()
    this.modalRef = this.modalService.show(template);
  }

  createProjectWorkerWorkingTime () {
    this.projectWorkerWorkingTimeForm = this.formBuilder.group({
      //Date:[this.projectWorkerWorkingTimeDtoSingle.Date],
      //ProjectWorkerID:[this.projectWorkerWorkingTimeDtoSingle["workerName"] +this.projectWorkerWorkingTimeDtoSingle["workerSurname"]],
      DailyStartHour:[this.projectWorkerWorkingTimeDtoSingle["dailyStartHour"], Validators.required],
      DailyFinishHour:[this.projectWorkerWorkingTimeDtoSingle["dailyFinishHour"], Validators.required],
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
    if(this.projectWorkerWorkingTimeForm.valid){
      let projectWorkerWorkingTimeModel=new ProjectWorkerWorkingTime(this.projectWorkerWorkingTimeDtoSingle["projectWorkerWorkingTimeID"],this.projectWorkerWorkingTimeDtoSingle["projectWorkerID"],
      this.projectWorkerWorkingTimeForm.value.DailyStartHour,this.projectWorkerWorkingTimeForm.value.DailyFinishHour,this.projectWorkerWorkingTimeDtoSingle["date"])
      this.projectWorkerWorkingTimeService.update(projectWorkerWorkingTimeModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.getProjectWorkerWorkingTimes()
      },
      responseError=>{
        this.toastrService.error(responseError.error.message)
      })
    }else {
      this.toastrService.error("Your form is missing", "Warning");
    }
  }

}
