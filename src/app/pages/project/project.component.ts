import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/models/projects/project';
import { ProjectGeneralDto } from 'src/app/models/projects/projectGeneralDto';
import { ProjectGeneralService } from 'src/app/services/project-general.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: Project[] = [];
  projectGeneralDto : ProjectGeneralDto[] = []
  dataLoaded = false;

  constructor(
    private formBuilder: FormBuilder,
    private projectGeneralService:ProjectGeneralService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createProjectAddForm();
    this.createProjectUpdateForm();

    this.activatedRoute.params.subscribe(params=> {
      if(params["ProjectID"]){
        this.getProjectByProjectID(params["ProjectID"]);
      }
      else {
        // buraya bir tane getAll yazılması gerekiyor.
        
      }
    })
  }

  projectAddForm: FormGroup; 
  projectUpdateForm: FormGroup;

  createProjectAddForm() {
    this.projectAddForm = this.formBuilder.group({
      UserID:['', Validators.required],
      ProjectName:['', Validators.required],
      Subject:['', Validators.required],
      ProjectBudget:['', Validators.required],
      MinWorkerCount:['',Validators.min(1)],
      MaxWorkerCount:['',Validators.required],
      TotalDeclaredTime:['',Validators.required],
      // projectSection
      ProjectSectionName:['',Validators.required],
      SectionProjectTime:['',Validators.required],
      // projectSectionDepartment
      ProjectSectionDepartmentID:['', Validators.required],
      ProjectSectionID:['',Validators.required],
      DeaprtmentTypeID:['',Validators.required],
    })
  }

  createProjectUpdateForm() {
    this.projectUpdateForm = this.formBuilder.group({
      ProjectName:['', Validators.required],
      Subject:['', Validators.required],
      ProjectBudget:['', Validators.required],
      MinWorkerCount:['',Validators.min(1)],
      MaxWorkerCount:['',Validators.required],
      TotalDeclaredTime:['',Validators.required],
      // projectSection
      ProjectSectionName:['',Validators.required],
      SectionProjectTime:['',Validators.required],
      // projectSectionDepartment
      ProjectSectionDepartmentID:['', Validators.required],
      ProjectSectionID:['',Validators.required],
      DeaprtmentTypeID:['',Validators.required],
    })
  }

  addProject(project:Project){
    if(this.projectAddForm.valid){
      let projectModel = Object.assign({}, this.projectAddForm.value);
      this.projectGeneralService.add(projectModel).subscribe((response)=>{
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

  deleteProject(project:Project){
    this.projectGeneralService.delete(project).subscribe((response) => {
      this.toastrService.success(response.message);
    }), errorResponse => {
      if (errorResponse.error.error.length>0){
        for(let i=0; i < errorResponse.error.error.length; i++){
          this.toastrService.error(errorResponse.error.error[i].ErrorMessage,"Verification Error");         
        }
      }
    }
  }

  getProjectByProjectID(ProjectID:number){
    this.projectGeneralService.getProjectByProjectID(ProjectID).subscribe(response => {
      this.projectGeneralDto = response.data,
      this.dataLoaded = true
      if (this.projects.length == 0) {
        this.toastrService.info("There is no record for your filter.","Result of searching");
      }
    })
  }

}
