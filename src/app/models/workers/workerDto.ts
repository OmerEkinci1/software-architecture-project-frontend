import { DepartmentType } from "../departmentTypes/departmentType";
import { OnInit } from "@angular/core";

export class WorkerDto implements OnInit{
    WorkerID:number
    WorkerName:string
    WorkerSurname:string
    UserID : number
    Name : string
    DailyWorkingTime:number
    HourSalary:number
    StartTime:Date
    Status:boolean
    DepartmentType: DepartmentType[]

    constructor(WorkerID:number,WorkerName:string,WorkerSurname:string,UserID : number,Name : string,DailyWorkingTime:number,HourSalary:number,StartTime:Date,
        Status:boolean,DepartmentType: DepartmentType[]){
        Object.assign(this,{WorkerID,WorkerName,WorkerSurname,UserID,Name,DailyWorkingTime,HourSalary,StartTime,Status,DepartmentType})
    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
}