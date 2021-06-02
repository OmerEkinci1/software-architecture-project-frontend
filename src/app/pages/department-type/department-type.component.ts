import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DepartmentType } from 'src/app/models/departmentTypes/departmentType';
import { DepartmentTypeService } from 'src/app/services/department-type.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';

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
    this.modalRef = this.modalService.show(template);
  }

  createDepartmentTypeForm() {
    this.departmentTypeForm = this.formBuilder.group({
      DepartmentTypeName:['', Validators.required],
    })
  }

  getDepartmentTypes(){
    this.departmentTypeService.getAll().subscribe((response) => {
      this.departmentTypes = response.data
      this.dataLoaded = true
    })
  }

  addDepartmentTypes(){
    if(this.departmentTypeForm.valid){
      let departmentTypeModel = Object.assign({}, this.departmentTypeForm.value);
      this.departmentTypeService.add(departmentTypeModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.getDepartmentTypes()
      },
      responseError=>{
        this.toastrService.error(responseError.error.message)
      })
    } else {
      this.toastrService.error("Your form is missing", "Warning");
    }
  }

  updateDepartmentTypes(){
    if(this.departmentTypeForm.valid){
      this.departmentTypeService.update(this.department).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.getDepartmentTypes()
      },
      responseError=>{
        this.toastrService.error(responseError.error.message)
      })
    } else {
      this.toastrService.error("Your form is missing", "Warning");
    }
  }

}
