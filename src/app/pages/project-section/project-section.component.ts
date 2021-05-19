import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectSection } from 'src/app/models/projectSections/projectSection';
import { ProjectSectionsService } from 'src/app/services/project-sections.service';

@Component({
  selector: 'app-project-section',
  templateUrl: './project-section.component.html',
  styleUrls: ['./project-section.component.css']
})
export class ProjectSectionComponent implements OnInit {

  private projectSections : ProjectSection[] = []
  dataLoaded = false

  constructor(
    private projectSectionService : ProjectSectionsService,
    private toastrService : ToastrService,
    private formBuilder : FormBuilder,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if(params['ProjectID'])
        this.getByProjectID(params['ProjectID'])
    })
  }

  projectSectionForm : FormGroup

  createProjectSectionForm () {
    this.projectSectionForm = this.formBuilder.group({
      ProjectID:['', Validators.required],
      ProjectSectionName:['', Validators.required],
      SectionProjectTime:['', Validators.required],
      RemainingProjectTime:['',Validators.required],
      WorkerCount:['',Validators.required],
    })
  }

  addProjectSections(){
    if(this.projectSectionForm.valid){
      let projectSectionModel = Object.assign({}, this.projectSectionForm.value);
      this.projectSectionService.add(projectSectionModel).subscribe((response) => {
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

  deleteProjectSections(projectSection:ProjectSection){
    this.projectSectionService.delete(projectSection).subscribe((response => {
      this.toastrService.success(response.message);
    }),errorResponse=>{
      if (errorResponse.error.error.length>0){
        for(let i=0; i < errorResponse.error.error.length; i++){
          this.toastrService.error(errorResponse.error.error[i].ErrorMessage,"Verification Error");
        }
      }
    })
  }

  updateProjectSections(){
    if(this.projectSectionForm.valid){
      let projectSectionModel = Object.assign({}, this.projectSectionForm.value);
      this.projectSectionService.update(projectSectionModel).subscribe((response) => {
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

  getByProjectID(ProjectID:number){
    this.projectSectionService.getByProjectID(ProjectID).subscribe(response => {
      this.projectSections = response.data,
      this.dataLoaded = true
      if (this.projectSections.length == 0) {
        this.toastrService.info("There is no record for your filter.","Result of searching");
      }
    })
  }

}
