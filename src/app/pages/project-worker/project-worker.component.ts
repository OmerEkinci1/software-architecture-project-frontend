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
  projectWorkerIDforPWW
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

  openModalForProjectWorkerWorkingTime(template: TemplateRef<any>, projectWorkerID:number){
    this.projectWorkerIDforPWW = projectWorkerID
    this.createProjectWorkerWorkingTime()
    this.modalRef = this.modalService.show(template,);
  }

  openModalForProjectWorkerUpdate(template: TemplateRef<any>, projectworkerDto: ProjectWorkerDto){
    console.log(projectworkerDto)
    this.projectWorkerSingle=new ProjectWorker(projectworkerDto["projectWorkerID"],projectworkerDto["workerID"],projectworkerDto["projectSectionDepartmentID"],projectworkerDto["status"])
    this.createProjectWorkerUpdateForm ()
    this.modalRef = this.modalService.show(template)
  }

  projectWorkerForm : FormGroup
  projectWorkerWorkingTimeForm : FormGroup
  projectWorkerUpdateForm : FormGroup
  modalRef : BsModalRef;

  createProjectWorkerForm () {
    this.projectWorkerForm = this.formBuilder.group({
      Worker:['', Validators.required],
      Project:[],
      ProjectSection:[],
      ProjectSectionDepartment:['', Validators.required],
    })
  }

  createProjectWorkerUpdateForm () {
    this.projectWorkerUpdateForm = this.formBuilder.group({
      WorkerID:[this.projectWorkerSingle["WorkerID"], Validators.required],
      ProjectSectionDepartmentID:[this.projectWorkerSingle["ProjectSectionDepartmentID"], Validators.required],
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
    })
  }

  getProjectSectionDepartmentGetAll(){
    this.projectSectionDepartmentService.getAll().subscribe((response) => {
      this.projectSectionDepartmentGetAll = response.data
    })
  }
 
  addProjectWorkers(){
    if(this.projectWorkerForm.valid){
      let wk = new  ProjectWorker( 0, Number(this.projectWorkerForm.value.Worker),Number(this.projectWorkerForm.value.ProjectSectionDepartment),false)

      this.projectWorkerService.add(wk).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.getProjectWorkerTable()
      },responseError=>{
        this.toastrService.error(responseError.error.message)
      })
    } else {
      this.toastrService.error("Your form is missing", "Warning");
    }
  }

  deleteProjectWorker(projectWorkerID:number){
    this.projectWorkerService.delete(projectWorkerID).subscribe((response => {
      this.toastrService.success(response.message);
      this.getProjectWorkerTable()
    }),responseError=>{
        this.toastrService.error(responseError.error.message)
      })
  }

  updateProjectWorkers(){
    if(this.projectWorkerUpdateForm.valid){
      this.projectWorkerUpdateForm.value.WorkerID=Number(this.projectWorkerUpdateForm.value.WorkerID)
      let projectWorkerModel = Object.assign({}, this.projectWorkerUpdateForm.value);
      projectWorkerModel.Status=true;
      projectWorkerModel.ProjectWorkerID=this.projectWorkerSingle["ProjectWorkerID"]
      this.projectWorkerService.update(projectWorkerModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.getProjectWorkerTable()
      },responseError=>{
        this.toastrService.error(responseError.error.message)
      })
    } else {
      this.toastrService.error("Your form is missing", "Warning");
    }
  }

  addProjectWorkerWorkingTimes(){
    if(this.projectWorkerWorkingTimeForm.valid){
      let projectWorkerWorkingTimeModel = Object.assign({}, this.projectWorkerWorkingTimeForm.value);     
      projectWorkerWorkingTimeModel.ProjectWorkerID = this.projectWorkerIDforPWW
      this.projectWorkerWorkingTimeService.add(projectWorkerWorkingTimeModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
      },responseError=>{
        this.toastrService.error(responseError.error.message)
      })
    } else {
      this.toastrService.error("Your form is missing", "Warning");
    }
  }

}
