import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray , ValidatorFn, AbstractControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Console } from 'console';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DepartmentType } from 'src/app/models/departmentTypes/departmentType';
import { Project } from 'src/app/models/projects/project';
import { ProjectCreationDto } from 'src/app/models/projects/projectCreationDto';
import { ProjectDetailDto } from 'src/app/models/projects/projectDetailDto';
import { ProjectGeneralDto } from 'src/app/models/projects/projectGeneralDto';
import { ProjectSectionDepartment } from 'src/app/models/projectSectionDepartments/projectSectionDepartment';
import { ProjectSectionKeepListDepartmentDto } from 'src/app/models/projectSectionDepartments/projectSectionKeepListDepartmentDto';
import { ProjectSection } from 'src/app/models/projectSections/projectSection';
import { ProjectSectionCreationDto } from 'src/app/models/projectSections/projectSectionCreationDto';
import { ProjectWorker } from 'src/app/models/projectWorkers/projectWorker';
import { ProjectWorkerDto } from 'src/app/models/projectWorkers/projectWorkerDto';
import { ProjectWorkerGeneralDto } from 'src/app/models/projectWorkers/projectWorkerGeneralDto';
import { DepartmentTypeService } from 'src/app/services/department-type.service';
import { ProjectGeneralService } from 'src/app/services/project-general.service';
import { ProjectSectionDepartmentService } from 'src/app/services/project-section-department.service';
import { ProjectSectionsService } from 'src/app/services/project-sections.service';
import { ProjectWorkerService } from 'src/app/services/project-worker.service';

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
  projectWorker
  projects: Project[] = [];
  projectGeneralDto : ProjectGeneralDto[] = []
  projectDetailDto : ProjectDetailDto[] = []
  projectSections : ProjectSection[] = []
  projectSectionCreationDto:ProjectSectionCreationDto[]=[]
  projectSectionDepartments : ProjectSectionDepartment[] = []
  // projectAdded:ProjectCreationDto
  projectWorkers : ProjectWorker[] = []
  projectWorkerGeneralDtos : ProjectWorkerGeneralDto[] = []
  // convertProjectDetailToProject
  convertProjectDetailToProject
  projectForUpdate:Project

  projectForm: FormGroup
  projectSectionForm : FormGroup
  projectSectionDepartmentForm : FormGroup
  projectWorkerForm : FormGroup
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
    private projectWorkerService : ProjectWorkerService,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getDepartmentTypes()
    this.createInstance()
    this.createProjectAddForm();
    this.createProjectSectionForm()
    this.createProjectSectiomDepartmentForm()
    this.createProjectWorkerForm()
    this.getProjects()
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
    console.log(this.projectForUpdate) 
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
    console.log(this.project)
  }

  openModalForProjectSectionUpdate(template: TemplateRef<any>, projectSection: ProjectSection){
    this.projectSection=new ProjectSection(projectSection)
    this.modalRef = this.modalService.show(template)
    console.log(this.projectSection)
  }

  openModalForProjectSectionDepartmentUpdate(template: TemplateRef<any>, projectSectionDep: ProjectSectionKeepListDepartmentDto){
    this.projectSectionDepartment=new ProjectSectionKeepListDepartmentDto(projectSectionDep)
    this.modalRef = this.modalService.show(template)
    console.log(this.projectSectionDepartment)
  }

  openModalForProjectWorkerUpdate(template: TemplateRef<any>, projectworker: ProjectWorkerDto){
    this.projectWorker=new ProjectWorkerDto(projectworker)
    this.modalRef = this.modalService.show(template)
    console.log(this.projectWorker)
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
      ProjectSectionName:['', Validators.required],
      SectionProjectTime:['', Validators.required],
      departmentTypeID:[this.departmentTypes, Validators.required],
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

  

  createProjectSectiomDepartmentForm () {
    this.projectSectionDepartmentForm = this.formBuilder.group({
      ProjectSectionID:['', Validators.required],
      DeaprtmentTypeID:['', Validators.required],
    })
  }

  createProjectWorkerForm () {
    this.projectWorkerForm = this.formBuilder.group({
      projectWorker:['', Validators.required],
      project:['', Validators.required],
    })
  }

  getProjects(){
    this.projectGeneralService.getAll().subscribe((response) => {
      this.projectDetailDto = response.data
      // console.log(response.data)
      this.dataLoaded = true
    })
  }

  getDepartmentTypes(){
    this.departmentTypeService.getAll().subscribe((response) => {
      this.departmentTypes = response.data
      this.dataLoaded = true
    })
  }

  getProjectWorkers(){
    this.projectWorkerService.getAll().subscribe((response) => {
      this.projectWorkerGeneralDtos = response.data
      this.dataLoaded = true
    })
  }

  addProject(){
    console.log("geldi")
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
      let projectAdded=new ProjectCreationDto(values.UserID,values.ProjectName,values.Subject,values.ProjectBudget,values.MinWorkerCount,values.MaxWorkerCount,values.TotalDeclaredTime,this.projectSectionCreationDto)
      console.log(projectAdded)

      this.projectGeneralService.add(projectAdded).subscribe((response)=>{
        this.toastrService.success(response.message,"Success");    
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let index = 0; index < responseError.error.Errors.length; index++){
            this.toastrService.error(responseError.error.Errors[index].ErrorMessage,"Verification Error");

          }
        }
      })
    } else {
      this.toastrService.error("Your form is missing", "Warning");
    }
  }

  deleteProject(ProjectID:number){
    console.log(ProjectID)
    this.projectGeneralService.delete(ProjectID).subscribe((response) => {
      this.toastrService.success(response.message);
    }), errorResponse => {
      if (errorResponse.error.error.length>0){
        for(let i=0; i < errorResponse.error.error.length; i++){
          this.toastrService.error(errorResponse.error.error[i].ErrorMessage,"Verification Error");         
        }
      }
    }
  }

  updateProject(){
    console.log("geldi")
    if(this.projectForm.valid){
      console.log("girdi")
      let projectModel = Object.assign({}, this.projectForm.value);
      console.log(this.projectForUpdate)
      projectModel.UserID=Number(localStorage.getItem("userID"));
      console.log(projectModel)
      this.projectGeneralService.update(projectModel).subscribe((response) => {
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

  // PROJECT SECTION STAGE //

  
  // addProjectSections(){
  //   if(this.projectSectionForm.valid){
  //     let projectSectionModel = Object.assign({}, this.projectSectionForm.value);
  //     this.projectSectionService.add(projectSectionModel).subscribe((response) => {
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

  // deleteProjectSections(projectSection:ProjectSection){
  //   this.projectSectionService.delete(projectSection).subscribe((response => {
  //     this.toastrService.success(response.message);
  //   }),errorResponse=>{
  //     if (errorResponse.error.error.length>0){
  //       for(let i=0; i < errorResponse.error.error.length; i++){
  //         this.toastrService.error(errorResponse.error.error[i].ErrorMessage,"Verification Error");
  //       }
  //     }
  //   })
  // }

  // updateProjectSections(){
  //   if(this.projectSectionForm.valid){
  //     let projectSectionModel = Object.assign({}, this.projectSectionForm.value);
  //     this.projectSectionService.update(projectSectionModel).subscribe((response) => {
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
  // addProjectSectionDepartment(){
  //   if(this.projectSectionDepartmentForm.valid){
  //     let projectSectionDepartmentModel = Object.assign({}, this.projectSectionDepartmentForm.value);
  //     this.projectSectionDepartmentService.add(projectSectionDepartmentModel).subscribe((response) => {
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

  // deleteProjectSectionDepartment(projectSectionDepartment : ProjectSectionDepartment){
  //   this.projectSectionDepartmentService.delete(projectSectionDepartment).subscribe((response => {
  //     this.toastrService.success(response.message);
  //   }),errorResponse=>{
  //     if (errorResponse.error.error.length>0){
  //       for(let i=0; i < errorResponse.error.error.length; i++){
  //         this.toastrService.error(errorResponse.error.error[i].ErrorMessage,"Verification Error");
  //       }
  //     }
  //   })
  // }

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

  // getBySectionID(SectionID:number){
  //   this.projectSectionDepartmentService.getBySectionID(SectionID).subscribe(response => {
  //     this.projectSectionDepartments = response.data,
  //     this.dataLoaded = true
  //     if (this.projectSectionDepartments.length == 0) {
  //       this.toastrService.info("There is no record for your filter.","Result of searching");
  //     }
  //   })
  // }

  // // PROJECT WORKER // 
  // addProjectWorkers(){
  //   if(this.projectWorkerForm.valid){
  //     let projectWorkerModel = Object.assign({}, this.projectWorkerForm.value);
  //     this.projectWorkerService.add(projectWorkerModel).subscribe((response) => {
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

  // deleteProjectWorker(projectWorker:ProjectWorker){
  //   this.projectWorkerService.delete(projectWorker).subscribe((response => {
  //     this.toastrService.success(response.message);
  //   }),errorResponse=>{
  //     if (errorResponse.error.error.length>0){
  //       for(let i=0; i < errorResponse.error.error.length; i++){
  //         this.toastrService.error(errorResponse.error.error[i].ErrorMessage,"Verification Error");
  //       }
  //     }
  //   })
  // }

  // updateProjectWorkers(){
  //   if(this.projectWorkerForm.valid){
  //     let projectWorkerModel = Object.assign({}, this.projectWorkerForm.value);
  //     this.projectWorkerService.update(projectWorkerModel).subscribe((response) => {
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
