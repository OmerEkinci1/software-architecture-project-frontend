import { OnInit } from "@angular/core";

export interface WorkerModel{   
    WorkerID:number;
    UserID : number
    WorkerName:string;
    WorkerSurname:string;
    DailyWorkingTime:number;
    HourSalary:number;
    StartTime:Date;
    Status:boolean;

}