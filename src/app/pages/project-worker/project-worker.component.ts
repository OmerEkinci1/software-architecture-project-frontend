import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ProjectWorker } from 'src/app/models/projectWorkers/projectWorker';
import { ProjectWorkerDto } from 'src/app/models/projectWorkers/projectWorkerDto';
import { ProjectWorkerGeneralDto } from 'src/app/models/projectWorkers/projectWorkerGeneralDto';
import { WorkerModel } from 'src/app/models/workers/workerModel';
import { ProjectGeneralService } from 'src/app/services/project-general.service';
import { ProjectSectionDepartmentService } from 'src/app/services/project-section-department.service';
import { ProjectSectionsService } from 'src/app/services/project-sections.service';
import { ProjectWorkerWorkingTimeService } from 'src/app/services/project-worker-working-time.service';
import { ProjectWorkerService } from 'src/app/services/project-worker.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-project-worker',
  templateUrl: './project-worker.component.html',
  styleUrls: ['./project-worker.component.css']
})
export class ProjectWorkerComponent implements OnInit {

  projectWorker
  projectWorkerSingle
  projectSectionDepartmentGetAll 
  projects
  projectSections
  projectSectionDepartments
  projectWorkers : ProjectWorker[] = []
  projectWorkerGeneralDtos : ProjectWorkerGeneralDto[] = []

  constructor(
    private formBuilder: FormBuilder,
    private projectWorkerService : ProjectWorkerService,
    private projectWorkerWorkingTimeService : ProjectWorkerWorkingTimeService,
    private projectService : ProjectGeneralService,
    private workerService : WorkerService,
    private projectSectionService : ProjectSectionsService,
    private projectSectionDepartmentService : ProjectSectionDepartmentService,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getProjectSectionDepartmentGetAll()
    this.getProjectWorkerTable()
    this.createProjectWorkerForm()
    this.getProjectWorkers()
    this.getProjects()
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template,);
  }

  openModalForProjectWorkerUpdate(template: TemplateRef<any>, projectworkerDto: ProjectWorkerDto){
    console.log(projectworkerDto)
    this.projectWorkerSingle=new ProjectWorker(projectworkerDto["projectWorkerID"],projectworkerDto["workerID"],projectworkerDto["projectSectionDepartmentID"],projectworkerDto["status"])
    this.modalRef = this.modalService.show(template)
    console.log(this.projectWorker)
  }

  projectWorkerForm : FormGroup
  projectWorkerWorkingTimeForm : FormGroup
  modalRef : BsModalRef;

  createProjectWorkerForm () {
    this.projectWorkerForm = this.formBuilder.group({
      Worker:['', Validators.required],
      Project:[],
      ProjectSection:[],
      ProjectSectionDepartment:['', Validators.required],
    })
  }

  createProjectWorkerWorkingTime () {
    this.projectWorkerWorkingTimeForm = this.formBuilder.group({
      // Date:[this.projectWorkerWorkingTimeDtoSingle.Date],
      // ProjectWorkerID:[this.projectWorkerWorkingTimeDtoSingle["workerName"] +this.projectWorkerWorkingTimeDtoSingle["workerSurname"]],
      DailyStartHour:['', Validators.required],
      DailyFinishHour:['', Validators.required],
    })
  }

  getProjectWorkerTable(){
    this.projectWorkerService.getAll().subscribe((response) => {
      this.projectWorkerGeneralDtos = response.data
      console.log(response.data)
    })
  }

  getProjectWorkers(){
    this.workerService.getAll().subscribe((response) => {
      this.projectWorker = response.data
    })
  }

  getProjects(){
    this.projectService.getAll().subscribe((response) => {
      this.projects = response.data
    })
  }

  getProjectSections(projectID:number){
    this.projectSectionService.getByProjectID(projectID).subscribe((response) => {
      this.projectSections = response.data
    })
  }

  getProjectSectionDepartments(sectionID:number){
    this.projectSectionDepartmentService.getBySectionID(sectionID).subscribe((response) => {
      this.projectSectionDepartments = response.data
      console.log(response.data)
    })
  }

  getProjectSectionDepartmentGetAll(){
    this.projectSectionDepartmentService.getAll().subscribe((response) => {
      this.projectSectionDepartmentGetAll = response.data
      console.log(response.data)
    })
  }
 
  addProjectWorkers(){
    if(this.projectWorkerForm.valid){
      let wk = new  ProjectWorker( 0,Number(this.projectWorkerForm.value.ProjectSectionDepartment), Number(this.projectWorkerForm.value.Worker),false)
      this.projectWorkerService.add(wk).subscribe((response) => {
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

  deleteProjectWorker(projectWorkerID:number){
    console.log(projectWorkerID)
    this.projectWorkerService.delete(projectWorkerID).subscribe((response => {
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

  addProjectWorkerWorkingTimes(){
    console.log("geldi")
    if(this.projectWorkerWorkingTimeForm.valid){
      console.log("girdi")
      let projectWorkerWorkingTimeModel = Object.assign({}, this.projectWorkerWorkingTimeForm.value);
      projectWorkerWorkingTimeModel.ProjectWorkerID = Number(projectWorkerWorkingTimeModel.ProjectWorkerID)
      console.log(projectWorkerWorkingTimeModel)
      this.projectWorkerWorkingTimeService.add(projectWorkerWorkingTimeModel).subscribe((response) => {
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
