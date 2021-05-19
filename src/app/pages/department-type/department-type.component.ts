import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepartmentType } from 'src/app/models/departmentTypes/departmentType';
import { DepartmentTypeService } from 'src/app/services/department-type.service';

@Component({
  selector: 'app-department-type',
  templateUrl: './department-type.component.html',
  styleUrls: ['./department-type.component.css']
})
export class DepartmentTypeComponent implements OnInit {

  departmentTypes : DepartmentType[] = []
  dataLoaded = false;

  constructor(
    private formBuilder: FormBuilder,
    private departmentTypeService: DepartmentTypeService,
    private toastrService: ToastrService,
  ) { }

  departmentTypeForm : FormGroup;

  ngOnInit(): void {
    this.getDepartmentTypes()
    this.createDepartmentTypeForm()
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
      let workerModel = Object.assign({}, this.departmentTypeForm.value);
      this.departmentTypeService.update(workerModel).subscribe((response) => {
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
