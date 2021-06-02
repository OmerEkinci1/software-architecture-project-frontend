import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Compensation } from 'src/app/models/compensations/compensation';
import { WorkerCompensationDto } from 'src/app/models/compensations/workerCompensationDto';
import { User } from 'src/app/models/users/user';
import { WorkerModel } from 'src/app/models/workers/workerModel';
import { CompensationService } from 'src/app/services/compensation.service';
import { UserService } from 'src/app/services/user.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-compensation',
  templateUrl: './compensation.component.html',
  styleUrls: ['./compensation.component.css']
})
export class CompensationComponent implements OnInit {

  compensations
  compensationAdd
  workerCompensationDtoForSuggestion
  //compensationDto : WorkerCompensationDto
  workerCompensationDto : WorkerCompensationDto[] = []
  users : User[] = []
  worker : WorkerModel[] = []
  dataLoaded = false;
  modalRef : BsModalRef;
  filterText = "";

  constructor(
    private formBuilder: FormBuilder,
    private compensationService: CompensationService,
    private userService: UserService,
    private workerService: WorkerService,
    private toastrService: ToastrService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
  ) { }

  compensationForm : FormGroup;
  compensationUpdateForm : FormGroup;

  openModal(template: TemplateRef<any>, compensationDtoFromHtml: WorkerCompensationDto){
    this.compensations=new WorkerCompensationDto(compensationDtoFromHtml)
    this.modalRef = this.modalService.show(template)
  }

  openModalAdd(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.getWorkerByStatusFalse()
    this.getUserByStatusTrue()
    this.createCompensationForm()
    this.createCompensationUpdateForm()
    this.activatedRoute.queryParams.subscribe((params) => {
      if(params['WorkerID'])
        this.getCompensationByWorkerID(params['WorkerID'])
      else
        this.getCompensations()
    })
  }

  createCompensationForm() {
    this.compensationForm = this.formBuilder.group({
      WorkerID:[, Validators.required],
      UserID:[, Validators.required],
      CompensationAmount:['', Validators.required],
    })
  }

  createCompensationUpdateForm() {
    this.compensationUpdateForm = this.formBuilder.group({
      WorkerName:['',Validators.required],
      WorkerSurname:['',Validators.required],
      UserName:['',Validators.required],
      UserSurname:['',Validators.required],
      CompensationAmount:['', Validators.required],
    })
  }

  getCompensations(){
    this.compensationService.getAll().subscribe((response) => {
      this.workerCompensationDto = response.data
      this.dataLoaded = true
    })
  }

  getUserByStatusTrue(){
    this.userService.getalluserbystatustrue().subscribe((response) => {
      this.users = response.data
      this.dataLoaded = true
    })
  }

  getWorkerByStatusFalse(){
    this.workerService.getallworkerstatusfalse().subscribe((response) => {
      this.worker = response.data
      this.dataLoaded = true
    })
  }



  addCompensation(){
    if(this.compensationForm.valid){     
      this.compensationAdd=new Compensation(Number(this.compensationForm.value.UserID),Number(this.compensationForm.value.WorkerID),this.compensationForm.value.CompensationAmount)
      this.compensationService.add(this.compensationAdd).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.getCompensations()
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

  updateCompensation(){
    if(this.compensationUpdateForm.valid){
      this.compensationService.update(this.compensations).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
        this.getCompensations()
      },
      responseError=>{
        this.toastrService.error(responseError.error.message)
      })
    } else {
      this.toastrService.error("Your form is missing", "Warning");
    }
  }

  getCompensationByUserID(UserID:number){
    this.compensationService.getByUserID(UserID).subscribe(response => {
      this.workerCompensationDto = response.data,
      this.dataLoaded = true
      if (this.workerCompensationDto.length == 0) {
        this.toastrService.info("There is no record for your filter.","Result of searching");
      }
    })
  }

  getCompensationByWorkerID(WorkerID:number){
    this.compensationService.getByWorkerID(WorkerID).subscribe(response => {
      this.workerCompensationDto = response.data,
      this.dataLoaded = true
      if (this.workerCompensationDto.length == 0) {
        this.toastrService.info("There is no record for your filter.","Result of searching");
      }
    })
  }

  suggestion(WorkerID:number){
    this.compensationService.suggestion(WorkerID).subscribe(response => {
      console.log(response.data)
      this.workerCompensationDtoForSuggestion = response.data['compensationAmount'],
      console.log(this.workerCompensationDtoForSuggestion)
      this.dataLoaded = true
    })
  }

}
