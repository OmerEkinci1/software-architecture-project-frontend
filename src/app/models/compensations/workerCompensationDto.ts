import { OnInit } from "@angular/core"

export class WorkerCompensationDto implements OnInit{
    
    WorkerID:number
    WorkerName:string
    WorkerSurname:string
    CompensationID:number
    CompensationAmount:number
    CompensationDate:Date
    DailyWorkingTime:number
    HourSalary:number
    StartDate:Date
    UserID:number
    Name:string
    Surname:string

    constructor(params:WorkerCompensationDto){
        Object.assign(this,params)

    }

    ngOnInit(): void {
        
    }


}