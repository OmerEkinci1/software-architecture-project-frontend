import { OnInit } from "@angular/core"

export class ProjectWorkerWorkingTimeDto implements OnInit{
    ProjectWorkerWorkingTimeID:number
    ProjectWorkerID:number
    WorkerID:number
    WorkerName:string
    WorkerSurname:string
    DailyStartHour:string
    DailyFinishHour:string
    Date:Date
    ProjectSectionDepartmentID:number
    ProjectSectionID:number
    ProjectSectionName:string
    DepartmentTypeID:number
    DepartmentTypeName:string
    ProjectID:number
    ProjectName:string

    constructor(ProjectWorkerID:number,DailyStartHour:string,DailyFinishHour:string,Date:Date){
        Object.assign(this,{ProjectWorkerID,DailyStartHour,DailyFinishHour,Date})
    }

    ngOnInit(): void {
        throw new Error("Method not implemented.")
    }
}