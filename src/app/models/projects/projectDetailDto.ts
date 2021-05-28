import { OnInit } from "@angular/core"

export class ProjectDetailDto implements OnInit{
    ProjectID:number
    ProjectName:string
    Subject:string
    ProjectBudget:number
    MinWorkerCount:number
    MaxWorkerCount:number
    ActiveWorkerCount:number
    TotalDeclaredTime:number
    RemainingProjectTime:number
    UserID:number
    Name:string
    Surname:string
    Status:boolean

    constructor(params){
        Object.assign(this,{params})

    }

    ngOnInit(): void {
        throw new Error("Method not implemented.")
    }
}