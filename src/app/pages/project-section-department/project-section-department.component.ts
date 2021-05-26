import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ProjectSectionDepartment } from 'src/app/models/projectSectionDepartments/projectSectionDepartment';
import { ProjectSectionDepartmentService } from 'src/app/services/project-section-department.service';

@Component({
  selector: 'app-project-section-department',
  templateUrl: './project-section-department.component.html',
  styleUrls: ['./project-section-department.component.css']
})
export class ProjectSectionDepartmentComponent implements OnInit {

  projectSectionDepartments : ProjectSectionDepartment[] = []
  dataLoaded = false

  constructor(
    private projectSectionDepartmentService : ProjectSectionDepartmentService,
    private formBuilder : FormBuilder,
    private toastrService : ToastrService,
    private modalService: BsModalService,
    private activatedRoute : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if(params['SectionID'])
        this.getBySectionID(params['SectionID'])
    })
  }

  projectSectionDepartmentForm : FormGroup
  modalRef : BsModalRef;

  createProjectSectiomDepartmentForm () {
    this.projectSectionDepartmentForm = this.formBuilder.group({
      ProjectSectionID:['', Validators.required],
      DeaprtmentTypeID:['', Validators.required],
    })
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  addProjectSectionDepartment(){
    if(this.projectSectionDepartmentForm.valid){
      let projectSectionDepartmentModel = Object.assign({}, this.projectSectionDepartmentForm.value);
      this.projectSectionDepartmentService.add(projectSectionDepartmentModel).subscribe((response) => {
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

  deleteProjectSectionDepartment(projectSectionDepartment : ProjectSectionDepartment){
    this.projectSectionDepartmentService.delete(projectSectionDepartment).subscribe((response => {
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
    if(this.projectSectionDepartmentForm.valid){
      let projectSectionDepartmentModel = Object.assign({}, this.projectSectionDepartmentForm.value);
      this.projectSectionDepartmentService.update(projectSectionDepartmentModel).subscribe((response) => {
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

  getBySectionID(SectionID:number){
    this.projectSectionDepartmentService.getBySectionID(SectionID).subscribe(response => {
      this.projectSectionDepartments = response.data,
      this.dataLoaded = true
      if (this.projectSectionDepartments.length == 0) {
        this.toastrService.info("There is no record for your filter.","Result of searching");
      }
    })
  }

}
