import { OnInit } from "@angular/core";

export class WorkerSalaryDto implements OnInit{   
    SalaryID:number
    SalaryAmount:number
    SalaryDate:Date
    WorkerID:number
    WorkerName:string
    WorkerSurname:string
    WorkerStatus:boolean
    DailyWorkingTime:number
    HourSalary:number
    StartDate:Date
    UserID:number
    Name:string
    Surname:string

    constructor(params:WorkerSalaryDto){
        Object.assign(this,params)
    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
}