import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DepartmentType } from 'src/app/models/departmentTypes/departmentType';
import { DepartmentTypeService } from 'src/app/services/department-type.service';

@Component({
  selector: 'app-department-type',
  templateUrl: './department-type.component.html',
  styleUrls: ['./department-type.component.css']
})
export class DepartmentTypeComponent implements OnInit {

  department
  departmentTypes : DepartmentType[] = []
  dataLoaded = false;
  modalRef : BsModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private departmentTypeService: DepartmentTypeService,
    private modalService: BsModalService,
    private router: Router,
    private toastrService: ToastrService,
  ) { }

  departmentTypeForm : FormGroup;

  ngOnInit(): void {
    this.getDepartmentTypes();
    this.createDepartmentTypeForm()
  }

  openModal(template: TemplateRef<any>,departmentType:DepartmentType){
    this.department=new DepartmentType(departmentType)
    console.log(this.department)
    this.modalRef = this.modalService.show(template);
  }

  createDepartmentTypeForm() {
    this.departmentTypeForm = this.formBuilder.group({
      DepartmentTypeName:['', Validators.required],
    })
  }

  getDepartmentTypes(){
    console.log("girdi")
    this.departmentTypeService.getAll().subscribe((response) => {
      this.departmentTypes = response.data
      this.dataLoaded = true
      console.log(response.data)
    })
  }

  addDepartmentTypes(){
    if(this.departmentTypeForm.valid){
      let departmentTypeModel = Object.assign({}, this.departmentTypeForm.value);
      console.log(departmentTypeModel)
      this.departmentTypeService.add(departmentTypeModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.router.navigate(['department-types']);
        
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

  updateDepartmentTypes(){
    if(this.departmentTypeForm.valid){
      // this.department.DepartmentTypeName=this.departmentTypeForm.value
      console.log(this.department)
      this.departmentTypeService.update(this.department).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
      },
      (responseError) => {
        console.log(responseError.error.Errors)
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
