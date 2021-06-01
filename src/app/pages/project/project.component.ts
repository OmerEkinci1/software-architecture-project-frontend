import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray , ValidatorFn, AbstractControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DepartmentType } from 'src/app/models/departmentTypes/departmentType';
import { Project } from 'src/app/models/projects/project';
import { ProjectCreationDto } from 'src/app/models/projects/projectCreationDto';
import { ProjectDetailDto } from 'src/app/models/projects/projectDetailDto';
import { ProjectGeneralDto } from 'src/app/models/projects/projectGeneralDto';
import { ProjectSectionDepartment } from 'src/app/models/projectSectionDepartments/projectSectionDepartment';
import { ProjectSectionDepartmentDto } from 'src/app/models/projectSectionDepartments/projectSectionDepartmentDto';
import { ProjectSectionKeepListDepartmentDto } from 'src/app/models/projectSectionDepartments/projectSectionKeepListDepartmentDto';
import { ProjectSectionDto } from 'src/app/models/projectSections/porjectSectionDto';
import { ProjectSection } from 'src/app/models/projectSections/projectSection';
import { ProjectSectionCreationDto } from 'src/app/models/projectSections/projectSectionCreationDto';
import { ProjectWorkerDto } from 'src/app/models/projectWorkers/projectWorkerDto';
import { DepartmentTypeService } from 'src/app/services/department-type.service';
import { ProjectGeneralService } from 'src/app/services/project-general.service';
import { ProjectSectionDepartmentService } from 'src/app/services/project-section-department.service';
import { ProjectSectionsService } from 'src/app/services/project-sections.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  departmentTypes : DepartmentType[] = []
  project
  projectSection
  projectSectionDepartment
  projects: Project[] = [];
  projectGeneralDto : ProjectGeneralDto[] = []
  projectDetailDto : ProjectDetailDto[] = []
  projectSections : ProjectSection[] = []
  projectSectionCreationDto:ProjectSectionCreationDto[]=[]
  projectSectionDepartmentDto : ProjectSectionDepartmentDto[] = []
  convertProjectDetailToProject
  projectForUpdate:Project
  projectSectionDto:ProjectSectionDto[]=[]

  projectForm: FormGroup
  projectSectionForm : FormGroup
  projectSectionUpdateForm : FormGroup
  projectSectionDepartmentForm : FormGroup
  projectSectionDepartmentUpdateForm : FormGroup
  
  modalRef : BsModalRef;
  IncrementalForm : FormGroup

  projectCreationDto:ProjectCreationDto
  dataLoaded = false;

  constructor(
    private formBuilder: FormBuilder,
    private projectGeneralService:ProjectGeneralService,
    private projectSectionService : ProjectSectionsService,
    private projectSectionDepartmentService : ProjectSectionDepartmentService,
    private departmentTypeService : DepartmentTypeService,  
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getDepartmentTypes()
    this.createInstance()
    this.createProjectAddForm();
    this.createProjectSectionForm()
    this.createProjectSectionDepartmentForm()
    this.getProjects()
    this.getByAllSectionDepartments()
    this.getProjectSectionAll()
    // this.activatedRoute.params.subscribe(params=> {
    //   if(params["ProjectID"]){
    //     this.getProjectByProjectID(params["ProjectID"]);
    //   }
    //   else {
    //     // buraya bir tane getAll yazılması gerekiyor.
        
    //   }
    // })
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template,);
  }

  openModalForProjectDetails(template: TemplateRef<any>,projectID:number){
    this.convertProjectDetailToProject=projectID    
    this.modalRef = this.modalService.show(template);
  }

  openModalForUpdateProject(template: TemplateRef<any>,project:Project){
    this.projectForUpdate=project 
    this.modalRef = this.modalService.show(template);
  }
  

  openModalProject(template: TemplateRef<any>){  
    if(this.projectForm.valid){
      this.projectForm.value.UserID=Number(localStorage.getItem("userID"))
      this.modalRef = this.modalService.show(template);
    }
  }

  openModalForProjectUpdate(template: TemplateRef<any>, projectDetailDto: ProjectDetailDto){
    this.project=new ProjectDetailDto(projectDetailDto)
    this.modalRef = this.modalService.show(template)
  }

  openModalForProjectSectionUpdate(template: TemplateRef<any>, projectSection: ProjectSectionDto){
    this.projectSection=new ProjectSection(projectSection)
    this.createProjectSectionUpdateForm()
    this.modalRef = this.modalService.show(template)
  }

  openModalForProjectSectionDepartmentUpdate(template: TemplateRef<any>, projectSectionDep: ProjectSectionDepartmentDto){
    this.projectSectionDepartment=projectSectionDep
    this.createProjectSectionDepartmentUpdateForm()
    this.modalRef = this.modalService.show(template)
  }

  addNext() {
    (this.IncrementalForm.controls['items'] as FormArray).push(this.createProjectSectionForm())
  }

  submit() {
    console.log(this.IncrementalForm.value);
  }

  createInstance(){
    this.IncrementalForm = this.formBuilder.group({
      items: this.formBuilder.array([this.createProjectSectionForm()])
    })
  }

  createProjectSectionForm () {
    return this.projectSectionForm = this.formBuilder.group({
      ProjectID:[,Validators.required],
      ProjectSectionName:['', Validators.required],
      SectionProjectTime:['', Validators.required],
      departmentTypeID:[this.departmentTypes, Validators.required],
    })
  }

  createProjectSectionUpdateForm () {
    return this.projectSectionUpdateForm = this.formBuilder.group({
      ProjectName:[this.projectSection["params"]["projectID"], Validators.required],
      ProjectSectionName:[this.projectSection["params"]["projectSectionName"], Validators.required],
      SectionProjectTime:[this.projectSection["params"]["sectionProjectTime"],Validators.required],
      RemainingSectionTime:[this.projectSection["params"]["remainingSectionTime"], Validators.required],
      WorkerCount:[this.projectSection["params"]["workerCount"], Validators.required],
    })
  }

  createProjectSectionDepartmentUpdateForm () {
    return this.projectSectionDepartmentUpdateForm = this.formBuilder.group({
      ProjectSectionID:[this.projectSectionDepartment["projectSectionID"], Validators.required],
      DepartmentTypeID:[this.projectSectionDepartment["departmentTypeID"], Validators.required],
    })
  }
  

  createProjectAddForm() {
    this.projectForm = this.formBuilder.group({
      ProjectID:[],
      ProjectName:['', Validators.required],
      Subject:['', Validators.required],
      ProjectBudget:['', Validators.required],
      MinWorkerCount:['',Validators.min(1)],
      MaxWorkerCount:['',Validators.required],
      TotalDeclaredTime:['',Validators.required],
      // // projectSection
      // ProjectSectionName:['',Validators.required],
      // SectionProjectTime:['',Validators.required],
      // // projectSectionDepartment
      // ProjectSectionDepartmentID:['', Validators.required],
      // ProjectSectionID:['',Validators.required],
      // DeaprtmentTypeID:['',Validators.required],
    })
  }

  createProjectSectionDepartmentForm () {
    this.projectSectionDepartmentForm = this.formBuilder.group({
      ProjectSectionID:['', Validators.required],
      DepartmentTypeID:['', Validators.required],
    })
  }


  getProjects(){
    this.projectGeneralService.getAll().subscribe((response) => {
      this.projectDetailDto = response.data
      // console.log(response.data)
      this.dataLoaded = true
    })
  }
  // getSections(){
  //   this.projectSectionService.().subscribe(response => {
  //     this.projectSectionDepartmentDto = response.data,
  //     console.log(this.projectSectionDepartmentDto)
  //     this.dataLoaded = true
  //     if (this.projectSectionDepartmentDto.length == 0) {
  //       this.toastrService.info("There is no record for your filter.","Result of searching");
  //     }
  //   })
  // }

  getDepartmentTypes(){ 
    this.departmentTypeService.getAll().subscribe((response) => {
      this.departmentTypes = response.data
      this.dataLoaded = true
    })
  }

  getProjectSectionAll(){ 
    this.projectSectionService.getAll().subscribe((response) => {
      this.projectSectionDto = response.data
      this.dataLoaded = true
    })
  }

  getByAllSectionDepartments(){
    this.projectSectionDepartmentService.getAll().subscribe(response => {
      this.projectSectionDepartmentDto = response.data,
      this.dataLoaded = true
      if (this.projectSectionDepartmentDto.length == 0) {
        this.toastrService.info("There is no record for your filter.","Result of searching");
      }
    })
  }

  

  addProject(){
    if(this.projectForm.valid && this.IncrementalForm.valid){
      for (let i = 0; i < this.IncrementalForm.value.items.length; i++) {
        const result : ProjectSectionDepartment[] = []
        for (let index = 0; index < this.IncrementalForm.value.items[i].departmentTypeID.length; index++) {
          let ProSectDep=new ProjectSectionDepartment(Number(this.IncrementalForm.value.items[i].departmentTypeID[index]))
          result.push(ProSectDep)     
        }  
        let ProSec=new ProjectSectionCreationDto(this.IncrementalForm.value.items[i].ProjectSectionName,this.IncrementalForm.value.items[i].SectionProjectTime,result)
        this.projectSectionCreationDto.push(ProSec)   
      }
      let values= this.projectForm.value
      let projectAdded=new ProjectCreationDto(6,values.ProjectName,values.Subject,values.ProjectBudget,values.MinWorkerCount,values.MaxWorkerCount,values.TotalDeclaredTime,this.projectSectionCreationDto)

      this.projectGeneralService.add(projectAdded).subscribe((response)=>{
        this.toastrService.success(response.message,"Success");   
        this.getProjects() 
      },responseError=>{
        this.toastrService.error(responseError.error.message)
      })
    } else {
      this.toastrService.error("Your form is missing", "Warning");
    }
  }

  deleteProject(ProjectID:number){
    this.projectGeneralService.delete(ProjectID).subscribe((response) => {
      this.toastrService.success(response.message);
      this.getProjects()
    }),responseError=>{
      this.toastrService.error(responseError.error.message)
    }
  }

  updateProject(){
    if(this.projectForm.valid){
      let projectModel = Object.assign({}, this.projectForm.value);
      projectModel.UserID=Number(6);
      this.projectGeneralService.update(projectModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.getProjects()
      },responseError=>{
        this.toastrService.error(responseError.error.message)
      })
    } else {
      this.toastrService.error("Your form is missing", "Warning");
    }
  }  

  addProjectSections(){
    if(this.projectSectionForm.valid){
      this.projectSectionForm.value.ProjectID = Number(this.projectSectionForm.value.ProjectID)
      let projectSectionModel = Object.assign({}, this.projectSectionForm.value);
      this.projectSectionService.add(projectSectionModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.getProjectSectionAll()
      },
      responseError=>{
        this.toastrService.error(responseError.error.message)
      })
    } else {
      this.toastrService.error("Your form is missing", "Warning");
    }
  }

  deleteProjectSections(projectSection:ProjectSection){
    this.projectSectionService.delete(projectSection).subscribe((response => {
      this.toastrService.success(response.message);
      this.getProjectSectionAll()
    }),responseError=>{
      this.toastrService.error(responseError.error.message)
    })
  }

  updateProjectSections(){
    if(this.projectSectionUpdateForm.valid){
      let projectSectionModel = Object.assign({}, this.projectSectionUpdateForm.value);
      projectSectionModel.ProjectSectionID=this.projectSection["params"]["projectSectionID"]
      projectSectionModel.ProjectID=this.projectSection["params"]["projectID"]
      projectSectionModel.Status=this.projectSection["params"]["status"]
      this.getProjectSectionAll()

      this.projectSectionService.update(projectSectionModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
      },responseError=>{
        this.toastrService.error(responseError.error.message)
      })
    } else {
      this.toastrService.error("Your form is missing", "Warning");
    }
  }

  addProjectSectionDepartment(){
    if(this.projectSectionDepartmentForm.valid){
      this.projectSectionDepartmentForm.value.ProjectSectionID = Number(this.projectSectionDepartmentForm.value.ProjectSectionID) 
      this.projectSectionDepartmentForm.value.DepartmentTypeID = Number(this.projectSectionDepartmentForm.value.DepartmentTypeID) 
      this.projectSectionDepartmentForm.value.Status = true
      let projectSectionDepartmentModel = Object.assign({}, this.projectSectionDepartmentForm.value);
      this.projectSectionDepartmentService.add(projectSectionDepartmentModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.getByAllSectionDepartments()
      },responseError=>{
        this.toastrService.error(responseError.error.message)
      })
    } else {
      this.toastrService.error("Your form is missing", "Warning");
    }
  }

  deleteProjectSectionDepartment(projectSectionDepartment : ProjectSectionDepartment){
    this.projectSectionDepartmentService.delete(projectSectionDepartment).subscribe((response => {
      this.toastrService.success(response.message);
      this.getByAllSectionDepartments()
    }),responseError=>{
      this.toastrService.error(responseError.error.message)
    })
  }

  updateProjectSectionDepartment(){
    if(this.projectSectionDepartmentUpdateForm.valid){
      this.projectSectionDepartmentUpdateForm.value.DepartmentTypeID = Number(this.projectSectionDepartmentUpdateForm.value.DepartmentTypeID)
      let projectSectionDepartmentModel = Object.assign({}, this.projectSectionDepartmentUpdateForm.value);
      projectSectionDepartmentModel.ProjectSectionDepartmentID=this.projectSectionDepartment["projectSectionDepartmentID"]     
      projectSectionDepartmentModel.Status=true

      this.projectSectionDepartmentService.update(projectSectionDepartmentModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.getByAllSectionDepartments()
      },responseError=>{
        this.toastrService.error(responseError.error.message)
      })
    } else {
      this.toastrService.error("Your form is missing", "Warning");
    }
  }

  // PROJECT SECTION STAGE //

  

  // getByProjectID(ProjectID:number){
  //   this.projectSectionService.getByProjectID(ProjectID).subscribe(response => {
  //     this.projectSections = response.data,
  //     this.dataLoaded = true
  //     if (this.projectSections.length == 0) {
  //       this.toastrService.info("There is no record for your filter.","Result of searching");
  //     }
  //   })
  // }

  // PROJECT SECTION DEPARTMENT // 
  

  

  // updateWorker(){
  //   if(this.projectSectionDepartmentForm.valid){
  //     let projectSectionDepartmentModel = Object.assign({}, this.projectSectionDepartmentForm.value);
  //     this.projectSectionDepartmentService.update(projectSectionDepartmentModel).subscribe((response) => {
  //       this.toastrService.success(response.message, "Success");
  //     },
  //     (responseError) => {
  //       if (responseError.error.Errors.length > 0) {
  //         for (let index = 0; index < responseError.error.Errors.length; index++){
  //           this.toastrService.error(responseError.error.Errors[index].ErrorMessage, "Verification Error");
  //         }
  //       }       
  //     })
  //   } else {
  //     this.toastrService.error("Your form is missing", "Warning");
  //   }
  // }

  
}
