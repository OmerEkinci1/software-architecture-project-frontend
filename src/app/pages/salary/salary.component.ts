import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Salary } from 'src/app/models/salaries/salary';
import { WorkerSalaryDto } from 'src/app/models/salaries/workerSalaryDto';
import { User } from 'src/app/models/users/user';
import { WorkerModel } from 'src/app/models/workers/workerModel';
import { SalaryService } from 'src/app/services/salary.service';
import { UserService } from 'src/app/services/user.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {

  salaries
  salaryAdd
  salary : Salary[] = []
  salaryDto : WorkerSalaryDto
  users : User[] = []
  worker : WorkerModel[] = []
  workerSalaryDto : WorkerSalaryDto[] = []
  dataLoaded = false
  modalRef : BsModalRef;

  constructor(
    private salaryService:SalaryService,
    private userService: UserService,
    private workerService: WorkerService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private modalService: BsModalService,
    private activatedRoute : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getUserByStatusTrue()
    this.getAllWorker()
    this.getSalaries()
    this.createSalaryForm()
    this.activatedRoute.queryParams.subscribe((params) => {
      if(params['UserID'])
        this.getSalaryByUserID(params['UserID'])
      else if(params['WorkerID'])
        this.getSalaryByWorkerID(params['WorkerID'])
      else
        this.getSalaries()
    })
  }

  openModal(template: TemplateRef<any>, salaryDto: WorkerSalaryDto){
    this.salaries = new WorkerSalaryDto(salaryDto)
    // this.salaries.WorkerID = this.salaryDto.SalaryID  
    // this.salaries.WorkerID = this.salaryDto.WorkerID 
    // this.salaries.UserID = this.salaryDto.UserID 
    // this.salaries.SalaryDate = this.salaryDto.SalaryDate 
    // this.salaries.SalaryAmount = this.salaryDto.SalaryAmount 
    this.createSalarynUpdateForm()
    this.modalRef = this.modalService.show(template)
  }

  salaryForm : FormGroup
  salaryUpdateForm: FormGroup

  createSalaryForm() {
    this.salaryForm = this.formBuilder.group({
      WorkerID:['', Validators.required],
      UserID:['', Validators.required],
      SalaryAmount:['', Validators.required],
    })
  }

  createSalarynUpdateForm() {
    this.salaryUpdateForm = this.formBuilder.group({
      WorkerName:[this.salaries["workerName"],Validators.required],
      WorkerSurname:[this.salaries["workerSurname"],Validators.required],
      UserName:[this.salaries["name"],Validators.required],
      UserSurname:[this.salaries["surname"],Validators.required],
      SalaryAmount:[this.salaries["salaryAmount"], Validators.required],
    })
  }

  getSalaries(){
    this.salaryService.getAll().subscribe((response) => {
      this.workerSalaryDto = response.data
      this.dataLoaded = true
    })
  }

  getUserByStatusTrue(){
    this.userService.getalluserbystatustrue().subscribe((response) => {
      this.users = response.data
      this.dataLoaded = true
    })
  }

  getAllWorker(){
    this.workerService.getAll().subscribe((response) => {
      this.worker = response.data
      this.dataLoaded = true
    })
  }

  addSalary(){
    if(this.salaryForm.valid){
      this.salaryAdd=new Salary(Number(this.salaryForm.value.UserID),Number(this.salaryForm.value.WorkerID),this.salaryForm.value.SalaryAmount)
      this.salaryService.add(this.salaryAdd).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.getSalaries()
      },
      responseError=>{
        this.toastrService.error(responseError.error.message)
      })
    } else {
      this.toastrService.error("Your form is missing", "Warning");
    }
  }

  updateSalary(){
    if(this.salaryUpdateForm.valid){
      let loginModel=new Salary(this.salaries["userID"],this.salaries["workerID"],this.salaryUpdateForm.value.SalaryAmount)      
      loginModel.SalaryID=Number(this.salaries["salaryID"])

      this.salaryService.update(loginModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.getSalaries()
      },
      responseError=>{
        this.toastrService.error(responseError.error.message)
      })
    } else {
      this.toastrService.error("Your form is missing", "Warning");
    }
  }

  getSalaryByUserID(UserID:number){
    this.salaryService.getByUserID(UserID).subscribe(response => {
      this.workerSalaryDto = response.data,
      this.dataLoaded = true
      if (this.salary.length == 0) {
        this.toastrService.info("There is no record for your filter.","Result of searching");
      }
    })
  }

  getSalaryByWorkerID(WorkerID:number){
    this.salaryService.getByWorkerID(WorkerID).subscribe(response => {
      this.workerSalaryDto = response.data,
      this.dataLoaded = true
      if (this.salary.length == 0) {
        this.toastrService.info("There is no record for your filter.","Result of searching");
      }
    })
  }

}
